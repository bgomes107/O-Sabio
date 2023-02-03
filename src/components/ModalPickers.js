import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import Datepicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TriggerType,
  AndroidVisibility,
  AndroidStyle,
} from '@notifee/react-native';
import { Snackbar } from 'react-native-paper';
import { ThemeContext } from '../context/Context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AS_IDs from '@react-native-async-storage/async-storage';
import AS_STATUS from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DATA from '../data/Data';


export const ModalPickers = () => {

  const [status, setStatus] = useState('false');
  const [favVisible, setFavVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [dates, setDates] = useState(new Date(Date.now()));
  const [notificationIds, setNotificationIds] = useState('');
  const { theme } = useContext(ThemeContext);
  const { height, width, scale, fontScale } = useWindowDimensions();


  useEffect(() => {
    renderId();
  }, []);


  const navigation = useNavigation();

  // fecha a tela
  const goBack = () => {
    navigation.goBack();
  };


  // agenda as notificações
  const onCreateTriggerNotification = async () => {

    const channelId = await notifee.createChannel({
      id: 'quotes',
      name: 'random_quotes',
    });

    const trigger = {

      type: TriggerType.TIMESTAMP,
      timestamp: dates?.getTime(),
      alarmManager: {
        allowWhileIdle: true,
      },
      repeatFrequency: RepeatFrequency.DAILY,

    };


    const item = DATA[Math.floor(Math.random() * DATA.length)];

    await notifee.createTriggerNotification(

      {
        id: item.id,
        title: item.nome,
        android: {
          style: {
            type: AndroidStyle.BIGTEXT,
            text: item.texto,
          },
          channelId,
          pressAction: {
            id: 'default',
            launchActivity: 'default'
          },
          importance: AndroidImportance.HIGH,
          showTimestamp: true,
          visibility: AndroidVisibility.PUBLIC,
          sound: 'default',
          smallIcon: '@mipmap/small_icon',
          color: '#0033ff'
        }
      },
      trigger,
    );

    await AS_STATUS.setItem('@status', 'true');
    await AS_IDs.setItem('@id', item.id);
    setNotificationIds(item.id);
    setStatus('true');
    scheduleSnackBar();

  };


  // renderiza o id para poder desabilitar depois
  const renderId = async () => {

    const id = await AS_IDs.getItem('@id');
    const stats = await AS_STATUS.getItem('@status');

    setStatus(stats);
    setNotificationIds(id);

    console.log(id);
    console.log(stats);

  };


  // desabilita as notificacoes
  const cancelNotifications = async () => {

    if (notificationIds && status === 'true') {

      await AS_IDs.removeItem('@id');
      await notifee.cancelTriggerNotification(notificationIds);
      disableSnackBar();

    }

    await AS_STATUS.setItem('@status', 'false');
    setStatus('false');

  };


  const scheduleSnackBar = () => setFavVisible(!favVisible);
  const disableSnackBar = () => setRemoveVisible(!removeVisible);
  const onDismissFav = () => setFavVisible(false);
  const onDismissRemov = () => setRemoveVisible(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme == false ? '#e9e9e9' : '#191919',
    },

    datePickerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: height * 0.09,
    },

    btnArea: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingTop: height * 0.080,
      flexDirection: 'row',
    },

    btnDesab: {
      width: width * 0.4,
      height: height * 0.045,
      borderRadius: height * 0.008,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },

    btnAgend: {
      width: width * 0.4,
      height: height * 0.045,
      borderRadius: height * 0.008,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },

    btnAgendado: {
      width: width * 0.4,
      height: height * 0.045,
      borderRadius: height * 0.008,
      backgroundColor: '#4caf50',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },

    closeArea: {
      alignItems: 'center',
      paddingTop: height * 0.080,
    },

    btnClose: {
      width: width * 0.85,
      height: height * 0.045,
      borderRadius: height * 0.008,
      backgroundColor: '#ff0000',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    }

  });


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.datePickerContainer}>
        <Text style={{
          paddingBottom: height * 0.025,
          fontWeight: 'bold',
          color: theme == false ? '#000' : '#e5e5e5',
          fontSize: fontScale * 12,
        }}
        >
          Selecione a hora
        </Text>
        <Datepicker
          mode='time'
          is24hourSource='device'
          fadeToColor={theme == false ? '#e9e9e9' : '#191919'}
          textColor={theme == false ? '#000' : '#e5e5e5'}
          androidVariant='iosClone'
          date={dates}
          onDateChange={date => setDates(date)}
          style={{height: height * 0.22}}
        />
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity
          onPress={() => cancelNotifications()}
          style={styles.btnDesab}>
          <MaterialIcons
            name='alarm-off'
            color='#000'
            size={height * 0.025}
            style={{ marginRight: width * 0.02 }}
          />
          <Text style={{
            fontSize: fontScale * 14,
            fontWeight: 'bold',
            color: '#000'
          }}>
            Desabilitar
          </Text>
        </TouchableOpacity>
        {status == 'true' ? (
          <TouchableOpacity
            style={styles.btnAgendado}>
            <MaterialIcons
              name='alarm-on'
              color='#fff'
              size={height * 0.025}
              style={{ marginRight: width * 0.02 }}
            />
            <Text style={{
              fontSize: fontScale * 14,
              fontWeight: 'bold',
              color: '#fff'
            }}>
              Agendado
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onCreateTriggerNotification()}
            style={styles.btnAgend}>
            <MaterialIcons
              name='add-alarm'
              color='#000'
              size={height * 0.025}
              style={{ marginRight: width * 0.02 }}
            />
            <Text style={{
              fontSize: fontScale * 14,
              fontWeight: 'bold',
              color: '#000'
            }}>
              Agendar
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.closeArea}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={styles.btnClose}>
          <FontAwesome
            name='close'
            color='#fff'
            size={height * 0.025}
            style={{ marginRight: width * 0.02 }}
          />
          <Text style={{
            fontSize: height * 0.021,
            fontWeight: 'bold',
            color: '#fff'
          }}>
            Fechar
          </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={favVisible}
        duration={2500}
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
          Notificações agendadas com sucesso!
        </Text>
      </Snackbar>
      <Snackbar
        visible={removeVisible}
        duration={2500}
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
          As notificações foram desabilitadas!
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};