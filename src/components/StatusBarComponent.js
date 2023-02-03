import { useContext, useCallback } from 'react';
import { StatusBar, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../context/Context';

export const StatusBarComponent = () => {

    const { theme } = useContext(ThemeContext);
  
    useFocusEffect(
      useCallback(() => {
        StatusBar.setBarStyle('light-content');
        Platform.OS === 'android' && StatusBar.setBackgroundColor(theme == false ? '#0033ff' : '#323232');
      }, [theme]),
    );
  }