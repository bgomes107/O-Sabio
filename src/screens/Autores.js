import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../context/Context';
import Biografia from '../data/Biografia';



const Autores = () => {

    const [spinner, setSpinner] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { height, width, scale, fontScale } = useWindowDimensions();

    const navigation = useNavigation();


    useEffect(() => {
        startLoading();
    }, []);

    // loading time spinner
    const startLoading = () => {

        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 500);

    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme == false ? '#e9e9e9' : '#191919',
            paddingBottom: height * 0.075,
        },

        cardContainer: {
            padding: height * 0.02,
        },

        image: {
            height: height * 0.45
        },

        title: {
            fontSize: fontScale * 18,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
            marginLeft: width * 0.03,
            marginTop: height * 0.03
        },

        ocupacao: {
            fontSize: fontScale * 16,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
        },

        nascimento: {
            fontSize: fontScale * 15,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
        },

        idade: {
            fontSize: fontScale * 15,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
        },

        paragraph: {
            fontSize: fontScale * 14,
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
            marginTop: height * 0.03,
            textAlign: 'left'
        },

        quoteBtn: {
            padding: height * 0.03,
        }

    })

    return (
        <SafeAreaView style={styles.container}>
            {spinner ? (
                <ActivityIndicator
                    animating={true}
                    size='large'
                    color={theme == false ? '#0033ff' : '#e5e5e5'}
                    style={{
                        flex: 1,
                        marginTop: height * 0.065
                    }}
                />
            ) : (
                <FlatList
                    data={Biografia}
                    decelerationRate='fast'
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <Card style={{ backgroundColor: theme == false ? '#fff' : '#323232' }}>
                                <Card.Cover style={styles.image} source={item.imagem} />
                                <Title style={styles.title} >{item.nome}</Title>
                                <Card.Content>
                                    <Text style={styles.ocupacao}>{item.ocupacao}</Text>
                                    <Text style={styles.nascimento}>{item.nascimento}</Text>
                                    <Text style={styles.idade}>{item.idade}</Text>
                                </Card.Content>
                                <Card.Content>
                                    <Paragraph style={styles.paragraph}>{item.bio}</Paragraph>
                                </Card.Content>
                                <Card.Actions style={styles.quoteBtn}>
                                    <Button
                                        buttonColor={theme == false ? '#e9e9e9' : '#191919'}
                                        textColor={theme == false ? '#000' : '#e5e5e5'}
                                        icon={() => (
                                            <FontAwesome
                                                name='book'
                                                color={theme == false ? '#000' : '#e5e5e5'}
                                                size={height * 0.025}
                                            />
                                        )}
                                        mode='contained'
                                        onPress={() => {
                                            if (item.id === '0') {
                                                navigation.navigate('MarcoScreen');
                                            } else if (item.id === '1') {
                                                navigation.navigate('SenecaScreen');
                                            } else {
                                                navigation.navigate('EpitectoScreen');
                                            }
                                        }}>
                                        <Text style={{ fontSize: fontScale * 12 }}>Ir para citações</Text>
                                    </Button>
                                </Card.Actions>
                            </Card>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

export default Autores;