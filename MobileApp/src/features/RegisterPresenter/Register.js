import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { SquareButton } from "../../Utils/SquareButton";
const gender = ['Male', 'Female', 'Other'];

export const Register = () => {
  return (
    <View style={styles.view}>
      <TextInput label="Username" />
      <TextInput label="Password" secureTextEntry />
      <TextInput label="Re-type Password" secureTextEntry />
      <TextInput label="E-mail" />
      <View  style={styles.button}>
        <SquareButton title="Register" size={80}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    padding: 20,
    paddingTop: 50,
    flex: 0.6,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    // justifyContent:"center",
    alignItems: "center"
  }
});