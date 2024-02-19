FROM node:14.15.0
WORKDIR /app
COPY ["package.json", "package-lock.json", "wait-for.sh", "startup.sh", "./"]
RUN echo "deb http://deb.debian.org/debian buster main" > /etc/apt/sources.list \
    && apt-get update \
    && apt-get install netcat -y \
    && chmod +x ./wait-for.sh ./startup.sh \
    && npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]