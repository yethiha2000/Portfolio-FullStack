# Teacher Dev Portfolio

A responsive personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Frontend

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Backend API

The project now includes an Express backend for the contact form.

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set `MONGODB_URI` in `backend/.env` for persistent contact messages. In production, MongoDB is required.

Optional SMTP settings (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`) enable email notifications when a contact message is received.

Frontend API URL:

```env
VITE_API_URL=http://localhost:5000
```

For production, set `VITE_API_URL` to the deployed API origin.

## Security

The API includes Helmet security headers, strict CORS allow-listing, JSON body limits, Zod input validation, MongoDB schema validation, and rate limiting on the contact endpoint.

Never commit `.env` files or secrets.

## Admin dashboard

The portfolio now includes a protected `/admin` dashboard for contact messages.

### Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Generate a password hash (do not put a plain-text admin password in `.env`):

```bash
npm run hash-password -- "your-long-password"
```

Copy the output into `ADMIN_PASSWORD_HASH`. Also set a random `JWT_SECRET` (32+ characters; 64+ is recommended) and your `MONGODB_URI`.

Start the API:

```bash
npm run dev
```

### Frontend

Create `.env.local` when the API is not on the default local URL:

```env
VITE_API_URL=http://localhost:5000
```

Start Vite:

```bash
npm install
npm run dev
```

Open `/admin` to sign in. Authentication uses an HTTP-only cookie; the JWT is not stored in browser localStorage.

### Production notes

- Set `NODE_ENV=production`.
- Use HTTPS for both frontend and API.
- Set `CLIENT_ORIGINS` to the exact production frontend origin(s).
- Never commit `backend/.env`.
- Use a strong `JWT_SECRET` and a strong admin password.
- Use MongoDB Atlas or another managed MongoDB deployment with least-privilege credentials.
