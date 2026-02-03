"""API blueprint - market data, quotes, candles"""
from flask import Blueprint, request, jsonify
from app.services.market_data import MarketDataService
from app.extensions import limiter

api_bp = Blueprint('api', __name__)
market_service = MarketDataService()


@api_bp.route('/market/candles/<symbol>', methods=['GET'])
@limiter.limit("30 per minute")
def get_candles(symbol):
    """Get historical candles for a symbol"""
    timeframe = request.args.get('timeframe', '1d')
    limit = int(request.args.get('limit', 120))
    
    candles = market_service.get_candles(symbol, timeframe=timeframe, limit=limit)
    
    return jsonify({
        'symbol': symbol.upper(),
        'candles': candles
    }), 200


@api_bp.route('/market/quote/<symbol>', methods=['GET'])
@limiter.limit("60 per minute")
def get_quote(symbol):
    """Get current quote for a symbol"""
    quote = market_service.get_quote(symbol)
    
    return jsonify(quote), 200


@api_bp.route('/assets/search', methods=['GET'])
@limiter.limit("30 per minute")
def search_assets():
    """Search for tradeable assets"""
    query = request.args.get('q', '')
    asset_class = request.args.get('class', 'all')
    
    results = market_service.search_assets(query, asset_class)
    
    return jsonify(results), 200


@api_bp.route('/market/rtt/<symbol>', methods=['GET'])
@limiter.limit("60 per minute")
def get_rtt_coaching(symbol):
    """Get RTT (RealTimeTutor) coaching signal for a symbol"""
    side = request.args.get('side', 'buy')  # 'buy' or 'sell'
    free_mode = request.args.get('free_mode', 'false').lower() == 'true'
    
    coaching = market_service.get_rtt_coaching(symbol, side, free_mode)
    
    return jsonify({
        'symbol': symbol.upper(),
        'coaching': coaching
    }), 200


@api_bp.route('/market/status', methods=['GET'])
def get_market_status():
    """Get current market status for all asset classes"""
    asset_class = request.args.get('class', 'stock')
    
    is_open, message = market_service.is_market_open(asset_class)
    
    return jsonify({
        'asset_class': asset_class,
        'is_open': is_open,
        'message': message
    }), 200

