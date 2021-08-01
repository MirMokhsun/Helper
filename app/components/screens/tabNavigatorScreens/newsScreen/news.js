/* eslint-disable react/no-string-refs, no-unused-expressions, react/no-did-update-set-state */
import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ApiForNews from '../../../../api/processingNews/processingForNews';
import SmallNew from './smallNew/smallNew';
import NewsChanelPicker from './newsChanelPicker/newsChanelPicker';
import Utils from '../../../../api/utils/utils';
import { localization } from '../../../../common/localization';
import { setNewsAction } from './redux/setNewsAction';
import News from '../../../commonComponents/svg/News';
import { arrayClosedDefaultImages } from './images/defaultClosedImages/arrayClosedDefaultImages';
import { isUndefinedReturnSecondParam } from '../../../../api/isUndefinedReturnSecondParam/isundefinedreturnsecondparam';
import { config } from '../../../../api/config';

const { width } = Utils.size;
const { setTextAlign } = Utils;

export class NewsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: isUndefinedReturnSecondParam(navigation.state.params, 'pageTitle', 'News'),
        tabBarIcon: ({ focused }) => {
            return focused ? <News color="#1459D2" /> : <News color="#000756" />;
        },
    });

    constructor(props) {
        super(props)
        this.newsObj = new ApiForNews();
        this.countWords = 20;
        this.countRandom = 20;
        const { language } = props;
        this.state = {
            newsComponents: null,
            currentTextAlign: setTextAlign(language)
        }
    }

    componentWillMount() {
        const { navigation, language } = this.props;
        navigation.setParams({ pageTitle: localization[language].News });
    }

    componentDidMount() {
        const { language, chanel } = this.props;
        this.getNewsByNewProps(language, chanel);
    }

    UNSAFE_componentWillReceiveProps({ language, chanel }) {
        const { language: newLanguage, chanel: newChanel } = this.props;
        if (chanel !== newChanel || language !== newLanguage) {
            this.getNewsByNewProps(language, chanel);
        }
    }

    componentDidUpdate(prevProps) {
        const { navigation, language } = this.props;
        if (language !== prevProps.language) {
            navigation.setParams({ pageTitle: localization[language].News });
            this.setState({ currentTextAlign: setTextAlign(language) });
        }
    }

    getNewsByNewProps = (language, chanel) => {
        this.newsObj.__callFeach(`${config.links.NEWS_DOMEN}feed/filter/full/?lang=${language}&notags=true&channels=${chanel}&count=30&size=large`, this.getNews);
    }

    getNews = (objectsNews) => {
        let newsComponents = null; let defaultImages = null; let randomNumb = 1;
        const { currentTextAlign } = this.state;
        if (objectsNews) {
            const { language, setNewsAction } = this.props;
            newsComponents = [];

            for (const key in objectsNews) {
                const date = this.newsObj.selectLocationData(language, objectsNews[key].PublishDate);
                const urlImajes = objectsNews[key].Image;
                const isDefoultImages = this.newsObj.isDefoultImages(urlImajes);
                const cutTextNews = this.newsObj.getTwentyWords(objectsNews[key].Description, this.countWords);
                if (!isDefoultImages) {
                    randomNumb = this.newsObj.getRandomNumb(this.countRandom);
                    defaultImages = arrayClosedDefaultImages[randomNumb];
                }
                newsComponents.push(
                    <SmallNew
                        scrollView={this.refs.scrollView}
                        id={objectsNews[key].ID}
                        randomNumb={randomNumb}
                        key={key}
                        image={isDefoultImages ? <Image source={{ uri: urlImajes }} resizeMode="stretch" style={styles.imageStyle} /> : defaultImages}
                        textNews={cutTextNews}
                        timeNews={date}
                        currentTextAlign={currentTextAlign}
                    />
                );
            }
            this.setState({ newsComponents });
            setNewsAction(objectsNews);
        }
    }

    render() {
        const { navigation } = this.props;
        const { newsComponents } = this.state;
        return (
            <View style={styles.wrapper}>
                <NewsChanelPicker navigation={navigation} />
                <View style={styles.container}>
                    <ScrollView ref="scrollView" contentContainerStyle={{ width }}>
                        {newsComponents}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    news: state.setNews.news,
    language: state.currentLanguage.language,
    chanel: state.newsChanel.chanel,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    setNewsAction
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);