import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { Rating } from "react-native-ratings";
import { Card, List } from "react-native-paper";
import { SquareButton } from "../../Utils/SquareButton";
import "../RegisterPresenter/UserLikedGames";
import { getGamesDict } from "../../Utils/Utils";
import Modal from "react-native-modal";
export const Homepage = ({ navigation }) => {
  [isLoading, setLoading] = useState(true);
  [gamesList, setGamesList] = useState([]);
  dict = getGamesDict();
  function navigatoToRecommendation() {
    navigation.navigate("Recommendations");
  }

  const getArticlesFromApi = async () => {
    fetch("http://192.168.1.44:3000/gettopn")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        Object.entries(json).forEach((entry) => {
          const [key, value] = entry;
          gamesList.push(value);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const list = () => {
    return gamesList.map((gameName) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={gameName}
          onPress={() => {
            Alert.alert(
              "",

              dict[gameName]["description"] + "\n\n" + dict[gameName]["link"]
            );
          }}
        >
          <Card elevation={5} style={styles.card} key={gameName}>
            <Card.Cover
              key={gameName}
              style={styles.cover}
              source={{ uri: dict[gameName]["image"] }}
            />
            <Text style={styles.title}>{gameName}</Text>
          </Card>
        </TouchableOpacity>
      );
    });
  };

  useEffect(() => {
    getArticlesFromApi();
  }, []);
  return (
    <View style={styles.container}>
      <SquareButton
        onPress={navigatoToRecommendation}
        title={"Recommendations"}
      />
      <Text style={styles.text}>Top 10 Popular Games</Text>
      <ScrollView>
        {isLoading ? <ActivityIndicator /> : <View>{list()}</View>}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#ff0000",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  cover: { padding: 20, backgroundColor: "white" },
  title: { padding: 16 },
  rating: {
    flexDirection: "row",
  },
  text: {
    padding: 15,
    color: "white",
    fontSize: 20,
    alignContent: "center",
    justifyContent: "center",
  },
});
