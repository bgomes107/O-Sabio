import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    Share,
    useWindowDimensions
} from 'react-native';
import { Searchbar, Card, Title, Paragraph, IconButton, Snackbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DATA from '../data/Data';


const SearchScreen = () => {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState(DATA);
    const [favorite, setFavorite] = useState([]);
    const [favVisible, setFavVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { height, width, scale, fontScale } = useWindowDimensions();

    const favoriteSnackBar = () => setFavVisible(!favVisible);
    const removeSnackBar = () => setRemoveVisible(!removeVisible);
    const onDismissFav = () => setFavVisible(false);
    const onDismissRemov = () => setRemoveVisible(false);


    const isFocused = useIsFocused();

    useEffect(() => {
        renderFavorite();
    }, [isFocused]);


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


    const searchFilterFunction = (text) => {

        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.texto
                        ? item.texto.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                        : ''.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                    const textData = text.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {

            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };


    const ItemView = ({ item }) => {

        return (

            <View style={{ padding: height * 0.017, backgroundColor: theme == false ? '#e9e9e9' : '#191919' }}>
                <Card mode='elevated' style={{ backgroundColor: theme == false ? '#fff' : '#323232', padding: height * 0.006 }}>
                    <Title style={styles.title}>{item.nome}</Title>
                    <Card.Content>
                        <Paragraph style={styles.texto}>{item.texto}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Text style={styles.obra}>{item.obra}</Text>
                    </Card.Content>
                    <Card.Actions style={styles.btnArea}>
                        <IconButton
                            onPress={() => onShareQuote(item.nome, item.texto)}
                            icon='share'
                            iconColor={theme == false ? '#000' : '#e5e5e5'}
                            containerColor={theme == false ? '#e9e9e9' : '#191919'}
                            size={height * 0.032}
                            mode='contained-tonal'
                            animated={true}
                        />
                        {favorite?.find(value => value.id === item.id) ? (
                            <IconButton
                                onPress={() => removeFavorite(item)}
                                icon='cards-heart'
                                iconColor={theme == false ? '#000' : '#e5e5e5'}
                                containerColor={theme == false ? '#e9e9e9' : '#191919'}
                                size={height * 0.032}
                                mode='contained-tonal'
                                animated={true}
                            />

                        ) : (
                            <IconButton
                                onPress={() => saveFavorite(item)}
                                icon='cards-heart-outline'
                                iconColor={theme == false ? '#000' : '#e5e5e5'}
                                containerColor={theme == false ? '#e9e9e9' : '#191919'}
                                size={height * 0.032}
                                mode='contained-tonal'
                                animated={true}
                            />
                        )}
                    </Card.Actions>
                </Card>
            </View>
        );
    };

    // separador
    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: height * 0.001,
                    width: '100%',

                }}
            />
        );
    };


    const styles = StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor: theme == false ? '#e9e9e9' : '#191919',
            paddingBottom: height * 0.067
        },

        textInputStyle: {
            height: height * 0.060,
            backgroundColor: theme == false ? '#e9e9e9' : '#191919',
            borderTopColor: theme == false ? '#e9e9e9' : '#191919',

        },

        title: {
            fontSize: fontScale * 17,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
            marginLeft: width * 0.035
        },

        texto: {
            fontSize: fontScale * 15,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
            marginTop: height * 0.003,
        },

        obra: {
            fontSize: fontScale * 14,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
            marginTop: height * 0.02
        },

        btnArea: {
            flexDirection: 'row',           
        }
    });


    return (

        <SafeAreaView style={styles.container}>
            <Searchbar
                style={styles.textInputStyle}
                autoFocus={true}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                iconColor={theme == false ? '#000' : '#e5e5e5'}
                underlineColorAndroid="transparent"
                placeholder="O que você está pensando?"
                placeholderTextColor={theme == false ? '#7f7f7f' : '#666666'}
                clearIcon={() => (
                    <EvilIcons name='close' color={theme == false ? '#000' : '#e5e5e5'} size={height * 0.035} />
                )}
                inputStyle={{
                    fontSize: fontScale * 13,
                    color: theme == false ? '#000' : '#e5e5e5',
                    alignItems: 'center'
                }}
            />
            {search == 0 ? null : (
                <FlatList
                    data={filteredDataSource}
                    maxToRenderPerBatch={5}
                    initialNumToRender={5}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            )}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Snackbar
                    visible={favVisible}
                    duration={2000}
                    onDismiss={onDismissFav}
                    elevation={5}
                    style={{ backgroundColor: theme == false ? '#323232' : '#e5e5e5', marginBottom: height * -0.045 }}
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
                    style={{ backgroundColor: theme == false ? '#323232' : '#e5e5e5', marginBottom: height * -0.045 }}
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
        </SafeAreaView>
    );
};

export default SearchScreen;
