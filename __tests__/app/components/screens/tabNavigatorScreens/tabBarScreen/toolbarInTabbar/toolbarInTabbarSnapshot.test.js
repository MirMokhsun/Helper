import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ToolbarInTabbar } from '../../../../../../../app/components/screens/tabNavigatorScreens/tabBarScreen/toolbarInTabbar/toolbarInTabbar';

it('create snapshot ToolbarInTabbar', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<ToolbarInTabbar
        language={"ru"}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});

