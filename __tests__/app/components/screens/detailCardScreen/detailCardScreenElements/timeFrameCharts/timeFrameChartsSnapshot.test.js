import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import { localization } from '../../../../../../../app/common/localization';
import { TimeFrameCharts } from '../../../../../../../app/components/screens/detailCardScreen/detailCardScreenElements/timeFrameCharts/timeFrameCharts';

describe('TimeFrameCharts', () => {
    test('Create snapshot TimeFrameCharts', () => {
        const renderer = new ShallowRenderer()
        let timeFrameCharts = renderer.render(<TimeFrameCharts local={localization.ru} />);
        expect(timeFrameCharts).toMatchSnapshot();
    });
    test.each([
        ['Minute', 0],
        ['Minute5', 111.16666666666667],
        ['Minute30', 222.33333333333334],
        ['Hour', 333.5],
        ['Day', 444.6666666666667],
        ['Week', 555.8333333333334],
    ])('test function getDistance with parametr %s', (frame, expected) => {
        let timeFrameCharts = renderer.create(<TimeFrameCharts local={localization.ru} />);
        let getDistance = timeFrameCharts.getInstance().getDistance;
        let result = getDistance(frame);
        expect(result).toEqual(expected);
    });
    test('test function setActiveButton', () => {
        let timeFrameCharts = renderer.create(<TimeFrameCharts local={localization.ru} />);
        let setActiveButton = timeFrameCharts.getInstance().setActiveButton;
        expect(timeFrameCharts.getInstance().state.buttonFrame.Minute30).toEqual(false);
        setActiveButton('Minute30');
        expect(timeFrameCharts.getInstance().state.buttonFrame.Minute30).toEqual(true);
    });
    test('test function changeFrame', () => {
        let timeFrameCharts = renderer.create(<TimeFrameCharts local={localization.ru} />);
        let changeFrame = timeFrameCharts.getInstance().changeFrame;
        changeFrame('Minute5').then(
            () => {
                expect(timeFrameCharts.getInstance().state.buttonFrame.Minute5).toEqual(true);
            }
        );
    });
});