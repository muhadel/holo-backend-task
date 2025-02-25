FROM node:20.18.0-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm i -g typescript
RUN npm i 
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20.18.0-alpine AS production
WORKDIR /app
COPY prisma ./prisma
COPY --from=build /app/package*.json ./
COPY --from=build /app/tsconfig.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=build /app/dist ./dist
RUN npx prisma generate
EXPOSE 3000
CMD ["sh", "-c", "npm run prisma:deploy && node dist/main"]
