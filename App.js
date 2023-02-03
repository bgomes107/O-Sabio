import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import SplashScreen from 'react-native-splash-screen';
import { ContextProvider } from './src/context/Context';
import { navigationRef } from './src/navigation/RootNavigation';
import { StatusBarComponent } from './src/components/StatusBarComponent';
import { withIAPContext } from 'react-native-iap';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (

    <ContextProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBarComponent />
        <TabNavigation />
      </NavigationContainer>
    </ContextProvider>

  );
};

export default withIAPContext(App);