import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Share,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/Context';
import { IconButton, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DATA from '../data/Data';


const MarcoScreen = () => {

  const [viewHeight, setHeight] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [favVisible, setFavVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { height, width, fontScale } = useWindowDimensions();

  const isFocused = useIsFocused();

  useEffect(() => {
    startLoading();
    renderFavorite();
  }, [isFocused]);

  // loading time spinner
  const startLoading = () => {
    if (viewHeight == null) {
      setSpinner(true);
      setTimeout(() => {
        setSpinner(false);
      }, 500);
    }
  }


  // compartilha a citacao
  const onShareQuote = async (nome, texto) => {
    await Share.share({
      title: nome,
      message: texto,
    });
  };

  // adiciona ao storage
  const saveFavorite = async (data_quotes) => {

    try {
      valor = await AsyncStorage.getItem('@ID');
      const res = JSON.parse(valor);
      if (res !== null) {
        let data = res.find(value => value.id == data_quotes.id);
        if (data == null) {
          res.push(data_quotes);
          console.log(res);
          favoriteSnackBar();

          AsyncStorage.setItem('@ID', JSON.stringify(res));
          setFavorite(res);

        }


      } else {
        let favorites = [];
        favorites.push(data_quotes);
        AsyncStorage.setItem('@ID', JSON.stringify(favorites));
        setFavorite(favorites);
        favoriteSnackBar();
        console.log(favorites);
      }
    } catch (error) {
      console.log(error);
    }

  }

  // remove a citacao dos favoritos
  const removeFavorite = async (data_quotes) => {

    try {
      const quote = await AsyncStorage.getItem('@ID');
      let quoteFav = JSON.parse(quote);
      const quoteItems = quoteFav.filter((e) => {
        return e.id !== data_quotes.id;
      });
      await AsyncStorage.setItem('@ID', JSON.stringify(quoteItems));
      setFavorite(quoteItems);
      removeSnackBar();
      console.log(quoteItems);
    } catch (error) {
      console.log(error);
    }

  };


  // renderiza a citacao no useEffect
  const renderFavorite = async () => {

    try {
      const token = await AsyncStorage.getItem('@ID')
      const res = JSON.parse(token);
      setFavorite(res);

    } catch (error) {
      console.log(error);
    }

  };

  // Snackbar de adicionar e remover dos favoritos
  const favoriteSnackBar = () => setFavVisible(!favVisible);
  const removeSnackBar = () => setRemoveVisible(!removeVisible);
  const onDismissFav = () => setFavVisible(false);
  const onDismissRemov = () => setRemoveVisible(false);

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: theme == false ? '#e9e9e9' : '#191919',
      alignItems: 'center',
      justifyContent: 'center',
    },

    item: {
      backgroundColor: theme == false ? '#fff' : '#323232',
      padding: height * 0.02,
      borderRadius: height * 0.023,
    },

    titleContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: height * 0.018,
      marginLeft: width * 0.028,
      flexDirection: 'row'
    },

    title: {
      fontSize: fontScale * 23,
      fontWeight: 'bold',
      color: theme == false ? '#000' : '#e5e5e5',
    },

    subTitle: {
      fontSize: fontScale * 19,
      fontWeight: 'bold',
      color: theme == false ? '#000' : '#e5e5e5',
    },

    line: {
      backgroundColor: theme == false ? '#000' : '#e5e5e5',
      height: height * 0.002,
      marginLeft: width * 0.024,
      marginRight: width * 0.024,
      marginTop: height * 0.024
    },

    textContainer: {
      flex: 1,
      padding: height * 0.018
    },

    texto: {
      fontSize: fontScale * 18,
      fontWeight: 'bold',
      color: theme == false ? '#000' : '#e5e5e5',
      textAlign: 'left'
    },

    obra: {
      fontSize: fontScale * 17,
      fontWeight: 'bold',
      color: theme == false ? '#000' : '#e5e5e5',
      marginTop: height * 0.018
    },


  });


  return (
    <SafeAreaView style={styles.container} onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      {spinner ? (
        <ActivityIndicator
          animating={true}
          size='large'
          color={theme == false ? '#0033ff' : '#e5e5e5'}
          style={{
            flex: 1,
            marginTop: height * 0.230
          }}
        />
      ) : (
        viewHeight && (
          <Carousel
            mode='parallax'
            pagingEnabled
            vertical
            loop={false}
            width={width * 1.1}
            height={height * 0.730}
            windowSize={3}
            data={
              DATA.filter((item) => {
                if (item.id >= 0 && item.id <= 113) {
                  return item.id;
                }
              })
            }
            scrollAnimationDuration={220}
            renderItem={({ item }) => (
              <View style={[styles.item, { height: viewHeight }]}>
                <View style={styles.titleContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.nome}</Text>
                    <Text style={styles.subTitle}>{item.ocupacao}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingRight: width * 0.025, justifyContent: 'flex-end' }}>
                    <IconButton
                      onPress={() => onShareQuote(item.nome, item.texto)}
                      icon='share'
                      iconColor={theme == false ? '#000' : '#e5e5e5'}
                      containerColor={theme == false ? '#e9e9e9' : '#191919'}
                      size={height * 0.038}
                      mode='contained-tonal'
                      animated={true}
                    />
                    {favorite?.find(value => value.id === item.id) ? (
                      <IconButton
                        onPress={() => removeFavorite(item)}
                        icon='cards-heart'
                        iconColor={theme == false ? '#000' : '#e5e5e5'}
                        containerColor={theme == false ? '#e9e9e9' : '#191919'}
                        size={height * 0.038}
                        mode='contained-tonal'
                        animated={true}
                      />

                    ) : (
                      <IconButton
                        onPress={() => saveFavorite(item)}
                        icon='cards-heart-outline'
                        iconColor={theme == false ? '#000' : '#e5e5e5'}
                        containerColor={theme == false ? '#e9e9e9' : '#191919'}
                        size={height * 0.038}
                        mode='contained-tonal'
                        animated={true}
                      />
                    )}
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.textContainer}>
                  <Text style={styles.texto}>{item.texto}</Text>
                  <Text style={styles.obra}>{item.obra}</Text>
                </View>
              </View>
            )}
          />
        )
      )}

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Snackbar
          visible={favVisible}
          duration={2000}
          onDismiss={onDismissFav}
          elevation={5}
          style={{ backgroundColor: theme == false ? '#323232' : '#e5e5e5', marginBottom: height * 0.009 }}
        >
          <Text style={{
            fontSize: fontScale * 14,
            color: theme == false ? '#fff' : '#323232',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
          >
            Adicionado aos Favoritos!
          </Text>
        </Snackbar>
        <Snackbar
          visible={removeVisible}
          duration={2000}
          onDismiss={onDismissRemov}
          elevation={5}
          style={{ backgroundColor: theme == false ? '#323232' : '#e5e5e5', marginBottom: height * 0.009 }}
        >
          <Text style={{
            fontSize: fontScale * 14,
            color: theme == false ? '#fff' : '#323232',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
          >
            Removido dos Favoritos!
          </Text>
        </Snackbar>
      </View>
    </SafeAreaView >
  );
}

export default MarcoScreen;