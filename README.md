# bx-to-wareclouds

Integración de Blue Express a Wareclouds

## Iniciar el servicio


### Dependencias e instrucciones
   Ambiente
   - npx
   - sequelize-cli
   - nodemon
   - eslint


   Para el proyecto
   - sequelize
      - se configura el archivo .sequelizerc para indicar que las migraciones,  modelos, seeder y configuracion estan en carpetas establecidas
   - joi
      - se valida 


<hr>
<br>

### Inicializar configuracion de sequelize
```sh $ 
$ npx sequelize init
```

### Ejecutar migraciones 
```sh 
$ npx sequelize-cli model:generate --name ModelName --attributes name:string
```


### Generar una migraciones y modelos nuevos 

```sh 
$ npm run db:migrate
```



## API
A continuación se mencionan los endpoints disponibles

