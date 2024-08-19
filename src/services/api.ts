import redaxios from 'redaxios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("The environment variable NEXT_PUBLIC_API_URL is not defined.");
}

export const api = redaxios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});