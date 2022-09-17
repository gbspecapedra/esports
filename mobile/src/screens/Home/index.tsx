import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background, GameCard, Heading } from "../../components";
import { api } from "../../services/api";
import { DefaultGamesList } from "../../utils/games";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation();
  const [games, setGames] = useState<GameCard[]>();

  useEffect(() => {
    api.get("/games").then(({ data }) => setGames(data));
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games ?? DefaultGamesList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              card={item}
              onPress={() => {
                navigation.navigate("game", item);
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </View>
    </Background>
  );
}
