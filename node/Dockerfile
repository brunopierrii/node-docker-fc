FROM node:20

WORKDIR /usr/shared/app

ENV DOCKERIZE_VERSION=v0.9.8

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh