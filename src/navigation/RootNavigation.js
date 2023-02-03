import { TabActions, createNavigationContainerRef } from '@react-navigation/native';
import AS_IDs from '@react-native-async-storage/async-storage';
import notifee, {
    EventType,
    RepeatFrequency,
    TriggerType,
    AndroidImportance,
    AndroidVisibility,
    AndroidStyle,
} from '@notifee/react-native';
import DATA from '../data/Data';


export const navigationRef = createNavigationContainerRef();


export const ForegroundEvent = notifee.onForegroundEvent(async ({ type, detail }) => {

    const jumptToActions = TabActions.jumpTo('Início');

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

        navigationRef.current?.dispatch(jumptToActions);

    } else {
        return null;
    }

});



