describe('Forgot Password', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('check Forgot Password', async () => {
    await expect(element(by.id('BtnAuthorizationInRegistrationID'))).toBeVisible();
    await element(by.id('BtnAuthorizationInRegistrationID')).tap();
    await expect(element(by.id('ForgotPasswordAuthorizationID'))).toBeVisible();
    await element(by.id('ForgotPasswordAuthorizationID')).tap();
    await expect(element(by.id('InputEmailForgotPasswordID'))).toBeVisible();
    await element(by.id('InputEmailForgotPasswordID')).replaceText('testviktoriya1@gmail.com');
    await element(by.id('ButtonSubmitForgotPasswordID')).tap();
    await expect(element(by.id('rightBtnPopupID'))).toBeVisible();
    await element(by.id('rightBtnPopupID')).tap();
    await element(by.id('InputEmailForgotPasswordID')).replaceText('testviktoriya@gmail.com');
    await element(by.id('ButtonSubmitForgotPasswordID')).tap();
    await expect(element(by.id('rightBtnPopupID'))).toBeVisible();
    await element(by.id('rightBtnPopupID')).tap();

    // write navigate to autorization screen after be functional
    

  });


});  