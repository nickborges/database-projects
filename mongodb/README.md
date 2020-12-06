## MongoDB
#### Manual
* https://docs.mongodb.com/manual/introduction/

#### Install
* https://docs.mongodb.com/guides/server/install/

#### Create database command line
* https://docs.mongodb.com/manual/core/databases-and-collections/

#### Data Modeling
* https://docs.mongodb.com/manual/core/data-modeling-introduction/

#### Cardinalidade
* https://docs.mongodb.com/manual/applications/data-models/

#### Index
* É possível criar uma restrição para não duplicar registros através de um campo, adicionando um index a ele.
```db.minhacollection.createIndex({nomedocampo: 1}, {unique: true})```

#### Commands and DDL
* https://docs.mongodb.com/manual/core/transactions-operations/#transactions-operations-ddl-implicit
* import collections:
```load("full_path/script/scriptTeste.js")```
