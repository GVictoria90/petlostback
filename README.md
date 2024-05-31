# Nombre del Proyecto

Pets Lost & Found

## Descripción

Este proyecto es una aplicación de Nest-js para gestionar publicaciones de mascotas. Permite a los usuarios ver una lista de publicaciones y obtener detalles sobre cada mascota.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Instalación

1. Clona el repositorio
    ```bash
    git clone https://github.com/JorgeVergaraSou/petlostback.git
    ```
2. Navega al directorio del proyecto
    ```bash
    cd nombre-del-proyecto
    ```
3. Instala las dependencias
    ```bash
    npm install
    ```
4. Crea la Base de Datos
    En tu entorno de administracion de BD (phpmyadmin, mysqlworkbench, etc.) 
    crea la base de datos.
    Configura el archivo ".env" con las credenciales de tu proyecto

## Uso

1. Inicia la aplicación
    ```bash
    npm run start:dev
    ```
2. Para ver todos los endpoint disponibles, en tu navegador ve a:
    http://localhost:3006/docs 
    el número de puerto es el que vayas a usar.

## Estructura del Proyecto

src                                
├─ auth                            
│  ├─ constants                    
│  │  └─ jwt.constant.ts           
│  ├─ decorators                   
│  │  ├─ auth.decorator.ts         
│  │  └─ roles.decorator.ts        
│  ├─ dto                          
│  │  ├─ create-auth.dto.ts        
│  │  ├─ login.dto.ts              
│  │  ├─ register.dto.ts           
│  │  └─ update-auth.dto.ts        
│  ├─ guard                        
│  │  ├─ auth.guard.ts             
│  │  └─ roles.guard.ts            
│  ├─ interfaces                   
│  │  └─ reqWithUser.interface.ts  
│  ├─ auth.controller.ts           
│  ├─ auth.module.ts               
│  └─ auth.service.ts              
├─ breeds                          
│  ├─ dto                          
│  │  └─ create-breed.dto.ts       
│  ├─ entities                     
│  │  └─ breed.entity.ts           
│  ├─ breeds.controller.ts         
│  ├─ breeds.module.ts             
│  └─ breeds.service.ts            
├─ common                          
│  ├─ decorators                   
│  │  └─ active-user.decorator.ts  
│  ├─ enums                        
│  │  ├─ pet.enum.ts               
│  │  ├─ role.enum.ts              
│  │  └─ typePost.ts               
│  └─ interfaces                   
│     └─ user-active.interface.ts  
├─ contact                         
│  ├─ dto                          
│  │  ├─ create-contact.dto.ts     
│  │  └─ update-contact.dto.ts     
│  ├─ entities                     
│  │  └─ contact.entity.ts         
│  ├─ contact.controller.ts        
│  ├─ contact.module.ts            
│  └─ contact.service.ts           
├─ pets                            
│  ├─ dto                          
│  │  ├─ create-pet.dto.ts         
│  │  └─ update-pet.dto.ts         
│  ├─ entities                     
│  │  └─ pet.entity.ts             
│  ├─ pets.controller.ts           
│  ├─ pets.module.ts               
│  └─ pets.service.ts              
├─ posts                           
│  ├─ dto                          
│  │  ├─ create-post.dto.ts        
│  │  └─ update-post.dto.ts        
│  ├─ entities                     
│  │  └─ post.entity.ts            
│  ├─ posts.controller.ts          
│  ├─ posts.module.ts              
│  └─ posts.service.ts             
├─ users                           
│  ├─ dto                          
│  │  ├─ create-user.dto.ts        
│  │  └─ update-user.dto.ts        
│  ├─ entities                     
│  │  └─ user.entity.ts            
│  ├─ users.controller.ts          
│  ├─ users.module.ts              
│  └─ users.service.ts             
├─ app.module.ts                   
└─ main.ts                         

 
## Tecnologías Utilizadas
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.2.2",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/mapped-types": "*",
    "@nestjs/platform-express": "^10.3.8",
    "@nestjs/swagger": "7.3.1",
    "@nestjs/typeorm": "^10.0.1",
    "bcryptjs": "^2.4.3",
    "class-transformer": "0.5.1",
    "class-validator": "0.14.1",
    "dotenv": "^16.4.5",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.8.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.19"
  }

