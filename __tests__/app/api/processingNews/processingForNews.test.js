
import ApiForNews from '../../../../app/api/processingNews/processingForNews';

describe('test ApiForNews', () => {
    test('isDefault is true', () => {
        let api = new ApiForNews();
        let wrapper = api.isDefoultImages("http://test//default");
        expect(wrapper).toEqual(false);
    });
    test('isDefault is true', () => {
        let api = new ApiForNews();
        let wrapper = api.isDefoultImages("http://test//");
        expect(wrapper).toEqual(true);
    });
    test('getRandomNumb no params', () => {
        let api = new ApiForNews();
        let result = api.getRandomNumb();
        expect(result).toEqual(1);
    });
});

