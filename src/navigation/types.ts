// src/navigation/types.ts
import type { SearchEntry } from "../API/services";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;

  Results: { query: string; results: SearchEntry[] };
  Details: { word: string; entryId?: string; senseId?: string; definition?: string };

  MoreScreen: undefined;
};
