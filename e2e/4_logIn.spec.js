describe('LogIn', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });


  it('check LogIn', async () => {
    await expect(element(by.id('BtnAuthorizationInRegistrationID'))).toBeVisible();
    await element(by.id('BtnAuthorizationInRegistrationID')).tap();
    await expect(element(by.id('InputEmailAutorizationID'))).toBeVisible();
    await expect(element(by.id('InputPasswordWithSVGID'))).toBeVisible();
    await element(by.id('InputEmailAutorizationID')).replaceText('testviktoriya@gmail.com');
    await element(by.id('InputPasswordWithSVGID')).replaceText('123qwe');
    await expect(element(by.id('BtnShowPassAuthorizationID'))).toBeVisible();
    await element(by.id('BtnShowPassAuthorizationID')).tap();
    await element(by.id('BtnShowPassAuthorizationID')).tap();
    await expect(element(by.id('ButtonSubmitAutorizationID'))).toBeVisible();
    await element(by.id('ButtonSubmitAutorizationID')).tap();
    await expect(element(by.id('CatalogAndOtherButtonCurrencyID'))).toBeVisible();
    await expect(element(by.id('CatalogAndOtherButtonCommodityID'))).toBeVisible();
    await expect(element(by.id('CatalogAndOtherButtonIndexID'))).toBeVisible();
    await expect(element(by.id('CatalogAndOtherButtonStockID'))).toBeVisible();
    await expect(element(by.id('CatalogAndOtherButtonFavoritesID'))).toBeVisible();

  });



});    
