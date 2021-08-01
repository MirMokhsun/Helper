export function setCurrentLanguage(data) {
    const type = `SET_LANGUAGE_${data.toUpperCase()}`;
    return dispatch => {
        return dispatch({
            type,
        });
    };
}