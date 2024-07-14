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
export BANK_CALLBACK=http://acmesky-api:8080`/v1/offers/pay
export BANK_TOKEN=token
export GEODISTANCE_API=acmesky-geodistance:50051
```

Una tabella `airlines` con una sola compagnia aerea può essere:

```
 id | created_at |  name   | login_username | login_password |             endpoint
----+------------+---------+----------------+----------------+-----------------------------------
  1 |            | WizzAir | wizzadmin      | pass           | http://airlineservice-api:8080`/v1
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

L'api (REST) del backend di AcmeSky, tramite gli handlers sotto descritti, permette l'interazione con l'intero backend del sistema. Comunica con i workers e con gli altri servizi tramite api, permette l'interazione con i database e con il message broker.

L'api, scritta in Go,è presente alla seguente [repository Github](https://github.com/acme-sky/acmesky-api).

#### AvailableFlight Handlers

##### AvailableFlightHandlerGet
- **Endpoint**: `/v1/available-flights/`
- **Method**: GET
- **Description**: Recupera tutti i voli disponibili. Se l'utente è un amministratore, vengono restituiti tutti i voli. Altrimenti, vengono restituiti solo i voli relativi all'utente.
- **Responses**:
  - 200: Lista dei voli disponibili.
  - 400: Utente non definito.
  - 404: Utente non trovato.

##### AvailableFlightHandlerGetId
- **Endpoint**: `/v1/available-flights/{availableFlightId}/`  
- **Method**: GET
- **Description**: Recupera un volo disponibile tramite il suo ID.
- **Responses**:
  - 200: Dati del volo disponibile.
  - 400: Utente non definito.
  - 404: Volo disponibile o utente non trovato.
  - 401: Accesso non autorizzato.

#### Interest Handlers

##### InterestHandlerGet
- **Endpoint**: `/v1/interests/`
- **Method**: GET
- **Description**: Recupera tutti gli interessi. Se l'utente è un amministratore, vengono restituiti tutti gli interessi. Altrimenti, vengono restituiti solo gli interessi relativi all'utente.
- **Responses**:
  - 200: Lista degli interessi.
  - 400: Utente non definito.
  - 404: Utente non trovato.

##### InterestHandlerPost
- **Endpoint**: `/v1/interests/filter/`
- **Method**: POST
- **Description**: Crea un nuovo interesse basato sull'input JSON della richiesta.
- **Responses**:
  - 201: Interesse creato.
  - 400: Utente non definito o input non valido.

##### InterestHandlerGetId
- **Endpoint**: `/v1/interests/{interestId}/`
- **Method**: GET
- **Description**: Recupera un interesse tramite il suo ID.
- **Responses**:
  - 200: Dati dell'interesse.
  - 400: Utente non definito.
  - 404: Interesse o utente non trovato.
  - 401: Accesso non autorizzato.

##### InterestHandlerDelete
- **Endpoint**: `/v1/interests/{interestId}/`
- **Method**: DELETE
- **Description**: Elimina un interesse tramite il suo ID.
- **Responses**:
  - 204: Interesse eliminato.
  - 400: Utente non definito.
  - 404: Interesse o utente non trovato.
  - 401: Accesso non autorizzato.

#### Invoice Handlers

##### InvoiceHandlerGet
- **Endpoint**: `/v1/invoices/`
- **Method**: GET
- **Description**: Recupera tutte le fatture. Se l'utente è un amministratore, vengono restituite tutte le fatture. Altrimenti, vengono restituite solo le fatture relative all'utente.
- **Responses**:
  - 200: Lista delle fatture.
  - 400: Utente non definito.
  - 404: Utente non trovato.

##### InvoiceHandlerGetId
- **Endpoint**: `/v1/invoices/{invoiceId}/`
- **Method**: GET
- **Description**: Recupera una fattura tramite il suo ID.
- **Responses**:
  - 200: Dati della fattura.
  - 400: Utente non definito.
  - 404: Fattura o utente non trovato.
  - 401: Accesso non autorizzato.

#### Journey Handlers

##### JourneyHandlerGet
- **Endpoint**: `/v1/journeys/`
- **Method**: GET
- **Description**: Recupera tutti i viaggi. Se l'utente è un amministratore, vengono restituiti tutti i viaggi. Altrimenti, vengono restituiti solo i viaggi relativi all'utente.
- **Responses**:
  - 200: Lista dei viaggi.
  - 400: Utente non definito.
  - 404: Utente non trovato.

##### JourneyHandlerGetId
- **Endpoint**: `/v1/journeys/{journeyId}/`
- **Method**: GET
- **Description**: Recupera un viaggio tramite il suo ID.
- **Responses**:
  - 200: Dati del viaggio.
  - 400: Utente non definito.
  - 404: Viaggio o utente non trovato.
  - 401: Accesso non autorizzato.

#### Login Handlers

##### LoginHandler
- **Endpoint**: `/v1/login/`
- **Method**: POST
- **Description**:
  - Autentica un utente verificando il suo nome utente e password.
  - Le password sono memorizzate come hash SHA256 nel database.
  - Se l'autenticazione ha successo, viene generato e restituito all'utente un JWT (JSON Web Token) per effettuare richieste autenticate.
- **Responses**:
  - 200 OK in caso di login riuscito con JWT e ID utente.
  - 400 Bad Request o 404 Not Found in caso di fallimento.

#### Offer Handlers

##### OfferHandlerGet
- **Endpoint**: `/v1/offers/`
- **Method**: GET
- **Description**:
  - Recupera le offerte dal database in base al ruolo dell'utente (amministratore o utente normale).
  - Gli amministratori ricevono tutte le offerte, mentre gli utenti normali ricevono solo le proprie.
- **Response**:
  - 200 OK con l'elenco delle offerte e il conteggio.

##### OfferHandlerGetId
- **Endpoint**: `/v1/offers/{offerId}/`
- **Method**: GET
- **Description**:
  - Recupera i dettagli di un'offerta specifica dal database.
  - Solo il proprietario dell'offerta o un amministratore possono accedere ai dettagli dell'offerta.
- **Response**:
  - 200 OK con i dettagli dell'offerta.
  - 404 Not Found o 401 Unauthorized se l'offerta non viene trovata o l'utente non è autorizzato.

##### OfferConfirmHandlerPost
- **Endpoint**: `/v1/offers/confirm/`
- **Method**: POST
- **Description**:
  - Convalida il token dell'offerta fornito e l'ID utente.
  - Invia un messaggio per confermare l'offerta.
- **Response**:
  - 200 OK in caso di conferma riuscita.
  - 400 Bad Request o 404 Not Found in caso di fallimento.

##### OfferHandlerPay
- **Endpoint**: `/v1/offers/{offerId}/pay/`
- **Method**: POST
- **Description**:
  - Elabora il pagamento per un'offerta specifica identificata dal suo ID.
  - Invia un messaggio indicando lo stato del pagamento.
- **Response**:
  - 200 OK in caso di pagamento riuscito.
  - 404 Not Found in caso di fallimento.

##### OfferHandlerLastMinute
- **Endpoint**: `/v1/offers/last-minute/`
- **Method**: POST
- **Description**:
  - Elabora un'offerta dell'ultimo minuto inviando le informazioni pertinenti come messaggio.
- **Response**:
  - 200 OK in caso di elaborazione riuscita.
  - 400 Bad Request in caso di fallimento.

#### Signup Handlers

##### SignupHandler
- **Endpoint**: `/v1/signup/`
- **Method**: POST
- **Description**:
  - Crea un nuovo account utente.
  - Convalida i dati di input, assicurando che non ci siano nomi utente o email duplicati e che il formato dell'email sia corretto.
- **Response**:
  - 201 Created in caso di registrazione riuscita con i dettagli dell'utente.
  - 400 Bad Request in caso di fallimento.

#### User Handlers

##### UserHandlerGet
- **Endpoint**: `/v1/users/`
- **Method**: GET
- **Description**:
  - Recupera tutti gli account utente dal database, escludendo le password.
- **Response**:
  - 200 OK con l'elenco degli utenti e il conteggio.

##### UserHandlerGetId
- **Endpoint**: `/v1/users/{userId}/`
- **Method**: GET
- **Description**:
  - Recupera i dettagli di un utente specifico dal database.
  - Solo l'utente stesso o un amministratore possono accedere ai dettagli dell'utente.
- **Response**:
  - 200 OK con i dettagli dell'utente.
  - 404 Not Found o 400 Bad Request se l'utente non viene trovato o il richiedente non è autorizzato.

##### UserHandlerPut
- **Endpoint**: `/v1/users/{userId}/`
- **Method**: PUT
- **Description**:
  - Permette a un utente di aggiornare i dettagli del proprio account.
  - Solo l'utente stesso o un amministratore possono eseguire l'aggiornamento.
- **Response**:
  - 200 OK in caso di aggiornamento riuscito con i dettagli dell'utente aggiornati.
  - 404 Not Found o 400 Bad Request se l'utente non viene trovato o il richiedente non è autorizzato.

### Frontend

Il Frontend del progetto Acmesky è sviluppato utilizzando Next.js, una scelta che garantisce facilità, modularità e un'integrazione fluida con il resto del sistema. Grazie alla sua struttura modulare, Next.js permette di costruire componenti riutilizzabili e facilmente manutenibili, semplificando l'aggiornamento e l'espansione delle funzionalità. Le pagine principali di Acmesky evidenziano le caratteristiche distintive del progetto: la home page infatti offre una panoramica intuitiva e veloce delle funzioni chiave usufruibili dall'utente.
Il design è pensato per essere intuibile e reattivo, garantendo un'esperienza utente fluida su qualsiasi dispositivo. L'interfaccia semplice e pulita assicura che gli utenti possano navigare facilmente tra le diverse sezioni, trovando rapidamente le informazioni di cui hanno bisogno.
- Dashboard: contiene i links alle diverse sezioni e features del sito, oltre ad un recap delle informazioni dell'utente.
- Add a new Interest: permette all'untente di aggiungere un interesse per un futuro viaggio.
- My interests: permette di visualizzare gli interessi salvati.
- Journeys: permette di visualizzare i journeys creati da AcmeSky in base agli interessi dell'utente.
- Offers: permette di visualizzare / riscattare le offerte create da AcmeSky per l'utente.
- Invoices: permette di visualizzare le ricevute e i relativi journeys dell'utente, oltre alle eventuali informazioni per il servizio premium.

## Esterni

Qui di seguito sono presenti i collegamenti alle pagine per singolo servizio
esterno. Viene illustrato il loro set up e il link al codice sorgente.

- **[Airline](/services/airline)**. Usato come gestore di una compagnia aerea.

- **[Bank](/services/bank)**. Usato come gateway di un servizio bancario.

- **[Rent](/services/rent)**. Usato per gestire le compagnie di taxi.

- **[Geodistance](/services/geodistance)**. Usato per ritrovare la distanza in metri tra due
  punti nello spazio.

- **[Prontogram](/services/prontogram)**. Usato come sistema di messaggistica.


