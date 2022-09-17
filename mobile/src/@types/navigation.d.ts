import { Game } from "../models/game";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game: Game;
    }
  }
}