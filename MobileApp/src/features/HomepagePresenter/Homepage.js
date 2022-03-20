import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Searchbar } from "react-native-paper";
import { Homepageitems } from "./Homepageitems";



export const Homepage = () => {
    return (
        <View style={styles.view}>
            <Searchbar placeholder="Search Games"
            />
            <Homepageitems></Homepageitems>
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
});