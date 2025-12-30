import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

import WordOfTheDayCard from "../../components/WordOfTheDayCard";
import ReadingContestSlider from "../../components/ReadingContestSlider";

import LogoIcon from "../../assets/logo.svg";
import HeadphoneIcon from "../../assets/icon_headphone.svg";
import MenuIcon from "../../assets/icon_menu.svg";
import BellIcon from "../../assets/icon_bell.svg";
import LettersIcon from "../../assets/char.svg";
import CalendarIcon from "../../assets/calendar.svg";
import NewIcon from "../../assets/Know.svg";
import SearchIcon from "../../assets/search.svg";
import MicIcon from "../../assets/Mic1.svg";

type Nav = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* ================= Header  ================= */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <LogoIcon width={50} height={50} />

          <View style={styles.headerRight}>
            <Pressable style={styles.iconBtn}>
              <HeadphoneIcon width={20} height={20} />
            </Pressable>

            <Pressable style={styles.iconBtn}>
              <BellIcon width={20} height={20} />
            </Pressable>

            <Pressable
             style={styles.iconBtn}
             onPress={() => navigation.getParent()?.navigate("MoreScreen")}
              >
              <MenuIcon width={20} height={20} />
            </Pressable>
          </View>
        </View>

        {/* ================= Search Bar ================= */}
        <View style={styles.searchBar}>
          <Pressable
            style={styles.searchIconBtn}>
            < MicIcon width={20} height={20} />
          </Pressable>

          <TextInput
            placeholder="ابحث عن كلمة"
            placeholderTextColor="rgba(0,0,0,0.45)"
            style={styles.searchInput}
            textAlign="right"
          />

          <Pressable style={styles.searchIconBtn} onPress={() => {}}>
            <SearchIcon width={30} height={30} />
          </Pressable>
        </View>
      </View>

      {/* ================= Content ================= */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ReadingContestSlider onRegisterPress={() => {}} />

        {/* ====== كلمات الحروف ====== */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.titleRow}>
              <LettersIcon width={30} height={30} />
              <Text style={styles.sectionTitleRight}>كلمات الحروف</Text>
            </View>

            <Pressable style={styles.viewAllBtn}>
              <Text style={styles.viewAll}>عرض الكل</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.lettersScroll}
            contentContainerStyle={styles.lettersContent}
          >
            {["د", "خ", "ح", "ج", "ث", "ت", "ب", "أ"].map((ch, idx) => (
              <Pressable key={`${ch}-${idx}`} style={styles.letterBox}>
                <Text style={styles.letter}>{ch}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* ====== كلمة اليوم ====== */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.titleRow}>
              <CalendarIcon width={25} height={25} />
              <Text style={styles.sectionTitleRight}>كلمة اليوم</Text>
            </View>
            <View style={{ width: 1 }} />
          </View>

          <WordOfTheDayCard />
        </View>

        {/* ====== أحدث الكلمات ====== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleRow}>
              <NewIcon width={25} height={25} />
              <Text style={styles.sectionTitleRight}>أحدث الكلمات</Text>
            </View>

            <Pressable style={styles.viewAllBtn}>
              <Text style={styles.viewAll}>عرض الكل</Text>
            </Pressable>
          </View>

          <View style={styles.latestGrid}>
            {[
              { word: "وَجاهة", desc: "منزلة وقدر" },
              { word: "مهمومة", desc: "كلام خفي غير مسموع" },
              { word: "نَزِق", desc: "سريع الغضب" },
              { word: "خَصْب", desc: "كثير الخير" },
            ].map((item, idx) => (
              <Pressable key={idx} style={styles.latestCard}>
                <Text style={styles.latestWord}>{item.word}</Text>
                <Text style={styles.latestDesc}>{item.desc}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


/* ================= Styles ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  header: {
    backgroundColor: "#2F7E82",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 18,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "column",
     gap: 14,
  },
   headerTop:{
   flexDirection:"row",
   alignItems:"center",
   justifyContent: "space-between"

 },
    logo: {
     width: 60,
     height: 30,
     resizeMode: "contain",
  },

  headerRight: {
    flexDirection: "row",
    alignItems:"center",
    gap: 5,
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


  searchBar: {
    marginTop: 20,
  height: 50,
  backgroundColor:"#fff",
  paddingHorizontal: 12,
  flexDirection: "row",
  alignItems:"center",
  borderRadius: 17,
  gap: 10,
  
  },

  searchInput: {
    flex:1,
    fontSize: 16,
    color: "#111",
  },

   searchIconBtn:{
    width: 34,
    height: 34, 
    borderRadius: 17,
    alignItems:"center",
    justifyContent: "center"
  },
  
  searchIconImg:{
    width: 20,
    height: 20,
    resizeMode: "contain"
  },

  section:{
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom : 14,

    
    
  },
    sectionHeaderRow :{
        flexDirection: "column",
        //justifyContent : "space-between",
        alignItems : "flex-end",
        marginBottom : 0,
  },

    titleRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent:"flex-end",
        gap: 5,
        marginBottom: 14 ,
 },


    sectionIcon:{
        width: 26,
        height: 26,
        resizeMode : "contain",

 },

     sectionTitleRight: {
        fontSize: 20 ,
        fontWeight: "800",
        textAlign : "right",

        
        
 },

     viewAll:{ 
        fontSize: 14,
        fontWeight: "700",
        opacity: 0.75,
        textAlign: "right",
        
         //gap: 8,
        


 },


     letterBox:{
        backgroundColor:"#E6F2F2",
        width: 52,
        height: 52,
        borderRadius:14,
        alignItems: "center",
        justifyContent: "center",
        overflow : "hidden",
        
 },

     letter: {
        fontSize: 20,
        textAlign: "center",

  },

     viewAllBtn:{
        paddingVertical: 0,
       // justifyContent: "center",
        alignSelf : "flex-end"
 },

     lettersRow:{
        flexDirection: "row-reverse",
        gap: 10,
        paddingVertical:4,
 },
     lettersScroll:{
        marginTop:6,
 },
     lettersContent:{
        paddingStart:0,
        paddingEnd:16,
        gap :10,
 },

     wordSectionSpacing: {
     marginTop: 32,
 },

     latestGrid: {
     flexDirection:"row",
     flexWrap: "wrap",
     justifyContent: "space-between",
     gap: 12,
     marginTop: 12,
     alignItems: "center",
  
 },

      latestCard: {
      width: "48%",
      backgroundColor: "#fff",
      borderRadius: 16,
      borderColor : "#2C5B61",
      borderWidth:0.2,
      padding: 14,
},

      latestWord: {
      fontSize: 18,
      fontWeight: "800",
      textAlign: "right",
      color: "#111",
},

      latestDesc: {
      marginTop: 6,
      fontSize: 13,
      opacity: 0.7,
      textAlign: "right",
},

     sectionHeader: {
     flexDirection: "column",
     alignItems: "flex-end",
      gap: 6,
},

     scroll: {
     flex: 1,
},

     scrollContent: {
     paddingBottom: 24,
},

    
});
