import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const RoundedButton = ({
    style = {},
    textStyle = {},
    size = 100,
    ...props
}) => {
    return (
        <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
            <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = (size) => ({
    radius: {
        borderRadius: size / 2,
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: "center",
        borderColor: "white",
        borderWidth: 2
    },
    text: { color: "white", fontSize: size / 4, justifyContent: "center" },
}); 