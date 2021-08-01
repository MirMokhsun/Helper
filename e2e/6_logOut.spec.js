describe('Log Out', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });


    it('check Log Out ', async () => {
        await element(by.text('Other')).tap();
        await expect(element(by.id('CatalogAndOtherButtonexitID'))).toBeVisible();
        await element(by.id('CatalogAndOtherButtonexitID')).tap();
        await expect(element(by.id('leftBtnPopupID'))).toBeVisible();
        await element(by.id('leftBtnPopupID')).tap();
        await expect(element(by.id('ButtonSubmitRegistrationID'))).toBeVisible();

    });



});
