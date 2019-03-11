# Prueba técnica para la vacante como desarrollador Frontend

## Frontend

Para la construcción del Frontend se utilizo React en versión 16.8.1, React Router, Sass y Webpack. Se crearon rutas privadas que solo son accedidas mediante un token valido. También se implementaron todas las validaciones en los formularios.

# Servidor

La siguiente api proporciona una api pública para el registro de usuarios, un api de autenticación y un api con autorización para el registro, actualización y eliminación de productos.

# Funcionalidades Extra

- Autenticación de usuarios usando JWT para poder gestionar las acciones.
- Cliente SPA.

## Requerimientos del proyecto
- NodeJs >= 8
- NPM
- MongoDB >= 4*

## Instalación

Ejecute los siguientes comandos en su terminal

```
  npm install
  npm back-dev
  npm front-dev
```
# Documentación API

### URL
```
  /api/users/register
```
### Método
```
POST
```
### Body Parameters
Campo | Tipo De Datos | Requerido | Unico | Descripción
--- | --- | --- | --- | ---
name | string | Sí | No | Nombre debe tener entre 3 y 30 caracteres.
paternalSurname | string | Sí | No | Apellido paterno del usuario
email | string | Sí | Sí | Correo electronico del usuario.
password | string | Sí | No | La contraseña debe tener al menos 5 caracteres.

* **Ejemplo**

```json
{
 "name": "test",
 "paternalSurname": "test",
 "email": "test@gmail.com",
 "password": "12345"
}
```

### Success Response - Codigo HTTP 200

``` json
{
  "success": true,
  "user": {
    "_id": "5c85c0a0527126afa48c1387",
    "name": "test",
    "paternalSurname": "test",
    "email": "test@gmail.com",
    "password": "$2a$10$mXnAI1AYFwmnL74nZIvh6.Xs2dH0TLhyg040xNUo2RFZWOSQgunam",
    "date": "2019-03-11T01:57:52.686Z",
    "__v": 0
  }
}
```

### Error de Validación - Codigo Http 422

``` json
{
  "success": false,
  "errors": {
    "name": "Name field is required",
    "paternalSurname": "Paternal Surname field is required",
    "email": "Email is invalid",
    "password": "Password must be at least 5 characters"
  }
}
```

## Autenticación de usuario

### URL
```
 api/users/login
```
### Método
```
POST
```

### Body Parameters
Campo | Tipo De Datos | Requerido | Descripción
--- | --- | --- | ---
email | string | Sí | Correo electronico del usuario.
password | string | Sí | Contraseña de usuario.

* **Ejemplo**

```json
{
 "email": "test@gmail.com",
 "password": "12345"
}
```

### Success Response - Codigo HTTP 200

``` json
{
  "success": true,
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjODVjNDJhNTI3MTI2YWZhNDhjMTM4OCIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTU1MjI3MDQ3OSwiZXhwIjoxNTUyMzEzNjc5fQ.IxgFoX78HydenoSvALORBss0n7mmWmsIkxH8181yRTc"
}
```

### Credenciales invalidas - Codigo Http 404

``` json
{
 "success": false,
 "message": "User not found"
}
```

``` json
{
  "succes": false,
  "errors": {
    "password": "Password incorrect"
  }
}
```

## Listado de productos

### URL
```
 api/products
```
### Método
```
GET
```

### Headers
```
 Authorization: Bearer <token proporcionado por el api de autenticación>

### Success Response - Codigo HTTP 200

``` json
{
  "success": true,
  "products": [
    {
      "_id": "5c85c5ed527126afa48c1389",
      "name": "Laptop Lenovo",
      "price": 19000,
      "image": "/images/image-1552270829627.jpg",
      "__v": 0
    }
  ]
}
```

## Registro de productos

### URL
```
 api/products
```
### Método
```
POST
```

### Headers
```
 Authorization: Bearer <token proporcionado por el api de autenticación>
```

### Body Parameters
Campo | Tipo De Datos | Requerido | Descripción
--- | --- | --- | ---
name | string | Sí | Nombre del producto.
price | number | Sí | Precio del producto.
image | Boolean | Sí | Imagen del producto.

* **Ejemplo**

```json
{
 "name" : "Laptop Lenovo",
 "price" : 19000,
 "image" : "type file"
}
```

### Success Response - Codigo HTTP 200

``` json
{
  "success": true,
  "product": {
    "_id": "5c85c854c25907c0e0986690",
    "name": "Laptop Lenovo",
    "price": 19000,
    "image": "/images/image-1552271444294.jpg",
    "__v": 0
  }
}
```

### Error de Validación - Codigo Http 422

``` json
{
  "success": false,
  "errors": {
    "name": "Name field is required",
    "price": "Price field is required",
    "image": "Image field is required"
  }
}
```

``` json
{
  "success": false,
  "errors": {
    "name": "Name field is required",
    "price": "Price field is required",
    "image": "Images Only!"
  }
}
```

## Busqueda de producto por ID

### URL
```
 api/products/<productId>
```
### Método
```
GET
```

### Headers
```
 Authorization: Bearer <token proporcionado por el api de autenticación>
```

### Success Response - Codigo HTTP 200

``` json
{
  "success": true,
  "product": {
    "_id": "5c85c5ed527126afa48c1389",
    "name": "Laptop Lenovo",
    "price": 19000,
    "image": "/images/image-1552270829627.jpg",
    "__v": 0
  }
}
```

### Not Found Product - Codigo HTTP 404
``` json
{
  "success": false,
  "message": "not found Product"
}
```

## Eliminación de un producto

### URL
```
 api/products/<productId>
```
### Método
```
DELETE
```

### Headers
```
 Authorization: Bearer <token proporcionado por el api de autenticación>

 ### Success Response - Codigo HTTP 200

``` json
{
  "success": true,
  "product": {
    "_id": "5c85c5ed527126afa48c1389",
    "name": "Laptop Lenovo",
    "price": 19000,
    "image": "/images/image-1552270829627.jpg",
    "__v": 0
  }
}
```

### Not Found Restaurante - Codigo HTTP 404
``` json
{
  "success": false,
  "message": "Not found Product"
}
```