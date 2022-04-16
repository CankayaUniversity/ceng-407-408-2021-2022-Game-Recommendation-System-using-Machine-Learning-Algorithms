import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { Homepageitems } from "./Homepageitems";
import { SquareButton } from '../../Utils/SquareButton';


export const Homepage = ({navigation}) => {

    function navigatoToRecommendation() {
        navigation.navigate("Recommendations");
    }

    return (
        <View style={styles.container}>
            <SquareButton onPress={navigatoToRecommendation} />
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