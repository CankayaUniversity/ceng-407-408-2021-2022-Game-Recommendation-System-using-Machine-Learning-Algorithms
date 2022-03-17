import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, TextInput } from 'react-native';
import { Register } from './src/Utils/features/RegisterPresenter/Register';
import { Login } from './src/Utils/features/LoginPresenter/LoginPresenter';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        {/* <Register /> */}
        <Login></Login>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#00bcd4",
  },
});
