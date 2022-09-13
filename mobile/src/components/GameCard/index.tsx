import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";

export type GameCard = {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
};

interface GameCardProps extends TouchableOpacityProps {
  card: GameCard;
}

export function GameCard({ card, ...props }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <ImageBackground style={styles.cover} source={card.cover}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{card.name}</Text>
          <Text style={styles.ads}>{card.ads} anuncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
