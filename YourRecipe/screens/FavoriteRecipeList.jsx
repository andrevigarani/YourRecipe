// screens/FavoriteRecipeList.js

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useFavorites } from '../FavoriteContext'; // Importe o hook useFavorites

const FavoriteRecipeListScreen = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('RecipeDetailScreen', { recipe: item })}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          {item.photo && <Image source={{ uri: item.photo }} style={styles.thumbnail} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite recipes found.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    maxWidth: '70%',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 25,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default FavoriteRecipeListScreen;
