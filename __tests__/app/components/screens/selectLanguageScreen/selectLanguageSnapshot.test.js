import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { SelectLanguageScreen } from '../../../../../app/components/screens/selectLanguageScreen/selectLanguage';

it('create snapshot SelectLanguageScreen', () => {
    const renderer = new ShallowRenderer()
    let selectLanguageScreen = renderer.render(<SelectLanguageScreen language={"ru"} navigation={{ setParams: () => { } }}/>);
    expect(selectLanguageScreen).toMatchSnapshot();
});