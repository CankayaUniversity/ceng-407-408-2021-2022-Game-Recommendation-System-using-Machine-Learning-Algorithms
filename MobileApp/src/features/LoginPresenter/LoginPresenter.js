import React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { RoundedButton } from "../../Utils/RoundedButton";

export const Login = () => (
    <View style={styles.view}>
        <TextInput label="UserName/E-Mail"></TextInput>
        <TextInput label="Password" secureTextEntry></TextInput>
        <View style={styles.button}>
            <RoundedButton title="Sign-up" />
            <RoundedButton title="Login" />
        </View>
    </View>
)

const styles = StyleSheet.create({
    view: {
        padding: 20,
        justifyContent: "center",
        paddingTop: 50,
        flex: .36,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        justifyContent: "space-between",
    }
});