// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { NeynarAPIClient } from "npm:@neynar/nodejs-sdk@1.28.0";

const NEYNAR_API_KEY = Deno.env.get("NEYNAR_API_KEY");

const client = new NeynarAPIClient(NEYNAR_API_KEY!);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const fidParam = url.searchParams.get("fid");

  if (!fidParam) {
    return new Response(
      JSON.stringify({ error: "Missing fid parameter" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const fid = Number(fidParam);

  if (isNaN(fid)) {
    return new Response(
      JSON.stringify({ error: "Invalid fid parameter" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const { users } = await client.fetchBulkUsers([fid]);
    const user = users[0];
    const { display_name, pfp_url } = user;

    return new Response(
      JSON.stringify({ display_name, pfp_url }),
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
