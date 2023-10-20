import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Accueil from "./pages/Accueil.js";
import ClientPage from "./pages/ClientPage.js";
import MaisonPage from "./pages/MaisonPage.js";
import ConduitPage from "./pages/ConduitPage.js";
import DevisPage from "./pages/DevisPage.js";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Accueil"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Client" component={ClientPage} />
        <Stack.Screen name="Maison" component={MaisonPage} />
        <Stack.Screen name="Conduit" component={ConduitPage} />
        <Stack.Screen name="Devis" component={DevisPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
