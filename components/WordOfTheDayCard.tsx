import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Animated, Dimensions } from "react-native";
import PlayIcon from "../assets/play.svg";


export default function WordOfTheDayCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.word}>عَطِب</Text>

       <View style={styles.topRow}></View>
        <Pressable style={styles.playBtn}>
         <PlayIcon width={20} height={20} />

        </Pressable>
      </View>

      <Text style={styles.definition}>عَطَل – تَلَف</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0E6B6D",
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
  },

  cardHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    
  },

  word: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    textAlign:"right",
    

  },

  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#589197",
    alignItems: "center",
    justifyContent: "center",
      transform: [{ translateY: 7 }],
  },

  playIcon: {
    width: 18,
    height: 18,
    resizeMode: "center",
  
    

   
  },

  definition: {
    marginTop: 10,
    color: "#A1EFB3",
    textAlign: "right",
  },
  topRow:{
    flexDirection: "row-reverse",
    alignItems :"center",
    justifyContent:"flex-end",
    gap :8,
  }
});
