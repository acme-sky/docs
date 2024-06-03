---
sidebar_position: 3
slug: /services/bank
---

# Bank

Il servizio Bank funge da gateway di pagamenti per ACMESky, simile al noto servizio online [PayPal](https://paypal.com). Consente a un servizio terzo di creare una richiesta di pagamento che può essere completata da un utente utilizzando un account associato, senza la necessità che l'utente pagante sia registrato.

È composto da due parti:

1. **API**: Una REST API scritta in OCaml che espone endpoint accessibili solo ai possessori di un `API-TOKEN`, nonché endpoint pubblici come quello per la conferma del pagamento.

2. **Frontend**: Realizzato in Vue.js, il frontend consiste in una single-page mostrata all'utente per completare il pagamento inserendo i dati della propria carta di credito. Il link alla pagina è generato da Bank durante la creazione del pagamento da parte di ACMESky.

## Set up

Qui di seguito viene riportato uno snippet per la build del progetto:

```bash
# Clonare il repository
git clone git@github.com:acme-sky/bank-service.git
cd bank-service

export POSTGRES_USER="$pg_user"
export POSTGRES_PASSWORD="$pg_pass"
export POSTGRES_DB="$pg_db"
export DATABASE_URL="postgres://$pg_user:$pg_pass@bankservice-postgres:5432/$pg_db"
export API_TOKEN="$api_token"

docker build -t acmesky-bankservice-api api
docker build -t acmesky-bankservice-ui --build-arg VITE_BACKEND_URL="$bank_api" ui

docker compose up
```

Durante la build del frontend, puoi passare l'URL dell'API come argomento, utilizzando una variabile d'ambiente. In questo modo, il frontend sarà in grado di comunicare correttamente con l'API.


## API

![Swagger screenshot](/img/swagger-acmebank.png)

### /payments/

Questa chiamata usa l'`API Token` header `X-API-TOKEN` e crea un nuovo pagamento.

Request:

```json
curl -X POST http://localhost:8080/payments/ -H 'x-api-token: token' -H 'content-type: application/json' -d '\
{
  "owner": "Mario Rossi",
  "amount": 42.1,
  "description": "Flight to CPH",
  "callback": "http://acmesky.cs.unibo.it/api/pay/42/"
}'
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

### /payments/\<id\>/

Lo stesso response di sopra:

```json
curl http://localhost:8080/payments/bc7676ac-1a23-4ca9-98dc-462c7036de36/

HTTP/1.1 200 OK
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: OPTIONS, GET, HEAD, POST
Access-Control-Allow-Origin: *
Access-Control-Max-Age: 86400
Allow: OPTIONS, GET, HEAD, POST
Content-Length: 215
Content-Type: application/json
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

### /payments/\<id\>/pay/

Chiamata usata per pagare. Esso cambia lo stato di `paid = false` a `paid = true`.

## Frontend

![Screenshot frontend](https://raw.githubusercontent.com/acme-sky/bank-service/main/assets/screenshot.png)

Il frontend richiede le informazioni della carta di credito, ma queste informazioni non vengono effettivamente utilizzate nel processo di pagamento. In questo caso, il frontend funge principalmente da interfaccia utente per avviare il processo di pagamento.


## Codice sorgente

Il server è presente alla seguente [repository Github](https://github.com/acme-sky/bank-service).
