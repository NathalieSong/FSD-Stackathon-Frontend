FROM node:10 AS node-builder
WORKDIR /FSD-Stackathon-Frontend
COPY . .
RUN npm install
RUN npm run build -- --prod --output-path dist

FROM nginx:1.17.1-alpine
COPY --from=node-builder /FSD-Stackathon-Frontend/dist /usr/share/nginx/html
COPY emart-ui.conf  /etc/nginx/conf.d/