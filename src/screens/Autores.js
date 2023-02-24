import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale, ScaledSheet, s } from 'react-native-size-matters';
import { ThemeContext } from '../context/Context';
import Biografia from '../data/Biografia';



const Autores = () => {

    const [spinner, setSpinner] = useState(false);
    const { theme } = useContext(ThemeContext);

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

    const styles = ScaledSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme == false ? '#e9e9e9' : '#191919',
            paddingBottom: '66@mvs'
        },

        cardContainer: {
            padding: '9@ms',          
        },

        image: {
            height: '260@vs'
        },

        title: {
            fontSize: '19@s',
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
            marginLeft: '13@s',
            marginTop: '12@vs'
        },

        ocupacao: {
            fontSize: '14@s',
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
        },

        nascimento: {
            fontSize: '12@s',
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
        },

        idade: {
            fontSize: '12@s',
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
        },

        paragraph: {
            fontSize: '12@s',
            fontWeight: 'bold',
            color: theme == false ? '#000' : '#e5e5e5',
            marginTop: '14@vs',
            textAlign: 'left'
        },

        quoteBtn: {
            padding: '18@ms',
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
                        marginTop: verticalScale(110)
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
                                                size={scale(16)}
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
                                        <Text style={{ fontSize: scale(11) }}>Ir para citações</Text>
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