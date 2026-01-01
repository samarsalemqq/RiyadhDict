import { api } from "./client";

export type SearchEntry = {
  entryId: string;
  entry: string;
  isPOS: boolean;
  mainPOS: string | null;
  subPOS: string | null;
  senseId: string;
  definition: string;
  englishTranslation: string | null;
};

export async function searchEntriesWeb(word: string) {
  const { data } = await api.get<SearchEntry[]>(
    `/Result/SearchEntriesWeb?word=${encodeURIComponent(word)}`
  );
  return data;
}
