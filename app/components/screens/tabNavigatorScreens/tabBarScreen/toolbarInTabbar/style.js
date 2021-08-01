import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F7',
    },
    leftEmptyView: {
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center'
    },
    rightComponent: {
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center'
    },
    flex1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchInputContent: {
      flex: 1,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: "#5A6772",
      borderRadius: 20,
      marginRight: 15,
      marginLeft: 15,
      height: 40,
      backgroundColor: 'transparent',
    },
    textInput: {
      flex: 1,
      fontFamily: 'Roboto-Light',
      fontSize: 14,
      color: '#5A6772',
      paddingHorizontal: 15,
      textDecorationLine: 'none',
    },
    textinputWithTextAlightRight: {
      flex: 1,
      fontFamily: 'Roboto-Light',
      textAlign: 'right',
      fontSize: 14,
      color: '#5A6772',
      paddingHorizontal: 15,
      textDecorationLine: 'none',
    },
  });