import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import AppNavigator from './src/features/Navigation';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
        <AppNavigator></AppNavigator>
    </SafeAreaView>
  );
}
