describe('Validation Registration', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });




    it('check Validation Registration', async () => {
        await expect(element(by.id('InputFirstNameRegistrationID'))).toBeVisible();
        await expect(element(by.id('InputLastNameRegistrationID'))).toBeVisible();
        await expect(element(by.id('InputEmailRegistrationID'))).toBeVisible();
        await expect(element(by.id('InputPhoneRegistrationID'))).toBeVisible();
        await element(by.id('InputPhoneRegistrationID')).typeText('123');
        await element(by.id('InputEmailRegistrationID')).typeText('123');
        await element(by.id('InputFirstNameRegistrationID')).typeText('!');
        await element(by.id('InputLastNameRegistrationID')).typeText('!');
        await element(by.id('InputFirstNameRegistrationID')).tapAtPoint({ x: 0, y: -20 });        
        await expect(element(by.id('FirstNameErrorRegostrationID'))).toBeVisible();
        await expect(element(by.id('LastNameErrorRegostrationID'))).toBeVisible();
        await expect(element(by.id('EmailErrorRegostrationID'))).toBeVisible();
        await expect(element(by.id('PhoneErrorRegostrationID'))).toBeVisible();
    
    });


});