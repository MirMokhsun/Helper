import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AskSpredBidLine } from '../../../../../../../app/components/screens/detailCardScreen/detailCardScreenElements/askSpredBidLine/askSpredBidLine';

it('create snapshot AskSpredBidLine', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<AskSpredBidLine ask={0.9454} bid={0.9545} language={'ru'} />
    );
    expect(toolbarSnapshot).toMatchSnapshot();
});