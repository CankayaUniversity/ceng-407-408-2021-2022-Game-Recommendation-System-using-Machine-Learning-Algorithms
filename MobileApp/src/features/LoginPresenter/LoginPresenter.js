import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
  View,
} from "react-native";
import { SquareButton } from "../../Utils/SquareButton";
import { StatusBar } from "expo-status-bar";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const image = {
    uri: "https://media.discordapp.net/attachments/918607256080240711/980187276153851934/bg.jpg",
  };
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

    const response = fetch("http://192.168.1.44:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: String(email),
        password: String(password),
      }),
    });

    if ((await response).ok) {
      console.log("Succesfully Logined");
      navigation.navigate("Homepage");
    } else {
      alert("User not found");
    }
  }

  return (
    <ImageBackground source={image} style={styles.container}>
      <View style={{ flex: 0.5 }}>
        <Image
          source={{uri:'https://cdn.discordapp.com/attachments/918223099181297674/982263423612092466/title.png'}}
          style={{width:700, height:220, scaleX:.4, scaleY:.5}}
        ></Image>
      </View>
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="E-Mail"
          label="UserName/E-Mail"
          onChangeText={setEmail}
          placeholderTextColor="#003f5c"
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          label="Password"
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor="#003f5c"
        ></TextInput>
      </View>
      <SquareButton onPress={login} title="LOGIN" style={styles.loginBtn} />
      <SquareButton
        onPress={navigateToRegister}
        title="SIGN UP"
        style={styles.loginBtn}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  container1: {
    flex: 1,
    backgroundColor: "#9d03fc",
    fontFamily: "Montserrat",
    includeFontPadding: 50,
  },
});
