---
sidebar_position: 4
slug: /services/
---

# Servizi

## ACMESky

### Worker

L'architettura del worker è descritta nella sua [sezione
apposita](/docs/architecture#worker). Qui di seguito viene descritto un suo set
up d'esempio.

```sh
export ZEEBE_ADDRESS="localhost:26500"
export BPMN_FILE="bpmn/acmesky.bpmn"
export PROCESS_ID="Process_User"
export RABBITMQ_URI="amqp://guest:guest@localhost:5672/"
export SENTRY_DSN="<dsn che viene generato da Sentry>"
export DATABASE_DSN="host=host user=user password=pass dbname=acmesky port=5432"
export AIRLINES="https://airline1.com/v1,https//airline2.com/api"
export AIRLINE_LOGIN_USERNAME="admin"
export AIRLINE_LOGIN_PASSWORD="pass"
export OFFER_VALIDATION_TIME=24
export BANK_ENDPOINT="http://api.bank.com"
export BANK_PAYMENT_ENDPOINT="http://bank.com/?id="
export BANK_CALLBACK="http://backend.acmesky.com/api/pay"
export BANK_TOKEN="<token-segreto>"
export GEODISTANCE_API="127.0.0.1:50051"
```

È possibile fare un deploy del worker e di [Camunda
Platform](https://github.com/camunda/camunda-platform) usando docker-compose
presente nella cartella del codice sorgente.

```sh
$ docker build -t acmesky-workers .
$ git clone git@github.com:acme-sky/workers.git
$ docker compose up
```

Se non viene usato Docker, il servizio può essere eseguito con

```
$ go run main.go
```

### Backend

TODO

### Frontend

TODO

## Esterni

Qui di seguito sono presenti i collegamenti alle pagine per singolo servizio
esterno. Viene illustrato il loro set up e il link al codice sorgente.

- **[Airline](/services/airline)**. Usato come gestore di una compagnia aerea.

- **[Bank](/services/bank)**. Usato come gateway di un servizio bancario.

- **[Rent](/services/rent)**. Usato per gestire le compagnie di taxi.

- **[Geodistance](/services/geodistance)**. Usato per ritrovare la distanza in metri tra due
  punti nello spazio.

- **[Prontogram](/services/prontogram)**. Usato come sistema di messaggistica.


