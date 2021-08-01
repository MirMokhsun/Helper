describe('Validation Autorization', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });
    it('check Validation Autorization', async () => {
        await expect(element(by.id('BtnAuthorizationInRegistrationID'))).toBeVisible();
        await element(by.id('BtnAuthorizationInRegistrationID')).tap();
        await expect(element(by.id('InputEmailAutorizationID'))).toBeVisible();
        await expect(element(by.id('InputPasswordWithSVGID'))).toBeVisible();
        await element(by.id('InputPasswordWithSVGID')).replaceText('123');
        await element(by.id('InputEmailAutorizationID')).replaceText('123');
        await element(by.id('InputEmailAutorizationID')).tap();
        await element(by.id('InputPasswordWithSVGID')).tap();
        await element(by.id('InputEmailAutorizationID')).tap();
        await expect(element(by.id('InputErrorEmailAutorizationID'))).toBeVisible();
        await expect(element(by.id('InputPasswordWithSVGErrorID'))).toBeVisible();
        
    });

});  