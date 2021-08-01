import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import { TimeFrameButton } from '../../../../../../../../app/components/screens/detailCardScreen/detailCardScreenElements/timeFrameCharts/timeFrameButton/timeFrameButton';

describe('TimeFrameButton', () => {
    test('Create snapshot TimeFrameButton with props isActive={false}', () => {
        const renderer = new ShallowRenderer()
        let timeFrameButton = renderer.render(<TimeFrameButton text={'1min'} isActive={false} setFrameFunction={() => { }} frame={'Minute'} />);
        expect(timeFrameButton).toMatchSnapshot();
    });
    test('Create snapshot TimeFrameButton with props isActive={true}', () => {
        const renderer = new ShallowRenderer()
        let timeFrameButton = renderer.render(<TimeFrameButton text={'1min'} isActive={true} setFrameFunction={() => { }} frame={'Minute'} />);
        expect(timeFrameButton).toMatchSnapshot();
    });
    test('test function changeFrame', () => {
        let frame = 'Minute';
        const setFrameFunction = () => {
            frame = 'Hour';
        };
        let timeFrameButton = renderer.create(<TimeFrameButton text={'1min'} isActive={false} setFrameFunction={setFrameFunction} frame={frame} />);
        timeFrameButton.getInstance().changeFrame();
        expect(frame).toEqual('Hour');
    });
});