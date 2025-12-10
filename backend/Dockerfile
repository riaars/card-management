FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Set a dummy DATABASE_URL so `prisma generate` not complained
ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate

ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/src/main.js"]
