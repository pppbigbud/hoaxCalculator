import React, { Component } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
// import ImagePicker from "react-native-image-picker";

export default class MaisonPage extends Component {
  state = {
    imageSource: null,
  };

  selectImage = () => {
    const options = {
      title: "Sélectionner une image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé la sélection d'image");
      } else if (response.error) {
        console.error("Erreur de sélection d'image :", response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({ imageSource: source });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Maison Page</Text>
        {this.state.imageSource && (
          <Image source={this.state.imageSource} style={styles.image} />
        )}
        <Button
          title="Prendre une photo"
          onPress={this.selectImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
