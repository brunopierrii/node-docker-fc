#!/bin/bash
set -e

CONTAINER_POSTGRES=$(docker ps --filter "name=db-fullcycle" --format "{{.Names}}")
DB_USER=fullcycle_user
DB=fullcycle
CREATE_TABLE_PEOPLE="CREATE TABLE IF NOT EXISTS people(id SERIAL PRIMARY KEY, name varchar(255));"

if ! docker exec "$CONTAINER_POSTGRES" psql -U "$DB_USER" -d "$DB" -c "$CREATE_TABLE_PEOPLE"; then
  echo "Erro ao criar tabela people"
  exit 1
else
  echo "tabela people criada"
fi