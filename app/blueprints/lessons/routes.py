"""Lessons blueprint - educational content"""
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.extensions import db
from app.models.lesson import Lesson, LessonProgress
from datetime import datetime

lessons_bp = Blueprint('lessons', __name__)


@lessons_bp.route('', methods=['GET'])
def get_lessons():
    """Get all lessons"""
    lessons = Lesson.query.order_by(Lesson.order, Lesson.id).all()
    
    # If logged in, attach progress
    if current_user.is_authenticated:
        progress_list = LessonProgress.query.filter_by(user_id=current_user.id).all()
        progress_map = {p.lesson_id: p for p in progress_list}
        
        lessons_data = []
        for lesson in lessons:
            lesson_dict = lesson.to_dict()
            progress = progress_map.get(lesson.id)
            lesson_dict['isCompleted'] = progress.completed if progress else False
            lesson_dict['score'] = progress.score if progress else None
            lessons_data.append(lesson_dict)
        
        return jsonify(lessons_data), 200
    
    return jsonify([lesson.to_dict() for lesson in lessons]), 200


@lessons_bp.route('/<slug>', methods=['GET'])
def get_lesson(slug):
    """Get lesson by slug"""
    lesson = Lesson.query.filter_by(slug=slug).first_or_404()
    lesson_dict = lesson.to_dict(include_content=True)
    
    # If logged in, attach progress
    if current_user.is_authenticated:
        progress = LessonProgress.query.filter_by(
            user_id=current_user.id,
            lesson_id=lesson.id
        ).first()
        
        lesson_dict['isCompleted'] = progress.completed if progress else False
        lesson_dict['score'] = progress.score if progress else None
    
    return jsonify(lesson_dict), 200


@lessons_bp.route('/<int:lesson_id>/complete', methods=['POST'])
@login_required
def complete_lesson(lesson_id):
    """Mark lesson as complete"""
    lesson = Lesson.query.get_or_404(lesson_id)
    data = request.get_json() or {}
    score = data.get('score')
    
    # Find or create progress
    progress = LessonProgress.query.filter_by(
        user_id=current_user.id,
        lesson_id=lesson_id
    ).first()
    
    if not progress:
        progress = LessonProgress(
            user_id=current_user.id,
            lesson_id=lesson_id
        )
        db.session.add(progress)
    
    progress.completed = True
    progress.score = score
    progress.completed_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify(progress.to_dict()), 200
