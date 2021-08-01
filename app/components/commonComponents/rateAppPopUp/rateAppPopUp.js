/* eslint-disable no-plusplus */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import { RatePopup } from './ratePopUp/ratePopUp';
import { TopComponent } from './ratePopUp/topComponent/topComponent';
import Utils from '../../../api/utils/utils';

export class RateAppPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.whenShowPopUp = [6, 20, 30];
        this.state = {
            isShowPopUp: false,
            openAppCounter: 0,
            newState: null,
            is10SecondsPassed: false,
        }
    };

    closePopUp = () => {
        this.setState({ isShowPopUp: false });
    }

    mountingRateAppPopUp = (string) => {
        const rateAppObject = JSON.parse(string);

        if (!Utils.chackIsObjectEmpty(rateAppObject)) { // если обект не пуст
            if (!rateAppObject.isClientRateApp) { // и клиент не оценил его
                setTimeout(() => {
                    const newState = this.createNewState(rateAppObject);
                    this.setState({ newState, is10SecondsPassed: true });
                }, 10000);
            }
        }
    }

    writeDataRate = async () => {
        try {
            const { newState } = this.state;
            if (newState) {
                this.setState(newState);
                await AsyncStorage.setItem('@rateApp:key', JSON.stringify(newState));
            }
        } catch (error) {

        }
    }

    firstMountingRateAppPopUp = async () => {
        try {
            const rateAppData = {
                isShowPopUp: false,
                openAppCounter: 1,
                showPopUpcounter: 0,
                isClientRateApp: false,
            };
            await AsyncStorage.setItem('@rateApp:key', JSON.stringify(rateAppData));
        } catch (error) {

        }
    }

    componentDidUpdate() {
        const { is10SecondsPassed, newState, openAppCounter } = this.state;
        if (openAppCounter === 0 && is10SecondsPassed && newState) {
            this.writeDataRate();
        }
    }

    componentDidMount = async () => {
        try {
            await AsyncStorage.getItem('@rateApp:key').then((obj) => {
                if (obj) {
                    this.mountingRateAppPopUp(obj);
                } else {
                    this.firstMountingRateAppPopUp();
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }

    createNewState = (rateAppObject) => {
        const _openAppCounter = ++rateAppObject.openAppCounter;
        const { showPopUpcounter } = rateAppObject;
        const _isShowPopUp = this.checkIfNeedToShowPopUp(_openAppCounter, showPopUpcounter);
        const _showPopUpcounter = this.checkIfPopUpShown(_isShowPopUp, showPopUpcounter);
        const _isClientRateApp = false;

        return {
            isShowPopUp: _isShowPopUp,
            openAppCounter: _openAppCounter,
            showPopUpcounter: _showPopUpcounter,
            isClientRateApp: _isClientRateApp,
        }
    }

    checkIfNeedToShowPopUp = (_openAppCounter, showPopUpcounter) => {
        let isShowPopUp = false;
        for (let i = showPopUpcounter; i < this.whenShowPopUp.length; ++i) {
            if (this.whenShowPopUp[i] === _openAppCounter) {
                isShowPopUp = true;
            }
        }
        return isShowPopUp;
    }

    checkIfPopUpShown = (_isShowPopUp, _showPopUpcounter) => {
        let showPopUpcounter = _showPopUpcounter;
        if (_isShowPopUp) {
            ++showPopUpcounter;
        }
        return showPopUpcounter;
    }

    clientRatedApp = async () => {
        try {
            await AsyncStorage.setItem('@rateApp:key', JSON.stringify({
                isShowPopUp: false,
                openAppCounter: 0,
                showPopUpcounter: 0,
                isClientRateApp: true,
            }));
            this.closePopUp();
        } catch (error) {

        }
    }

    render() {
        const { CurrentLanguage } = this.props;
        const { isShowPopUp } = this.state;
        return (
            <Modal
                visible={isShowPopUp}
                animationType="fade"
                transparent
                onRequestClose={this.closePopUp}
            >
                <RatePopup
                    width="90%"
                    topComponent={<TopComponent
                        title={CurrentLanguage["Liked the application"]}
                        sendText={CurrentLanguage['sendBtnText']}
                        placeholderText={CurrentLanguage["Leave a comment"]}
                        closeFunc={this.clientRatedApp}
                        errorText={CurrentLanguage["10 characters minimum"]}
                    />}
                    backgroundFunction={this.closePopUp}
                    textBtn={CurrentLanguage["Remind me later"]}
                    functionBtn={this.closePopUp}
                />
            </Modal>
        );
    }
}