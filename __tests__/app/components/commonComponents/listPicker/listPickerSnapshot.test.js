import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ListPicker } from '../../../../../app/components/commonComponents/listPicker/listPicker';

it('create snapshot ListPicker', () => {
    const renderer = new ShallowRenderer()
    let listPicker = renderer.render(<ListPicker />);
    expect(listPicker).toMatchSnapshot();
});