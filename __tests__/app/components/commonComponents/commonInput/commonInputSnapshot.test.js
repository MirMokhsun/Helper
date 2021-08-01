import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CommonInput } from '../../../../../app/components/commonComponents/commonInput/commonInput';
import renderer from 'react-test-renderer';

describe('CommonInput', () => {
    it('create snapshot CommonInput', () => {
        const render = new ShallowRenderer();
        let commonInputSnapshot = render.render(<CommonInput
            errorText={'errorFirstName'}
            filter={/$/}
            action={() => { }}
            isValid={true}
        />);
        expect(commonInputSnapshot).toMatchSnapshot();
    });
    it('test function onBlur', () => {
        let commonInput = renderer.create(<CommonInput isValid={false} currentLanguageName={'ar'} />);
        commonInput.getInstance().onBlur();
        expect(commonInput.getInstance().state.isShowWarning).toEqual(true);
        expect(commonInput.toJSON()).toMatchSnapshot();

        let commonInputIsValid = renderer.create(<CommonInput isValid={true} />).getInstance();
        commonInputIsValid.onBlur();
        expect(commonInputIsValid.state.isShowWarning).toEqual(false);
    });
    it('test function checkValue', () => {
        let commonInput = renderer.create(<CommonInput
            errorText={'errorFirstName'}
            filter={/.{6,}/}
            action={() => { }}
            isValid={false}
            currentLanguageName={'ar'}
        />);
        commonInput.getInstance().checkValue('some');
        commonInput.getInstance().checkValue('some-text');
        expect(commonInput.getInstance().state.isShowWarning).toEqual(false);
        expect(commonInput.toJSON()).toMatchSnapshot();
    });
});