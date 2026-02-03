"""Entitlements and tier enforcement service"""
from datetime import datetime
from typing import Dict, Any


# Tier configuration - single source of truth
TIER_CONFIG = {
    'free': {
        'simcash_start': 100,
        'max_trades': 1,  # Only 1 trade ever
        'lessons_access': 1,  # Only first lesson
        'assets_allowed': ['BTN'],  # Only Bitcoin
        'can_use_rtt': False,
        'portfolio_stats': False,
        'chart_timeframes': ['1D'],
        'analytics': False,
        'display_name': 'FREE Demo',
        'description': 'Show value first'
    },
    'starter': {
        'simcash_start': 20000,
        'max_trades': None,  # Unlimited
        'lessons_access': 6,  # All lessons
        'assets_allowed': ['SMBY', 'STRM', 'GLBL', 'OILX', 'HLTH', 'BTN', 'ETHA', 'TOP500'],  # 8 free assets
        'can_use_rtt': False,
        'portfolio_stats': True,
        'chart_timeframes': ['1D', '1W', '1M', '3M', '1Y', 'ALL'],
        'analytics': False,
        'display_name': 'STARTER Practice',
        'description': 'Best for beginners'
    },
    'pro': {
        'simcash_start': 50000,
        'max_trades': None,  # Unlimited
        'lessons_access': 6,  # All lessons
        'assets_allowed': 'all',  # All 20 assets
        'can_use_rtt': True,  # RTT coaching enabled
        'portfolio_stats': True,
        'chart_timeframes': ['1D', '1W', '1M', '3M', '1Y', 'ALL'],
        'analytics': True,
        'strategy_hints': True,
        'priority_features': True,
        'display_name': 'PRO',
        'description': 'Learn properly'
    },
    'lifetime': {
        'simcash_start': 50000,
        'max_trades': None,  # Unlimited
        'lessons_access': 6,  # All lessons
        'assets_allowed': 'all',  # All 20 assets
        'can_use_rtt': True,  # RTT coaching enabled
        'portfolio_stats': True,
        'chart_timeframes': ['1D', '1W', '1M', '3M', '1Y', 'ALL'],
        'analytics': True,
        'strategy_hints': True,
        'priority_features': True,
        'unlimited_resets': True,
        'all_future_features': True,
        'vip_status': True,
        'display_name': 'LIFETIME PRO',
        'description': 'Pay once, own forever'
    }
}


def get_user_entitlements(user) -> Dict[str, Any]:
    """
    Get user entitlements based on their tier and expiration.
    This is the single source of truth for what a user can access.
    
    Args:
        user: User model instance
        
    Returns:
        Dictionary of entitlements
    """
    # Check if tier has expired (for subscriptions)
    current_tier = user.tier or 'free'
    
    # If tier expires and has expired, downgrade to free
    if user.tier_expires_at and user.tier_expires_at < datetime.utcnow():
        current_tier = 'free'
    
    # Get tier configuration
    tier_config = TIER_CONFIG.get(current_tier, TIER_CONFIG['free'])
    
    # Return entitlements
    return {
        'tier': current_tier,
        'tier_display_name': tier_config['display_name'],
        'tier_source': user.tier_source or 'none',
        'tier_expires_at': user.tier_expires_at.isoformat() if user.tier_expires_at else None,
        
        # Trading entitlements
        'can_trade': True,  # Everyone can trade
        'max_trades': tier_config['max_trades'],
        'simcash_start': tier_config['simcash_start'],
        
        # Asset access
        'assets_allowed': tier_config['assets_allowed'],
        'can_access_asset': lambda symbol: (
            tier_config['assets_allowed'] == 'all' or 
            symbol in tier_config['assets_allowed']
        ) if isinstance(tier_config['assets_allowed'], list) else True,
        
        # Learning
        'lessons_access': tier_config['lessons_access'],
        'can_access_lesson': lambda lesson_order: lesson_order <= tier_config['lessons_access'],
        
        # Features
        'can_use_rtt': tier_config['can_use_rtt'],
        'portfolio_stats': tier_config['portfolio_stats'],
        'chart_timeframes': tier_config['chart_timeframes'],
        'analytics': tier_config.get('analytics', False),
        'strategy_hints': tier_config.get('strategy_hints', False),
        'priority_features': tier_config.get('priority_features', False),
        
        # Special perks
        'unlimited_resets': tier_config.get('unlimited_resets', False),
        'all_future_features': tier_config.get('all_future_features', False),
        'vip_status': tier_config.get('vip_status', False),
    }


def can_access_asset(user, symbol: str) -> bool:
    """Check if user can access a specific asset"""
    entitlements = get_user_entitlements(user)
    assets_allowed = entitlements['assets_allowed']
    
    if assets_allowed == 'all':
        return True
    
    return symbol in assets_allowed


def can_access_lesson(user, lesson_order: int) -> bool:
    """Check if user can access a specific lesson"""
    entitlements = get_user_entitlements(user)
    return lesson_order <= entitlements['lessons_access']


def can_use_rtt(user) -> bool:
    """Check if user can use RTT coaching"""
    entitlements = get_user_entitlements(user)
    return entitlements['can_use_rtt']


def get_starting_simcash(user) -> int:
    """Get the starting SimCash amount for user's tier"""
    entitlements = get_user_entitlements(user)
    return entitlements['simcash_start']


def check_trade_limit(user, current_trade_count: int) -> bool:
    """Check if user has reached their trade limit"""
    entitlements = get_user_entitlements(user)
    max_trades = entitlements['max_trades']
    
    # None means unlimited
    if max_trades is None:
        return True
    
    return current_trade_count < max_trades
