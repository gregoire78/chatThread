# Stage 1 - the build process
FROM node:lts-alpine AS build-deps

WORKDIR /usr/src/app

ARG REACT_APP_TWITCH_CLIENTID
ARG REACT_APP_TWITCH_CLIENTSECRET
ARG REACT_APP_TTS
ENV REACT_APP_TWITCH_CLIENTID=${REACT_APP_TWITCH_CLIENTID}
ENV REACT_APP_TWITCH_CLIENTSECRET=${REACT_APP_TWITCH_CLIENTSECRET}
ENV REACT_APP_TTS=${REACT_APP_TTS}
ENV GENERATE_SOURCEMAP=false

ENV NODE_ENV=production
COPY packages ./
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build --production

# Stage 2 - the production environment with Caddy
FROM caddy:alpine
LABEL maintainer="gregoire@joncour.dev"

# Copy built files to Caddy's web root
COPY --from=build-deps /usr/src/app/build /usr/share/caddy

EXPOSE 80
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--precompressed", "gzip", "--listen", ":80"]