import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { Register } from './src/features/RegisterPresenter/Register';
import { Login } from './src/features/LoginPresenter/LoginPresenter';
import { Homepage } from './src/features/HomepagePresenter/Homepage';

export default function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("http://192.168.1.43:3000/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

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
