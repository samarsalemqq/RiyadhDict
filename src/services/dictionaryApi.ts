

import axios from "axios";
import type { DictionaryResponse } from "../types/dictionary";

const BASE_URL =
  "https://siwar.ksaa.gov.sa/api/v1/external/public/search";


const API_KEY = "be5c4bc2-b5b9-4be1-a086-7cdacda8fd3c";

export async function searchWord(
  query: string
): Promise<DictionaryResponse> {
  const response = await axios.get<DictionaryResponse>(BASE_URL, {
    params: {
      word: query, // اسم البراميتر الصح
    },
    headers: API_KEY
      ? { "x-api-key": API_KEY }
      : undefined,
  });

  return response.data;
}
