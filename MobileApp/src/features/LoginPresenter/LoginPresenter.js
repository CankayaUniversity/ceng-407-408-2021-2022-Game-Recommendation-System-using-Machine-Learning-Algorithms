import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SquareButton } from "../../Utils/SquareButton";



export const Login = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    function navigateToRegister() {
        navigation.navigate("Register");
    }

    async function login() {
        if (!email) {
            alert("Email cannot be empty");
        }
        if (!password) {
            alert("Please specify 6 character password");
        }

        const response = fetch("http://192.168.1.43:3000/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": String(email),
                "password": String(password)
            })

        })

        if ((await response).ok) {
            console.log("Succesfully Logined")
            navigation.navigate("Homepage");
        } else {
            alert("User not found");
        }
    }

    return (
        <KeyboardAvoidingView
        
            style={styles.container} 
        >
            <View style={styles.view}>
                <TextInput label="UserName/E-Mail" onChangeText={setEmail}></TextInput>
                <TextInput label="Password" secureTextEntry onChangeText={setPassword}></TextInput>
                <View style={styles.button}>
                    <SquareButton onPress={navigateToRegister} title="Sign-up" size={80} />
                    <SquareButton onPress={login} title="Login" size={80} />
                </View>
                <View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff0000",

    },
    view: {
        padding: 20,
        justifyContent: "center",
        paddingTop: 20,
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