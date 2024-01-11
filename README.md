# TATOOSHOPP API

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#futuras-funcionalidades">Futuras funcionalidades</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#webgrafia">Webgrafia</a></li>
    <li><a href="#desarrollo">Desarrollo</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objetivo
Este proyecto requería una API funcional conectada a una base de datos relacional.

## Sobre el proyecto
Propuesto el proyecto de desarrollar una aplicación web para la gestión de una compañía de un estudio de tatuajes, el presente repositorio supone la sección backend del mismo. Esta sección habrá de desarrollarse con un esquema modelo vista controllador, generando una API funcional que permita hacer distintas llamadas, en ocasiones multitabla, discriminando los privilegios de usuario en función de su rol.

## Deploy 🚀
<div align="center">
    <a href="https://www.google.com"><strong>Url a producción </strong></a>🚀🚀🚀
</div>

## Stack
Tecnologías utilizadas:
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![NodeJS](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Node) [![ExpressJS](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=flat)](https://expressjs.com/) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=flat)](https://dev.mysql.com/doc/) [![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000?logo=jsonwebtokens&logoColor=fff&style=flat)](https://jwt.io/introduction) [![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=flat)](https://developer.mozilla.org/en-US/docs/Glossary/Git)


## Diagrama BD
!['imagen-db'](./img/CentroTatuajes.drawio.png)

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ``` $ Ejecutamos las migraciones ``` 
5. ``` $ Ejecutamos los seeders ``` 
6. ``` $ npm run dev ``` 
7. ...

## Endpoints
<details>
<summary>Endpoints</summary>

- AUTH
    - REGISTER

            POST http://localhost:3000/api/register
        body:
        ``` js
            {
                "user": "David",
                "email": "david@david.com",
                "password": "princes"
            }
        ```

    - LOGIN

            POST http://localhost:3000/api/login  
        body:
        ``` js
            {
                "user": "David",
                "email": "david@david.com",
                "password": "princes"
            }
        ```
- CITAS

- ARTISTAS
</details>

## Futuras funcionalidades
[ ] Añadir create book  
[ ] Añadir logs  con winston  
[ ] Validaciones de la solicitud con express-validator  
[ ] ...

### Endpoints

**Generar nuevo usuario:** POST, http://localhost:5000/users

**Inicio de sesión:** POST, http://localhost:5000/auth/login

**Traer todos los usuarios:** GET, http://localhost:5000/users

**Modificar usuario:** PUT, http://localhost:5000/users

**Generar nuevos datos de pago:** POST, http://localhost:5000/paymentdatas

**Modificar datos de pago:** PUT, http://localhost:5000/paymentdatas

**Traer datos de pago de un cliente:** GET, http://localhost:5000/paymentdatas/${customerId}

**Traer todos los artistas:** GET, http://localhost:5000/artists

**Generar nuevo artista:** POST, http://localhost:5000/artists

**Traer todos los diseños con datos de artista:** GET, http://localhost:5000/designs

**Traer diseños por búsqueda:** GET, http://localhost:5000/designs/${criteria}

**Traer diseños con datos de artista según su autor:** GET, http://localhost:5000/artists/${userId}

**Generar nuevo diseño:** POST, http://localhost:5000/designs

**Eliminar diseño:** DELETE, http://localhost:5000/designs/${erase}

**Traer todas las citas:** GET, http://localhost:5000/appointments

**Traer las citas de un cliente:** GET, http://localhost:5000/appointments/${userId}

**Traer las citas de un artista:** GET, http://localhost:5000/appointments/artist/${artistId}

**Generar nueva cita:** POST, http://localhost:5000/appointments

**Eliminar cita:** DELETE, http://localhost:5000/appointments/${erase}

## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request

## Licencia
Este proyecto se encuentra bajo licencia de "Mi Nombre"

## Webgrafia:
Para conseguir mi objetivo he recopilado información de:
- link a repositorios 
- link a documentacion de librerias externas
- ...

## Desarrollo:

``` js
 const developer = "datata";

 console.log("Desarrollado por: " + datata);
```  

## Agradecimientos:

Agradezco a mis compañeros el tiempo dedicado a este proyecto:

- **Gabe**  
<a href="https://github.com/Dave86dev" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a> 

- **David**  
<a href="https://www.github.com/userGithub/" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=red" target="_blank"></a>

- ***Mara***  
<a href="https://www.github.com/userGithub/" target="_blank"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=green" target="_blank"></a> 

## Contacto
<a href = "mailto:micorreoelectronico@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/linkedinUser/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>