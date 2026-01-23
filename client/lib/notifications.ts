import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { PrayerTimesResult } from "./prayer-calculator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("prayer-reminders", {
      name: "Prayer Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#064E3B",
      sound: "default",
    });

    await Notifications.setNotificationChannelAsync("fajr-alarm", {
      name: "Fajr Alarm",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 500, 250, 500],
      lightColor: "#D4AF37",
      sound: "default",
    });
  }

  return true;
}

export async function schedulePrayerNotifications(
  prayerTimes: PrayerTimesResult,
  reminderMinutes: number = 15
): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const prayers = [
    { name: "Fajr", arabicName: "الفجر", time: prayerTimes.fajr },
    { name: "Dhuhr", arabicName: "الظهر", time: prayerTimes.dhuhr },
    { name: "Asr", arabicName: "العصر", time: prayerTimes.asr },
    { name: "Maghrib", arabicName: "المغرب", time: prayerTimes.maghrib },
    { name: "Isha", arabicName: "العشاء", time: prayerTimes.isha },
  ];

  const now = new Date();

  for (const prayer of prayers) {
    const reminderTime = new Date(prayer.time.getTime() - reminderMinutes * 60 * 1000);

    if (reminderTime > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${prayer.name} Prayer Approaching`,
          body: `${prayer.name} (${prayer.arabicName}) is in ${reminderMinutes} minutes. Prepare for prayer.`,
          sound: true,
          data: { prayer: prayer.name, type: "reminder" },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: reminderTime,
        },
      });
    }

    if (prayer.time > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Time for ${prayer.name} Prayer`,
          body: `${prayer.name} (${prayer.arabicName}) - It's time to pray. Allahu Akbar!`,
          sound: true,
          data: { prayer: prayer.name, type: "azan" },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: prayer.time,
        },
      });
    }
  }
}

export async function scheduleFajrAlarm(fajrTime: Date): Promise<void> {
  const now = new Date();

  if (fajrTime > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Fajr Alarm",
        body: "Wake up for Fajr prayer. The dawn has broken!",
        sound: true,
        data: { prayer: "Fajr", type: "alarm" },
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: fajrTime,
        channelId: "fajr-alarm",
      },
    });
  }
}

export async function scheduleIslamicEventNotification(
  eventName: string,
  eventDate: Date,
  description: string
): Promise<void> {
  const reminderDate = new Date(eventDate);
  reminderDate.setDate(reminderDate.getDate() - 1);
  reminderDate.setHours(18, 0, 0, 0);

  const now = new Date();

  if (reminderDate > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Tomorrow: ${eventName}`,
        body: description,
        sound: true,
        data: { type: "islamic-event", event: eventName },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminderDate,
      },
    });
  }
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  return await Notifications.getAllScheduledNotificationsAsync();
}
