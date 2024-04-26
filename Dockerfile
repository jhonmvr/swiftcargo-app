# Usar una imagen base de Node
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY . /app

# Instalar dependencias de Ionic y del proyecto
RUN npm install -g @ionic/cli
RUN npm install

# Compilar la aplicación
RUN ionic build

# Instalar un servidor HTTP para servir la aplicación
RUN npm install -g http-server

# Exponer el puerto 8080
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["http-server", "www", "-p", "8080"]
