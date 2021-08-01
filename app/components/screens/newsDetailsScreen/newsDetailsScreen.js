/* eslint-disable no-plusplus */
import React from 'react';
import { View, Platform, Image, ScrollView, Text, I18nManager } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SmallClockGray from '../tabNavigatorScreens/newsScreen/smallNew/svg/smallClockGray';
import ApiForNews from '../../../api/processingNews/processingForNews';
import SmallNew from '../tabNavigatorScreens/newsScreen/smallNew/smallNew';
import Utils from '../../../api/utils/utils';
import { styles } from './styles';
import { localization } from '../../../common/localization';
import { arrayClosedDefaultImages } from '../tabNavigatorScreens/newsScreen/images/defaultClosedImages/arrayClosedDefaultImages';
import { arrayOpenDefaultOpenImages } from '../tabNavigatorScreens/newsScreen/images/defaultOpenImages/arrayOpenDefaultImages';

const { width } = Utils.size;
const { setTextAlign } = Utils;

export class NewsDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#000756',
            headerBackTitle: null,
            title: navigation.state.params ? navigation.state.params.title ? navigation.state.params.title : 'News' : 'News',
            headerTitleStyle: {
                color: '#000756',
                alignSelf: 'center',
                width: '100%',
                height: '100%',
                textAlign: "center",
                fontSize: 20,
                lineHeight: 40,
                ...Platform.select({
                    ios: {
                        paddingRight: 0,
                    },
                    android: {
                        paddingRight: I18nManager.isRTL ? 0 : 30,
                        paddingLeft: I18nManager.isRTL ? 30 : 0,
                    },
                }),
                fontFamily: 'Roboto',
                backgroundColor: "#FFFFFF",
            },
            headerStyle: {
                backgroundColor: "#FFFFFF",
                borderBottomColor: "#FFFFFF",
                ...Platform.select({
                    ios: {
                    },
                    android: {
                        marginTop: 0,
                        paddingTop: 10,
                    },
                }),
            },
            headerRight: (<View />),
        }
    };

    constructor(props) {
        super(props)
        this.newsObj = new ApiForNews();
        const { language } = this.props;
        this.state = {
            language,
            selectRenderNews: null,
            stillNews: null,
            currentTextAlign: setTextAlign(language)
        }
        this.maxCount = 5;
        this.countRandom = 20;
    }

    componentDidUpdate(prevProps) {
        const { language } = this.props;
        const { language: prevlanguage } = prevProps;

        if (language !== prevlanguage) {
            this.setState({ currentTextAlign: setTextAlign(language) });
        }
    }

    componentWillMount() {
        const { navigation, language } = this.props;
        navigation.setParams({ title: localization[language]["News"] });
    }

    selectionNews = (news, id) => {
        const result = {};
        for (const key in news) {
            if (news[key].ID === id) {
                result.selectNews = news[key];
                result.key = key;
                break;
            }
        }
        return result;
    }

    renderOpenNews = (selectNews, randomNumb) => {
        let result = null;
        let defaultImages = null;
        const { currentTextAlign, language } = this.state;
        if (selectNews) {
            const date = this.newsObj.selectLocationData( language, selectNews["PublishDate"]);
            const urlImajes = selectNews["Image"];
            const isDefoultImages = this.newsObj.isDefoultImages(urlImajes);
            if (!isDefoultImages) {
                defaultImages = arrayOpenDefaultOpenImages[randomNumb];
            }
            result = (
                <View style={styles.maincontainer}>
                    <View style={styles.imageContainner}>
                        {isDefoultImages ? <Image source={{ uri: urlImajes }} resizeMode="stretch" style={styles.imageSelectStyle} /> : defaultImages}
                    </View>
                    <View style={styles.timeNewsWrapper}>
                        <SmallClockGray />
                        <Text style={styles.timeNewsStyle}>{date}</Text>
                    </View>
                    <Text style={[styles.textNewsStyle, { textAlign: currentTextAlign }]}>{selectNews["Encoded"]}</Text>
                </View>)
        }
        return result;
    }

    renderStillNews = (news, counterIndex, maxCount, newsArrayLength) => {
        let stillNews = null; let defaultImages = null; let randomNumb = 1;
        const { currentTextAlign, language } = this.state;
        if (news && counterIndex && maxCount && newsArrayLength) {
            stillNews = [];
            while (stillNews.length !== maxCount) {
                if (counterIndex === newsArrayLength) {
                    counterIndex = 0;
                }
                const date = this.newsObj.selectLocationData( language, news[counterIndex]["PublishDate"]);
                const urlImajes = news[counterIndex]["Image"];
                const isDefoultImages = this.newsObj.isDefoultImages(urlImajes);
                const cutTextNews = this.newsObj.getTwentyWords(news[counterIndex]["Description"], 20);
                if (!isDefoultImages) {
                    randomNumb = this.newsObj.getRandomNumb(this.countRandom);
                    defaultImages = arrayClosedDefaultImages[randomNumb];
                }
                stillNews.push(
                    <SmallNew
                        scrollView={this.refs.scrollView}
                        randomNumb={randomNumb}
                        id={news[counterIndex]["ID"]}
                        key={counterIndex}
                        image={isDefoultImages ? <Image source={{ uri: urlImajes }} resizeMode="stretch" style={styles.imageStyle} /> : defaultImages}
                        textNews={cutTextNews}
                        timeNews={date}
                        currentTextAlign={currentTextAlign}
                    />
                );
                counterIndex+=1;
            }
        }
        return stillNews;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { news, id } = nextProps;
        const { randomNumb } = nextProps.navigation.state.params;
        const selectionNewsObj = this.selectionNews(news, id);
        const selectRenderNews = this.renderOpenNews(selectionNewsObj.selectNews, randomNumb);
        const stillNews = this.renderStillNews(news, ++selectionNewsObj.key, this.maxCount, news.length);
        this.setState({
            selectRenderNews,
            stillNews
        });
    }

    render() {
        const { stillNews, selectRenderNews, currentTextAlign } = this.state;
        const { language } = this.props;
        return (
            <View style={styles.wrapper}>
                <ScrollView ref="scrollView" contentContainerStyle={{ width }}>
                    <View style={styles.wrapperSelectNews} alignSelf="center">
                        {selectRenderNews}
                    </View>
                    <View style={styles.wrapperStillNews} alignSelf="center">
                        <View style={styles.stillNewsTitleWrapper}>
                            <Text style={[styles.stillNewsTitleText, { textAlign: currentTextAlign }]}>
                                {localization[language]['More news']}
                            </Text>
                        </View>
                        <View style={styles.stillNewscontainer}>
                            {stillNews}
                        </View>
                    </View>
                </ScrollView>
            </View>)
    }
}

const mapStateToProps = state => ({
    news: state.setNews.news,
    language: state.currentLanguage.language,
    id: state.setNewsDetails.id
});
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewsDetailsScreen);