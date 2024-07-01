# Develop a Farcaster mobile app with Expo, Supabase and Neynar

If you are familiar with React and Tailwind CSS, you can clone this repo to create a Farcaster mobile app for iOS and Android.

Haven't used React Native before? Don't worry, here is a crash course:

**React**

- DOM Elements: Uses HTML tags.

**React Native**

- Native Components: No HTML. Uses components like View, Text, Image instead.

Styling is also different in React Native, but because we are using [Nativewind](https://nativewind.dev/), you can use the `className` prop the same way you use it in a React project with Tailwind CSS.

And that's it, you are a React Native developer now. Everything you know about React should come in handy when building a React Native app. If you're missing something visit the [React Native docs](https://reactnative.dev/docs/components-and-apis).

## Contents

[Expo setup](#expo-setup)
[Neynar setup](#neynar-setup)
[Supabase setup](#supabase-setup)
[How to run](#how-to-run)

## Expo Setup

Expo is a framework that makes developing Android and iOS apps easier.

This guide uses a [development build](https://docs.expo.dev/develop/development-builds/introduction/) and Android emulator/iOS Simulator. Keep in mind that to use the iOS Simulator, you need a Macbook.

**iOS Simulator on Macbook:** [Set up Xcode and Watchman](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&platform=ios&device=simulated&buildEnv=local#set-up-xcode-and-watchman)

**Android Emulator on Macbook or Windows:** [Install Watchman and JDK](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&platform=android&device=simulated&buildEnv=local#install-watchman-and-jdk)

After following the instructions above, you're ready to build an app locally. If at some point you want to submit your app to the Google Play Store or Apple App Store, you can use [EAS Build](https://docs.expo.dev/build/introduction/). EAS is to Expo what Vercel is to NextJS.

Just like NextJS, Expo has its own [routing system](https://docs.expo.dev/router/introduction/) and [packages](https://docs.expo.dev/versions/latest/) to access the device and system functionality that facilitates the development of an app. I recommend reading about it to get a better understanding of how Expo works.

## Neynar Setup

Neynar makes it easy to build on Farcaster. You can register at [neynar.com](https://neynar.com/) and subscribe to be able to access the [Developer Portal](https://dev.neynar.com/).

Inside the developer portal you should be able to create an app (the name doesn't matter) and get the client ID and the API key. Create your own .env file inside the `/supabase` folder (do not use .env.example!) and paste both variables.

You can read more about signin with Neynar [here](https://docs.neynar.com/docs/sign-in-with-neynar-react-native-implementation).

## Supabase Setup

To connect to Farcaster we need a backend to manage GET and POST requests. For this, we are going to use [Supabase Edge Functions](https://supabase.com/docs/guides/functions). The free tier of Supabase should be enough while you develop the app.

0. To use Edge Functions, you need to install the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started#installing-the-supabase-cli). It's also highly recommended to have [Docker](https://docs.docker.com/get-docker/) installed so you can develop locally.

1. Create a Supabase project in your [dashboard](https://supabase.com/dashboard/projects). You'll receive a database password. Save it in a secure location!

2. Link your project to your local machine. You'll need the project reference ID. You can find it in your project settings dashboard.

```
supabase link --project-ref=YOUR_PROJECT_REFERENCE_ID
```

You'll be asked to enter the password you received in the previous step.

3. After linking the project you can set enviroment secrets for the Edge Functions.

```
supabase secrets set NEYNAR_API_KEY=YOUR_NEYNAR_API_KEY_HERE
```

```
supabase secrets set NEYNAR_CLIENT_ID=YOUR_NEYNAR_CLIENT_ID_HERE
```

You can check the secrets you set with `supabase secrets list`.

4. Deploy the two functions "get-auth-url" and "user" with the following commands:

```
supabase deploy get-auth-url --no-verify-jwt
```

```
supabase deploy user --no-verify-jwt
```

5. OPTIONAL: You could also deploy the "cast" function with this same method. Check the code in the Neynar [repo](https://github.com/neynarxyz/farcaster-examples/blob/main/wownar-react-native/server/index.js). Note: you'll need to adapt the code to use Deno, check the `/supabase/functions` folder for reference.

6. Go to the Supabase project dashboard and look for a "Connect" button. If you select the "Mobile Frameworks" option, you should see two enviroment variables. Create your own .env file at the root of the project (do not use .env.example!) and paste both variables.

7. Now that you have the Supabase URL, go back to the Neynar dashboard and paste the URL in the "Authorized origins" field at the bottom of the app settings.

## How to run

1. Install dependencies with `npm install`.
2. Run `npx expo run:ios` to start the iOS simulator.
3. Run `npx expo run:android` to start the Android emulator.

You can start developing by editing the code in the `/app` folder.

If this guide was useful to you, shoutouts on [X](https://x.com/natedevxyz) are welcome!. If you run into any issues you can DM me and I'll be happy to help you out.
