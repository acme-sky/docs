---
sidebar_position: 2
slug: /services/airline
---

# Airline

Servizio usato come gestore di una compagnia aerea, in cui si possono cercare e
prenotare dei voli.

Il servizio dispone solo di interfaccia tramite API perché l'utente non accede
direttamente ad `Airline` per la prenotazione: è ACMESky a fare tutto ciò.

## Set up

Il servizio è una REST API scritta in Go. Bisogna definire una variabile
d'ambiente per il database che però, a differenza degli altri servizi, è
definita come stringa DSN.
Inoltre, dato che alcuni endpoint richiedono l'autenticazione, bisogna fare il
login e usare il token [JWT](https://jwt.io) generato. La chiave usata per
generare il token è definito dalla variabile d'ambiente `JWT_TOKEN`.

## API

![Swagger screenshot](/img/swagger-airline.png)

Nel README è presente una descrizione su come creare un utente sfruttando il
container Docker.
Una volta creato si può procedere con il login per la creazione del token di
autorizzazione agli endpoint.

```
$ curl -X POST http://localhost:8080/v1/login/ -H 'content-type: application/json' -H 'accept: application/json, */*;q=0.5' -d '{"username":"sa","password":"*****"}'
HTTP/1.1 200 OK
Content-Length: 147
Content-Type: application/json; charset=utf-8
Date: Tue, 02 Apr 2024 10:14:41 GMT

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiZXhwIjoxNzEyMDU2NDgxfQ.7R87BuuVkvOwojBpLmJ8OKtKC0B9Iq-wWSA_pqGBVXE"
}
```

### /v1/airports/

Gestione degli aeroporti. Solo gli utenti possono gestirli.

### /v1/flights/

Gestione dei voli. Solo gli utenti possono gestirli. I privati filtrare i voli
in base ai campi `departaure_time`, `arrival_time`, `departaure_airport_id` e
`arrival_airport_id`.

### /v1/hooks/

Gestione di endpoint in cui la compagnia area può fare richieste per inviare le
offerte. Una nuova offerta viene fatta mediante chaimata HTTP `POST
<url>/v1/hooks/offer/` con parametro `flight_id`.

### /v1/journeys/

Gestione dei viaggi. L'utente crea un viaggio usando il campo `email` per
contrassegnare l'utente della propria piattaforma.

## Codice sorgente

Il server è presente alla seguente [repository Github](https://github.com/acme-sky/airline-service).
