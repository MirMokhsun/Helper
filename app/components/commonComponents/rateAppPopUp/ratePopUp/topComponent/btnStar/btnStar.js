import React from 'react';
import { TouchableOpacity } from 'react-native';
import StarGreen from './StarGreen';
import StarGray from './StarGray';


export class BtnStar extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            isChecked,
            func,
        } = this.props;
        return (
            <TouchableOpacity onPress={func} style={{ width: 32, height: 32, marginHorizontal: 9 }} >
                {isChecked ? <StarGreen width={30} height={30} color="#1459D2" /> : <StarGray width={30} height={30} color="#1459D2" />}
            </TouchableOpacity>
        );
    }
}
