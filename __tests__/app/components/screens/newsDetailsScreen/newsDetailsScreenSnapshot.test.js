import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { NewsDetailsScreen } from '../../../../../app/components/screens/newsDetailsScreen/newsDetailsScreen';

const mockNews = [{
    Channels: [{ ID: 36, Name: "Umarkets" }],
    Comments: "https://news.umarkets.org/feed/En/surplus-budget-uk-reached-in-january-historical-record",
    CommentsLanguage: ["https://news.umarkets.org/feed/Ru/surplus-budget-uk-reached-in-january-historical-record", "https://news.umarkets.org/feed/Ar/surplus-budget-uk-reached-in-january-historical-record", "https://news.umarkets.org/feed/Pl/surplus-budget-uk-reached-in-january-historical-record"],
    Creator: "EvgeniaT",
    Description: "The UK budget surplus in January reached a record size and, according to the British Office for National Statistics, amounted to 14 billion 900 million pounds. Revenues to the budget increased in annual terms by 9.8%. This was facilitated by an increase in income tax collections amid record-breaking low ...",
    Encoded: "The UK budget surplus in January reached a record size and, according to the British Office for National Statistics, amounted to 14 billion 900 million pounds. Revenues to the budget increased in annual terms by 9.8%. This was facilitated by an increase in income tax collections amid record-breaking low unemployment. In addition, VAT revenues increased due to higher consumer spending. In January, there was a decrease in budget expenditures by 3% and a fall in public debt by 17%. Following the results of 10 months of the fiscal year, which ends in March, the British budget deficit reached the minimum level of 18 billion 200 million pounds in 18 years, having decreased by 47% over the year. At the end of January, the national debt of the country has decreased to the lowest since May 2012, to 74% of GDP.",
    ID: 47322,
    Image: "https://media-news.umarkets.org/admin/img/01929726-bf22-4e7f-ae5d-cb531ca2408d",
    Lang: { Code: "En", ID: 2 },
    Name: "English",
    Link: "https://www.umarkets.org/en/news/surplus-budget-uk-reached-in-january-historical-record",
    PublishDate: 1550820994,
    Tags: [{ ID: 11, Name: "Forex" }, { ID: 10, Name: "Economic" }],
    Title: "UK budget surplus hit record high in January"
}];

it('create snapshot NewsDetailsScreen', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<NewsDetailsScreen
        id={47322}
        language={"ru"}
        navigation={{ navigate: () => { }, setParams: () => { }, state: { params: 'test' } }}
        news={mockNews}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});
