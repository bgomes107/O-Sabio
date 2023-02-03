import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, useWindowDimensions } from 'react-native';
import { ThemeContext } from '../context/Context';

// Telas
import Inicio from '../screens/Inicio';
import Autores from '../screens/Autores';
import MarcoScreen from '../screens/MarcoScreen';
import SenecaScreen from '../screens/SenecaScreen';
import EpitectoScreen from '../screens/EpitectoScreen';
import Menu from '../screens/Menu';
import Favoritos from '../screens/Favoritos';
import SearchScreen from '../screens/SearchScreen';
import Principios from '../screens/Principios';
import { ModalPickers } from '../components/ModalPickers';
import TopBar from '../components/TopBar';


// Inicio Stack Screens
const Home = createStackNavigator();

export const InicioStackScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (

    <Home.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme == false ? '#0033ff' : '#323232'
        },
        headerTitle: () => (
          <Text style={{
            fontSize: fontScale * 27,
            color: theme == false ? '#fff' : '#e5e5e5',
            marginLeft: width * 0.015,
            fontFamily: 'geek'
          }}>
            o Sabio
          </Text>
        ),
        headerTintColor: theme == false ? '#fff' : '#e5e5e5',
      }}
    >
      <Home.Screen
        name="Inicio"
        component={Inicio}
        options={{
          header: () => <TopBar />
        }}
      />

      <Home.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: false,
          presentation: 'transparentModal'
        }}
      />
    </Home.Navigator>

  );
}

// Principios Stack Screen
const Principles = createStackNavigator();

export const PrincipiosStackScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (

    <Principles.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme == false ? '#0033ff' : '#323232'
        },
        headerTitle: () => (
          <Text style={{
            fontSize: fontScale * 27,
            color: theme == false ? '#fff' : '#e5e5e5',
            marginLeft: width * 0.015,
            fontFamily: 'geek'
          }}>
            o Sabio
          </Text>
        ),
        headerTintColor: theme == false ? '#fff' : '#e5e5e5',
      }}
    >
      <Principles.Screen
        name="Principios"
        component={Principios}
        options={{
          header: () => <TopBar />
        }}
      />

      <Principles.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: false,
          presentation: 'transparentModal'

        }}
      />

    </Principles.Navigator>
  )
}

// Autores Stack Screens
const Autors = createStackNavigator();

export const AutoresStackScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (

    <Autors.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme == false ? '#0033ff' : '#323232'
        },
        headerTitle: () => (
          <Text style={{
            fontSize: fontScale * 23,
            color: theme == false ? '#fff' : '#e5e5e5',
            marginLeft: width * 0.015,
            fontFamily: 'geek'
          }}>
            o Sabio
          </Text>
        ),
        headerTintColor: theme == false ? '#fff' : '#e5e5e5',
      }}
    >
      <Autors.Screen
        name="Autores"
        component={Autores}
        options={{
          header: () => <TopBar />
        }}
      />
      <Autors.Screen
        name="MarcoScreen"
        component={MarcoScreen}
        options={{
          title: false,
          presentation: 'modal'
        }}
      />
      <Autors.Screen
        name="SenecaScreen"
        component={SenecaScreen}
        options={{
          title: false,
          presentation: 'modal'
        }}
      />
      <Autors.Screen
        name="EpitectoScreen"
        component={EpitectoScreen}
        options={{
          title: false,
          presentation: 'modal'
        }}
      />
      <Autors.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: false,
          presentation: 'transparentModal'
        }}
      />
    </Autors.Navigator>



  )

}

// Favoritos Stack Screens
const Favorites = createStackNavigator();

export const FavoritosStackScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (

    <Favorites.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme == false ? '#0033ff' : '#323232'
        },
        headerTitle: () => (
          <Text style={{
            fontSize: fontScale * 27,
            color: theme == false ? '#fff' : '#e5e5e5',
            marginLeft: width * 0.015,
            fontFamily: 'geek'
          }}>
            o Sabio
          </Text>
        ),
        headerTintColor: theme == false ? '#fff' : '#e5e5e5',
      }}
    >
      <Favorites.Screen
        name="Favorites"
        component={Favoritos}
        options={{
          header: () => <TopBar />
        }}
      />

      <Favorites.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: false,
          presentation: 'transparentModal'

        }}
      />
    </Favorites.Navigator>


  )
}

// Menu Stack Screens
const Settings = createStackNavigator();

export const MenuStackScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (

    <Settings.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme == false ? '#0033ff' : '#323232'
        },
        headerTitle: () => (
          <Text style={{
            fontSize: fontScale * 27,
            color: theme == false ? '#fff' : '#e5e5e5',
            marginLeft: width * 0.015,
            fontFamily: 'geek'
          }}>
            o Sabio
          </Text>
        ),
        headerTintColor: theme == false ? '#fff' : '#e5e5e5',
      }}
    >
      <Settings.Screen
        name="Config"
        component={Menu}
        options={{
          header: () => <TopBar />
        }}
      />
      <Settings.Screen
        name="Modal"
        component={ModalPickers}
        options={{
          presentation: 'modal',
          title: false,
          headerLeft: false
        }}
      />
      <Settings.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: false,
          presentation: 'transparentModal'
        }}
      />
    </Settings.Navigator>


  )
}