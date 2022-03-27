import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './LoginPresenter/LoginPresenter';
import { Register } from './RegisterPresenter/Register';
import { Homepage } from './HomepagePresenter/Homepage';

const { Navigator, Screen } = createStackNavigator();


const AppNavigator = () => {

    return (
        <NavigationContainer >
            <Navigator headerShown="false" initialRouteName='Login'>
                <Screen styles={styles.container} name="Login" component={Login}></Screen>
                <Screen name="Register" component={Register}></Screen>
                <Screen name="Homepage" component={Homepage}></Screen>
            </Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#ff0000",
    },

});
export default AppNavigator;