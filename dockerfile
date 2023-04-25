# Common build stage
FROM node:16.16.0 as common-build-stage

WORKDIR /work

COPY . ./work

RUN npm install

RUN chown -R node /app/node_modules

USER node

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "start"]