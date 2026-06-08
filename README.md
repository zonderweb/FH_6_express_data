# FH 6 Express Data

Веб-застосунок для перегляду даних з Google Sheets у вигляді таблиці.

## Що всередині

- **Backend** — Node.js + Express
- **Frontend** — React + Vite
- **Джерело даних** — Google Sheets API

Backend читає дані з таблиці Google Sheets і віддає їх через `/data`, а frontend показує їх у таблиці.

## Структура проєкту

```text
backend/   Express API + інтеграція з Google Sheets
frontend/  React-інтерфейс
```

## Вимоги

- Node.js
- npm
- доступ до Google Sheets API
- файл `credentials.json` у папці `backend/`

## Налаштування backend

Створи файл `backend/.env`:

```env
SPREADSHEET_ID=your_spreadsheet_id
```

Також переконайся, що в `backend/` є `credentials.json` із доступом до Google service account.

## Запуск локально

### 1. Backend

```bash
cd backend
npm install
node app.js
```

Backend працює на `http://localhost:3000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend працює на `http://localhost:5173`.

## API

### `GET /data`

Повертає:

```json
{
  "headers": ["..."],
  "data": [["..."], ["..."]]
}
```

## Як це працює

1. Backend читає діапазон `FH_Drift_cars_data!A:Y` із Google Sheets.
2. Перший рядок використовується як заголовки таблиці.
3. Усі наступні рядки відображаються у frontend.
