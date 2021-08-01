describe('Favorites', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });


  it('check Add Favorites ', async () => {
    // await expect(element(by.id('BtnAuthorizationInRegistrationID'))).toBeVisible();
    // await element(by.id('BtnAuthorizationInRegistrationID')).tap();
    // console.log("Aut screen")
    // await expect(element(by.id('InputEmailAutorizationID'))).toBeVisible();
    // await expect(element(by.id('InputPasswordWithSVGID'))).toBeVisible();
    // await element(by.id('InputEmailAutorizationID')).replaceText('testviktoriya@gmail.com');
    // await element(by.id('InputPasswordWithSVGID')).replaceText('123qwe');
    // await expect(element(by.id('BtnShowPassAuthorizationID'))).toBeVisible();
    // await element(by.id('BtnShowPassAuthorizationID')).tap();
    // await element(by.id('BtnShowPassAuthorizationID')).tap();
    // await expect(element(by.id('ButtonSubmitAutorizationID'))).toBeVisible();
    // await element(by.id('ButtonSubmitAutorizationID')).tap();
    await expect(element(by.id('CatalogAndOtherButtonIndexID'))).toBeVisible();
    await element(by.id('CatalogAndOtherButtonIndexID')).tap();
    await expect(element(by.id('CardItemFavoritCAC40'))).toBeVisible();
    await element(by.id('CardItemFavoritCAC40')).tap();
    await device.pressBack()

    await expect(element(by.id('CatalogAndOtherButtonFavoritesID'))).toBeVisible();
    await element(by.id('CatalogAndOtherButtonFavoritesID')).tap();
    await expect(element(by.id('CardItemCAC40'))).toBeVisible();

  });




});
