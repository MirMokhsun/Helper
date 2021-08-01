import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconNews from '../smallNew/svg/IconNews';
import ArrowBottom from '../smallNew/svg/arrowBottom';
import { BottomChanelPickerBtn } from './bottomChanelPickerBtn/bottomChanelPickerBtn';
import { setNewsChanel } from './redux/newsChanelAction';
import { getMaxHeightDependOnLanguage, setTitleInConstructor } from './newsChanelPickerApi';

export class NewsChanelPicker extends React.Component {
    constructor(props) {
        super(props);
        const { chanel, navigation } = this.props;
        this.state = {
            isOpened: false,
            height: new Animated.Value(45),
            minHeight: 45,
            title: setTitleInConstructor(chanel),
            isOpenedBottomBlock: false,
            chanels: null,
        }

        this.chanelArr = {
            "ru": (<View style={styles.bottomBlock}>
                <BottomChanelPickerBtn id='UMarketsnews' func={this.setChanelWithRedux} text={'UMarketsnews.com'} />
                <BottomChanelPickerBtn id={'MSNfinance'} func={this.setChanelWithRedux} text={'MSNfinance.com'} />
                <BottomChanelPickerBtn id={'Investing'} func={this.setChanelWithRedux} text={'Investing.com'} />
            </View>),
            'en': (<View style={styles.bottomBlock}>
                <BottomChanelPickerBtn id={'UMarketsnews'} func={this.setChanelWithRedux} text={'UMarketsnews.com'} />
                <BottomChanelPickerBtn id={'Investing'} func={this.setChanelWithRedux} text={'Investing.com'} />
            </View>),
            "ar": (<View style={styles.bottomBlock}>
                <BottomChanelPickerBtn id={'UMarketsnews'} func={this.setChanelWithRedux} text={'UMarketsnews.com'} />
            </View>),
            "es": (<View style={styles.bottomBlock}>
                <BottomChanelPickerBtn id={'UMarketsnews'} func={this.setChanelWithRedux} text={'UMarketsnews.com'} />
                <BottomChanelPickerBtn id={'Investing'} func={this.setChanelWithRedux} text={'Investing.com'} />
            </View>),
        }
    }

    componentWillMount() {
        const { language } = this.props;
        this.setState({ chanels: this.chanelArr[language] });
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.addListenerDidBlur = navigation.addListener('didBlur', this.closeNewsChenalPicker);
    }

    UNSAFE_componentWillReceiveProps = async (nextProps) => {
        try {
            const { language } = nextProps;
            const { language: prevLanguage, setNewsChanel } = this.props;
            if (language !== prevLanguage) {
                const { isOpened } = this.state;

                this.setState({ chanels: this.chanelArr[language], title: 'UMarketsnews.com' });
                if (isOpened) {
                    this.openNewsChanelPicker();
                }
                setNewsChanel('UMarketsnews.com');
                await AsyncStorage.setItem('@newsChanel:key', 'UMarketsnews.com');
            }
        } catch (error) {

        }
    }

    UNSAFE_componentWillUnmount() {
        this.addListenerDidBlur.remove();
    }

    closeNewsChenalPicker = () => {
        const { isOpened } = this.state;
        if (isOpened) {
            this.openNewsChanelPicker();
        }
    }

    animation = (_toHeight, _fromHeight) => {
        Animated.timing(
            this.state.height,
            {
                fromValue: _fromHeight,
                toValue: _toHeight,
                duration: 100,
                easing: Easing.linear,
            }
        ).start();
    }

    openNewsChanelPicker = () => {
        this.setState(prevState => ({ isOpenedBottomBlock: !prevState.isOpenedBottomBlock }));
        const { isOpened, minHeight } = this.state;
        const { language } = this.props;
        const maxHeight = getMaxHeightDependOnLanguage(language);
        this.setState({ isOpened: !isOpened });
        if (isOpened) {
            this.animation(minHeight, maxHeight);
        } else {
            this.animation(maxHeight, minHeight)
        }
    };

    setChanelWithRedux = async (title) => {
        try {
            const { setNewsChanel } = this.props;
            this.setState({ title });
            this.openNewsChanelPicker();
            setNewsChanel(title);
            await AsyncStorage.setItem('@newsChanel:key', title);
        } catch (error) {

        }
    }

    render() {
        const { height, title, isOpened, isOpenedBottomBlock, chanels } = this.state;
        return (
            <Animated.View style={[styles.newsChanelPicker, { height }]}>
                <TouchableWithoutFeedback onPress={this.openNewsChanelPicker} testID={`NewsChanelPickerBtnID`} accessibilityLabel={`NewsChanelPickerBtnID`}>
                    <View style={[styles.titleBtn,
                    {
                        borderTopRightRadius: isOpenedBottomBlock ? 23 : 25,
                        borderTopLeftRadius: isOpenedBottomBlock ? 23 : 25,
                        borderBottomLeftRadius: isOpenedBottomBlock ? 0 : 25,
                        borderBottomRightRadius: isOpenedBottomBlock ? 0 : 25,
                    }]} >
                        <View style={styles.svg} >
                            <IconNews />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.titleText} >{title}</Text>
                        </View>
                        <View style={[styles.svg, { transform: [{ rotate: isOpened ? '180deg' : '0deg' }] }]} >
                            <ArrowBottom />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                {chanels}
            </Animated.View>
        )
    }
}

const mapStateToProps = state => ({
    chanel: state.newsChanel.chanel,
    language: state.currentLanguage.language,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setNewsChanel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewsChanelPicker);

