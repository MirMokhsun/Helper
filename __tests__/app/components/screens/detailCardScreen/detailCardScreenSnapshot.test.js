import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { DetailCardScreen } from '../../../../../app/components/screens/detailCardScreen/detailCardScreen';

const mock = {
    FullName: 'sad',
    Ask: 0.0545,
    Bid: 0.445
}

let navigation = {
    "state": {
        "params": {

        }
    },
    setParams: () => { }
}

it('create snapshot DetailCardScreen', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<DetailCardScreen
        setCardItem={() => { }}
        setRegistrationPhoneCode={() => { }}
        cardItem={mock}
        language={'ru'}
        navigation={navigation}
        recomendation={{Summary:''}}
        pivotPoint={{Pivot:'123456'}}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});
