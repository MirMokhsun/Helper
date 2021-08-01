import { StyleSheet } from 'react-native';
import Utils from '../../../api/utils/utils';

export const styles = StyleSheet.create({
    scrollview: {
        width: "100%",
    },
    wrapperAbsolute: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: '#E5E5E5',
    },
    container: {
        width: "90%",
        minHeight: Utils.size.height * 0.5, // 50% need for IphoneX
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 20,
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        lineHeight: 32,
        fontSize: 22,
        textAlign: 'center',
        color: '#000756',
        marginVertical: 25,
    },
    backgroundBlue: {
        position: 'absolute',
        top: -50,
        left: 0
    },
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: '100%',
        marginVertical: 20,
    },
    buttonGoBack: {
        width: 25,
        height: 25,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonGoBackWrapper: {
        width: '100%',
        height: 25,
        justifyContent: 'flex-start',
        marginBottom: 10,
        marginTop: Utils.isIphoneX ? 50 : 20,
    }
})