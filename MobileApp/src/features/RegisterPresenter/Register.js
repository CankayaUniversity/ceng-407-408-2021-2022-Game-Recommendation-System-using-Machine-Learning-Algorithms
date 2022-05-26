import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { SquareButton } from "../../Utils/SquareButton";

import { Picker } from '@react-native-picker/picker';

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [retypedPassword, setRetypedPassword] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  

  async function register() {
    if (String(password).length < 6) {
      alert("Passwords must be at least 6 characters");
      return;
    }
    if (new String(password.toString()).valueOf() != new String(retypedPassword.toString()).valueOf()) {
      alert("Passwords do not match!");
      return;
    }
    if (email == null) {
      alert("Email cannot be empty.");
      return;
    } if (password == null) {
      alert("Please enter your password.");
      return;
    }
    if (retypedPassword == null) {
      alert("Please re-enter your password.");
      return;
    }

    console.log(gender);

    const response = fetch("http://192.168.1.44:3000/register", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": String(email),
        "username": String(username),
        "password": String(password),
        "age": String(age),
        "gender": String(gender)
      })

    })


    if ((await response).ok) {
      console.log("Succesfully Registered")
      navigation.navigate("UserLikedGames");
    } else {
      alert("Email already exists");
    }



  }

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <TextInput onChangeText={setEmail} label="E-mail" autoComplete="email" />
        <TextInput onChangeText={setUsername} label="Username" />
        <TextInput onChangeText={setPassword} label="Password" secureTextEntry />
        <TextInput onChangeText={setRetypedPassword} label="Re-type Password" secureTextEntry />
        <TextInput onChangeText={setAge} label="Age" keyboardType='numeric' />
        <Picker
         selectedValue={gender}
          style={{ alignContent:"center", height: 50, width: 150, backgroundColor:"white" }}
          onValueChange={setGender}>
          <Picker.Item label="Male" value="m" />
          <Picker.Item label="Female" value="f" />
        </Picker>


        <View style={styles.button}>
          <SquareButton onPress={register} title="Register" size={80} />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0000",
  },
  view: {
    padding: 20,
    paddingTop: 50,
    flex: 0.8,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    // justifyContent:"center",
    alignItems: "center"
  }
});