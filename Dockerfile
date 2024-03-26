FROM node:18-alpine as build-stage

WORKDIR /app
RUN corepack enable

ENV VITE_API_BASE_URL=https://api.dthub.uz/rkp/api/v1
ENV VITE_API_FILE_URL=https://market.dthub.uz
ENV VITE_API_USER_URL=https://api.dthub.uz/identity/api/v1/
ENV VITE_IDENTITY_SERVICE=https://id.dthub.uz/auth/logout?returnUrl=https://rkp.dthub.uz
ENV VITE_IS_DEV=true


ENV VITE_MARKET_URL=https://market.dthub.uz
ENV VITE_DTM_URL=https://dtm.dthub.uz
ENV VITE_DWM_URL=https://dwm.dthub.uz
ENV VITE_CABINET_URL=https://cabinet.dthub.uz
ENV VITE_RKP_URL=https://rkp.dthub.uz
ENV VITE_FINDOC_URL=https://findoc.dthub.uz
ENV VITE_COOKIE_HOST=.dthub.uz


COPY  package.json ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install

COPY . .
RUN pnpm run build-only

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
