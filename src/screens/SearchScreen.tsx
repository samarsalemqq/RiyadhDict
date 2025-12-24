import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types.ts";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export default function SearchScreen({ navigation }: Props) {
  const [q, setQ] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="اكتب كلمة..."
        style={styles.input}
      />
      <Button
        title="بحث"
        onPress={() => navigation.navigate("Results", { query: q.trim() })}
        disabled={!q.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 12 },
});
