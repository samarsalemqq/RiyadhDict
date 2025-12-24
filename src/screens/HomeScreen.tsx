import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />

        <View style={styles.headerIcons}>
          <Pressable style={styles.iconBtn}>
            <Image
              source={require("../../assets/icon_headphone.png")}
              style={styles.iconImg}
            />
          </Pressable>

          <Pressable style={styles.iconBtn}>
            <Image
              source={require("../../assets/icon_bell.png")}
              style={styles.iconImg}
            />
          </Pressable>

          <Pressable style={styles.iconBtn}>
            <Image
              source={require("../../assets/icon_menu.png")}
              style={styles.iconImg}
            />
          </Pressable>
        </View>
      </View>

      {/* محتوى تحت الهيدر (مؤقت عشان تشوفينها) */}
      <View style={{ padding: 16 }}>
       <View style={styles.rowItem}>
  <Image
    source={require("../../assets/iconrow.png")}
    style={styles.rowIcon}
  />
  <Text style={styles.rowText}>كلمات حروف</Text>
</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  header: {
    backgroundColor: "#2F7E82",
    padding: 60,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 59,
    height: 29,
    resizeMode: "contain",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
    marginLeft: "auto",
  },

  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  iconImg: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  rowItem:{
    flexDirection:"row",
    alignItems: "center",
    gap:8,
  },
  rowIcon:{
    width: 40,
    height:40,
    resizeMode: "contain",
  },
  rowText:{
    fontSize: 25,
    color: "#000",
      fontWeight: "bold",


  },

});
