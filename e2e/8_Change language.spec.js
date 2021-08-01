describe('Change Language', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('check Change Language ', async () => {
    await expect(element(by.id('BtnAuthorizationInRegistrationID'))).toBeVisible();
    await element(by.id('BtnAuthorizationInRegistrationID')).tap();
    await expect(element(by.id('InputEmailAutorizationID'))).toBeVisible();
    await expect(element(by.id('InputPasswordWithSVGID'))).toBeVisible();
    await element(by.id('InputEmailAutorizationID')).replaceText('testviktoriya@gmail.com');
    await element(by.id('InputPasswordWithSVGID')).replaceText('123qwe');
    await expect(element(by.id('ButtonSubmitAutorizationID'))).toBeVisible();
    await element(by.id('ButtonSubmitAutorizationID')).tap();
    await expect(element(by.text('Other'))).toBeVisible();
    await element(by.text('Other')).tap();
    await expect(element(by.id('CatalogAndOtherButtonLanguagePreferenceID'))).toBeVisible();
    await element(by.id('CatalogAndOtherButtonLanguagePreferenceID')).tap();
    await expect(element(by.id('ListPickerSelectLanguageESID'))).toBeVisible();
    await element(by.id('ListPickerSelectLanguageESID')).tap();
    await element(by.id('ListPickerSelectLanguageRUID')).tapAtPoint({ x: 10, y: -10 });
    await expect(element(by.text('Noticias'))).toBeVisible();
    await element(by.text('Noticias')).tap();

  });
});  