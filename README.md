# LaCosechaApp
Prueba para Buxtar 2 -  aplicación para realizar CRUD para el restaurante La cosecha parrillada

## Como ejecutar la aplicación
### 1. Ejecutar el servidor
Dentro de la carpeta 'LaCosechaApp/server' ejecutar el comando nodemon app.js, esto hará que corra el servidor backend
### 2. Ejecutar aplicación
Instalar y ejecutar el archivo APK en el emulador de android (no funciona en un dispositivo fisíco ya que las url del servidor son locales) mediante el comando react-native run-android ó  react-native run-android  -- variant=release
### 3. Iniciar sesión
Iniciar sesión con el siguiente usuario que se creó por defecto:
email: user@user.com
contraseña: user
### 4. CRUD
En la página principal se listarán todos los platos que se hayan creado por parte del usuario. Para agregar un nuevo usuario basta con dar clic en el botos de Add y llenar los respectivos campos. Para editar o eliminar los platos es necesario deslizar cada item hacia la izquierda y seleccionar una opción.

## Server
Server es la carpeta que contiene el servidor (Backend) que atiende las peticiones realizadas por la aplicación. 

## Client
Client es la carpeta que contiene la aplicación móvil de la Cosecha Parrillada

### Componentes
 #### Login.js
 Este módulo contiene el formulario para hacer login en la aplicación, una vez se ingresa los datos y de presiona enviar, se realiza una función fetch para consultar los datos con el servidor, ingresando a la ruta "user/login". si los parámetros son válidos se abre la ventana principal para realizar el CRUD.
