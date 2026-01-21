export interface PrayerTime {
  name: string;
  arabicName: string;
  time: Date;
  isNext: boolean;
  isCompleted: boolean;
}

export interface DailyPrayers {
  fajr: PrayerTime;
  dhuhr: PrayerTime;
  asr: PrayerTime;
  maghrib: PrayerTime;
  isha: PrayerTime;
}

const PRAYER_NAMES = {
  fajr: { english: "Fajr", arabic: "الفجر" },
  dhuhr: { english: "Dhuhr", arabic: "الظهر" },
  asr: { english: "Asr", arabic: "العصر" },
  maghrib: { english: "Maghrib", arabic: "المغرب" },
  isha: { english: "Isha", arabic: "العشاء" },
};

export function calculatePrayerTimes(
  latitude: number = 23.8103,
  longitude: number = 90.4125
): DailyPrayers {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const fajrTime = new Date(today);
  fajrTime.setHours(5, 15, 0);

  const dhuhrTime = new Date(today);
  dhuhrTime.setHours(12, 30, 0);

  const asrTime = new Date(today);
  asrTime.setHours(16, 0, 0);

  const maghribTime = new Date(today);
  maghribTime.setHours(18, 15, 0);

  const ishaTime = new Date(today);
  ishaTime.setHours(19, 45, 0);

  const prayers: DailyPrayers = {
    fajr: {
      name: PRAYER_NAMES.fajr.english,
      arabicName: PRAYER_NAMES.fajr.arabic,
      time: fajrTime,
      isNext: false,
      isCompleted: false,
    },
    dhuhr: {
      name: PRAYER_NAMES.dhuhr.english,
      arabicName: PRAYER_NAMES.dhuhr.arabic,
      time: dhuhrTime,
      isNext: false,
      isCompleted: false,
    },
    asr: {
      name: PRAYER_NAMES.asr.english,
      arabicName: PRAYER_NAMES.asr.arabic,
      time: asrTime,
      isNext: false,
      isCompleted: false,
    },
    maghrib: {
      name: PRAYER_NAMES.maghrib.english,
      arabicName: PRAYER_NAMES.maghrib.arabic,
      time: maghribTime,
      isNext: false,
      isCompleted: false,
    },
    isha: {
      name: PRAYER_NAMES.isha.english,
      arabicName: PRAYER_NAMES.isha.arabic,
      time: ishaTime,
      isNext: false,
      isCompleted: false,
    },
  };

  const prayerOrder: (keyof DailyPrayers)[] = [
    "fajr",
    "dhuhr",
    "asr",
    "maghrib",
    "isha",
  ];
  let nextPrayerSet = false;

  for (const prayerKey of prayerOrder) {
    if (!nextPrayerSet && prayers[prayerKey].time > now) {
      prayers[prayerKey].isNext = true;
      nextPrayerSet = true;
    }
  }

  if (!nextPrayerSet) {
    prayers.fajr.isNext = true;
  }

  return prayers;
}

export function formatPrayerTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getTimeUntilPrayer(prayerTime: Date): string {
  const now = new Date();
  let diff = prayerTime.getTime() - now.getTime();

  if (diff < 0) {
    const tomorrow = new Date(prayerTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    diff = tomorrow.getTime() - now.getTime();
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function getNextPrayer(prayers: DailyPrayers): PrayerTime | null {
  const prayerOrder: (keyof DailyPrayers)[] = [
    "fajr",
    "dhuhr",
    "asr",
    "maghrib",
    "isha",
  ];

  for (const key of prayerOrder) {
    if (prayers[key].isNext) {
      return prayers[key];
    }
  }

  return prayers.fajr;
}
