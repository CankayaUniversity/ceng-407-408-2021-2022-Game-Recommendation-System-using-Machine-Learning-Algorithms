import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { SquareButton } from "../../Utils/SquareButton";

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [retypedPassword, setRetypedPassword] = useState(null);

  async function register() {
    if (String(password).length < 6) {
      alert("Passwords must be at least 6 characters");
      return;
    }
    if (new String(password.toString()).valueOf() != new String(retypedPassword.toString()).valueOf()) {
      alert("Passwords do not match!");
      return;
    }
    if (!email) {
      alert("Email cannot be empty.");
      return;
    } if (!password) {
      alert("Please enter your password.");
      return;
    }
    if (!retypedPassword) {
      alert("Please re-enter your password.");
      return;
    }


    const response = fetch("http://192.168.1.43:3000/register", {
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


    if((await response).ok) {
      console.log("Response Worked")
      navigation.navigate("Homepage");
    } else {
      alert("Email already exists");
    }



  }

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <TextInput onChangeText={setEmail} label="E-mail" autoComplete="email" />
        <TextInput onChangeText={setPassword} label="Password" secureTextEntry />
        <TextInput onChangeText={setRetypedPassword} label="Re-type Password" secureTextEntry />

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
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    // justifyContent:"center",
    alignItems: "center"
  }
});