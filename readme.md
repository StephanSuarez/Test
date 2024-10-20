# Prueba Técnica de Cálculo de Costos de Importación

Esta prueba técnica fue desarrollada utilizando **Angular**, **NestJS** y **MongoDB** como base de datos. El programa permite calcular el costo de importación de productos en un contenedor, y ofrece funcionalidades como calcular el precio de venta de los productos importados y determinar cuánto espacio ocupan en el contenedor.

## Instalación

Para instalar el proyecto, por favor clona el repositorio:

git clone git@github.com:StephanSuarez/Test.git


## Frontend / Cliente
Una vez descargado, dirígete a la carpeta llamada tech-test, que actúa como cliente o frontend:
cd tech-test

Ejecuta el siguiente comando para instalar las dependencias del backend:
npm install

En la carpeta environments, encontrarás un archivo donde deberás especificar la dirección IP de la API que consumirás, la cual corresponde al backend construido en NestJS. Asegúrate de modificar la clave api en ese archivo.

## Backend / Servidor

Para utilizar el backend, dirígete a la carpeta llamada nest_server:

cd nest_server

Ejecuta el siguiente comando para instalar las dependencias del backend:

npm install

En el archivo llamado app.model.ts, dentro de la carpeta src, busca la línea:
MongooseModule.forRoot(''),
Aquí es donde debes ingresar la dirección de tu base de datos, ya sea local o un cluster de MongoDB.

## Ejecución
Para ejecutar cada tecnología, utiliza los siguientes comandos:

Para Angular (frontend):
ng serve

Para NestJS (backend):
npm run start:dev


