import { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import { TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import useKeyboard from '../components/KeyboardEvents';
import { ThemeContext } from '../context/Context';

// telas
import { AutoresStackScreen } from "./StackNavigator";
import { InicioStackScreen } from "./StackNavigator";
import { FavoritosStackScreen } from "./StackNavigator";
import { MenuStackScreen } from "./StackNavigator";
import { PrincipiosStackScreen } from './StackNavigator';

const adUnitId = __DEV__ ? TestIds.BANNER : "ca-app-pub-6251539491691615~2143074309";

const Tab = createMaterialBottomTabNavigator();


const TabNavigation = () => {

  const { theme } = useContext(ThemeContext);
  const { height, width, scale, fontScale } = useWindowDimensions();
  const isKeyboardOpen = useKeyboard();

  return (

    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Início"
        activeColor={theme == false ? "#0033ff" : '#142949'}
        inactiveColor={theme == false ? '#fff' : '#e5e5e5'}
        barStyle={{
          backgroundColor: theme == false ? '#0033ff' : '#323232',
          borderTopColor: theme == false ? '#0033ff' : '#323232',
          height: height * 0.098,
          // justifyContent: 'center'

        }}
      >
        <Tab.Screen
          name="Início"
          component={InicioStackScreen}
          options={{
            tabBarLabel: <Text style={{
              color: theme == false ? '#fff' : '#e5e5e5',
              fontWeight: 'bold',
              fontSize: fontScale * 12
            }}>
              Início
            </Text>,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={height * 0.033} />
            ),
          }}
        />
        <Tab.Screen
          name="Autores"
          component={AutoresStackScreen}
          options={{
            tabBarLabel: <Text style={{
              color: theme == false ? '#fff' : '#e5e5e5',
              fontWeight: 'bold',
              fontSize: fontScale * 12
            }}>
              Autores
            </Text>,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book-account" color={color} size={height * 0.033} />
            ),
          }}
        />
        <Tab.Screen
          name="Principios"
          component={PrincipiosStackScreen}
          options={{
            tabBarLabel: <Text style={{
              color: theme == false ? '#fff' : '#e5e5e5',
              fontWeight: 'bold',
              fontSize: fontScale * 12
            }}>
              Princípios
            </Text>,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="pillar" color={color} size={height * 0.033} />
            ),

          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritosStackScreen}
          options={{
            tabBarLabel: <Text style={{
              color: theme == false ? '#fff' : '#e5e5e5',
              fontWeight: 'bold',
              fontSize: fontScale * 12
            }}>
              Favoritos
            </Text>,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart" color={color} size={height * 0.033} />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuStackScreen}
          options={{
            tabBarLabel: <Text style={{
              color: theme == false ? '#fff' : '#e5e5e5',
              fontWeight: 'bold',
              fontSize: fontScale * 12
            }}>
              Menu
            </Text>,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="menu" color={color} size={height * 0.030} />
            ),
          }}
        />
      </Tab.Navigator>
      <KeyboardAvoidingView
        behavior='padding'
        style={{
          position: 'absolute',
          bottom: isKeyboardOpen ? height * 0.130 : height * 0.097,
          alignItems: 'center',
          justifyContent: 'center',
          width: width * 1,
        }}

      >
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId={adUnitId}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </KeyboardAvoidingView>
    </View>


  );
}


export default TabNavigation;