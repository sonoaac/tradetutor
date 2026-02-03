"""Lesson and LessonProgress models"""
from datetime import datetime
from app.extensions import db


class Lesson(db.Model):
    __tablename__ = 'lessons'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(200), unique=True, nullable=False, index=True)
    description = db.Column(db.Text)
    content = db.Column(db.Text)
    
    track = db.Column(db.String(20))  # 'stocks', 'crypto', 'forex', 'general'
    difficulty = db.Column(db.String(20))  # 'beginner', 'intermediate', 'advanced'
    order = db.Column(db.Integer, default=0)
    
    # Quiz/assessment (JSON)
    quiz_data = db.Column(db.JSON)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    progress = db.relationship('LessonProgress', backref='lesson', lazy='dynamic')
    
    def to_dict(self, include_content=False):
        """Convert lesson to dictionary"""
        data = {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'description': self.description,
            'track': self.track,
            'difficulty': self.difficulty,
            'order': self.order,
            'createdAt': self.created_at.isoformat(),
        }
        if include_content:
            data['content'] = self.content
            data['quizData'] = self.quiz_data
        return data
    
    def __repr__(self):
        return f'<Lesson {self.title}>'


class LessonProgress(db.Model):
    __tablename__ = 'lesson_progress'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)
    
    completed = db.Column(db.Boolean, default=False)
    score = db.Column(db.Integer)  # Quiz score (0-100)
    
    completed_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Unique constraint: one progress record per user per lesson
    __table_args__ = (
        db.UniqueConstraint('user_id', 'lesson_id', name='unique_user_lesson'),
    )
    
    def to_dict(self):
        """Convert progress to dictionary"""
        return {
            'id': self.id,
            'userId': self.user_id,
            'lessonId': self.lesson_id,
            'completed': self.completed,
            'score': self.score,
            'completedAt': self.completed_at.isoformat() if self.completed_at else None,
        }
    
    def __repr__(self):
        return f'<LessonProgress user={self.user_id} lesson={self.lesson_id}>'
