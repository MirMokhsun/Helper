describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });


  it('check open Specification screen ', async () => {
    // await expect(element(by.id('BtnAuthorizationInRegistrationID'))).toBeVisible();
    // await element(by.id('BtnAuthorizationInRegistrationID')).tap();
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
    await expect(element(by.id('CardItemCAC40'))).toBeVisible();
    await element(by.id('CardItemCAC40')).tap();

    await expect(element(by.id('TimeFrameButtonMinuteID'))).toBeVisible();
    await expect(element(by.id('TimeFrameButtonMinute5ID'))).toBeVisible();
    await expect(element(by.id('TimeFrameButtonMinute30ID'))).toBeVisible();
    await expect(element(by.id('TimeFrameButtonHourID'))).toBeVisible();
    await expect(element(by.id('TimeFrameButtonDayID'))).toBeVisible();
    await expect(element(by.id('TimeFrameButtonWeekID'))).toBeVisible();
    await expect(element(by.id('ChartsToogleID'))).toBeVisible();

    await element(by.id('TimeFrameButtonMinuteID')).tap();
    await element(by.id('TimeFrameButtonMinute5ID')).tap();
    await element(by.id('TimeFrameButtonMinute30ID')).tap();
    await element(by.id('TimeFrameButtonHourID')).tap();
    await element(by.id('TimeFrameButtonDayID')).tap();
    await element(by.id('TimeFrameButtonWeekID')).tap();

    await element(by.id('ChartsToogleID')).tap();

  });




});
