## Redis

#### Install and Exec
```
docker run -dit --restart unless-stopped -p 6379:6379 --name redis redis sh
```
```
docker exect -it ccbe22963e66 sh
```
````redis-server````
```redis-cli```

#### Command
* https://redis.io/commands#

* Printar
```
ECHO "alguma_mensagem"
```
* Definir variáveis e valores
```
SET nome_da_variavel "valor"
SET variavel1:variavel2:variavel3: "valor"
SET variavel1:variavel2:variavel3 "valor" variavel4:variavel5:variavel6 "valor"
```
* Deletar
```
DEL nome_da_variavel
```
* Obter valor da variável
```
GET nome_da_variavel
```
* Buscar variáveis - com "like"
```
KEYS *
KEYS "variavel*"
KEYS "variavel:*algumacoisa"
KEYS "resultado:?[37]-??-????:megasena"
```
* Hash
```
HSET resultado:24-05-2015:megasena "numeros" "13, 17, 19, 25, 28, 32"
HSET resultado:24-05-2015:megasena "ganhadores" 23
HMSET resultado:24-05-2015:megasena "numeros" "13, 17, 19, 25, 28, 32" "ganhadores" 23

HGET resultado:24-05-2015:megasena numeros
HGET resultado:24-05-2015:megasena ganhadores
HGETALL resultado:24-05-2015:megasena

HDEL resultado:24-05-2015:megasena numeros
HDEL resultado:24-05-2015:megasena ganhadores
HDELALL resultado:24-05-2015:megasena

HINCRBY "jogador:1" "pontos" 10
```

#### Sessão
* setando os dados
```
HMSET "sessao:usuario:1675" "nome" "fulano" "total_de_produtos" "3" "sobrenome" "de tal"
```
* definindo tempo de expiração em segundos
```
EXPIRE "sessao:usuario:1675" 1800
```
* verificando quanto tempo falta para expirar
```
TTL "sessao:usuario:1675"
```
* Vantagens:
  * As informações não precisam ser compartilhadas entre os próprios servidores, mas sim no banco de dados, evitando a replicação da informação nos servidores web.
  * Acessso rápido as informações.
  
#### Estatísticas
* Adicionando dados de forma atômica - exemplo um contator de acessos
    * Incrementa e Decrementa 1
    ```
    INCR pagina:/contato:25-05-2015
    DECR pagina:/contato:25-05-2015
    ```
    * Incrementa e Decrementa por valor
    ```
    INCRBY compras:25-05-2015:valor 15
    INCRBY compras:25-05-2015:valor 17
    DECRBY compras:25-05-2015:valor 2
    DECRBY compras:25-05-2015:valor 5
    ```
    * Incrementa e Decrementa por valor decimal
    ```
    INCRBYFLOAT compras:25-05-2015:valor 10.50
    INCRBYFLOAT compras:25-05-2015:valor -0.50
    ```
* Marcando acessos - BIT Map
```
SETBIT acesso:25-05-2015 5 1
SETBIT acesso:25-05-2015 7 1
GETBIT acesso:25-05-2015 5
> 1
GETBIT acesso:25-05-2015 7
> 1
GETBIT acesso:25-05-2015 2
> 0
GETBIT acesso:25-05-2015 100
> 0
```
* Obtendo quantidade acessos - Count BIT
```
SETBIT acesso:25-05-2015 122 1
SETBIT acesso:25-05-2015 123 1
SETBIT acesso:26-05-2015 124 1
SETBIT acesso:27-05-2015 125 1
SETBIT acesso:27-05-2015 126 1
SETBIT acesso:27-05-2015 127 1
BITCOUNT acesso:25-05-2015
> 2
BITCOUNT acesso:26-05-2015
> 1
BITCOUNT acesso:27-05-2015
> 3
```
* Obtendo quantidade acessos com operador AND e OR
```
SETBIT acesso:25-05-2015 121 1
SETBIT acesso:25-05-2015 122 1
SETBIT acesso:25-05-2015 123 1
SETBIT acesso:26-05-2015 121 1
SETBIT acesso:26-05-2015 122 1

BITOP AND acesso:25-e-26-05-2015 acesso:25-05-2015 acesso:26-05-2015
GETBIT acesso:25-e-26-05-2015 121
> 1
GETBIT acesso:25-e-26-05-2015 122
> 1
GETBIT acesso:25-e-26-05-2015 123
> 0
BITCOUNT acesso:25-e-26-05-2015
> 2

BITOP OR acesso:25-ou-26-05-2015 acesso:25-05-2015 acesso:26-05-2015
GETBIT acesso:25-ou-26-05-2015 121
> 1
GETBIT acesso:25-ou-26-05-2015 122
> 1
GETBIT acesso:25-ou-26-05-2015 123
> 1
BITCOUNT acesso:25-ou-26-05-2015
> 3
```

#### Listas, ordenação e limites
* LPUSH - Inserir na primeira posição(Left push)
  * https://redis.io/commands/lpush
* LTRIM - mantem um range de elementos e remove o resto
  * https://redis.io/commands/ltrim
* LINDEX - Listar os elementos
  * https://redis.io/commands/lindex
* LRANGE - Listar um Range de elementos
  * https://redis.io/commands/lrange
* LLEN - Mostrar o tamanho da lista
  * https://redis.io/commands/llen
* Exemplo: Utilizar esta lógica em uma lista no nóticias.

#### Filas - execução Assincrono
* Um sistema coloca na fila, na ultiam posição
  * RPUSH - Inserir na última posição(Right push)
    * https://redis.io/commands/rpush
* Outo sistema remove da fila, primeira posição
  * LPOP - recupera/remove elemento da primeira posição de forma atômica, garante que não tem concorrência com a inserção a cima.
    * https://redis.io/commands/lpop
  * RPOP - recupera/remove elemento da última posicão de forma atômica...
    * https://redis.io/commands/rpop
  * **BLPOP** - recupera/remove elemento da primeira posição de forma atômica e espera até que entre um novo elemento na fila.
      * https://redis.io/commands/blpop
* Exemplo: utilizar esta lógica para uma fila de espera.

#### Relacionamentos - Conjutos
* SAAD - adiciona (união)
  * https://redis.io/commands/sadd
* SCARD - quantidade de elementos
  * https://redis.io/commands/scard
* SMEMBERS - lista todos os mebros de um conjunto
  * https://redis.io/commands/smembers
* SISMEMBER - mostra um mebros de um conjunto
  * https://redis.io/commands/sismember
* SREM - remove
  * https://redis.io/commands/smembers
* SINTER - relacionamento em comum (intersecção)
  * https://redis.io/commands/sinter
* SDIFF - relacionamento incomum (diferença)
  * https://redis.io/commands/sdiff
* SUNION - mostra todos os mebros de um ou mais conjuntos.
  * https://redis.io/commands/sunion
* Exemplo: rede social
```
SADD "relacionamentos:guilherme" "daniela" "carlos" "ana" "lucia"
SCARD "relacionamentos:guilherme"
SMEMBERS "relacionamentos:guilherme"
SISMEMBER "relacionamentos:guilherme" "marcela"
SREM "relacionamentos:guilherme" "ana"
SINTER "relacionamentos:guilherme" "relacionamentos:marcela"
SDIFF "relacionamentos:guilherme" "relacionamentos:marcela"
SUNION "relacionamentos:guilherme" "relacionamentos:marcela"
```

#### Ranking
* HINCRBY
* ZADD - adiciona no conjunto
  * https://redis.io/commands/zadd
* ZRANGE - retorno em ordem crescente
  * https://redis.io/commands/zrange
* ZREVRANGE - retorno em ordem decrescente
  * https://redis.io/commands/zrevrange
* Exemplo: pontuação de jogadores
```
ZADD pontuacoes 50076 guilherme
ZADD pontuacoes 65543 carlos
ZADD pontuacoes 33786 daniela
ZADD pontuacoes 8754 paulo

ZRANGE pontuacoes 0 3
ZRANGE pontuacoes 0 -1 WITHSCORES
ZREVRANGE pontuacoes 0 3
ZREVRANGE pontuacoes 0 -1 WITHSCORES

ZSCORE pontuacoes ana

ZRANK pontuacoes ana
ZREVRANK pontuacoes ana

ZINCRBY pontuacoes 50000 ana 
```