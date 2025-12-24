import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types.ts";
import { useResultsVM } from "../viewmodels/useResultsVM";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Results"
>;

export default function ResultsScreen({
  route,
  navigation,
}: Props) {
  const { query } = route.params;
  const vm = useResultsVM(query);

  if (vm.loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (vm.error) {
    return (
      <View style={{ padding: 16 }}>
        <Text>{vm.error}</Text>
      </View>
    );
  }

  if (!vm.results.length) {
    return (
      <View style={{ padding: 16 }}>
        <Text>ما فيه نتائج لـ {query}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={vm.results}
      keyExtractor={(item, index) =>
        `${item.word ?? item.lemma}-${index}`
      }
      contentContainerStyle={{
        padding: 16,
        gap: 12,
      }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate("Details", {
              word: item.word ?? item.lemma ?? "",
            })
          }
          style={{
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {item.word ?? item.lemma}
          </Text>

          {(item.definition ||
            item.definitions?.[0] ||
            item.meanings?.[0]) && (
            <Text
              style={{
                marginTop: 6,
                opacity: 0.7,
              }}
            >
              {item.definition ??
                item.definitions?.[0] ??
                item.meanings?.[0]}
            </Text>
          )}
        </Pressable>
      )}
    />
  );
}
