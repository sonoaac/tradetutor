"""
Test script to verify Stripe payment configuration
Run this to check if your payment system is set up correctly
"""
import os
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from app import create_app
from app.services.payment_service import PaymentService


def test_stripe_config():
    """Test Stripe configuration"""
    print("🔍 Testing Stripe Configuration...\n")
    
    app = create_app('development')
    
    with app.app_context():
        # Check environment variables
        stripe_secret = app.config.get('STRIPE_SECRET_KEY')
        stripe_public = app.config.get('STRIPE_PUBLISHABLE_KEY')
        stripe_webhook = app.config.get('STRIPE_WEBHOOK_SECRET')
        
        print("✓ Environment Variables:")
        print(f"  STRIPE_SECRET_KEY: {'✓ Set' if stripe_secret else '✗ Missing'}")
        print(f"  STRIPE_PUBLISHABLE_KEY: {'✓ Set' if stripe_public else '✗ Missing'}")
        print(f"  STRIPE_WEBHOOK_SECRET: {'✓ Set' if stripe_webhook else '✗ Missing (optional for testing)'}")
        print()
        
        if not stripe_secret or not stripe_public:
            print("❌ Error: Stripe keys not configured!")
            print("   Please add STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY to your .env file")
            print("   See PAYMENT_SETUP.md for instructions")
            return False
        
        # Test Stripe API connection
        try:
            payment_service = PaymentService()
            payment_service._get_stripe_key()
            
            # Try to list products to verify API key works
            products = payment_service.stripe.Product.list(limit=5)
            
            print("✓ Stripe API Connection: Success")
            print(f"  Found {len(products.data)} products in your Stripe account")
            print()
            
            # Check if price IDs are configured
            print("✓ Price IDs Configuration:")
            price_ids = payment_service.PRICE_IDS
            
            for key, price_id in price_ids.items():
                if price_id.startswith('price_'):
                    # Check if this looks like a real Stripe price ID
                    if len(price_id) > 20:
                        print(f"  {key}: ✓ Configured ({price_id[:15]}...)")
                    else:
                        print(f"  {key}: ⚠ Placeholder - needs real Stripe price ID")
                else:
                    print(f"  {key}: ✗ Invalid format")
            
            print()
            print("✅ Stripe is configured correctly!")
            print()
            print("Next steps:")
            print("1. Create products and prices in Stripe Dashboard")
            print("2. Update price IDs in app/services/payment_service.py")
            print("3. Start the server and test at http://localhost:5173/pricing")
            print()
            print("See PAYMENT_SETUP.md for detailed instructions.")
            
            return True
            
        except Exception as e:
            print(f"❌ Stripe API Error: {str(e)}")
            print("   Check your STRIPE_SECRET_KEY is correct")
            return False


if __name__ == '__main__':
    print("=" * 60)
    print("Trade Tutor - Payment System Configuration Test")
    print("=" * 60)
    print()
    
    success = test_stripe_config()
    
    sys.exit(0 if success else 1)
