import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

import LogoIcon from "../../assets/logo.svg";
import SearchIcon from "../../assets/search.svg";
import MicIcon from "../../assets/Mic1.svg";
import ResarchResIcon from"../../assets/searchRes.svg"


import { searchEntriesWeb, type SearchEntry } from "../API/services";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ResultsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<any>();

  const { query, results } = route.params as { query: string; results: SearchEntry[] };

  const [text, setText] = useState(query);
  const [list, setList] = useState<SearchEntry[]>(results ?? []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (text.trim() === "") {
      if ((navigation as any).canGoBack?.()) (navigation as any).goBack();
      else (navigation as any).navigate("Tabs");
    }
  }, [text]);

  const doSearch = async () => {
    const q = text.trim();
    if (!q) return;

    try {
      setLoading(true);
      const data: SearchEntry[] = await searchEntriesWeb(q);

      setList(data);

      (navigation as any).setParams?.({ query: q, results: data });
    } catch (e) {
      console.log("SEARCH ERROR", e);
    } finally {
      setLoading(false);
    }
  };

  const chips = useMemo(() => list.slice(0, 3), [list]);

  return (
    <View style={styles.container}>
      {/* ================= Header  ================= */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <LogoIcon width={50} height={50} />

          <View style={styles.headerRight}>
            <Pressable
              style={styles.iconBtn}
              onPress={() => (navigation as any).getParent()?.navigate("MoreScreen")}
            />
            
          </View>
        </View>

        {/* ================= Search Bar ================= */}
        <View style={styles.searchBar}>
          <Pressable style={styles.searchIconBtn}>
        <MicIcon width={20} height={20} />
          </Pressable>

          <TextInput
            placeholder="ابحث عن كلمة"
            placeholderTextColor="rgba(0,0,0,0.45)"
            style={styles.searchInput}
            textAlign="right"
            value={text}
            onChangeText={setText}
            onSubmitEditing={doSearch}
          />

          <Pressable style={styles.searchIconBtn} onPress={doSearch}>
            <SearchIcon width={20} height={20} />

          </Pressable>
        </View>
      </View>

      {/* ================= Title ================= */}
      <View style={styles.titleWrap}>
        <ResarchResIcon width={30} height={30} />
        <Text style={styles.title}>نتائج البحث</Text>
      </View>

      
      {/* ================= Results List ================= */}
     <FlatList
     data={list}
     keyExtractor={(item) => item.entryId + item.senseId}
     contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
     renderItem={({ item }) => (
     <Pressable
      style={styles.card}
        onPress={() =>
         navigation.navigate("Results", {
          entryId: item.entryId,
          senseId: item.senseId,
        } as any)
      }
      >
      <View style={styles.wordRow}>
        <Text style={styles.word}>{item.entry}</Text>

        {(item.subPOS || item.mainPOS) && (
          <Text style={styles.posInline}>
            {item.subPOS ?? item.mainPOS}
          </Text>
        )}
      </View>

      <Text numberOfLines={1} style={styles.defSmall}>
        {item.definition}
      </Text>
    </Pressable>
  )}
  ListEmptyComponent={
    <Text style={styles.empty}>
      {loading ? "جاري البحث..." : "لا توجد نتائج"}
    </Text>
  }
/>

    </View>
  );
}

/* ================= Styles ================= */



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

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

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerRight: { 
    flexDirection: "row",
     alignItems: "center", 
     gap: 10
     },

  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBar: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingHorizontal: 10,
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
  },

  searchIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111",
    paddingVertical: 0,
  },

 titleWrap: {
  paddingHorizontal: 20,
  paddingTop: 20,
   paddingBottom: 20,
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 8,
},

  title: { fontSize: 24,
     fontWeight: "900",
      color: "#0E6B6D", 
      textAlign: "right", 
   
      
    },

  card: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },

  word: { fontSize: 18,
     fontWeight: "900", 
     textAlign: "right",
     color: "#111" 
    },


  def: { 
    marginTop: 6,
     fontSize: 14, 
     textAlign: "right", 
     color: "#333", 
     opacity: 0.85 
    },

  empty: {
     textAlign: "center",
      marginTop: 40, 
      color: "#777"
     },
    defSmall: {
    marginTop: 6,
    fontSize: 13,
    textAlign: "right",
    color: "#333",
    opacity: 0.75,
  },

wordRow: {
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 10,
},

posInline: {
  fontSize: 13,
  fontWeight: "700",
  color: "#0E6B6D",
  opacity: 0.9,
},


});





