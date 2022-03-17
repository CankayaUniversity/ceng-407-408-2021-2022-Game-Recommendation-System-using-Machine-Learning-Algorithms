import React from "react";
import {TextInput} from "react-native-paper";
import { StyleSheet, View } from "react-native";

export const Login = () => (
    <View>
        <TextInput label="UserName/E-Mail"></TextInput>
        <TextInput label="Password" secureTextEntry></TextInput>
    </View>
)