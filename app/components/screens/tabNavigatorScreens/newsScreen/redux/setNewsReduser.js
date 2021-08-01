
const initialState ={news : [{CommentRss: null,
        Comments: "https://news.umarkets.ai/feed/En/the-profitability-of-american-companies-falls",
        Creator: "EvgeniaT",
        Description: "US companies are optimistic about the year 2018, but now, against the background of trade wars, their profitability has begun to fall. And although the growth in the profitability of the S&P 500 index companies in the third quarter was 22%, the analysts' forecasts for this quarter exceeded only half of the indicator of the first quarter. In recent years, shares have been falling around the world, which is caused by both rising interest rates and a slowdown in yield growth. As reported by ...",
        Encoded: "<p>US companies are optimistic about the year 2018, but now, against the background of trade wars, their profitability has begun to fall. And although the growth in the profitability of the S&amp;P 500 index companies in the third quarter was 22%, the analysts' forecasts for this quarter exceeded only half of the indicator of the first quarter. In recent years, shares have been falling around the world, which is caused by both rising interest rates and a slowdown in yield growth. As reported by Caterpillar, due to US tariffs on steel imports and higher transportation costs, it has lost about $40 million over the past quarters. On Tuesday, its shares fell 8%. According to experts, the growth in company profitability may fall to 9% in the second quarter of 2019.</p>",
        ID: 38695,
        Image: "https://media-news.umarkets.ai/admin/img/1d3616cf-8c4d-428a-9c28-445eb57a6d83",
        Lang: {ID: 2, Name: "English", Code: "En"},
        Link: "https://www.umarkets.ai/en/news/the-profitability-of-american-companies-falls",
        PublishDate: 1540454423,
        Title: "The profitability of American companies falls"}]};

export default function setNews(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case "SET_NEW_IN_NEWSSCREEN":
            return {
                ...state,
                news: data,
            };
        default:
            return state;
    }
}