import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import { HelpScreen } from '../../../../../../app/components/screens/tabNavigatorScreens/helpScreen/help';

const mockPlatform = OS => {
    jest.resetModules();
    jest.doMock("Platform", () => ({ OS, select: objs => objs[OS] }));
};
const mockLinking = () => {
    jest.mock('Linking', () => {
        return {
            openURL: jest.fn(() => Promise.resolve('success'))
        }
    })
}

describe('Help', () => {
    test('create snapshot HelpScreen', () => {
        const renderer = new ShallowRenderer();
        let helpScreen = renderer.render(<HelpScreen language={"ru"} navigation={{ setParams: () => { } }} />);
        expect(helpScreen).toMatchSnapshot();
    });

    describe('createArrayListPickers', () => {
        test('test function createArrayListPickers ListPicker length', () => {
            let helpScreen = renderer.create(<HelpScreen language={"ru"} navigation={{ setParams: () => { } }} />).getInstance();
            expect(helpScreen.createArrayListPickers(
                'ru',
                { ru: [{ title: '', text: '' }, { title: '', text: '' }, { title: '', text: '' }, { title: '', text: '' }] },
                '').length
            ).toEqual(5);
        });

        test('test function createArrayListPickers ListPicker item value', () => {
            let helpScreen = renderer.create(<HelpScreen language={"ru"} navigation={{ setParams: () => { } }} />).getInstance();
            let getResult = helpScreen.createArrayListPickers(
                'ru',
                { ru: [{ title: 'test1', text: '' }, { title: 'test2', text: '' }, { title: 'test3', text: '' }, { title: 'test4', text: '' }] },
                '');
            let getRendered = renderer.create(getResult[2]).getInstance();
            expect(getRendered.props.text).toEqual('test2');
        });

        test('test function createArrayListPickers ListPicker filterText', () => {
            let helpScreen = renderer.create(<HelpScreen language={"en"} navigation={{ setParams: () => { } }} />).getInstance();
            let getResult = helpScreen.createArrayListPickers(
                'ru',
                { ru: [{ title: 'test1', text: '' }, { title: 'hello', text: '' }, { title: 'test3', text: '' }, { title: 'test4', text: '' }] },
                'hello');
            let getRendered = renderer.create(getResult[0]).getInstance();
            expect(getRendered.props.text).toEqual('hello');
        });
    });

    test('function toogleHelp state isFaq', () => {
        let helpScreen = renderer.create(<HelpScreen language={"ru"} navigation={{ setParams: () => { } }} />).getInstance();
        expect(helpScreen.state.isFaq).toEqual(true);
        helpScreen.toogleHelp();
        expect(helpScreen.state.isFaq).toEqual(false);
        helpScreen.toogleHelp();
        expect(helpScreen.state.isFaq).toEqual(true);
    });

    test('function goToTraidingApp mockLinking', () => {
        mockLinking();
        let helpScreen = renderer.create(<HelpScreen language={"ru"} navigation={{ setParams: () => { } }} />).getInstance();
        expect(helpScreen.goToTraidingApp()).toEqual();
    });    
})