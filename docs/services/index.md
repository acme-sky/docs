---
sidebar_position: 6
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
export OFFER_VALIDATION_TIME=24
export PRONTOGRAM_ENDPOINT=http://prontogram:8000/api
export BANK_ENDPOINT=http://bankservice-api:8080
export BANK_PAYMENT_ENDPOINT=http://http://localhost:9281/?id=
export BANK_CALLBACK=http://acmesky-api:8080/v1/offers/pay
export BANK_TOKEN=token
export GEODISTANCE_API=acmesky-geodistance:50051
```

Una tabella `airlines` con una sola compagnia aerea può essere:

```
 id | created_at |  name   | login_username | login_password |             endpoint
----+------------+---------+----------------+----------------+-----------------------------------
  1 |            | WizzAir | wizzadmin      | pass           | http://airlineservice-api:8080/v1
```

Una tabella `rents` con una sola compagnia di rent può essere:

```
 id | created_at | name |  latitude  | longitude  |                  endpoint
----+------------+------+------------+------------+---------------------------------------------
  1 |            | Uber | 37.4844103 | 15.0729718 | http://rent-leonardo:8081/uber-acmesky.wsdl
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


