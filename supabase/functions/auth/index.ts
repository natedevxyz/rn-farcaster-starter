// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import {
  AuthorizationUrlResponseType,
  NeynarAPIClient,
} from "npm:@neynar/nodejs-sdk@1.28.0";

const NEYNAR_API_KEY = Deno.env.get("NEYNAR_API_KEY");
const NEYNAR_CLIENT_ID = Deno.env.get("NEYNAR_CLIENT_ID");

const client = new NeynarAPIClient(NEYNAR_API_KEY!);

Deno.serve(async (_req) => {
  try {
    const { authorization_url } = await client.fetchAuthorizationUrl(
      NEYNAR_CLIENT_ID!,
      AuthorizationUrlResponseType.Code,
    );
    console.log("authorization_url", authorization_url);
    return new Response(
      JSON.stringify({ authorization_url }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error:", error);
    if (error.isAxiosError) {
      return new Response(
        JSON.stringify({ error }),
        {
          status: error.response.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }
});
