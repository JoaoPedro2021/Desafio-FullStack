Desafio Full Stack
Descrição do Projeto
Este projeto consiste em uma aplicação para cadastro de desenvolvedores associados a diferentes níveis.
A aplicação é composta por um backend que oferece uma API RESTful e um frontend que é uma SPA (Single Page Application) interligada à API.


Instruções para rodar o projeto localmente
1. Configurar variáveis de ambiente
Crie um arquivo .env na pasta backend com o seguinte conteúdo:

APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:OMcbOGvbMopt71zvG/Xa2VbHaaMIF7Fw7qN7HJJx+VI=
APP_DEBUG=false
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=ep-old-feather-ac5ev0sc-pooler.sa-east-1.aws.neon.tech
DB_PORT=5432
DB_DATABASE=gazin_postgres
DB_USERNAME=gazin_postgres_owner
DB_PASSWORD=npg_2fXqcEO4vGVg
DB_SSLMODE=require


2. Subir os containers
No diretório do projeto, execute o comando:

docker-compose up --build -d


Links Importantes
Backend local: http://localhost:8000/

Frontend local: http://localhost:5173/home

Documentação da API: http://localhost:8000/api/documentation#/

Deploy de Produção
Frontend em produção: https://desafio-full-stack-iota.vercel.app/home

⚠️ Aviso:
O deploy do frontend foi feito na Render (plano gratuito), portanto, as primeiras requisições podem demorar de 30 segundos a 1 minuto para serem processadas.
