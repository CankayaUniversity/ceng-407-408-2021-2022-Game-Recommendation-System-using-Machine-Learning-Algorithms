import React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { SquareButton } from "../../Utils/SquareButton";

export const Login = () => (
    <View style={styles.view}>
        <TextInput label="UserName/E-Mail"></TextInput>
        <TextInput label="Password" secureTextEntry></TextInput>
        <View style={styles.button}>
            <SquareButton title="Sign-up" size={80}/>
            <SquareButton title="Login" size={80}/>
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