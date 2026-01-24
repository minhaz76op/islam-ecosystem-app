const fs = require('fs');
const https = require('https');

const API_BASE = 'https://api.alquran.cloud/v1';

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function fetchSurah(surahNumber) {
  const url = `${API_BASE}/surah/${surahNumber}/editions/quran-uthmani,en.sahih,bn.bengali,en.transliteration`;
  const response = await fetchJSON(url);
  
  if (response.code !== 200) {
    throw new Error(`Failed to fetch surah ${surahNumber}`);
  }
  
  const [arabic, english, bengali, transliteration] = response.data;
  
  const verses = arabic.ayahs.map((ayah, index) => ({
    number: ayah.numberInSurah,
    arabic: ayah.text.replace(/^\ufeff/, ''),
    transliteration: transliteration?.ayahs?.[index]?.text || '',
    english: english.ayahs[index].text,
    bengali: bengali.ayahs[index].text
  }));
  
  return { surahNumber, verses };
}

function generateVerseCode(surahNumber, verses) {
  const verseStrings = verses.map(v => {
    const arabic = v.arabic.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const transliteration = v.transliteration.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const english = v.english.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const bengali = v.bengali.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    
    return `      { number: ${v.number}, arabic: \`${arabic}\`, transliteration: \`${transliteration}\`, english: \`${english}\`, bengali: \`${bengali}\`, audioUrl: getVerseAudioUrl(${surahNumber}, ${v.number}) }`;
  });
  
  return `  {
    surahNumber: ${surahNumber},
    verses: [
${verseStrings.join(',\n')}
    ]
  }`;
}

async function main() {
  console.log('Fetching all 114 surahs from API...');
  
  const allSurahs = [];
  
  for (let i = 1; i <= 114; i++) {
    process.stdout.write(`\rFetching surah ${i}/114...`);
    try {
      const surahData = await fetchSurah(i);
      allSurahs.push(surahData);
      await new Promise(r => setTimeout(r, 200));
    } catch (error) {
      console.error(`\nError fetching surah ${i}:`, error.message);
    }
  }
  
  console.log('\n\nGenerating TypeScript file...');
  
  const fileContent = `export interface Verse {
  number: number;
  arabic: string;
  transliteration: string;
  english: string;
  bengali: string;
  audioUrl: string;
}

export interface SurahVerses {
  surahNumber: number;
  verses: Verse[];
}

function getVerseAudioUrl(surahNumber: number, verseNumber: number): string {
  const surahPadded = String(surahNumber).padStart(3, '0');
  const versePadded = String(verseNumber).padStart(3, '0');
  return \`https://everyayah.com/data/Alafasy_128kbps/\${surahPadded}\${versePadded}.mp3\`;
}

export const SURAH_VERSES: SurahVerses[] = [
${allSurahs.map(s => generateVerseCode(s.surahNumber, s.verses)).join(',\n')}
];

export function getVersesBySurah(surahNumber: number): Verse[] | null {
  const surah = SURAH_VERSES.find(s => s.surahNumber === surahNumber);
  return surah ? surah.verses : null;
}

export function hasVerses(surahNumber: number): boolean {
  return SURAH_VERSES.some(s => s.surahNumber === surahNumber);
}
`;

  fs.writeFileSync('client/data/quran-verses.ts', fileContent, 'utf8');
  console.log('Successfully generated client/data/quran-verses.ts');
  console.log(`Total surahs: ${allSurahs.length}`);
  console.log(`Total verses: ${allSurahs.reduce((sum, s) => sum + s.verses.length, 0)}`);
}

main().catch(console.error);
