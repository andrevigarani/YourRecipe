// screens/RecipeList.js

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useFavorites } from '../FavoriteContext'; // Importe o hook useFavorites
import recipesMock from '../recepiMocks/recepiesMocks';

const RecipeList = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((recipe) => recipe.id === item.id);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('RecipeDetailScreen', { recipe: item })}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          {item.photo && <Image source={{ uri: item.photo }} style={styles.thumbnail} />}
          <TouchableOpacity onPress={() => toggleFavorite(item)}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-o'}
              size={24}
              color={isFavorite ? 'red' : 'grey'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipesMock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
});

export default RecipeList;
