const BASE_URL = "https://siwar.ksaa.gov.sa";
const API_KEY = "be5c4bc2-b5b9-4be1-a086-7cdacda8fd3c";


export async function publicSearch(query: string) {
  const url = `${BASE_URL}/api/v1/external/public/search?q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "API-key" : API_KEY

    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json();
}
