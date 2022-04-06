import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, ScrollView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { Rating } from 'react-native-ratings';
import { Card, List } from "react-native-paper";
import { SquareButton } from '../../Utils/SquareButton';

export const UserLikedGames = ({ navigation }) => {
    let games = []
    const [isLoading, setLoading] = useState(true);
    const [gamesList, setGamesList] = useState(null);
    var likedGamesList = new Map();


    function ratingAdded(rating, gameName) {
        likedGamesList.set(gameName, rating);
        // console.log(likedGamesList);
    }

    const getArticlesFromApi = async () => {
        fetch('http://192.168.1.43:3000/games')
            .then((response) => response.json())
            .then((json) => {

                Object.entries(json.name).forEach((entry) => {
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
    function strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }
    async function ratingCompleted() {

        console.log(likedGamesList);

        const response = fetch("http://192.168.1.43:3000/games", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "likedGamesList": strMapToObj(likedGamesList),
            })

        })


        if ((await response).ok) {
            console.log("Games succesfully taken")
            navigation.navigate("Login");
        } else {
            alert("Please rate the games you have played before");
        }
    }

    useEffect(() => {
        getArticlesFromApi()
    }, [])

    const list = () => {
        return gamesList.map((gameName) => {
            return (
                <TouchableOpacity activeOpacity={0.8} key={gameName} >
                    <Card elevation={5} style={styles.card} key={gameName} >
                        <Card.Cover key={gameName} style={styles.cover} />
                        <Text style={styles.title}>{gameName}</Text>
                        <View style={styles.rating}>
                            <Rating
                                onFinishRating={(rating) => { ratingAdded(rating, gameName) }}
                                fractions={0}
                                defaultRating={1}
                            ></Rating>
                        </View>
                    </Card>
                </TouchableOpacity >
            );
        });
    };

    return (

        <View style={styles.container}>
            <View style={styles.button}>
                <SquareButton title="✓" size={40} onPress={ratingCompleted}></SquareButton>
            </View>
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