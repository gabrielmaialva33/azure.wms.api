FROM node:18 AS builder

WORKDIR /home/azure.wms.api

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:18 AS runner

WORKDIR /home/azure.wms.api

COPY --from=builder /home/azure.wms.api .

EXPOSE 3333

CMD [ "yarn", "start" ]
