import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from 'react-native-svg';
import ratingStars from "../../../assets/ratingStars";

export const Homepageitems = ({ games = {} }) => {
    const {
        name = "Some Game",
        photo = ["http://www.tto.cankaya.edu.tr/wp-content/uploads/2013/11/logo.png"],
        rating = "5",
    } = games;

    const ratingArray = Array.from(new Array(Math.floor(rating)));
    for(var i = 0; i < ratingArray.length; i++) {
        ratingArray[i] = i;
    }
    return (
        <TouchableOpacity activeOpacity={0.8}>
            <Card elevation={5} style={styles.card}>
                <Card.Cover key={name} style={styles.cover} source={{ uri: photo[0] }} />
                <Text style={styles.title}>{name}</Text>
                <View style={styles.rating}>
                    {ratingArray.map(item => (
                        <SvgXml xml={ratingStars} width={20} height={20} key={item}></SvgXml>
                    ))}
                </View>
            </Card>
        </TouchableOpacity >

    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
    },
    cover: { padding: 20, backgroundColor: "white" },
    title: { padding: 16 },
    rating: {
        flexDirection: "row",
        // alignItems: "flex-end"
    },
});