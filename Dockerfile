FROM node:20-alpine AS build

ENV CONNECTION_STRING=""
ENV JWT_SECRET=""

WORKDIR /app

COPY package.json .
RUN pnpm install
COPY . .

FROM node:20-alpine-slim

WORKDIR /app
COPY --from=build /app/ .
EXPOSE 4000

CMD ["pnpm", "start"]
