import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    Share,
    Dimensions,
    useWindowDimensions
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title, Paragraph, IconButton, Snackbar } from 'react-native-paper';


const Favoritos = () => {

    const [dataId, setDataId] = useState([]);
    const [removeVisible, setRemoveVisible] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const { theme } = useContext(ThemeContext);
    const { height, width, scale, fontScale } = useWindowDimensions();

    const isFocused = useIsFocused();

    useEffect(() => {
        fetchFavorite();
    }, [isFocused]);

    // compartilha a citacao
    const onShareQuote = async (nome, texto) => {
        await Share.share({
            title: nome,
            message: texto,
        });
    };


    // busca o data no asyncstorage
    const fetchFavorite = async () => {
        const token = await AsyncStorage.getItem('@ID');
        const res = JSON.parse(token);
        // setisloading(true);
        if (res) {
            setDataId(res);
            console.log(res);
            // setisloading(false);
        } else {
            setDataId([]);
            // setisloading(false);
        }

    };

    // remove a citacao dos favoritos
    const removeFavorite = async (data_quotes) => {

        try {
            const quote = await AsyncStorage.getItem('@ID');
            let quoteFav = JSON.parse(quote);
            const quoteItems = quoteFav.filter((e) => {
                return e.id !== data_quotes.id
            });
            setDataId(quoteItems);
            await AsyncStorage.setItem('@ID', JSON.stringify(quoteItems));
            removeSnackBar();
            console.log(quoteItems);
        } catch (error) {
            console.log(error)
        }

    };

    // separador
    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: height * 0.005,
                }}
            />
        );
    };

    const removeSnackBar = () => setRemoveVisible(!removeVisible);
    const onDismissRemov = () => setRemoveVisible(false);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme == false ? '#e9e9e9' : '#191919',
            flex: 1,
            paddingBottom: height * 0.065
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
            marginTop: height * 0.03
        },

        obra: {
            fontSize: fontScale * 14,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
            marginTop: height * 0.0400
        },

        btnArea: {
            flexDirection: 'row',
            paddingTop: height * 0.015,
            justifyContent: 'space-between'
        }
    });


    return (
        <SafeAreaView style={styles.container}>
            {dataId.length == 0 ? (
                <View style={{
                    flex: 1, backgroundColor: theme == false ? '#e9e9e9' : '#191919',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: fontScale * 16,
                        fontWeight: 'bold',
                        color: theme == false ? '#000' : '#e5e5e5'
                    }}>
                        Não foram encontrados favoritos
                    </Text>
                </View>

            ) : (
                <FlatList
                    data={dataId}
                    keyExtractor={(item, index) => String(index)}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={({ index, item }) => (
                        <View style={{ padding: height * 0.017 }}>
                            <Card style={{ backgroundColor: theme == false ? '#fff' : '#323232', padding: height * 0.006 }}>
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

                                    <IconButton
                                        onPress={() => removeFavorite(item)}
                                        icon='delete'
                                        iconColor={theme == false ? '#000' : '#e5e5e5'}
                                        containerColor={theme == false ? '#e9e9e9' : '#191919'}
                                        size={height * 0.032}
                                        mode='contained-tonal'
                                        animated={true}
                                    />

                                </Card.Actions>
                            </Card>
                        </View>
                    )}
                />
            )}
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

        </SafeAreaView>
    );
};

export default Favoritos;
