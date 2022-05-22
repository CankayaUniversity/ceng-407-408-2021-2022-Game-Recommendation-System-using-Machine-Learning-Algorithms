import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from 'react-native-svg';
import ratingStars from "../../../assets/ratingStars";

export const Homepageitems = ({ games = {} }) => {
    // const {
    //     name = "Top 10 Games",
    //     rating = "5",
    // } = games;

    // const ratingArray = Array.from(new Array(Math.floor(rating)));
    // for(var i = 0; i < ratingArray.length; i++) {
    //     ratingArray[i] = i;
    // }
    const getArticlesFromApi = async () => {
        fetch('http://192.168.1.43:3000/homepage')
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
    return (
        <TouchableOpacity activeOpacity={0.8}>
            <Card elevation={5} style={styles.card}>
                <Card.Cover key={name} style={styles.cover} />
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
// Search Bar
function SearchBar({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
  
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };
  
    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    };
  
    return (
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a className="dataItem" href={value.link} target="_blank">
                  <p>{value.title} </p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
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