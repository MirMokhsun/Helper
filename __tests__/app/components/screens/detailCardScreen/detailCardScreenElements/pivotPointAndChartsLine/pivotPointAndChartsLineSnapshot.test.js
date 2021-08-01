import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { PivotPointAndChartsLine } from '../../../../../../../app/components/screens/detailCardScreen/detailCardScreenElements/pivotPointAndChartsLine/pivotPointAndChartsLine';

it('create snapshot PivotPointAndChartsLine', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<PivotPointAndChartsLine pivotPoint={'0.981390'} />
    );
    expect(toolbarSnapshot).toMatchSnapshot();
});