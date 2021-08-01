import React, { PureComponent } from 'react';
import { View, Animated, Easing, I18nManager } from 'react-native';
import { styles } from './styles';
import TimeFrameButton from './timeFrameButton/timeFrameButton';
import { buttonWidth } from './timeFrameCharts.api';
import { RequestTecnivalAnalize } from '../../../../../api/setRequestTechnicalAnalize/setRequestTechnicalAnalize';
import store from '../../../../../redux/store/store';

const initialDataArray = [{ H: 1, L: 1, O: 1, C: 1, T: 0 }];
const zoom = { scaleX: 20, scaleY: 1, xValue: 300, yValue: 1, axisDependency: 'RIGHT' };
const zeroZoom = { scaleX: 0, scaleY: 0, xValue: 0, yValue: 0, axisDependency: 'RIGHT' };
const animationDuration = 100;

export class TimeFrameCharts extends PureComponent {
    constructor(props) {
        super(props);
        this.arrMultiple = I18nManager.isRTL ? [0, -1, -2, -3, -4, -5] : [0, 1, 2, 3, 4, 5];
        this.state = {
            leftDistance: new Animated.Value(buttonWidth * this.arrMultiple[3]),
            buttonFrame: {
                Minute: false,
                Minute5: false,
                Minute30: false,
                Hour: true,
                Day: false,
                Week: false,
            },
            currentDistance: 0
        };
        this.requestTechnical = new RequestTecnivalAnalize();
    };

    animation = (_toDistance, _fromDistane) => {
        const { leftDistance } = this.state;
        Animated.timing(
            leftDistance,
            {
                fromValue: _fromDistane,
                toValue: _toDistance,
                duration: animationDuration,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
    };

    getDistance = (frame) => {
        let distance = null;
        switch (frame) {
            case 'Minute':
                distance = buttonWidth * this.arrMultiple[0];
                break;
            case 'Minute5':
                distance = buttonWidth * this.arrMultiple[1];
                break;
            case 'Minute30':
                distance = buttonWidth * this.arrMultiple[2];
                break;
            case 'Hour':
                distance = buttonWidth * this.arrMultiple[3];
                break;
            case 'Day':
                distance = buttonWidth * this.arrMultiple[4];
                break;
            case 'Week':
                distance = buttonWidth * this.arrMultiple[5];
                break;
            default:
                /* code */
                break;
        }
        return distance;
    };

    changeFrame = async (frame) => {
        try {
            const { cleanDatesArr } = this.props;
            const { currentDistance } = this.state;
            const distance = await this.getDistance(frame);
            await this.animation(distance, currentDistance);
            await this.setState({ currentDistance: distance });
            await this.setActiveButton(frame);
            await this.sendReqeust(frame);
            await cleanDatesArr();
        } catch (error) {
            console.log();
        }
    };

    setActiveButton = (frame) => {
        const buttonFrame = {
            Minute: false,
            Minute5: false,
            Minute30: false,
            Hour: false,
            Day: false,
            Week: false,
        };
        if (frame) {
            buttonFrame[frame] = true;
        };
        this.setState({ buttonFrame });
    };

    sendReqeust = async (frame) => {
        const { ID, setZoomCharts } = this.props;
        store.getState().candlesFunc.func(initialDataArray);
        setZoomCharts(zeroZoom);
        try {
            await this.requestTechnical.getCandelsFromServer(ID, frame);
            await this.requestTechnical.sendMassegeWebSoket(ID, frame);
            await setTimeout(() => {
                setZoomCharts(zoom);
            }, 0);
        } catch (error) {
        };
    };

    render() {
        const { local } = this.props;
        const { leftDistance, buttonFrame: { Minute, Minute5, Minute30, Hour, Day, Week } } = this.state;
        return (
            <View style={styles.container} >
                <Animated.View style={[styles.sliderInToogle, { transform: [{ translateX: leftDistance }] }]} ></Animated.View>
                <TimeFrameButton id={'Minute'} text={'1' + local['min']} isActive={Minute} setFrameFunction={this.changeFrame} frame={'Minute'} />
                <TimeFrameButton id={'Minute5'} text={'5' + local['min']} isActive={Minute5} setFrameFunction={this.changeFrame} frame={'Minute5'} />
                <TimeFrameButton id={'Minute30'} text={'30' + local['min']} isActive={Minute30} setFrameFunction={this.changeFrame} frame={'Minute30'} />
                <TimeFrameButton id={'Hour'} text={'1' + local['Hour']} isActive={Hour} setFrameFunction={this.changeFrame} frame={'Hour'} />
                <TimeFrameButton id={'Day'} text={'1' + local['Day']} isActive={Day} setFrameFunction={this.changeFrame} frame={'Day'} />
                <TimeFrameButton id={'Week'} text={'1' + local['Week']} isActive={Week} setFrameFunction={this.changeFrame} frame={'Week'} />
            </View>
        );
    };
}

export default TimeFrameCharts;