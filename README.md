# Node Docker Full Cycle

Projeto de exemplo utilizando Docker Compose com Node.js, PostgreSQL e Nginx como reverse proxy.

## 📋 Descrição

Este projeto demonstra uma aplicação web completa com:
- **Node.js**: Backend que insere e lista nomes aleatórios
- **PostgreSQL**: Banco de dados para persistência
- **Nginx**: Reverse proxy para o serviço Node.js
- **Docker Compose**: Orquestração dos containers

## Arquitetura

```
Cliente → Nginx (porta 8080) → Node.js (porta 3000) → PostgreSQL (porta 5432)
```

## 📁 Estrutura do Projeto

```
node-docker-fc/
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
├── node/
│   ├── Dockerfile
│   ├── docker-entrypoint.sh
│   ├── index.js
│   ├── db.js
│   ├── names_random.js
│   ├── config-db.sh
│   ├── package.json
│   └── package-lock.json
├── postgres_data/          # Dados do PostgreSQL (versionado versionado para exemplo)
├── docker-compose.yaml
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Docker
- Docker Compose

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/brunopierrii/node-docker-fc
cd node-docker-fc
```

2. **Suba os containers**
```bash
docker-compose up -d
```

3. **Configure o banco de dados** (caso dump salvo como volume não funcione, sh apenas cria tabela)
```bash
chmod +x node/config-db.sh
./node/config-db.sh
```

4. **Acesse a aplicação**
```
http://localhost:8080
```

## Configuração

### Variáveis de Ambiente (PostgreSQL)

- `POSTGRES_DB`: fullcycle
- `POSTGRES_USER`: fullcycle_user
- `POSTGRES_PASSWORD`: fullcycle_pass

### Portas

- **8080**: Nginx (acesso externo)
- **3000**: Node.js (interno)
- **5432**: PostgreSQL (interno)

## 📊 Banco de Dados

### Tabela `people`

```sql
CREATE TABLE IF NOT EXISTS people(
    id SERIAL PRIMARY KEY, 
    name varchar(255)
);
```

A tabela é criada automaticamente pelo script `config-db.sh`.

## Funcionalidades

- A cada inicialização do container Node.js, um nome aleatório é inserido no banco
- A rota `/` exibe todos os nomes cadastrados
- Lista de nomes disponíveis: Juan, Marcos, Júlia, Wesley, Pedro, Bruno, Wedilla, Maria, João, Francisco

## Comandos Úteis

### Parar os containers
```bash
docker compose down
```

### Ver logs
```bash
docker compose logs -f
```

### Reconstruir as imagens
```bash
docker compose up -d --build
```

### Acessar o container do PostgreSQL
```bash
docker exec -it db-fullcycle psql -U fullcycle_user -d fullcycle
```

## Tecnologias

- **Node.js** com Express
- **PostgreSQL 16**
- **Nginx**
- **Docker & Docker Compose**
- **Dockerize** (para wait-for-it pattern)

## Notas

- O Node.js aguarda o PostgreSQL estar pronto usando `dockerize`
- O Nginx atua como reverse proxy para o Node.js
- A aplicação usa uma rede bridge customizada (`fullcyclenet`)

## Autor

Bruno Pierri - [@brunopierrii](https://github.com/brunopierrii)

## Licença

Este projeto é de código aberto e está disponível para fins educacionais.