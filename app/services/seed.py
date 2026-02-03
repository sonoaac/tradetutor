"""Database seeding utilities"""
from app import create_app
from app.extensions import db
from app.models.lesson import Lesson


def seed_lessons():
    """Seed initial lesson data"""
    app = create_app()
    
    with app.app_context():
        # Check if lessons already exist
        if Lesson.query.count() > 0:
            print("Lessons already seeded")
            return
        
        lessons = [
            {
                'title': 'Trading Basics: What is a Trade?',
                'slug': 'trading-basics',
                'description': 'Learn the fundamentals of what a trade is and how markets work.',
                'content': '# Trading Basics\n\nA trade is...',
                'track': 'general',
                'difficulty': 'beginner',
                'order': 1
            },
            {
                'title': 'Understanding Risk and Reward',
                'slug': 'risk-and-reward',
                'description': 'Master the concept of risk/reward ratios in trading.',
                'content': '# Risk and Reward\n\nEvery trade has risk...',
                'track': 'general',
                'difficulty': 'beginner',
                'order': 2
            },
            {
                'title': 'Stock Market Fundamentals',
                'slug': 'stock-fundamentals',
                'description': 'Introduction to stock trading and market mechanics.',
                'content': '# Stocks\n\nStocks represent ownership...',
                'track': 'stocks',
                'difficulty': 'beginner',
                'order': 3
            },
            {
                'title': 'Cryptocurrency Trading Intro',
                'slug': 'crypto-intro',
                'description': 'Get started with crypto trading basics.',
                'content': '# Cryptocurrency\n\nCrypto is digital currency...',
                'track': 'crypto',
                'difficulty': 'beginner',
                'order': 4
            },
            {
                'title': 'Forex Market Overview',
                'slug': 'forex-overview',
                'description': 'Learn about currency pair trading.',
                'content': '# Forex\n\nForex is the largest market...',
                'track': 'forex',
                'difficulty': 'beginner',
                'order': 5
            }
        ]
        
        for lesson_data in lessons:
            lesson = Lesson(**lesson_data)
            db.session.add(lesson)
        
        db.session.commit()
        print(f"Seeded {len(lessons)} lessons")


if __name__ == '__main__':
    seed_lessons()
