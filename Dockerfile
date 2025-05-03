FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libonig-dev libxml2-dev libzip-dev libpq-dev \
    libpng-dev libjpeg-dev libfreetype6-dev \
    npm nodejs \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy app source
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Install Node packages and build Vite app
RUN npm install && npm run build

# Set permissions
RUN chmod -R 775 storage bootstrap/cache && \
    chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]
