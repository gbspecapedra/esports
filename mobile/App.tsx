import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import { StatusBar } from "react-native";

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";

import { Subscription } from "expo-modules-core";
import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

import { getPushNotificationToken } from "./src/services/getPushNotificationToken";
import "./src/services/notificationConfig";

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        console.log(notification);
      });

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
