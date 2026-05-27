import { google } from 'googleapis'
import { articles as staticArticles } from './articles-data'
import { libraryItems as staticLibrary } from './library-data'
import { newsItems as staticNews } from './news-data'

export type Article = {
  id: string
  tag: string
  date: string
  title: string
  subtitle: string
  desc: string
  content: string[]
}

export type LibraryItem = {
  id: string
  tag: string
  date: string
  title: string
  subtitle: string
  desc: string
  action: string
  fileInfo: string
  content: string[]
}

export type NewsItem = {
  id: string
  tag: string
  date: string
  title: string
  subtitle: string
  desc: string
  content: string[]
}

export type Workshop = {
  id: string
  num: string
  title: string
  subtitle: string
  date: string
  duration: string
  desc: string
  tag: string
  poster: string
}

const SEP = '|||'

function checkSheetsConfig() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? ''
  const key = process.env.GOOGLE_PRIVATE_KEY ?? ''
  const id = process.env.GOOGLE_SHEET_ID ?? ''
  if (
    !email || email.includes('your-service-account') ||
    !key || key.includes('...') ||
    !id || id.includes('your_spreadsheet')
  ) {
    throw new Error('Google Sheets가 설정되지 않았습니다. .env.local에서 GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID를 실제 값으로 입력해주세요.')
  }
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function getSheets() {
  const auth = getAuth()
  return google.sheets({ version: 'v4', auth })
}

export async function getAllRows(sheetName: string): Promise<string[][]> {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${sheetName}!A:Z`,
  })
  return (res.data.values ?? []).filter(row => row.length > 0)
}

async function findRowIndex(sheetName: string, id: string): Promise<number> {
  const rows = await getAllRows(sheetName)
  const idx = rows.findIndex(row => row[0] === id)
  return idx === -1 ? -1 : idx + 1
}

async function updateRow(sheetName: string, rowIndex: number, values: string[]): Promise<void> {
  const sheets = await getSheets()
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${sheetName}!A${rowIndex}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  })
}

async function deleteSheetRow(sheetName: string, rowIndex: number): Promise<void> {
  const sheets = await getSheets()
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
  })
  const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title === sheetName)
  if (!sheet?.properties?.sheetId) throw new Error(`Sheet not found: ${sheetName}`)
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: sheet.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowIndex - 1,
            endIndex: rowIndex,
          },
        },
      }],
    },
  })
}

async function appendToSheet(sheetName: string, values: string[]): Promise<void> {
  const sheets = await getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `${sheetName}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  })
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
}

// ── ARTICLES ──

function rowToArticle(row: string[]): Article {
  return {
    id: row[0] ?? '',
    tag: row[1] ?? '',
    date: row[2] ?? '',
    title: row[3] ?? '',
    subtitle: row[4] ?? '',
    desc: row[5] ?? '',
    content: (row[6] ?? '').split(SEP).filter(Boolean),
  }
}

function articleToRow(a: Article): string[] {
  return [a.id, a.tag, a.date, a.title, a.subtitle, a.desc, a.content.join(SEP)]
}

export async function getArticles(): Promise<Article[]> {
  try {
    const rows = await getAllRows('아티클')
    if (rows.length === 0) {
      for (const a of staticArticles) await appendToSheet('아티클', articleToRow(a as Article))
      return staticArticles as Article[]
    }
    return rows.map(rowToArticle)
  } catch {
    return staticArticles as Article[]
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    return (await getArticles()).find(a => a.id === id) ?? null
  } catch {
    return staticArticles.find(a => a.id === id) as Article ?? null
  }
}

export async function createArticle(data: Omit<Article, 'id'>): Promise<Article> {
  checkSheetsConfig()
  const article: Article = { id: genId(), ...data }
  await appendToSheet('아티클', articleToRow(article))
  return article
}

export async function updateArticle(id: string, data: Omit<Article, 'id'>): Promise<void> {
  checkSheetsConfig()
  const idx = await findRowIndex('아티클', id)
  if (idx === -1) throw new Error('Article not found')
  await updateRow('아티클', idx, articleToRow({ id, ...data }))
}

export async function deleteArticle(id: string): Promise<void> {
  checkSheetsConfig()
  const idx = await findRowIndex('아티클', id)
  if (idx === -1) throw new Error('Article not found')
  await deleteSheetRow('아티클', idx)
}

// ── LIBRARY ──

function rowToLibrary(row: string[]): LibraryItem {
  return {
    id: row[0] ?? '',
    tag: row[1] ?? '',
    date: row[2] ?? '',
    title: row[3] ?? '',
    subtitle: row[4] ?? '',
    desc: row[5] ?? '',
    action: row[6] ?? 'Download',
    fileInfo: row[7] ?? '',
    content: (row[8] ?? '').split(SEP).filter(Boolean),
  }
}

function libraryToRow(item: LibraryItem): string[] {
  return [item.id, item.tag, item.date, item.title, item.subtitle, item.desc, item.action, item.fileInfo, item.content.join(SEP)]
}

export async function getLibraryItems(): Promise<LibraryItem[]> {
  try {
    const rows = await getAllRows('자료실')
    if (rows.length === 0) {
      for (const item of staticLibrary) await appendToSheet('자료실', libraryToRow(item as LibraryItem))
      return staticLibrary as LibraryItem[]
    }
    return rows.map(rowToLibrary)
  } catch {
    return staticLibrary as LibraryItem[]
  }
}

export async function getLibraryItemById(id: string): Promise<LibraryItem | null> {
  try {
    return (await getLibraryItems()).find(i => i.id === id) ?? null
  } catch {
    return staticLibrary.find(i => i.id === id) as LibraryItem ?? null
  }
}

export async function createLibraryItem(data: Omit<LibraryItem, 'id'>): Promise<LibraryItem> {
  checkSheetsConfig()
  const item: LibraryItem = { id: genId(), ...data }
  await appendToSheet('자료실', libraryToRow(item))
  return item
}

export async function updateLibraryItem(id: string, data: Omit<LibraryItem, 'id'>): Promise<void> {
  checkSheetsConfig()
  const idx = await findRowIndex('자료실', id)
  if (idx === -1) throw new Error('Library item not found')
  await updateRow('자료실', idx, libraryToRow({ id, ...data }))
}

export async function deleteLibraryItem(id: string): Promise<void> {
  checkSheetsConfig()
  const idx = await findRowIndex('자료실', id)
  if (idx === -1) throw new Error('Library item not found')
  await deleteSheetRow('자료실', idx)
}

// ── NEWS ──

function rowToNews(row: string[]): NewsItem {
  return {
    id: row[0] ?? '',
    tag: row[1] ?? '',
    date: row[2] ?? '',
    title: row[3] ?? '',
    subtitle: row[4] ?? '',
    desc: row[5] ?? '',
    content: (row[6] ?? '').split(SEP).filter(Boolean),
  }
}

function newsToRow(item: NewsItem): string[] {
  return [item.id, item.tag, item.date, item.title, item.subtitle, item.desc, item.content.join(SEP)]
}

export async function getNewsItems(): Promise<NewsItem[]> {
  try {
    const rows = await getAllRows('소식')
    if (rows.length === 0) {
      for (const item of staticNews) await appendToSheet('소식', newsToRow(item as NewsItem))
      return staticNews as NewsItem[]
    }
    return rows.map(rowToNews)
  } catch {
    return staticNews as NewsItem[]
  }
}

export async function getNewsItemById(id: string): Promise<NewsItem | null> {
  try {
    return (await getNewsItems()).find(i => i.id === id) ?? null
  } catch {
    return staticNews.find(i => i.id === id) as NewsItem ?? null
  }
}

export async function createNewsItem(data: Omit<NewsItem, 'id'>): Promise<NewsItem> {
  checkSheetsConfig()
  const item: NewsItem = { id: genId(), ...data }
  await appendToSheet('소식', newsToRow(item))
  return item
}

export async function updateNewsItem(id: string, data: Omit<NewsItem, 'id'>): Promise<void> {
  checkSheetsConfig()
  const idx = await findRowIndex('소식', id)
  if (idx === -1) throw new Error('News item not found')
  await updateRow('소식', idx, newsToRow({ id, ...data }))
}

export async function deleteNewsItem(id: string): Promise<void> {
  checkSheetsConfig()
  const idx = await findRowIndex('소식', id)
  if (idx === -1) throw new Error('News item not found')
  await deleteSheetRow('소식', idx)
}

// ── WORKSHOPS ──

export const staticWorkshops: Workshop[] = [
  { id: 'ws1', num: '01', title: '몸으로 말하기', subtitle: 'Speaking Through the Body', date: '2025년 3월', duration: '1일 (6시간)', desc: '일상의 언어를 내려놓고 몸의 감각과 움직임으로 자신을 표현하는 입문 워크숍.', tag: 'Open', poster: '' },
  { id: 'ws2', num: '02', title: '감정과 움직임', subtitle: 'Emotion & Movement', date: '2025년 4월', duration: '2일 (12시간)', desc: '감정을 억누르거나 분출하지 않고, 움직임으로 안전하게 탐구하는 심화 워크숍.', tag: 'Open', poster: '' },
  { id: 'ws3', num: '03', title: '치유로서의 댄스', subtitle: 'Dance as Healing', date: '2025년 5월', duration: '1일 (6시간)', desc: '안나 할프린의 유산을 이어받아 댄스를 통한 자기 치유를 경험하는 워크숍.', tag: 'Open', poster: '' },
  { id: 'ws4', num: '04', title: '그림과 몸', subtitle: 'Drawing & Body', date: '2025년 6월', duration: '1일 (6시간)', desc: '움직임 후 그림으로 경험을 기록하고 나누는 통합 예술 워크숍.', tag: 'Open', poster: '' },
  { id: 'ws5', num: '05', title: '교육자를 위한 표현예술', subtitle: 'Expressive Arts for Educators', date: '2025년 7월', duration: '2일 (12시간)', desc: '교육 현장에서 Tamalpa 방법론을 활용하는 방법을 탐구하는 교육자 특화 과정.', tag: 'Professional', poster: '' },
  { id: 'ws6', num: '06', title: '커뮤니티와 예술', subtitle: 'Community & Arts', date: '2025년 8월', duration: '1일 (6시간)', desc: '공동체 안에서 함께 움직이고 표현하며 연결을 경험하는 그룹 워크숍.', tag: 'Open', poster: '' },
]

function rowToWorkshop(row: string[]): Workshop {
  return {
    id: row[0] ?? '',
    num: row[1] ?? '',
    title: row[2] ?? '',
    subtitle: row[3] ?? '',
    date: row[4] ?? '',
    duration: row[5] ?? '',
    desc: row[6] ?? '',
    tag: row[7] ?? 'Open',
    poster: row[8] ?? '',
  }
}

function workshopToRow(ws: Workshop): string[] {
  return [ws.id, ws.num, ws.title, ws.subtitle, ws.date, ws.duration, ws.desc, ws.tag, ws.poster]
}

export async function getWorkshops(): Promise<Workshop[]> {
  try {
    const rows = await getAllRows('워크숍')
    if (rows.length === 0) {
      for (const ws of staticWorkshops) await appendToSheet('워크숍', workshopToRow(ws))
      return staticWorkshops
    }
    return rows.map(rowToWorkshop)
  } catch {
    return staticWorkshops
  }
}

export async function getWorkshopById(id: string): Promise<Workshop | null> {
  try {
    return (await getWorkshops()).find(ws => ws.id === id) ?? null
  } catch {
    return staticWorkshops.find(ws => ws.id === id) ?? null
  }
}

export async function createWorkshop(data: Omit<Workshop, 'id'>): Promise<Workshop> {
  checkSheetsConfig()
  const ws: Workshop = { id: genId(), ...data }
  await appendToSheet('워크숍', workshopToRow(ws))
  return ws
}

export async function updateWorkshop(id: string, data: Omit<Workshop, 'id'>): Promise<void> {
  checkSheetsConfig()
  const idx = await findRowIndex('워크숍', id)
  if (idx === -1) throw new Error('Workshop not found')
  await updateRow('워크숍', idx, workshopToRow({ id, ...data }))
}

export async function deleteWorkshop(id: string): Promise<void> {
  checkSheetsConfig()
  const idx = await findRowIndex('워크숍', id)
  if (idx === -1) throw new Error('Workshop not found')
  await deleteSheetRow('워크숍', idx)
}

// ── APPLICATIONS ──

export async function getApplications() {
  const [training, workshops, contact] = await Promise.all([
    getAllRows('트레이닝신청').catch(() => [] as string[][]),
    getAllRows('워크숍신청').catch(() => [] as string[][]),
    getAllRows('문의하기').catch(() => [] as string[][]),
  ])
  return { training, workshops, contact }
}
