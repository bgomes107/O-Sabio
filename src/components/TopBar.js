import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, PixelRatio, useWindowDimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/Context';


const TopBar = () => {

  const { theme } = useContext(ThemeContext);
  const { height, width, scale, fontScale } = useWindowDimensions();

  const navigation = useNavigation();

  return (

    <SafeAreaView>
      <View style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme == false ? '#0033ff' : '#323232',
      }}>
        <Text style={{
          fontSize: fontScale * 27, color: theme == false ? '#fff' : '#e5e5e5',
          marginLeft: width * 0.06, fontFamily: 'geek'
        }}>
          o Sabio
        </Text>
        <IconButton
          onPress={() => navigation.navigate('SearchScreen')}
          icon='text-box-search'
          iconColor={theme == false ? '#fff' : '#e5e5e5'}
          containerColor={theme == false ? '#0033ff' : '#323232'}
          size={height * 0.04}
          mode='contained-tonal'
          style={{ marginRight: width * 0.1 }}
        />
      </View>
    </SafeAreaView>

  );
}

export default TopBar;