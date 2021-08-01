import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ChartsToogle } from '../../../../../../../app/components/screens/detailCardScreen/detailCardScreenElements/chartsToogle/ChartsToogle';

it('create snapshot AskSpredBidLine', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<ChartsToogle />);
    expect(toolbarSnapshot).toMatchSnapshot();
});