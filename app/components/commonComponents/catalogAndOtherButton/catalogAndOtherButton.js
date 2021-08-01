import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export class CatalogAndOtherButton extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, svg, color, text, onPress, notifications, longWidth, id } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={onPress} testID={`CatalogAndOtherButton${id}ID`} accessibilityLabel={`CatalogAndOtherButton${id}ID`}>
                {notifications ? (
                    <View style={styles.circle}>
                        <Text style={styles.circleText}>{notifications}</Text>
                    </View>
                ) : null}
                <View style={[styles.flex1, { flexDirection: longWidth ? 'row' : 'column' }]}>
                    <View style={longWidth ? styles.svgContainerLong : styles.svgContainer}>
                        {svg || null}
                    </View>
                    <View style={longWidth ? styles.textContainerLong : styles.textContainer}>
                        <View style={[styles.flex1, { justifyContent: longWidth ? 'center' : 'flex-start', minHeight: 10 }]}>
                            <Text style={[styles.title, { textAlign: longWidth ? 'left' : 'center', marginTop: longWidth ? 0 : 10 }]}>{title}</Text>
                        </View>
                        {text ? (
                            <View style={{ flex: 2 }}>
                                <Text style={styles.text}>{text}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                <View style={[styles.bottomLine, { backgroundColor: color }]} />
            </TouchableOpacity>
        );
    }
}