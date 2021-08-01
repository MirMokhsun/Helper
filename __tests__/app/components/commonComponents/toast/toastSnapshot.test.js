import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Toast } from "../../../../../app/components/commonComponents/toast/toast";

it('create snapshot Toast', () => {
    const renderer = new ShallowRenderer()
    let toast = renderer.render(<Toast />);
    expect(toast).toMatchSnapshot();
});

it('create snapshot Toast', () => {
    const renderer = new ShallowRenderer()
    let toast = renderer.render(<Toast {...{toastText: 'bla bla bla', isVisibleToast: 'true'}} />);
    expect(toast).toMatchSnapshot();
});
