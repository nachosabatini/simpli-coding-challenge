# Stage 1: Build the Next.js application
FROM node as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Create a lightweight production image
FROM node

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production


COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

CMD ["npm", "start"]
