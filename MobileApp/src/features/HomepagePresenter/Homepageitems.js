import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
export const Homepageitems = ({ games = {} }) => {
    const {
        name = "Some Game",
        photo = ["http://www.tto.cankaya.edu.tr/wp-content/uploads/2013/11/logo.png"],
        rating = "5",
    } = games;

    return (
        <TouchableOpacity activeOpacity={0.8}>
            <Card elevation={5} style={styles.card}>
                <Card.Cover key={name} style={styles.cover} source={{ uri:photo[0] }} />
                <Text>{name}</Text>
                <Text>{rating}</Text>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
    },
    cover: { padding: 20, backgroundColor: "white" }
});