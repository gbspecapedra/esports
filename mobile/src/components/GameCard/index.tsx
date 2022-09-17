import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";

export type GameCard = {
  id: string;
  title: string;
  _count: { ads: number };
  bannerUrl: string;
};

interface GameCardProps extends TouchableOpacityProps {
  card: GameCard;
}

export function GameCard({ card, ...props }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <ImageBackground style={styles.cover} source={{ uri: card.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{card.title}</Text>
          <Text style={styles.ads}>{card._count.ads} anuncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
