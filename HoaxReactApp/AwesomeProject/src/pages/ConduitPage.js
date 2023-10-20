import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clientInfo from "./ClientPage";

export default class ConduitPage extends Component {
  state = {
    clientInfo: {},
  };

  componentDidMount() {
    // Récupérer les données du client à partir du stockage local
    AsyncStorage.getItem("clientInfo")
      .then((jsonClientInfo) => {
        if (jsonClientInfo) {
          // Convertir les données JSON en un objet JavaScript
          const clientInfoData = JSON.parse(jsonClientInfo);
          this.setState({ clientInfo: clientInfoData });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Text style={styles.centeredText}>Informations du Client Enregistrées :</Text>
          <Text>{JSON.stringify(this.state.clientInfo)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center", // Aligner verticalement au centre
  },
  centeredContent: {
    alignItems: "center", // Aligner horizontalement au centre
  },
  centeredText: {
    fontSize: 20,
  },
});
