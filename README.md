# FH 6 Express Data

Веб-застосунок для перегляду даних із Google Sheets та керування списком виробників авто.

## Що всередині

- **Backend** — Node.js + Express + MySQL
- **Frontend** — React + Vite + React Router + React Bootstrap
- **Дані для таблиці** — Google Sheets API

## Структура проєкту

```text
backend/
  app.js
  bin/www
  controllers/
    manufacturers.controller.js
  db/
    connection.js
  middlewares/
    auth.js
  routes/
    data.js
    index.js
    manufacturers.routes.js
    users.js
  public/
frontend/
  src/
    App/
    DataDriftTable/
    assets/
    components/
      common/
      layout/
      manufacturers/
        ManufacturerForm/
        ManufacturerModal/
        ManufacturerTable/
    pages/
    services/
    scss/
```

## Вимоги

- Node.js
- npm
- MySQL
- доступ до Google Sheets API
- файл `backend/credentials.json`

## Налаштування

Скопіюй `backend/.env.example` у `backend/.env` і заповни значення:

```env
SPREADSHEET_ID=your_spreadsheet_id
DB_HOST=localhost
DB_USER=db_user
DB_PASSWORD=db_password
DB_NAME=db_name
```

Також переконайся, що в `backend/credentials.json` є доступ до Google service account.

## Запуск локально

### 1. Backend

```bash
cd backend
npm install
npm start
```

Backend працює на `http://localhost:3000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend працює на `http://localhost:5173`.

## Маршрути

### Frontend

- `/` — таблиця з даними
- `/manufacturers` — CRUD для виробників

### Backend

- `GET /data` — повертає `{ data }` з даними з Google Sheets
- `GET /api/manufacturers`
- `GET /api/manufacturers/:id`
- `POST /api/manufacturers`
- `PUT /api/manufacturers/:id`
- `DELETE /api/manufacturers/:id`

## Як це працює

1. Backend читає діапазон `FH_Drift_cars_data!A:Y` із Google Sheets.
2. Дані з `GET /data` повертаються як масив об'єктів.
3. Frontend показує таблицю на головній сторінці.
4. Окремий розділ `/manufacturers` працює з таблицею `manufacturers` у MySQL.
