import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Utilisez cet import unique

export default function ClientPage() {
  const [clientInfo, setClientInfo] = useState({});

  const handleInputChange = (key, value) => {
    setClientInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  const saveClientInfo = () => {
    // Convertir les informations du client en JSON et les enregistrer sur l'appareil
    const clientInfoJSON = JSON.stringify(clientInfo);

    // Vous pouvez utiliser AsyncStorage ou une autre méthode de stockage local
    // pour enregistrer les données JSON sur l'appareil.
    AsyncStorage.setItem("clientInfo", clientInfoJSON);
  };

  // Utilisation de useEffect pour récupérer les informations du client lors du chargement de la page
  useEffect(() => {
    // Récupérer les données du client à partir du stockage local
    AsyncStorage.getItem("clientInfo").then((jsonClientInfo) => {
      if (jsonClientInfo) {
        // Convertir les données JSON en un objet JavaScript
        const clientInfoData = JSON.parse(jsonClientInfo);

        // Mettre à jour l'état avec les informations du client
        setClientInfo(clientInfoData);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Informations du Client</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        onChangeText={(text) => handleInputChange("nom", text)}
        value={clientInfo.nom} // Afficher la valeur actuelle
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        onChangeText={(text) => handleInputChange("adresse", text)}
        value={clientInfo.adresse} // Afficher la valeur actuelle
      />
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        onChangeText={(text) => handleInputChange("telephone", text)}
        value={clientInfo.telephone} // Afficher la valeur actuelle
      />
      <Button title="Enregistrer" onPress={saveClientInfo} />
      <Text>Informations du Client Enregistrées :</Text>
      <Text>{JSON.stringify(clientInfo)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
