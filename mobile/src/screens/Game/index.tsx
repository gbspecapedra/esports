import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImage from "../../assets/logo-nlw-esports.png";
import { THEME } from "../../theme";

import {
  Background,
  DuoCard,
  DuoCardProps,
  DuoMatch,
  Heading,
} from "../../components";

import { Game as GameModel } from "../../models/game";
import { api } from "../../services/api";
import { styles } from "./styles";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameModel;

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState<boolean>(false);
  const [discordUsername, setDiscordUsername] = useState<string>("");

  const getDiscordUsername = async (adsId: string) => {
    api.get(`/ads/${adsId}/discord`).then(({ data }) => {
      setDiscordUsername(data.ad.discord);
      setIsDiscordModalOpen(true);
    });
  };

  useEffect(() => {
    api.get(`/games/${game.id}/ads`).then(({ data }) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImage} style={styles.logo} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle={"Conecta-te e começa a jogar!"} />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUsername(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Ainda não há Duos para este jogo
            </Text>
          )}
        />

        <DuoMatch
          visible={isDiscordModalOpen}
          discord={discordUsername}
          onClose={() => setIsDiscordModalOpen(false)}
        />
      </SafeAreaView>
    </Background>
  );
}
