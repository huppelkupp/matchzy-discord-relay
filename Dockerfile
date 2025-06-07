FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install
ENV UPLOAD_FOLDER=/uploads
RUN mkdir -p $UPLOAD_FOLDER

VOLUME ["/uploads"]

EXPOSE 80

CMD ["npm", "start"]
