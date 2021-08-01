import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { WarningInputText } from '../../../../../../app/components/commonComponents/commonInput/commonInputElements/warningInputText';
import renderer from 'react-test-renderer';

describe('WarningInputText', () => {
    it('create snapshot WarningInputText', () => {
        const renderer = new ShallowRenderer();
        let warningInputText = renderer.render(<WarningInputText maxWidth={260} isShowWarningText={true} text={'errorText'} testID={'textErrorID'} />);
        expect(warningInputText).toMatchSnapshot();
    });
    describe('test componentWillReceiveProps', () => {
        it('test with next props isShowWarningText: true', () => {
            let warningInputText = renderer.create(<WarningInputText maxWidth={260} isShowWarningText={true} text={'errorText'} testID={'textErrorID'} />).getInstance();
            let nextProps = {
                isShowWarningText: true,
                text: 'some text',
            };
            expect(warningInputText.state.warningInputText).toBeNull();
            warningInputText.componentWillReceiveProps(nextProps);
            let warningInputTextState = renderer.create(warningInputText.state.warningInputText);
            expect(warningInputTextState).not.toBeNull();
            expect(warningInputTextState).toMatchSnapshot();
        });
        it('test with next props isShowWarningText: false', () => {
            let warningInputText = renderer.create(<WarningInputText maxWidth={260} isShowWarningText={true} text={'errorText'} testID={'textErrorID'} />).getInstance();
            let nextProps = {
                isShowWarningText: false,
                text: 'some text',
            };
            expect(warningInputText.state.warningInputText).toBeNull();
            warningInputText.componentWillReceiveProps(nextProps);
            let warningInputTextState = renderer.create(warningInputText.state.warningInputText);
            expect(warningInputTextState).not.toBeNull();
            expect(warningInputTextState).toMatchSnapshot();

        });
    });
});