import 'react-native';
import React from 'react';
import { TopComponent } from '../../../../../../../app/components/commonComponents/rateAppPopUp/ratePopUp/topComponent/topComponent';
import renderer from 'react-test-renderer';

describe('TopComponent', () => {
    it('create snapshot TopComponent isShowTextarea false', () => {
        let topComponent = renderer.create(<TopComponent />);
        expect(topComponent.toJSON()).toMatchSnapshot();

        topComponent.getInstance().setState({ numberOfStars: 1 });
        expect(topComponent.toJSON()).toMatchSnapshot();
    });
    it('create snapshot TopComponent isShowTextarea true', () => {
        let topComponent = renderer.create(<TopComponent />);
        topComponent.getInstance().setState({ isShowTextarea: true });
        expect(topComponent.toJSON()).toMatchSnapshot();

        topComponent.getInstance().setState({ isShowError: true });
        expect(topComponent.toJSON()).toMatchSnapshot();
    });
    it('test function setCommentText ', () => {
        let topComponent = renderer.create(<TopComponent />).getInstance();
        let text = 'some text';
        topComponent.setCommentText(text);
        expect(topComponent.state.commentText).toEqual(text);
    });
    it('test function setNumberOfStars  ', () => {
        let topComponent = renderer.create(<TopComponent />).getInstance();
        let text = 'some text';
        topComponent.setNumberOfStars(5);
        expect(topComponent.state.numberOfStars).toEqual(5);
    });
});