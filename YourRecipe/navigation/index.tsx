// Navegação/RootStack.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import TabNavigator from './tab-navigator';
import { FavoritesProvider } from '../FavoriteContext';
import AddRecipe from '../screens/AddRecipe';
import FavoriteRecipeList from '../screens/FavoriteRecipeList';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipeList from '../screens/RecipeList';

export type RootStackParamList = {
  TabNavigator: undefined;
  RecipeDetailScreen: { recipe: any };
  AddRecipe: undefined;
  RecipeList: undefined;
  FavoriteRecipeList: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TabNavigator">
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="RecipeList" component={RecipeList} options={{ title: 'Recipes' }} />
          <Stack.Screen
            name="FavoriteRecipeList"
            component={FavoriteRecipeList}
            options={{ title: 'Favorite Recipes' }}
          />
          <Stack.Screen name="AddRecipe" component={AddRecipe} options={{ title: 'New Recipe' }} />
          <Stack.Screen
            name="RecipeDetailScreen"
            component={RecipeDetailScreen}
            options={{ title: 'Recipe Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
