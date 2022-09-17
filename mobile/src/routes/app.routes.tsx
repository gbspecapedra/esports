import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Game, Home } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home}></Screen>
      <Screen name="game" component={Game}></Screen>
    </Navigator>
  );
};
