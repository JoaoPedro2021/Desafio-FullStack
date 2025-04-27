FROM node:18

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar apenas os arquivos necessários para instalar dependências
COPY package.json yarn.lock ./

# Configurar arquitetura e plataforma para evitar problemas com dependências opcionais
ENV npm_config_arch=x64
ENV npm_config_platform=linux
ENV NODE_ENV=development

# Instalar dependências do projeto
RUN yarn install

# Copiar o restante do projeto para o contêiner
COPY . .

# Expor a porta usada pelo Vite
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["yarn", "dev", "--host"]
