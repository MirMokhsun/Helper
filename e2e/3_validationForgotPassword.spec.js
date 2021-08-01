describe('Validation Forgot Password', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });


    it('check Validation Forgot Password', async () => {
        await expect(element(by.id('BtnAuthorizationInRegistrationID'))).toBeVisible();
        await element(by.id('BtnAuthorizationInRegistrationID')).tap();
        await expect(element(by.id('ForgotPasswordAuthorizationID'))).toBeVisible();
        await element(by.id('ForgotPasswordAuthorizationID')).tap();
        await expect(element(by.id('InputEmailForgotPasswordID'))).toBeVisible();
        await element(by.id('InputEmailForgotPasswordID')).tap();
        await element(by.id('InputEmailForgotPasswordID')).typeText('123');
        await element(by.id('InputEmailForgotPasswordID')).tapAtPoint({ x: 50, y: -20 });
        await expect(element(by.id('EmailErrorRegostrationID'))).toBeVisible();
    });


});  