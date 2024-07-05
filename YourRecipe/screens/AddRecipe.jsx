// screens/AddRecipe.js

import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from 'react-native';

import recipesMock from '../recepiMocks/recepiesMocks'; // Certifique-se de que o caminho do arquivo esteja correto

const AddRecipe = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPhoto(data.uri);
      setCameraVisible(false); // Fechar a câmera após tirar a foto
    }
  };

  const saveRecipe = () => {
    const newRecipe = {
      id: String(recipesMock.length + 1),
      title,
      photo,
      description,
    };
    recipesMock.push(newRecipe);
    setTitle('');
    setDescription('');
    setPhoto(null);
    navigation.navigate('RecipeList');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipe Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Recipe Description"
        value={description}
        onChangeText={setDescription}
      />
      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
          <View style={styles.buttonContainer}>
            <Button title="Retake" onPress={() => setPhoto(null)} />
            <Button title="Save Recipe" onPress={saveRecipe} />
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={() => setCameraVisible(true)} />
        </View>
      )}
      {cameraVisible && (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
          <View style={styles.cameraButtonContainer}>
            <Button title="Capture" onPress={takePicture} />
            <Button title="Cancel" onPress={() => setCameraVisible(false)} />
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // Adicionei uma cor de fundo para garantir visibilidade
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});

export default AddRecipe;
