FROM php:8.2-fpm-alpine3.18

# Instalar extensões necessárias do PHP
RUN apk update && apk add --no-cache \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    libzip-dev \
    postgresql-dev \
    zip \
    unzip \
    bash \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Copiar os arquivos do projeto para o contêiner
COPY . .

# Instalar dependências do Composer
RUN composer install

# Ajustar permissões
RUN chown -R www-data:www-data /var/www/html

# Expor a porta do servidor Laravel
EXPOSE 8000

# Comando para iniciar o servidor Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
