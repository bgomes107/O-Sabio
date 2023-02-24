import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Share,
  ActivityIndicator,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import { IconButton, Snackbar } from 'react-native-paper';
import { ThemeContext } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DATA from '../data/Data';


const EpitectoScreen = () => {

  const [viewHeight, setHeight] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [favVisible, setFavVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { theme } = useContext(ThemeContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    startLoading();
    renderFavorite();
  }, [isFocused]);

  // loading time
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

  const favoriteSnackBar = () => setFavVisible(!favVisible);
  const removeSnackBar = () => setRemoveVisible(!removeVisible);
  const onDismissFav = () => setFavVisible(false);
  const onDismissRemov = () => setRemoveVisible(false);

  const styles = ScaledSheet.create({

    container: {
      flex: 1,
      backgroundColor: theme == false ? '#e9e9e9' : '#191919',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: '70@mvs'
    },

    item: {
      backgroundColor: theme == false ? '#fff' : '#323232',
      padding: '6@ms',
      borderRadius: '12@s',
    },

    titleContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16@vs',
      marginLeft: '12@s',
      flexDirection: 'row'
    },

    title: {
      fontSize: '23@s',
      fontWeight: 'bold',
      color: theme == false ? '#000' : '#e5e5e5',
    },

    subTitle: {
      fontSize: '20@s',
      fontWeight: 'bold',
      color: theme == false ? '#000' : '#e5e5e5',
    },

    line: {
      backgroundColor: theme == false ? '#000' : '#e5e5e5',
      height: '0.8@vs',
      marginLeft: '12@s',
      marginRight: '12@s',
      marginTop: '16@vs'
    },

    textContainer: {
      flex: 1,
      padding: '12@ms'
    },

    texto: {
      fontSize: '16@s',
      fontWeight: 'bold',
      color: theme == false ? '#000' : '#e5e5e5',
      textAlign: 'left'
    },

    obra: {
      fontSize: '16@s',
      fontWeight: 'bold',
      color: theme == false ? '#000' : '#e5e5e5',
      marginTop: '15@vs'
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
            marginTop: verticalScale(180)
          }}
        />
      ) : (
        viewHeight && (
          <Carousel
            mode='parallax'
            pagingEnabled
            vertical={false}
            loop={false}
            width={scale(385)}
            height={verticalScale(536)}
            windowSize={3}
            data={
              DATA.filter((item) => {
                if (item.id >= 114 && item.id <= 133) {
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
                  <View style={{ flexDirection: 'row', paddingRight: moderateScale(18), justifyContent: 'flex-end' }}>
                    <IconButton
                      onPress={() => onShareQuote(item.nome, item.texto)}
                      icon='share'
                      iconColor={theme == false ? '#000' : '#e5e5e5'}
                      containerColor={theme == false ? '#e9e9e9' : '#191919'}
                      size={scale(24)}
                      mode='contained-tonal'
                      animated={true}
                    />
                    {favorite?.find(value => value.id === item.id) ? (
                      <IconButton
                        onPress={() => removeFavorite(item)}
                        icon='cards-heart'
                        iconColor={theme == false ? '#000' : '#e5e5e5'}
                        containerColor={theme == false ? '#e9e9e9' : '#191919'}
                        size={scale(24)}
                        mode='contained-tonal'
                        animated={true}
                      />

                    ) : (
                      <IconButton
                        onPress={() => saveFavorite(item)}
                        icon='cards-heart-outline'
                        iconColor={theme == false ? '#000' : '#e5e5e5'}
                        containerColor={theme == false ? '#e9e9e9' : '#191919'}
                        size={scale(24)}
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
          style={{ backgroundColor: theme == false ? '#323232' : '#e5e5e5', marginBottom: verticalScale(38) }}
        >
          <Text style={{
            fontSize: scale(12),
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
          style={{ backgroundColor: theme == false ? '#323232' : '#e5e5e5', marginBottom: verticalScale(38) }}
        >
          <Text style={{
            fontSize: scale(12),
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

export default EpitectoScreen;