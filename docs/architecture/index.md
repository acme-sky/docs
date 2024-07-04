---
sidebar_position: 2
slug: /architecture/
---

# Architettura

![Architecture scheme](/img/architecture.png)

Nello schema sopra riportato, è possibile distinguere chiaramente i vari servizi terziari dai servizi offerti da ACMESky. Di seguito, analizzeremo nel dettaglio la struttura di questi servizi e illustreremo come ACMESky li utilizza.

## Database

Usiamo solo PostgreSQL, un database NoSQL open-source. L'istanza che si vede
nello schermo è condivisa da [worker](#worker) e [backend web](#acmesky-web).

Le tabelle presenti nel database sono le seguenti:

- `available_flights`

```
      Column       |           Type           | Collation | Nullable |                    Default
-------------------+--------------------------+-----------+----------+-----------------------------------------------
 id                | bigint                   |           | not null | nextval('available_flights_id_seq'::regclass)
 created_at        | timestamp with time zone |           |          |
 airline           | text                     |           |          |
 departure_time    | timestamp with time zone |           |          |
 departure_airport | text                     |           |          |
 arrival_time      | timestamp with time zone |           |          |
 arrival_airport   | text                     |           |          |
 code              | text                     |           |          |
 cost              | numeric                  |           |          |
 interest_id       | bigint                   |           |          |
 offer_sent        | boolean                  |           |          |
 user_id           | bigint                   |           |          |
 ```

 - `interests`

 ```
          Column           |           Type           | Collation | Nullable |                Default
---------------------------+--------------------------+-----------+----------+---------------------------------------
 id                        | bigint                   |           | not null | nextval('interests_id_seq'::regclass)
 created_at                | timestamp with time zone |           |          |
 flight1_departure_time    | timestamp with time zone |           |          |
 flight1_departure_airport | text                     |           |          |
 flight1_arrival_time      | timestamp with time zone |           |          |
 flight1_arrival_airport   | text                     |           |          |
 flight2_departure_time    | timestamp with time zone |           |          |
 flight2_departure_airport | text                     |           |          |
 flight2_arrival_time      | timestamp with time zone |           |          |
 flight2_arrival_airport   | text                     |           |          |
 user_id                   | bigint                   |           |          |
```

- `journeys`

```
   Column   |           Type           | Collation | Nullable |               Default
------------+--------------------------+-----------+----------+--------------------------------------
 id         | bigint                   |           | not null | nextval('journeys_id_seq'::regclass)
 created_at | timestamp with time zone |           |          |
 flight1_id | bigint                   |           |          |
 flight2_id | bigint                   |           |          |
 cost       | numeric                  |           |          |
 user_id    | bigint                   |           |          |
```

- `offers`

```
    Column    |           Type           | Collation | Nullable |              Default
--------------+--------------------------+-----------+----------+------------------------------------
 id           | bigint                   |           | not null | nextval('offers_id_seq'::regclass)
 created_at   | timestamp with time zone |           |          |
 message      | text                     |           |          |
 expired      | text                     |           |          |
 token        | text                     |           |          |
 is_used      | boolean                  |           |          |
 payment_link | text                     |           |          |
 payment_paid | boolean                  |           |          |
 journey_id   | bigint                   |           |          |
 user_id      | bigint                   |           |          |
```

- `rents`

```
   Column   |           Type           | Collation | Nullable |              Default
------------+--------------------------+-----------+----------+-----------------------------------
 id         | bigint                   |           | not null | nextval('rents_id_seq'::regclass)
 created_at | timestamp with time zone |           |          |
 name       | text                     |           |          |
 latitude   | numeric                  |           |          |
 longitude  | numeric                  |           |          |
 endpoint   | text                     |           |          |
```

- `airlines`

```
     Column     |           Type           | Collation | Nullable |               Default
----------------+--------------------------+-----------+----------+--------------------------------------
 id             | bigint                   |           | not null | nextval('airlines_id_seq'::regclass)
 created_at     | timestamp with time zone |           |          |
 name           | text                     |           |          |
 login_username | text                     |           |          |
 login_password | text                     |           |          |
 endpoint       | text                     |           |          |
```

- `users`

```
       Column        |           Type           | Collation | Nullable |              Default
---------------------+--------------------------+-----------+----------+-----------------------------------
 id                  | bigint                   |           | not null | nextval('users_id_seq'::regclass)
 created_at          | timestamp with time zone |           |          |
 username            | text                     |           |          |
 password            | text                     |           |          |
 name                | text                     |           |          |
 email               | text                     |           |          |
 address             | text                     |           |          |
 prontogram_username | text                     |           |          |
 is_admin            | boolean                  |           |          |
```

## Messages

Servizio di message broking che fa uso di RabbitMQ. I messaggi si trasmettano nella
rete mediante protocollo
[AMQP](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol).

Ad utilizzare la coda `acme_messages` sono il servizio [worker](#worker) e
[backend web](#acmesky-web) in modalità pub/sub.

Il backend pubblica i messaggi nella coda e il worker li attende, così da
eseguire una task.


## Worker

Grazie a [Camunda](https://camunda.io), il nostro servizio è in grado di integrare la business logic all'interno dei processi BPMN ed eseguire le task corrispondenti.

Il servizio, sviluppato in Go, si connette a un database [PostgreSQL](https://postgresql.org) per salvare i dati visualizzati nelle tabelle BPMN, come *interessi*, *voli disponibili*, *offerte* e *viaggi*.
Inoltre, il servizio dipende dal message broker [RabbitMQ](https://rabbitmq.com), al quale si connette in modalità _subscriber_ per ricevere messaggi nella coda `acme_messages`. 
Questi messaggi vengono utilizzati per creare nuovi `NewPublishMessageCommand` nel client.

Nella [struttura Git](https://github.com/acme-sky/workers/tree/main/internal/handlers), ogni task è organizzata all'interno di un modulo Go per facilitare la gestione e l'ordine del codice.


```
handlers
├── acmesky
│   ├── st_change_offer_status.go
│   ├── st_create_journeys.go
│   ├── st_get_user_interests.go
│   ├── st_offer_still_valid.go
│   ├── st_prepare_offer.go
│   ├── st_retrieve_offer.go
│   ├── st_save_flight.go
│   ├── st_save_flights_as_available.go
│   ├── st_save_last_minute_offer.go
│   ├── tm_ack_flight_request_save.go
│   ├── tm_ask_for_rent.go
│   ├── tm_ask_payment_link.go
│   ├── tm_book_journey.go
│   ├── tm_compute_distance_user_airport.go
│   ├── tm_error_on_book_journey.go
│   ├── tm_error_on_check_offer.go
│   ├── tm_find_nearest_available_rent_company.go
│   ├── tm_journey.go
│   ├── tm_journey_and_rent.go
│   ├── tm_journey_rent_error.go
│   ├── tm_search_flight_on_airline.go
│   ├── tm_send_offer.go
│   └── tm_send_payment_link.go
├── prontogram
│   ├── st_save_info_on_prontogram.go
│   └── tm_propagate_message_from_prontogram.go
└── user
    ├── tm_check_offer.go
    └── tm_new_request_save_flight.go
```

Nel file `main.go` del worker, è possibile vedere come ogni handler sia associato a un job che rimane in attesa di un trigger, che può provenire da Camunda o da un altro job. Nel caso di un trigger da parte di un altro job, questo avviene mediante la pubblicazione di un messaggio (publish message).

I messaggi utilizzati per attivare un sotto-processo non timer-catch sono i seguenti:

- Nuovo interesse

```json
{
    "name": "CM_New_Request_Save_Flight",
    "correlation_key": "0",
    "payload": {
        "flight1_departure_airport": "CPH",
        "flight1_departure_time": "2024-06-02T00:00:00Z",
        "flight1_arrival_airport":"CTA",
        "flight1_arrival_time": "2024-06-03T01:00:00Z",
        "flight2_departure_airport": "CTA",
        "flight2_departure_time": "2024-07-11T00:00:00Z",
        "flight2_arrival_airport": "CPH",
        "flight2_arrival_time": "2024-07-13T01:00:00Z",
        "user_id": 1,
    }
}
```

- Volo last minute

```json
{
    "name": "CM_Received_Last_Minute_Offer",
    "correlation_key": "0",
    "payload": {
        "flight": {
            "departure_airport": "CPH",
            "departure_time": "2024-06-10T00:00:00Z",
            "arrival_airport": "CTA",
            "arrival_time": "2024-06-13T01:00:00Z",
            "airline": "http://localhost:8080/v1",
            "cost": 123,
            "code": "IT1213"
        }
    }
}
```

- Controllo di un offerta ricevuta

```json
{
    "name": "CM_Check_Offer",
    "correlation_key": "0",
    "payload": {
        "token": "M7QDS6"
    }
}
```

- Risposta di pagamento

```
{
    "name": "CM_Payment_Response",
    "correlation_key": "0",
    "payload": {
        "payment_status": "OK"
    }
}
```

## ACMESky Web

### Backend

La REST API è il cuore del servizio web di ACMESky, fungendo da punto di interazione principale tra il frontend e il backend del sistema. Gli utenti finali interagiscono con il servizio esclusivamente attraverso il frontend, il quale invia richieste alla REST API per eseguire varie operazioni.

#### Separazione della Business Logic

È importante notare che la REST API non contiene la business logic. Questa separazione è cruciale per mantenere una struttura del codice pulita e modulare. La business logic risiede invece nei worker, che sono componenti specializzati nell'esecuzione delle operazioni richieste.
Questo approccio consente di mantenere il backend leggero e focalizzato sulla visualizzazione per gli utenti finali.

#### Flusso di Lavoro

Quando un utente interagisce con il frontend, ad esempio per salvare un interesse per un viaggio, il processo avviene come segue:

1. **Richiesta HTTP dal Frontend**: L'utente invia una richiesta HTTP al backend attraverso il frontend, specificando l'azione desiderata. Questa richiesta può includere dati aggiuntivi necessari per completare l'azione, come i dettagli dell'interesse per il viaggio.
   
2. **Inserimento nel Messaggio**: Il backend riceve la richiesta e incapsula i dati del payload in un messaggio. Questo messaggio viene poi trasmesso al message broker [RabbitMQ](https://rabbitmq.com).

3. **Elaborazione del Worker**: Il worker, in ascolto sui messaggi in arrivo su RabbitMQ, riceve il messaggio e avvia l'elaborazione. È il worker a contenere ed eseguire la business logic necessaria per completare l'azione richiesta, come il salvataggio dell'interesse nel database.

4. **Aggiornamento del Database**: Poiché il database [PostgreSQL](https://postgresql.org) è condiviso tra il backend e i worker, il worker salva i dati nel database una volta completata l'elaborazione. 

5. **Richieste GET**: Quando l'utente invia una richiesta GET per recuperare informazioni, come la lista degli interessi, il backend interroga il database condiviso e restituisce i dati richiesti al frontend.

#### Vantaggi dell'Architettura

Questo modello architetturale offre diversi vantaggi:

- **Scalabilità**: La separazione della business logic nei worker permette di scalare orizzontalmente il sistema, aggiungendo più worker secondo necessità senza influenzare il backend.
- **Manutenzione**: La manutenzione del codice è semplificata, poiché la business logic è isolata nei worker e non mischiata con la logica di gestione delle richieste HTTP.
- **Affidabilità**: Utilizzando RabbitMQ come message broker, garantiamo che le richieste siano processate in modo affidabile e che eventuali guasti possano essere gestiti senza perdita di dati.


### Frontend

Il frontend di ACMESky rappresenta la vetrina attraverso la quale l'utente finale interagisce con il servizio. Sviluppato utilizzando [Next.js](https://nextjs.org), un framework React per lo sviluppo di applicazioni web, il frontend fornisce un'interfaccia utente intuitiva e reattiva.

#### Interazione con il Backend

Il frontend si interfaccia esclusivamente con il [backend web](#acmesky-web) attraverso chiamate HTTP. Questo design permette una chiara separazione delle responsabilità tra il frontend e il backend, migliorando la manutenibilità e la scalabilità dell'intero sistema. Ogni azione dell'utente, come la ricerca di voli, la visualizzazione delle offerte o la gestione degli interessi di viaggio, viene tradotta in una richiesta HTTP al backend, che gestisce la logica applicativa e l'accesso ai dati.

#### Sistema di Autenticazione

La sicurezza e l'autenticazione sono gestite mediante JSON Web Tokens ([JWT](https://jwt.io)). Quando un utente si autentica, il backend genera un token JWT, che viene poi utilizzato per autenticare le successive richieste dell'utente. Il token JWT è incluso nell'header `Authorization` delle richieste HTTP, garantendo che solo gli utenti autenticati possano accedere a determinate risorse e funzionalità del servizio.

#### Vantaggi dell'Architettura

L'utilizzo di Next.js per il frontend e JWT per l'autenticazione offre numerosi vantaggi:

- **Performance**: Next.js permette il rendering lato server e la generazione statica, migliorando le performance e l'ottimizzazione per i motori di ricerca (SEO).
- **Sicurezza**: L'uso di JWT garantisce un sistema di autenticazione sicuro e scalabile, con la possibilità di gestire facilmente sessioni utente e permessi.
- **Manutenibilità**: La separazione tra frontend e backend facilita lo sviluppo indipendente delle due componenti, permettendo aggiornamenti e miglioramenti senza interferenze reciproche.

## Servizi esterni

Essi sono servizi usati dal [worker](#worker) e sono meglio descritti nel loro
dettaglio in [qui](/docs/services/).

### Geodistance

Il servizio Geodistance è progettato per calcolare le distanze tra due indirizzi utilizzando le coordinate geografiche. Questo servizio è scritto in Go e sfrutta l'API di Google Maps per fornire risultati precisi ed efficienti.

#### Comunicazione tramite gRPC

La comunicazione tra il worker e il servizio Geodistance avviene tramite [gRPC](https://grpc.io), un framework di chiamata di procedure remote (RPC) ad alte prestazioni sviluppato da Google. gRPC permette la trasmissione di dati in modo veloce e sicuro, garantendo un'interazione fluida e affidabile tra i vari componenti del sistema.

#### Calcolo della distanza

Il servizio Geodistance utilizza le API di Google Maps per calcolare la distanza in metri tra due indirizzi. Gli indirizzi vengono specificati utilizzando le coordinate di latitudine e longitudine. 
Quest'ultime forniscono una rappresentazione precisa della posizione, riducendo al minimo gli errori nei calcoli della distanza.

#### Conversione degli indirizzi

Per facilitare l'uso del servizio da parte degli utenti, Geodistance include anche la funzionalità di conversione degli indirizzi. Gli utenti possono inserire gli indirizzi in formato stringa 
(ad esempio, "Mura Anteo Zamboni 7, Bologna"), e il servizio utilizza le API di Google Maps per convertire questi indirizzi nelle corrispondenti coordinate di latitudine e longitudine.

### Airline

È progettato per simulare l'API di una compagnia aerea. Scritto in Go e utilizzando il framework Gin, Airline offre una REST API attraverso la quale il [worker](#worker) può effettuare richieste HTTP per cercare i voli di interesse per un utente.

#### Ricerca dei voli

Allo scoccare del timer-event il worker di ACMESky invia una richiesta HTTP alla REST API del servizio Airline per la ricerca dei voli d'interesse.
Questa richiesta include i dettagli necessari, come gli aereiporti di destinazione/arrivo e le date di viaggio.

#### Scalabilità

Un aspetto chiave del servizio Airline è la sua capacità di essere scalabile e di simulare più compagnie aeree.
Questo è ottenuto attraverso la possibilità di creare più istanze del servizio, ciascuna con il proprio database separato.
Ogni istanza rappresenta una compagnia aerea distinta, consentendo di simulare un ambiente realistico con diverse opzioni di voli: questo simula un servizio reale che va alla ricerca di più fonti per i propri utenti.

### Bank

Questo servizio è composto da due parti principali: un backend scritto in OCaml e un frontend sviluppato in Vue.js.

#### Backend in OCaml

Il backend del servizio di pagamento è scritto in OCaml, un linguaggio di programmazione funzionale. Questo backend espone una REST API che permette al [worker](#worker) di interfacciarsi con esso per eseguire varie operazioni di pagamento.

Quando un utente avvia una transazione di pagamento, il worker comunica con il backend attraverso chiamate REST. Queste chiamate includono le informazioni necessarie per processare il pagamento, come l'importo e le credenziali di pagamento dell'utente.

#### Frontend in Vue.js

Il frontend del servizio di pagamento è sviluppato in Vue.js, un framework JavaScript noto per la sua facilità d'uso e capacità di creare interfacce utente reattive e dinamiche.

1. **UI**: Gli utenti utilizzano il frontend per inserire le proprie credenziali di pagamento. Anche se le credenziali sono fittizie per scopi di simulazione, il processo è progettato per essere il più realistico possibile.
2. **UX**: L'interfaccia utente è intuitiva e guida l'utente attraverso i passaggi necessari per completare la transazione. Una volta che l'utente ha inserito le informazioni richieste, il frontend invia questi dati al backend tramite una richiesta HTTP.

Una volta completato il processo, l'utente viene reindirizzato a un link di callback che conferma o nega il pagamento. Questo link può visualizzare un messaggio di successo o di errore, informando l'utente dell'esito della transazione.

### Prontogram

Il servizio di messaggistica Prontogram è progettata per consentire la comunicazione tra il sistema e gli utenti finali durante la fase di generazione di offerte. È diviso in due parti principali: un backend scritto in [Jolie](https://jolie-lang.org/) e un frontend sviluppato in [React](https://react.dev).

#### Backend in Jolie

Il backend del servizio Prontogram è sviluppato utilizzando Jolie, un linguaggio di programmazione progettato specificamente per la costruzione di microservizi e per il [paradigma di programmazione orientato alle coreografie](https://en.wikipedia.org/wiki/Choreographic_programming). Jolie facilita la creazione di servizi distribuiti, garantendo un'architettura modulare e scalabile.

1. **Interazione del worker**: Il [worker](#worker) di ACMESky comunica con il backend di Prontogram attraverso una REST API. Quando il worker deve inviare un messaggio a un utente, effettua una richiesta HTTP all'endpoint appropriato del backend.
2. **Creazione di messaggi**: L'endpoint del backend di Prontogram è responsabile della creazione di nuovi messaggi. Per poter inviare un messaggio, l'utente destinatario deve avere specificato il campo `prontogram_username` nel suo profilo ACMESky. Questo campo identifica univocamente l'utente all'interno del sistema Prontogram.
3. **Gestione dei messaggi**: Una volta ricevuta la richiesta dal worker, il backend di Prontogram elabora i dati e crea un nuovo messaggio per l'utente selezionato, salvandolo nel database del servizio.

#### Frontend in React

Il frontend del servizio Prontogram è sviluppato in React, una libreria JavaScript popolare per la costruzione di interfacce utente. React permette di creare componenti riutilizzabili e di mantenere un'interfaccia utente reattiva e dinamica.

1. **Accesso dell'utente**: Gli utenti finali possono accedere al frontend di Prontogram per visualizzare i messaggi che gli sono stati inviati da ACMESky. L'interfaccia utente è progettata per essere intuitiva e facile da usare, consentendo agli utenti di leggere i loro messaggi in modo semplice.
2. **Visualizzazione dei messaggi**: Il frontend offre una visualizzazione in sola lettura dei messaggi. Gli utenti possono vedere i messaggi ricevuti, ma non possono modificarli o rispondere tramite questa interfaccia. Questo garantisce che le comunicazioni importanti inviate da ACMESky rimangano intatte e non alterate.
3. **UX**: React garantisce un'esperienza utente fluida, con aggiornamenti in tempo reale e un'interfaccia reattiva. Gli utenti possono navigare attraverso i messaggi e visualizzare le informazioni pertinenti senza ritardi o interruzioni.

### Rent

Servizio progettato per fornire un'esperienza di transfer simile a quella offerta da aziende come [Uber](https://uber.com) o [Bolt](https://bolt.eu). Scritto in [Jolie](https://jolie-lang.org), questo servizio viene utilizzato per gestire le prenotazioni di transfer degli utenti dal loro indirizzo di casa all'aeroporto di partenza del viaggio, sotto determinate condizioni.

#### Funzionalità del servizio

Il servizio viene attivato nelle seguenti circostanze:

- **Prenotazioni di transfer**: Il servizio viene utilizzato quando il prezzo del viaggio supera i 1000€. In queste condizioni, ACMESky offre un servizio di transfer gratuito all'utente.
- **Simulazione di agenzie reali**: Il servizio è progettato per simulare scenari realistici, permettendo la creazione di più istanze per rappresentare diverse agenzie di transfer. Ogni istanza funziona in modo indipendente e può essere contattata dal worker per trovare la soluzione di transfer più vicina e conveniente per l'utente.

Il [worker](#worker) di ACMESky è responsabile di interagire con il servizio di transfer tramite un'API SOAP. Questo protocollo di comunicazione garantisce una trasmissione dati sicura e affidabile tra il worker e il servizio.

Per determinare la vicinanza delle agenzie di transfer all'indirizzo dell'utente, il servizio utilizza il servizio [Geodistance](#geodistance). Questo consente di calcolare la distanza tra l'indirizzo dell'utente e le diverse agenzie di transfer, trovando la soluzione ottimale.
