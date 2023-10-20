import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

export default function Accueil({ navigation }) {
  const menuItems = [
    { label: "Client", image: require("../../assets/infoClient.jpg"), screen: "Client" },
    { label: "Maison", image: require("../../assets/dimMaison.jpg"), screen: "Maison" },
    { label: "Conduit", image: require("../../assets/conduitDeFumee.jpg"), screen: "Conduit" },
    { label: "Devis", image: require("../../assets/devis.jpg"), screen: "Devis" },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/conduitDeFumee.jpg")} style={styles.backgroundImage}>
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <ImageBackground source={item.image} style={styles.buttonBackground}>
                <Text style={styles.buttonText}>{item.label}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
  },
  menu: {
    flex: 1,
    flexDirection: "column",
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 50,
  },
});
