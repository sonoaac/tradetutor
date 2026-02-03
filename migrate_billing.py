"""
Database migration to add billing tables and update user model.

Run this after creating the new billing.py model:
    python migrate_billing.py
"""
import os
import sys
from app import create_app, db
from app.models import User, BillingAccount, BillingSubscription, BillingEvent


def migrate_billing_tables():
    """Create new billing tables and update user table"""
    
    app = create_app()
    
    with app.app_context():
        print("🔄 Starting billing migration...")
        
        # Create all new tables
        print("📋 Creating billing tables...")
        db.create_all()
        print("   ✅ billing_accounts")
        print("   ✅ billing_subscriptions")
        print("   ✅ billing_events")
        
        # Update existing users to have new fields
        print("\n👥 Updating existing users...")
        users = User.query.all()
        
        for user in users:
            # Set tier_source if not set
            if not hasattr(user, 'tier_source') or user.tier_source is None:
                user.tier_source = 'none'
            
            # Migrate old tier values
            if user.tier == 'gold':
                user.tier = 'pro'
                print(f"   ⚡ Updated {user.email}: gold → pro")
            elif user.tier == 'premium':
                user.tier = 'pro'
                print(f"   ⚡ Updated {user.email}: premium → pro")
            
            # If user has premium_until, set tier_expires_at
            if user.premium_until and not hasattr(user, 'tier_expires_at'):
                user.tier_expires_at = user.premium_until
                print(f"   📅 Set expiration for {user.email}")
        
        db.session.commit()
        
        print(f"\n✅ Migration complete!")
        print(f"   Users updated: {len(users)}")
        print(f"\n📊 Database schema ready for Stripe + PayPal integration")


if __name__ == "__main__":
    try:
        migrate_billing_tables()
    except Exception as e:
        print(f"\n❌ Migration failed: {str(e)}")
        sys.exit(1)
