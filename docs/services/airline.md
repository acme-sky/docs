---
sidebar_position: 2
slug: /services/airline
---

# Airline

Il servizio Airline è progettato per gestire le operazioni di una compagnia aerea, consentendo la ricerca e la prenotazione di voli. Tuttavia, l'utente finale non interagisce direttamente con Airline per le prenotazioni; è ACMESky che si occupa di gestire queste operazioni attraverso le sue interfacce.

#### Funzionalità del Servizio

Airline offre una serie di funzionalità essenziali per la gestione dei voli:

- **Ricerca voli**: Consente di cercare voli disponibili in base a diversi criteri come data, destinazione e prezzo.
- **Prenotazione voli**: Permette la prenotazione dei voli selezionati, gestendo la disponibilità dei posti e confermando la prenotazione.
- **Gestione prenotazioni**: Include la visualizzazione e la gestione delle prenotazioni esistenti.

### Set up

Il servizio è implementato come una REST API scritta in Go. Di seguito sono riportati i passaggi necessari per configurare e avviare il servizio Airline.

#### Variabili d'Ambiente

Per configurare il servizio, è necessario definire alcune variabili d'ambiente:

1. **Database DSN**: A differenza degli altri servizi, la connessione al database è definita come una stringa DSN (Data Source Name). Questa stringa deve essere specificata nella variabile d'ambiente `DATABASE_DSN`.

   Esempio di configurazione:
   ```sh
   export DATABASE_DSN="user:password@host:port/dbname"
   ```

   A seguire bisognerà specificare anche:

   ```sh
   export POSTGRES_USER=user
   export POSTGRES_PASSWORD=password
   export POSTGRES_DB=dbname
   ```

2. **JWT token**: Alcuni endpoint del servizio richiedono l'autenticazione tramite token JWT. La chiave usata per generare il token JWT è specificata nella variabile d'ambiente `JWT_TOKEN`.

   Esempio di configurazione:
   ```sh
   export JWT_TOKEN="your_jwt_secret_key"
   ```

3. **Debug**: Se impostata a `1` saranno stampati ulteriori informazioni nel
   log di sistema. È consigliato impostare il valore a `0` in produzione.

   ```sh
   export DEBUG=0
   ```

### Deploy

Una volta impostate le variabili d'ambiente bisogna passare alla build del
codice sorgente e il deploy.

```sh
git clone git@github.com:acme-sky/airline-api.git
docker build -t acmesky-airlineservice-api .
docker compose up
```

e poi, infine, creare un utente usando come campo di password una stringa in
SHA256.

> Si può fare l'hash di una stringa su Linux con `echo -n "password" | sha256sum`

```sh
$ docker ps                                                                                                                                                         1 ↵
CONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS          PORTS                                       NAMES
646fc7c342fd   acmesky-airlineservice-api   "./main"                 57 seconds ago   Up 56 seconds   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   airlineservice-api
c8f8f8782838   postgres:16-alpine           "docker-entrypoint.s…"   57 seconds ago   Up 56 seconds   5432/tcp                                    airlineservice-postgres
$ docker exec -it c8 psql -U acme -d db -W
Password:
psql (16.2)
Type "help" for help.

db=# create user
user              user mapping for
db=# insert into users (username, password) values ('sa', '6ea044c786f237c955b497b04b9247f2a663c5038e54175e62308c8b8457e23e');
INSERT 0 1
```


## API

![Swagger screenshot](/img/swagger-airline.png)

Si può procedere con il login per la creazione del token di autorizzazione agli endpoint.

```
$ curl -X POST http://airlineservice-api/v1/login/ -H 'content-type: application/json' -d '{"username":"sa","password":"*****"}'
HTTP/1.1 200 OK
Content-Length: 147
Content-Type: application/json; charset=utf-8
Date: Tue, 02 Apr 2024 10:14:41 GMT

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiZXhwIjoxNzEyMDU2NDgxfQ.7R87BuuVkvOwojBpLmJ8OKtKC0B9Iq-wWSA_pqGBVXE"
}
```

Ecco una descrizione dei principali gruppi di endpoint dell'API di Airline:

### /v1/airports/

Questo endpoint gestisce le informazioni sugli aeroporti. Il metodo POST è accessibile solo agli utenti registrati e consente loro di visualizzare e gestire i dati degli aeroporti.
Gli utenti non registrati possono accedere alla visualizzazione delle
informazioni sfruttando il codice dell'aereoporto (ad esempio
`/v1/airports/blq/`).

### /v1/flights/

Questo endpoint gestisce le informazioni sui voli. È accessibile solo agli utenti registrati e offre funzionalità di ricerca e gestione dei voli. 
Gli utenti possono filtrare i voli in base a diversi criteri come orario di partenza, orario di arrivo, ID dell'aeroporto di partenza e ID dell'aeroporto di arrivo sfruttando `/v1/flights/filter/`.

### /v1/hooks/

Questo endpoint gestisce gli endpoint di callback a cui la compagnia aerea può fare richieste per inviare offerte. Quando una nuova offerta viene fatta, la compagnia aerea effettua una chiamata HTTP POST a `<url>/v1/hooks/offer/` includendo il parametro `flight_id`. Questo endpoint è utile per ricevere notifiche in tempo reale su offerte e promozioni relative ai voli.

### /v1/journeys/

Questo endpoint gestisce le informazioni sui viaggi degli utenti. Gli utenti possono creare un viaggio utilizzando il campo `email` per contrassegnare l'utente della propria piattaforma. Questo endpoint consente agli utenti di visualizzare e gestire i propri viaggi, inclusa la creazione, la modifica e l'eliminazione dei viaggi associati al proprio account.

## Codice sorgente

Il server è presente alla seguente [repository Github](https://github.com/acme-sky/airline-api).
