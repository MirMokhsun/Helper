import { Image } from 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { SmallNew } from '../../../../../../../app/components/screens/tabNavigatorScreens/NewsScreen/smallNew/smallNew';
import { navigation } from '../../../../../../../__mocks__/data/navigation';

it('create snapshot SmallNew', () => {
    const image = <Image source={require("../../../../../../../app/components/screens/tabNavigatorScreens/newsScreen/images/defaultClosedImages/1.jpg")} resizeMode={"stretch"} style={{}} />;
    const textNews = "cutTextNews";
    const timeNews = "10:27 12 октября, 2018";

    const renderer = new ShallowRenderer();
    const smallNew = renderer.render(<SmallNew image={null}
        textNews={textNews}
        timeNews={timeNews}
        id={1}
        randomNumb={1}
        navigation={navigation}
        currentTextAlign={'auto'}
        setNewsDetails={() => { }}
        scrollView={scrollTo => { }}
    />);
    expect(smallNew).toMatchSnapshot();
});