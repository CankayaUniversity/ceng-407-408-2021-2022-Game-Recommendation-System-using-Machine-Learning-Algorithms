import React, { useEffect, useState } from "react";
import {
  ImageBackground,
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
const image = { uri: "https://media.discordapp.net/attachments/918607256080240711/980187276153851934/bg.jpg" };

export const Recommendations = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [gamesList, setGamesList] = useState([]);
  const dict = getGamesDict();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getArticlesFromApi = async () => {
    fetch("http://192.168.1.44:3000/login")
      .then((response) => response.json())
      .then((json) => {
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

  function WrapperComponent(description, link) {
    return (
      <View>
        <Modal key={description}>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
  }

  const list = () => {
    return gamesList.map((gameName) => {
      return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
        </ImageBackground>
      );
    });
  };

  useEffect(() => {
    getArticlesFromApi();
  }, []);

  return (
    <ImageBackground source={image} style={styles.container}>
      <ScrollView>
        {isLoading ? <ActivityIndicator /> : <View>{list()}</View>}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center"
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
});