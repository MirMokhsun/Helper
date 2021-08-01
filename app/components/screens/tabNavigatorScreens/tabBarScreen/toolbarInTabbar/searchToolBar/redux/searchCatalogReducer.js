const initialState = {
    filterCatalogText: "",
};

export default function searchCatalog(state = initialState, action) {
    const { type, text } = action;
    switch (type) {
        case 'SET_SEARCH_CATALOG_TEXT':
            return {
                ...state,
                filterCatalogText: text,
            };
        default:
            return state;
    }
}