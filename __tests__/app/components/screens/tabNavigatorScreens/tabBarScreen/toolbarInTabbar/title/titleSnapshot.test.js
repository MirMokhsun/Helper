import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Title } from '../../../../../../../../app/components/screens/tabNavigatorScreens/tabBarScreen/toolbarInTabbar/title/title';

it('create snapshot ToolbarInTabbar', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<Title
        pageName={'Help'}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});