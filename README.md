# Aixelis Handyman Site

Next.js site for Aixelis home and business handyman services.

The site includes:

- Public service landing page
- Booking request form
- Member auth flows
- Admin appointment dashboard
- Cloudflare D1 database support
- Optional Telegram booking notifications

## Runtime Configuration

```bash
ADMIN_PASSWORD="change-this"
ADMIN_SESSION_SECRET="use-a-long-random-secret"
TELEGRAM_BOT_TOKEN="telegram-bot-token"
TELEGRAM_CHAT_ID="telegram-chat-id"
```

`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are optional for local testing. If they are missing, bookings are still saved to D1, but Telegram notifications are skipped.

For Cloudflare D1, apply the schema in `migrations/0001_schema.sql` to the database configured in `wrangler.toml`.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```
