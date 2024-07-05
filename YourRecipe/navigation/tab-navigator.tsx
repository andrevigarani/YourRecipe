import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import AddRecipe from 'screens/AddRecipe';
import FavoriteRecipeList from 'screens/FavoriteRecipeList';

import { RootStackParamList } from '.';
import { HeaderButton } from '../components/HeaderButton';
import { TabBarIcon } from '../components/TabBarIcon';
import RecipeList from '../screens/RecipeList';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="RecipeList"
        component={RecipeList}
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color }) => <TabBarIcon name="birthday-cake" color={color} />,
          headerRight: () => <HeaderButton onPress={() => navigation.navigate('RecipeList')} />,
        }}
      />
      <Tab.Screen
        name="FavoriteRecipeList"
        component={FavoriteRecipeList}
        options={{
          title: 'Favorite Recipes',
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
          headerRight: () => (
            <HeaderButton onPress={() => navigation.navigate('FavoriteRecipeList')} />
          ),
        }}
      />
      <Tab.Screen
        name="AddRecipe"
        component={AddRecipe}
        options={{
          title: 'Add recipe',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerRight: () => <HeaderButton onPress={() => navigation.navigate('AddRecipe')} />,
        }}
      />
    </Tab.Navigator>
  );
}
