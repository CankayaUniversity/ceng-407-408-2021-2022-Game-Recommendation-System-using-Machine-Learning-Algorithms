import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Button,
  TextInput,
  Text,
  Image,
} from "react-native";
import { SquareButton } from "../../Utils/SquareButton";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";

//import style from './register.css';
export const Register = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [retypedPassword, setRetypedPassword] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("m");
  const image = {
    uri: "https://media.discordapp.net/attachments/918607256080240711/980187276153851934/bg.jpg",
  };

  async function register() {
    if (String(password).length < 6) {
      alert("Passwords must be at least 6 characters");
      return;
    }
    if (
      new String(password.toString()).valueOf() !=
      new String(retypedPassword.toString()).valueOf()
    ) {
      alert("Passwords do not match!");
      return;
    }
    if (email == null) {
      alert("Email cannot be empty.");
      return;
    }
    if (password == null) {
      alert("Please enter your password.");
      return;
    }
    if (retypedPassword == null) {
      alert("Please re-enter your password.");
      return;
    }

    console.log(gender);

    const response = fetch("http://192.168.1.44:3000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: String(email),
        username: String(username),
        password: String(password),
        age: String(age),
        gender: String(gender),
      }),
    });

    if ((await response).ok) {
      console.log("Succesfully Registered");
      navigation.navigate("UserLikedGames");
    } else {
      alert("Email already exists");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="E-Mail"
            label="E-Mail"
            onChangeText={setEmail}
            placeholderTextColor="#003f5c"
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username"
            label="Username"
            onChangeText={setUsername}
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Re-type Password"
            label="Re-type Password"
            secureTextEntry
            onChangeText={setRetypedPassword}
            placeholderTextColor="#003f5c"
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={setAge}
            style={styles.TextInput}
            label="Age"
            placeholder="Age"
            placeholderTextColor="#003f5c"
            keyboardType="numeric"
          />
        </View>
        <Picker
          selectedValue={gender}
          style={{
            alignContent: "center",
            height: 50,
            width: 150,
            backgroundColor: "pink",
          }}
          onValueChange={setGender}
        >
          <Picker.Item label="Male" value="m" />
          <Picker.Item label="Female" value="f" />
        </Picker>
        <SquareButton
          onPress={register}
          title="Register"
          style={styles.loginBtn}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  TextInput: {
    height: 50,
    flex:1
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
