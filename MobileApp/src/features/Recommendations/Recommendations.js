import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, ScrollView } from "react-native";
import { Rating } from 'react-native-ratings';
import { Card, List } from "react-native-paper";
import { SquareButton } from '../../Utils/SquareButton';

export const Recommendations = ({ navigation }) => {
    let games = []
    const [isLoading, setLoading] = useState(true);
    const [gamesList, setGamesList] = useState(null);



    const getArticlesFromApi = async () => {
        fetch('http://192.168.1.43:3000/login')
            .then((response) => response.json())
            .then((json) => {
                Object.entries(json.results).forEach((entry) => {
                    const [key, value] = entry;
                    games.push(value);
                });
                console.log("Done fetching", games.length, "games");
                setGamesList(games);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const list = () => {
        return gamesList.map((gameName) => {
            return (
                <TouchableOpacity activeOpacity={0.8} key={gameName} >
                    <Card elevation={5} style={styles.card} key={gameName} >
                        <Card.Cover key={gameName} style={styles.cover} />
                        <Text style={styles.title}>{gameName}</Text>
                        
                    </Card>
                </TouchableOpacity >
            );
        });
    };

    useEffect(() => {
        getArticlesFromApi()
    }, [])

    return (

        <View style={styles.container}>
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (

                    <View>
                        {list()}
                    </View>


                )
                }
            </ScrollView>
        </View>
    )

}




const styles = StyleSheet.create({

    button: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 20,
    },

    container: {
        flex: 1,
        backgroundColor: "#ff0000",
        padding: 20
    },
    card: {

        backgroundColor: "white",
        marginBottom: 20
    },
    cover: { padding: 20, backgroundColor: "white" },
    title: { padding: 16 },
    rating: {
        flexDirection: "row",
    },
});