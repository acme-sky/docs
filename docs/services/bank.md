---
sidebar_position: 3
slug: /services/bank
---

# Bank

Servizio usato come gateway di pagamenti. Rircorda molto l'uso del noto servizio
online [PayPal](https://paypal.com) in cui un servizio terzo può creare una
richiesta di pagamento che poi un utente può completare usando un account
associato.

A differenza del servizio online sopracitato, Acmebank, non richiede che l'utente pagante sia registrato.

## Set up

Il servizio è diviso in due:

1. **API**. REST API scritta in OCaml la quale espone degli endpoint disponibili
   solo per i possessori di un `API-TOKEN` ed altri pubblici, come ad esempio,
   quello della conferma pagamento.

2. **Frontend**. Scritto in Vue.js, è composto da una single-page mostrata
   all'utente che deve completare il pagamento inserendo i dati della propria
   carta di credito. Il link alla pagina è generato da Acmebank in fase di
   creazione di pagamento da parte di Acmesky.

Si può usare un file nella repository per creare una build del progetto, ma qui
di seguito viene riportato uno snippet.

```sh
export POSTGRES_USER="$pg_user"
export POSTGRES_PASSWORD="$pg_pass"
export POSTGRES_DB="$pg_db"
export DATABASE_URL="postgres://$pg_user:$pg_pass@bankservice-postgres:5432/$pg_db"
export API_TOKEN="$api_token"

docker build -t acmesky-bankservice-api api
docker build -t acmesky-bankservice-ui --build-arg VITE_BACKEND_URL="$bank_api" ui

docker compose up
```

Si vede come il servizio di frontend debba essere collegato all'API mediante una
variabile d'ambiente usata come argomento di build. Inoltre, l'host del database
è lasciato, di default, col nome dell'immagine messa _up_ da Docker compose.

## API

![Swagger screenshot](/img/swagger-acmebank.png)

### POST /payments/

Questa chiamata usa l'`API Token` header `X-API-TOKEN` e crea un nuovo pagamento.

Request:

```json
{
  "owner": "Mario Rossi",
  "amount": 42.1,
  "description": "Flight to CPH",
  "callback": "http://acmesky.cs.unibo.it/api/pay/42/"
}
```

Response:

```json
{
    "id": "23db02df-dda6-4897-9391-5767b262a88c",
    "owner": "John Doe",
    "amount": 30.4,
    "description": "Flight to CPH",
    "callback": "http://acmesky.cs.unibo.it/api/pay/42/",
    "paid": false,
    "created_at": "2024-04-15 16:02:02.928454"
}
```

### GET /payments/\<id\>/

Lo stesso response di sopra:

```json
{
    "id": "23db02df-dda6-4897-9391-5767b262a88c",
    "owner": "John Doe",
    "amount": 30.4,
    "description": "Flight to CPH",
    "callback": "http://acmesky.cs.unibo.it/api/pay/42/",
    "paid": false,
    "created_at": "2024-04-15 16:02:02.928454"
}
```

### POST /payments/\<id\>/pay/

Chiamata usata per pagare. Esso cambia lo stato di `paid` a `true`.

## Frontend

![Screenshot frontend](https://raw.githubusercontent.com/acme-sky/bank-service/main/assets/screenshot.png)

Il frontend è la pagina principale in cui vengono richieste le informazioni
della carta di credito per procedere al pagamento.

In realtà i dati della carta vengono ignorati perché non usati realmente nel
pagamento.


## Codice sorgente

Il server è presente alla seguente [repository Github](https://github.com/acme-sky/bank-service).
