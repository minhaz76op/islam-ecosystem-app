export interface PrayerTimesResult {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

export interface CalculationMethod {
  name: string;
  fajrAngle: number;
  ishaAngle: number;
  maghribMinutes?: number;
  ishaMinutes?: number;
}

export const CALCULATION_METHODS: Record<string, CalculationMethod> = {
  karachi: {
    name: "University of Islamic Sciences, Karachi",
    fajrAngle: 18,
    ishaAngle: 18,
  },
  isna: {
    name: "Islamic Society of North America (ISNA)",
    fajrAngle: 15,
    ishaAngle: 15,
  },
  mwl: {
    name: "Muslim World League",
    fajrAngle: 18,
    ishaAngle: 17,
  },
  makkah: {
    name: "Umm al-Qura University, Makkah",
    fajrAngle: 18.5,
    ishaAngle: 0,
    ishaMinutes: 90,
  },
  egypt: {
    name: "Egyptian General Authority of Survey",
    fajrAngle: 19.5,
    ishaAngle: 17.5,
  },
  tehran: {
    name: "Institute of Geophysics, Tehran",
    fajrAngle: 17.7,
    ishaAngle: 14,
    maghribMinutes: 4.5,
  },
  jafari: {
    name: "Shia Ithna-Ashari, Leva Institute, Qum",
    fajrAngle: 16,
    ishaAngle: 14,
    maghribMinutes: 4,
  },
};

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function sin(d: number): number {
  return Math.sin(toRadians(d));
}

function cos(d: number): number {
  return Math.cos(toRadians(d));
}

function tan(d: number): number {
  return Math.tan(toRadians(d));
}

function arcsin(x: number): number {
  return toDegrees(Math.asin(x));
}

function arccos(x: number): number {
  return toDegrees(Math.acos(x));
}

function arctan2(y: number, x: number): number {
  return toDegrees(Math.atan2(y, x));
}

function fixAngle(angle: number): number {
  angle = angle - 360 * Math.floor(angle / 360);
  return angle < 0 ? angle + 360 : angle;
}

function fixHour(hour: number): number {
  hour = hour - 24 * Math.floor(hour / 24);
  return hour < 0 ? hour + 24 : hour;
}

function julianDate(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function sunPosition(jd: number): { declination: number; equation: number } {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * sin(g) + 0.02 * sin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = arctan2(cos(e) * sin(L), cos(L)) / 15;
  const declination = arcsin(sin(e) * sin(L));
  const equation = q / 15 - fixHour(RA);
  return { declination, equation };
}

function computePrayerTime(
  angle: number,
  time: number,
  latitude: number,
  declination: number,
  direction: number
): number {
  const D = cos(angle) - sin(latitude) * sin(declination);
  const N = cos(latitude) * cos(declination);
  const hourAngle = arccos(D / N) / 15;
  return time + (direction === 1 ? -hourAngle : hourAngle);
}

function computeMidDay(time: number, equation: number): number {
  return fixHour(12 - equation);
}

function computeAsr(step: number, time: number, latitude: number, declination: number): number {
  const D = arccos(
    (sin(arccos(1 / (step + tan(Math.abs(latitude - declination))))) -
      sin(latitude) * sin(declination)) /
      (cos(latitude) * cos(declination))
  );
  return time + D / 15;
}

export function calculatePrayerTimesForLocation(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  method: string = "karachi",
  asrJuristic: number = 0
): PrayerTimesResult {
  const calcMethod = CALCULATION_METHODS[method] || CALCULATION_METHODS.karachi;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const timeZone = -date.getTimezoneOffset() / 60;

  const jDate = julianDate(year, month, day) - longitude / (15 * 24);
  const { declination, equation } = sunPosition(jDate + 0.5);

  const dhuhrTime = computeMidDay(0.5, equation) + timeZone - longitude / 15;
  const sunriseTime = computePrayerTime(0.833, dhuhrTime, latitude, declination, 1);
  const sunsetTime = computePrayerTime(0.833, dhuhrTime, latitude, declination, 0);

  const fajrTime = computePrayerTime(calcMethod.fajrAngle, dhuhrTime, latitude, declination, 1);
  const asrTime = computeAsr(asrJuristic === 0 ? 1 : 2, dhuhrTime, latitude, declination);
  
  let maghribTime = sunsetTime;
  if (calcMethod.maghribMinutes) {
    maghribTime = sunsetTime + calcMethod.maghribMinutes / 60;
  }

  let ishaTime: number;
  if (calcMethod.ishaMinutes) {
    ishaTime = maghribTime + calcMethod.ishaMinutes / 60;
  } else {
    ishaTime = computePrayerTime(calcMethod.ishaAngle, dhuhrTime, latitude, declination, 0);
  }

  const baseDate = new Date(year, month - 1, day);

  const toDate = (hours: number): Date => {
    const result = new Date(baseDate);
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    result.setHours(h, m, 0, 0);
    return result;
  };

  return {
    fajr: toDate(fajrTime),
    sunrise: toDate(sunriseTime),
    dhuhr: toDate(dhuhrTime),
    asr: toDate(asrTime),
    maghrib: toDate(maghribTime),
    isha: toDate(ishaTime),
  };
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getTimeUntil(targetTime: Date): string {
  const now = new Date();
  let diff = targetTime.getTime() - now.getTime();

  if (diff < 0) {
    const tomorrow = new Date(targetTime);
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

export function getNextPrayerFromTimes(
  times: PrayerTimesResult
): { name: string; arabicName: string; time: Date } | null {
  const now = new Date();
  const prayers = [
    { name: "Fajr", arabicName: "الفجر", time: times.fajr },
    { name: "Dhuhr", arabicName: "الظهر", time: times.dhuhr },
    { name: "Asr", arabicName: "العصر", time: times.asr },
    { name: "Maghrib", arabicName: "المغرب", time: times.maghrib },
    { name: "Isha", arabicName: "العشاء", time: times.isha },
  ];

  for (const prayer of prayers) {
    if (prayer.time > now) {
      return prayer;
    }
  }

  return prayers[0];
}
