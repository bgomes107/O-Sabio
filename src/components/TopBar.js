import React, { useContext } from 'react';
import { View, Text, SafeAreaView, useWindowDimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/Context';


const TopBar = () => {

  const { theme } = useContext(ThemeContext);

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
          fontSize: scale(25), color: theme == false ? '#fff' : '#e5e5e5',
          marginLeft: scale(14), fontFamily: 'geek'
        }}>
          o Sabio
        </Text>
        <IconButton
          onPress={() => navigation.navigate('SearchScreen')}
          icon='text-box-search'
          iconColor={theme == false ? '#fff' : '#e5e5e5'}
          containerColor={theme == false ? '#0033ff' : '#323232'}
          size={scale(23)}
          mode='contained-tonal'
          style={{ marginRight: scale(14) }}
        />
      </View>
    </SafeAreaView>

  );
}

export default TopBar;