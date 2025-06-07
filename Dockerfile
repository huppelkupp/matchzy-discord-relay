FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV UPLOAD_FOLDER=/uploads
RUN mkdir -p $UPLOAD_FOLDER

VOLUME ["/uploads"]
EXPOSE 80

CMD ["npm", "start"]
