Projeto de teste nele contem 2 endpoints Instituicao e Evento seus respectivos cruds, com uma consulta paginada.

Criando um ambiente composto por banco de dados postgres, back quarkus/java, front reactJs e Angular

Para orquestrar utilizado docker-compose

Executando build em todos os projetos
```shell script
docker-compose build
```
Executando build em módulo
```shell script
docker-compose build <quarkus-backend, react-app, angular-app>
```
Subindo os projetos
```shell script
docker-compose up -d 
```
Parando os projetos
```shell script
docker-compose stop
```

