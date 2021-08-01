import { getUrl } from "../../../../app/api/getUrlForLinkTraidingApp/getUrlForLinkTraidingApp";

const mockPlatform = OS => {
    jest.resetModules();
    jest.doMock("Platform", () => ({ OS, select: objs => objs[OS] }));
};

describe('test func returnObjectLength', () => {
    test.each([
        ["ru", "android", 'https://go.onelink.me/app/49612676'],
        ["en", "android", 'https://go.onelink.me/app/183a0576'],
        ["es", "android", 'https://go.onelink.me/app/300c1339'],
        ["ar", "android", 'https://go.onelink.me/app/908402bd'],
    ])('test function getUrl with mockPlatform', (lang, platform, result) => {
        mockPlatform(platform);
        let res = getUrl(lang, platform);
        expect(res).toEqual(result);
    });   
});