export interface IslamicDate {
  day: number;
  month: number;
  monthName: string;
  monthNameArabic: string;
  year: number;
}

export interface IslamicHoliday {
  name: string;
  nameArabic: string;
  description: string;
  islamicMonth: number;
  islamicDay: number;
  type: "major" | "minor" | "fasting";
}

const ISLAMIC_MONTHS = [
  { name: "Muharram", arabic: "محرم" },
  { name: "Safar", arabic: "صفر" },
  { name: "Rabi al-Awwal", arabic: "ربيع الأول" },
  { name: "Rabi al-Thani", arabic: "ربيع الثاني" },
  { name: "Jumada al-Awwal", arabic: "جمادى الأولى" },
  { name: "Jumada al-Thani", arabic: "جمادى الثانية" },
  { name: "Rajab", arabic: "رجب" },
  { name: "Shaban", arabic: "شعبان" },
  { name: "Ramadan", arabic: "رمضان" },
  { name: "Shawwal", arabic: "شوال" },
  { name: "Dhul Qadah", arabic: "ذو القعدة" },
  { name: "Dhul Hijjah", arabic: "ذو الحجة" },
];

export const ISLAMIC_HOLIDAYS: IslamicHoliday[] = [
  {
    name: "Islamic New Year",
    nameArabic: "رأس السنة الهجرية",
    description: "First day of Muharram, marking the beginning of the Islamic calendar year",
    islamicMonth: 1,
    islamicDay: 1,
    type: "major",
  },
  {
    name: "Day of Ashura",
    nameArabic: "يوم عاشوراء",
    description: "10th of Muharram, a day of fasting commemorating Moses and the Israelites",
    islamicMonth: 1,
    islamicDay: 10,
    type: "fasting",
  },
  {
    name: "Mawlid al-Nabi",
    nameArabic: "المولد النبوي",
    description: "Birth of Prophet Muhammad (PBUH)",
    islamicMonth: 3,
    islamicDay: 12,
    type: "major",
  },
  {
    name: "Isra and Mi'raj",
    nameArabic: "الإسراء والمعراج",
    description: "Night Journey of Prophet Muhammad (PBUH)",
    islamicMonth: 7,
    islamicDay: 27,
    type: "major",
  },
  {
    name: "Shab-e-Barat",
    nameArabic: "ليلة البراءة",
    description: "Night of Forgiveness, 15th of Shaban",
    islamicMonth: 8,
    islamicDay: 15,
    type: "minor",
  },
  {
    name: "First Day of Ramadan",
    nameArabic: "أول أيام رمضان",
    description: "Beginning of the holy month of fasting",
    islamicMonth: 9,
    islamicDay: 1,
    type: "major",
  },
  {
    name: "Laylat al-Qadr",
    nameArabic: "ليلة القدر",
    description: "Night of Power, better than a thousand months",
    islamicMonth: 9,
    islamicDay: 27,
    type: "major",
  },
  {
    name: "Eid al-Fitr",
    nameArabic: "عيد الفطر",
    description: "Festival of Breaking the Fast, end of Ramadan",
    islamicMonth: 10,
    islamicDay: 1,
    type: "major",
  },
  {
    name: "Day of Arafah",
    nameArabic: "يوم عرفة",
    description: "9th of Dhul Hijjah, the best day for fasting",
    islamicMonth: 12,
    islamicDay: 9,
    type: "fasting",
  },
  {
    name: "Eid al-Adha",
    nameArabic: "عيد الأضحى",
    description: "Festival of Sacrifice, commemorating Ibrahim's devotion",
    islamicMonth: 12,
    islamicDay: 10,
    type: "major",
  },
];

export function gregorianToIslamic(date: Date): IslamicDate {
  const jd = gregorianToJulian(date);
  return julianToIslamic(jd);
}

function gregorianToJulian(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4);
  jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  return jd;
}

function julianToIslamic(jd: number): IslamicDate {
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
            Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
             Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;

  return {
    day,
    month,
    monthName: ISLAMIC_MONTHS[month - 1]?.name || "",
    monthNameArabic: ISLAMIC_MONTHS[month - 1]?.arabic || "",
    year,
  };
}

export function islamicToGregorian(year: number, month: number, day: number): Date {
  const jd = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month -
             Math.floor((month - 1) / 2) + day + 1948440 - 385;
  return julianToGregorian(jd);
}

function julianToGregorian(jd: number): Date {
  let l = jd + 68569;
  let n = Math.floor((4 * l) / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  let i = Math.floor((4000 * (l + 1)) / 1461001);
  l = l - Math.floor((1461 * i) / 4) + 31;
  let j = Math.floor((80 * l) / 2447);
  let day = l - Math.floor((2447 * j) / 80);
  l = Math.floor(j / 11);
  let month = j + 2 - 12 * l;
  let year = 100 * (n - 49) + i + l;

  return new Date(year, month - 1, day);
}

export function getHolidaysForIslamicDate(islamicDate: IslamicDate): IslamicHoliday[] {
  return ISLAMIC_HOLIDAYS.filter(
    (holiday) =>
      holiday.islamicMonth === islamicDate.month &&
      holiday.islamicDay === islamicDate.day
  );
}

export function getHolidaysInMonth(islamicMonth: number): IslamicHoliday[] {
  return ISLAMIC_HOLIDAYS.filter(
    (holiday) => holiday.islamicMonth === islamicMonth
  );
}

export function formatIslamicDate(islamicDate: IslamicDate): string {
  return `${islamicDate.day} ${islamicDate.monthName} ${islamicDate.year} AH`;
}

export function formatIslamicDateArabic(islamicDate: IslamicDate): string {
  return `${islamicDate.day} ${islamicDate.monthNameArabic} ${islamicDate.year} هـ`;
}

export function getUpcomingHolidays(limit: number = 5): { holiday: IslamicHoliday; gregorianDate: Date }[] {
  const today = new Date();
  const todayIslamic = gregorianToIslamic(today);
  const upcoming: { holiday: IslamicHoliday; gregorianDate: Date; daysAway: number }[] = [];

  for (const holiday of ISLAMIC_HOLIDAYS) {
    let year = todayIslamic.year;
    if (
      holiday.islamicMonth < todayIslamic.month ||
      (holiday.islamicMonth === todayIslamic.month && holiday.islamicDay < todayIslamic.day)
    ) {
      year += 1;
    }

    const gregorianDate = islamicToGregorian(year, holiday.islamicMonth, holiday.islamicDay);
    const daysAway = Math.ceil((gregorianDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysAway >= 0) {
      upcoming.push({ holiday, gregorianDate, daysAway });
    }
  }

  upcoming.sort((a, b) => a.daysAway - b.daysAway);
  return upcoming.slice(0, limit).map(({ holiday, gregorianDate }) => ({ holiday, gregorianDate }));
}

export function getDaysInIslamicMonth(month: number): number {
  return month % 2 === 1 ? 30 : 29;
}

export function getIslamicMonthName(month: number): { name: string; arabic: string } {
  return ISLAMIC_MONTHS[month - 1] || { name: "", arabic: "" };
}
