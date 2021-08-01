export function setStackNavigator(stackNav) {
    return (dispatch) => {
        return dispatch({
            type: 'SET_STACKNAV',
            stackNav
        })
    }
}