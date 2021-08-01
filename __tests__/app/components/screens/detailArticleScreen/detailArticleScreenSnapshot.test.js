import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { DetailArticleScreen } from '../../../../../app/components/screens/detailArticleScreen/detailArticleScreen';

let mock = {
    "state": {
        "params": {
            "language": 'ru',
            "isFaq": true,
            "index": 5,
        }
    },
    setParams: () => { }
}

it('create snapshot DetailArticleScreen', () => {
    const renderer = new ShallowRenderer()
    let detailArticleScreen = renderer.render(<DetailArticleScreen navigation={mock} language={'ru'} />);
    expect(detailArticleScreen).toMatchSnapshot();
});