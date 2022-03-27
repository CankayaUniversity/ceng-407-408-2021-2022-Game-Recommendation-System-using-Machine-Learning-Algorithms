import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { Homepageitems } from "./Homepageitems";



export const Homepage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Searchbar placeholder="Search Games"
                />
                <Homepageitems></Homepageitems>
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
        flex: 0.6,
        flexDirection: "column",
        justifyContent: "space-between"
    },
});