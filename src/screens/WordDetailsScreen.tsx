import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function WordDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { entry, definition } = route.params || {};

  return (
    <View style={styles.screen}>
      <Pressable onPress={() => navigation.goBack()} style={{ paddingTop: 70, paddingHorizontal: 18 }}>
        <Text style={{ color: "#0E6B6D", fontWeight: "900" }}>رجوع</Text>
      </Pressable>

      <View style={{ padding: 18 }}>
        <Text style={styles.word}>{entry ?? "تفاصيل"}</Text>
        <Text style={styles.def}>{definition ?? ""}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  word: { fontSize: 30, fontWeight: "900", color: "#0E6B6D", textAlign: "right", marginTop: 20 },
  def: { marginTop: 12, fontSize: 16, lineHeight: 24, color: "#222", textAlign: "right" },
});
