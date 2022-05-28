import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import AppNavigator from './src/features/Navigation';
import { setGamesDict, getGamesDict } from './src/Utils/Utils';
export default function App() {
  const [gamesNameList, setGamesNameList] = useState([]);
  const [gamesImageList, setGamesImageList] = useState([]);
  const [gamesDescriptionList, setDescriptionImageList] = useState([]);
  const [gamesLinkList, setGamesLinkList] = useState([]);

  const getArticlesFromApi = async () => {
    fetch("http://192.168.1.44:3000/games")
      .then((response) => response.json())
      .then((json) => {
        json = JSON.parse(json);
        Object.entries(json.name).forEach((entry) => {
          const [key, value] = entry;
          gamesNameList.push(value);
        });
        Object.entries(json.image).forEach((entry) => {
          const [key, value] = entry;
          gamesImageList.push(value);
        });
        Object.entries(json.description).forEach((entry) => {
          const [key, value] = entry;
          gamesDescriptionList.push(value);
        });
        Object.entries(json.link).forEach((entry) => {
          const [key, value] = entry;
          gamesLinkList.push(value);
        });
        setGamesDict(gamesNameList, gamesImageList, gamesDescriptionList, gamesLinkList);
        console.log("Done fetching", gamesNameList.length, "games");

        // setGamesList(games);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    getArticlesFromApi();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
        <AppNavigator></AppNavigator>
    </SafeAreaView>
  );
}
