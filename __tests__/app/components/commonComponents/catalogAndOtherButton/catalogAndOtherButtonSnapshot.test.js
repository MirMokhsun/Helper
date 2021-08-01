import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CatalogAndOtherButton } from '../../../../../app/components/commonComponents/catalogAndOtherButton/catalogAndOtherButton';

it('create snapshot CatalogAndOtherButton', () => {
    const renderer = new ShallowRenderer()
    let catalogAndOtherButton = renderer.render(<CatalogAndOtherButton />);
    expect(catalogAndOtherButton).toMatchSnapshot();
});