import React, {useEffect } from 'react';

export function StockChart({ stock }) {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            new window.TradingView.widget({
                'container_id': 'tv_chart',
                'autosize': true,
                'symbol': stock.symbol,
                'timezone': 'Europe/Bucharest',
                'theme': 'light',
                'style': '3',
                'toolbar_bg': '#f1f3f6',
                'withdateranges': true,
                'hide_side_toolbar': false,
                'allow_symbol_change': true,
                'save_image': false,
                'hideideas': true,
                'interval': '1',
                overrides: {
                    'mainSeriesProperties.areaStyle.color1': '#34C8C1',
                    'mainSeriesProperties.areaStyle.color2': '#34C8C1',
                    'mainSeriesProperties.areaStyle.linecolor': '#34C8C1'
                }
            });
        };

    }, [stock.symbol]);

    return (
        <div>
            <div id="tv_chart" style={{height: '500px', maxWidth: '100%', marginTop:'10px'}}></div>
        </div>
    );
}

export default StockChart;