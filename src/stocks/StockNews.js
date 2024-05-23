import React, { useEffect } from 'react';

export function StockNews(stock) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
        script.async = true;
        script.innerHTML = JSON.stringify({
            "feedMode": "all_symbols",
            "container_id": "tv_news",
            "height": 600,
            "width": "100%",
            "locale": "en",
            "colorTheme": "light",
            "isTransparent": false
        });

        document.getElementById('tv_news').appendChild(script);
    }, []);

    return (
        <div id="tv_news" className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget" style={{marginBottom:'0px'}}></div>
        </div>
    );
}

export default StockNews;