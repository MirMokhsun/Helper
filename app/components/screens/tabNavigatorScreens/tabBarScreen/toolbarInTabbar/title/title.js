import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

export class Title extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { pageName } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text} testID="TabTitleID" accessibilityLabel="TabTitleID">{pageName}</Text>
      </View>
    );
  }
}
