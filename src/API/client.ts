import axios from "axios";

export const api = axios.create({
  baseURL: "https://siwar.ksaa.gov.sa/api/riyadh",
  timeout: 4500,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
