import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export const Register = () => (
    <View styles={styles.container}>
        <TextInput label="Username" />
        <TextInput label="Password" secureTextEntry />
        <TextInput label="Re-type Password" secureTextEntry />
        <TextInput label="E-mail" secureTextEntry />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 100,
    },
  });