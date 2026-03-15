FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos de dependência do servidor
COPY package*.json ./

# Instala dependências (pode usar --only=production se quiser)
RUN npm install

# Copia o restante do código do servidor
COPY . .

EXPOSE 3000
ENV NODE_ENV=development

CMD ["npm", "start"]