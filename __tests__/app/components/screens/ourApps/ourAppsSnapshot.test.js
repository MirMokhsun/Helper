import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { OurAppsScreen } from '../../../../../app/components/screens/ourApps/ourApps';



it('create snapshot OurAppsScreen', () => {
    const renderer = new ShallowRenderer()
    let ourAppsScreen = renderer.render(<OurAppsScreen navigation={{ setParams: () => { } }} language={'ru'}/>);
    expect(ourAppsScreen).toMatchSnapshot();
});