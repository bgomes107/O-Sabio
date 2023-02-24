import React, { useContext } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Share,
    ScrollView,
    Linking,
    Alert,
} from 'react-native';
import AS_THEME from '@react-native-async-storage/async-storage';
import { Divider, List } from 'react-native-paper';
import { scale, verticalScale, moderateScale, moderateVerticalScale, ScaledSheet } from 'react-native-size-matters';
import { useInAppPurchase } from '../hooks/useInAppPurchase';
import { ThemeContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import Toggle from "react-native-toggle-element";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Menu = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const {
        isFullAppPurchased,
        connectionErrorMsg,
        purchaseFullApp,
    } = useInAppPurchase();

    const navigation = useNavigation();

    // compartilha o link do app
    const onShareApp = async () => {
        Share.share({
            title: 'O Sábio',
            message: 'App compartilhado',
        })
    }


    // encaminha o usuario para avaliar o app na Play Store
    const onShareRate = async () => {

        const url = '';
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Esse link não é suportado no seu dispositivo');
        }
    }


    // encaminha o usuario para o gmail
    const onShareFeedback = async () => {

        const url = 'mailto:bgomes107fox@gmail.com';
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Esse link não é suportado no seu dispositivo');
        }
    }

    // muda e salva o tema
    const toggleTheme = async () => {

        const value = JSON.stringify(!theme);
        await AS_THEME.setItem("@Theme", value);
        setTheme(theme => !theme);
        console.log(value);
    }

    const styles = ScaledSheet.create({

        modoNoturno: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '10@s',
            marginTop: '12@vs'
        }
    });


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme == false ? '#e9e9e9' : '#191919', justifyContent: 'center', paddingBottom: moderateVerticalScale(80) }}>
            <View >
                <Text style={{
                    fontSize: scale(75),
                    color: theme == false ? '#000' : '#e5e5e5',
                    fontFamily: 'Greek Mythology',
                    textAlign: 'center'
                }}>
                    C
                </Text>
            </View>
            <View style={{ marginLeft: scale(10) }}>
                <List.Section style={{ marginTop: 2 }}>
                    <List.Item
                        title='Compartilhe'
                        titleStyle={{ fontWeight: 'bold', fontSize: scale(12), color: theme == false ? '#000' : '#e5e5e5' }}
                        description='Compartilhe filosofia com os amigos.'
                        descriptionStyle={{ fontSize: scale(10), color: theme == false ? '#000' : '#e5e5e5' }}
                        left={() => <List.Icon color={theme == false ? '#000' : '#e5e5e5'} icon='share-variant-outline' />}
                        onPress={onShareApp}
                    />
                    <List.Item
                        title='Avalie'
                        titleStyle={{ fontWeight: 'bold', fontSize: scale(12), color: theme == false ? '#000' : '#e5e5e5' }}
                        description='Avalie o aplicativo na Play Store.'
                        descriptionStyle={{ fontSize: scale(10), color: theme == false ? '#000' : '#e5e5e5' }}
                        left={() => <List.Icon color={theme == false ? '#000' : '#e5e5e5'} icon='star' />}
                        onPress={onShareRate}
                    />
                    <List.Item
                        title='Envie um feedback'
                        titleStyle={{ fontWeight: 'bold', fontSize: scale(12), color: theme == false ? '#000' : '#e5e5e5' }}
                        description='Sua opinião é importante para aperfeiçoarmos nosso trabalho.'
                        descriptionStyle={{ fontSize: scale(10), color: theme == false ? '#000' : '#e5e5e5' }}
                        left={() => <List.Icon color={theme == false ? '#000' : '#e5e5e5'} icon='email' />}
                        theme={{ color: theme == false ? '#000' : '#e5e5e5' }}
                        onPress={onShareFeedback}
                    />
                    {isFullAppPurchased ? null : (
                        <List.Item
                            title='Remova os anúncios'
                            titleStyle={{ fontWeight: 'bold', fontSize: scale(12), color: theme == false ? '#000' : '#e5e5e5' }}
                            descriptionStyle={{ fontSize: scale(10), color: theme == false ? '#000' : '#e5e5e5' }}
                            left={() => <List.Icon color={theme == false ? '#000' : '#e5e5e5'} icon='advertisements-off' />}
                            onPress={() => purchaseFullApp()}
                        />
                    )}
                </List.Section>
            </View>
            <Divider />
            <View style={{ marginLeft: scale(10) }}>
                <List.Item
                    title='Notificações'
                    titleStyle={{ fontWeight: 'bold', fontSize: scale(12), color: theme == false ? '#000' : '#e5e5e5' }}
                    description='Agende um horário para receber citações aleatórias diariamente.'
                    descriptionStyle={{ fontSize: scale(10), color: theme == false ? '#000' : '#e5e5e5' }}
                    left={() => <List.Icon color={theme == false ? '#000' : '#e5e5e5'} icon='clock-edit' />}
                    onPress={() => navigation.navigate('Modal')}
                />
            </View>
            <View style={styles.modoNoturno}>
                <Text style={{ fontWeight: 'bold', fontSize: scale(12), color: theme == false ? '#000' : '#e5e5e5' }}>Modo escuro</Text>
                <View style={{ marginLeft: scale(30) }}>
                    <Toggle
                        value={theme}
                        onPress={() => toggleTheme()}
                        thumbActiveComponent={
                            <Ionicons name="moon" size={scale(15)} color='#fff' fill={"#3BD2B5"} />
                        }
                        thumbInActiveComponent={
                            <Ionicons name="sunny" size={scale(15)} color='#fff' fill={"#03452C"} />
                        }
                        trackBar={{
                            activeBackgroundColor: "#9c27b0",
                            inActiveBackgroundColor: "#0033ff",
                            borderActiveColor: "#673ab7",
                            borderInActiveColor: "#03a9f4",
                            borderWidth: scale(4),
                            width: scale(58),
                            height: verticalScale(28),
                        }}
                        thumbButton={{
                            width: scale(30),
                            height: verticalScale(30),
                            radius: moderateScale(12),
                            activeBackgroundColor: '#673ab7',
                            inActiveBackgroundColor: '#03a9f4'
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Menu;