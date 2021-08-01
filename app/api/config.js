export const config = {
    links: {
        LINKS: 'https://informer.investforum.ru/promocontainer/umarkets/links.json',						
        DOMEN: 'https://api.umarkets.biz/',																	
        WS: '.umarkets.biz',																					
        DEFAULT_WS: "https://informer.investforum.ru/bal/wss/Server.ashx?command=getConnectingStr",			
        DEFAULT_WS_CONNECTION:'ws://informer.investforum.ru/wss/Server.ashx?subscriber=true',				
        SECURITIES: 'https://trading.umarkets.biz/srvgtw/marketdata/v1/securities',						
        TECH_ANALISIS: 'https://services.umarkets.biz/srvgtw/techanalysis/v1/recommendations',			
        NOTIFICATION_DOMEN: "https://pn.z3.gg/notificationApi",												
        NOTIFICATION_REG_TOKEN: "/registration/token",														
        NOTIFICATION_GET_MESSAGES: "/notification/v2/getMessages",											
        NOTIFICATION_WAS_READ: "/notification/v2/wasRead/",													
        NEWS:"https://news.investforum.ru/feed/filter/full/?lang=ru&channels=umarkets&notags=true&count=6",	
        NEWS_DOMEN:'https://news.investforum.ru/'	
    }
};