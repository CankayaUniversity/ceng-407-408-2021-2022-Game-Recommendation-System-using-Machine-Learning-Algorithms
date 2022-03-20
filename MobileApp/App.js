import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, TextInput } from 'react-native';
import { Register } from './src/features/RegisterPresenter/Register';
import { Login } from './src/features/LoginPresenter/LoginPresenter';
import { Homepage } from './src/features/HomepagePresenter/Homepage';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Homepage></Homepage>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ff0000",
  },
});
