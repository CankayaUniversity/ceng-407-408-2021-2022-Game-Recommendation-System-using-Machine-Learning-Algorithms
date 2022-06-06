import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Rating } from "react-native-ratings";
import { Card, List, Searchbar } from "react-native-paper";
import { SquareButton } from "../../Utils/SquareButton";
import { setGamesDict, getGamesDict } from "../../Utils/Utils.js";
import { ImageBackground } from "react-native-web";
const image = {
  uri: "https://media.discordapp.net/attachments/918607256080240711/980187276153851934/bg.jpg",
};

export const UserLikedGames = ({ navigation }) => {
  let games = [];
  const [isLoading, setLoading] = useState(true);
  const [gamesNameList, setGamesNameList] = useState([]);
  const [gamesImageList, setGamesImageList] = useState([]);
  const [gamesDescriptionList, setDescriptionImageList] = useState([]);
  const [gamesLinkList, setGamesLinkList] = useState([]);
  [isSearched, setSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  [searchList, setSearchList] = useState([]);
  dict = getGamesDict();
  var likedGamesList = new Map();

  const onChangeSearch = (query) => {
    setLoading(true);
    setSearchQuery(query);
    handleSearchedList();
  };

  function handleSearchedList() {
    searchList = [];
    for (const [key, value] of Object.entries(dict)) {
      if (key.toLowerCase().search(searchQuery.toLowerCase()) != -1) {
        searchList.push(key);
      }
    }
    setSearchList(searchList);
    setLoading(false);
  }

  function ratingAdded(rating, gameName) {
    likedGamesList.set(gameName, rating);
    console.log(likedGamesList);
  }

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
        console.log("Done fetching", gamesNameList.length, "games");

        // setGamesList(games);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }
  async function ratingCompleted() {
    console.log(likedGamesList);

    const response = fetch("http://192.168.1.44:3000/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likedGamesList: strMapToObj(likedGamesList),
      }),
    });

    if ((await response).ok) {
      console.log("Games succesfully taken");
      navigation.navigate("Homepage");
    } else {
      alert("Please rate the games you have played before");
    }
  }

  useEffect(() => {
    getArticlesFromApi();
  }, []);

  const showSearhcedList = () => {
    return searchList.map((gameName) => {
      return (
        <TouchableOpacity activeOpacity={0.8} key={gameName + "searchedOpacity"}>
          <Card elevation={5} style={styles.card} key={gameName + "searchedCard"}>
            <Card.Cover
              key={gameName + "searched"}
              style={styles.cover}
              source={{ uri: dict[gameName]["image"] }}
            />
            <Text style={styles.title}>{gameName}</Text>
            <View style={styles.rating}>
              <Rating
                defaultRating={0}
                onFinishRating={(rating) => {
                  ratingAdded(rating, gameName);
                }}
                fractions={0}
              ></Rating>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
  };

  const showGameList = () => {
    var i = -1;
    return gamesNameList.map((gameName) => {
      i++;
      return (
        <TouchableOpacity activeOpacity={0.8} key={gameName}>
          <Card elevation={5} style={styles.card} key={gameName}>
            <Card.Cover
              key={gameName}
              style={styles.cover}
              source={{ uri: gamesImageList[i] }}
            />
            <Text style={styles.title}>{gameName}</Text>
            <View style={styles.rating}>
              <Rating
                defaultRating={0}
                onFinishRating={(rating) => {
                  ratingAdded(rating, gameName);
                }}
                fractions={0}
              ></Rating>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View source={image} style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={styles.button}>
        <SquareButton
          title="✓"
          size={40}
          onPress={ratingCompleted}
          style={styles.loginBtn}
        ></SquareButton>
      </View>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : searchQuery == "" ? (
          <View>{showGameList()}</View>
        ) : (
          <View>{showSearhcedList()}</View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#ff0000",
    padding: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FF1493",
  },
  card: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  cover: { padding: 0, backgroundColor: "white" },
  title: { padding: 20 },
  rating: {
    flexDirection: "row",
  },
  cover: { padding: 20, backgroundColor: "white" },
  title: { padding: 4 },
  rating: {
    flexDirection: "row",
  },
});
