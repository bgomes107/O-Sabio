/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, {
    AndroidImportance,
    AndroidVisibility,
    AndroidStyle,
    EventType,
    TriggerType,
    RepeatFrequency
} from '@notifee/react-native';
import { navigationRef } from './src/navigation/RootNavigation';
import AS_IDs from '@react-native-async-storage/async-storage';
import { TabActions } from '@react-navigation/native';
import DATA from './src/data/Data';

notifee.onBackgroundEvent(async ({ type, detail }) => {

    if (type === EventType.DELIVERED) {

        const time = new Date(Date.now());

        const id = await AS_IDs.getItem('@id');

        await notifee.cancelTriggerNotification(id);

        if (id) await AS_IDs.removeItem('@id');

        const item = DATA[Math.floor(Math.random() * DATA.length)];

        const channelId = await notifee.createChannel({
            id: 'quotes',
            name: 'random_quotes',
        });

        const trigger = {

            type: TriggerType.TIMESTAMP,
            timestamp: time.setTime(time.getTime() + (24 * 60 * 60 * 1000)),
            alarmManager: {
                allowWhileIdle: true,
            },
            repeatFrequency: RepeatFrequency.DAILY,

        };

        await notifee.createTriggerNotification(

            {
                id: item.id,
                title: item.nome,
                android: {
                    style: {
                        type: AndroidStyle.BIGTEXT,
                        text: item.texto
                    },
                    channelId,
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
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
        await AS_IDs.setItem('@id', item.id);

    } else if (type === EventType.PRESS && navigationRef.isReady()) {

        const jumptToActions = TabActions.jumpTo('Início');
        navigationRef.current?.dispatch(jumptToActions);

    } else {

        return null;
    };

});

AppRegistry.registerComponent(appName, () => App);