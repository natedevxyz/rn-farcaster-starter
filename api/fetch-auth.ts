import axios from "axios";

const SUPABASE_PROJECT_URL = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL;
const SUPABASE_API_KEY = process.env.EXPO_PUBLIC_SUPABASE_API_KEY;

const fetchAuthorizationUrl = async () => {
  const res = await axios.get(
    `${SUPABASE_PROJECT_URL}/functions/v1/get-auth-url`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
      },
    },
  );
  if (res.status !== 200) {
    throw new Error("Failed to fetch auth url");
  }
  const { authorization_url } = res.data as {
    authorization_url: string;
  };
  return authorization_url;
};

export { fetchAuthorizationUrl };
