"use strict";(self.webpackChunkacme_sky_docs=self.webpackChunkacme_sky_docs||[]).push([[233],{4788:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>s,toc:()=>d});var a=n(4848),r=n(8453);const t={sidebar_position:2,slug:"/architecture/"},l="Architettura",s={id:"architecture/index",title:"Architettura",description:"Architecture scheme",source:"@site/docs/architecture/index.md",sourceDirName:"architecture",slug:"/architecture/",permalink:"/docs/architecture/",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,slug:"/architecture/"},sidebar:"defaultSidebar",previous:{title:"Home",permalink:"/docs/"},next:{title:"Diagramma BPMN",permalink:"/docs/bpmn/"}},o={},d=[{value:"Database",id:"database",level:2},{value:"Messages",id:"messages",level:2},{value:"Worker",id:"worker",level:2},{value:"ACMESky Web",id:"acmesky-web",level:2},{value:"Backend",id:"backend",level:3},{value:"Separazione della Business Logic",id:"separazione-della-business-logic",level:4},{value:"Flusso di Lavoro",id:"flusso-di-lavoro",level:4},{value:"Vantaggi dell&#39;Architettura",id:"vantaggi-dellarchitettura",level:4},{value:"Frontend",id:"frontend",level:3},{value:"Interazione con il Backend",id:"interazione-con-il-backend",level:4},{value:"Sistema di Autenticazione",id:"sistema-di-autenticazione",level:4},{value:"Vantaggi dell&#39;Architettura",id:"vantaggi-dellarchitettura-1",level:4},{value:"Servizi esterni",id:"servizi-esterni",level:2},{value:"Geodistance",id:"geodistance",level:3},{value:"Comunicazione tramite gRPC",id:"comunicazione-tramite-grpc",level:4},{value:"Calcolo della distanza",id:"calcolo-della-distanza",level:4},{value:"Conversione degli indirizzi",id:"conversione-degli-indirizzi",level:4},{value:"Airline",id:"airline",level:3},{value:"Ricerca dei voli",id:"ricerca-dei-voli",level:4},{value:"Scalabilit\xe0",id:"scalabilit\xe0",level:4},{value:"Bank",id:"bank",level:3},{value:"Backend in Go",id:"backend-in-go",level:4},{value:"Frontend in Vue.js",id:"frontend-in-vuejs",level:4},{value:"Prontogram",id:"prontogram",level:3},{value:"Backend in Jolie",id:"backend-in-jolie",level:4},{value:"Frontend in React",id:"frontend-in-react",level:4},{value:"Rent",id:"rent",level:3},{value:"Funzionalit\xe0 del servizio",id:"funzionalit\xe0-del-servizio",level:4}];function c(e){const i={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.h1,{id:"architettura",children:"Architettura"}),"\n",(0,a.jsx)(i.p,{children:(0,a.jsx)(i.img,{alt:"Architecture scheme",src:n(268).A+"",width:"4385",height:"3215"})}),"\n",(0,a.jsx)(i.p,{children:"Nello schema sopra riportato, \xe8 possibile distinguere chiaramente i vari servizi terziari dai servizi offerti da ACMESky. Di seguito, analizzeremo nel dettaglio la struttura di questi servizi e illustreremo come ACMESky li utilizza."}),"\n",(0,a.jsx)(i.p,{children:"Tutti i servizi comunicano all'interno di un'unica rete Docker."}),"\n",(0,a.jsx)(i.h2,{id:"database",children:"Database"}),"\n",(0,a.jsxs)(i.p,{children:["Usiamo solo PostgreSQL, un database NoSQL open-source. L'istanza che si vede\nnello schermo \xe8 condivisa da ",(0,a.jsx)(i.a,{href:"#worker",children:"worker"})," e ",(0,a.jsx)(i.a,{href:"#acmesky-web",children:"backend web"}),"."]}),"\n",(0,a.jsx)(i.p,{children:"Le tabelle presenti nel database sono le seguenti:"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"available_flights"})}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"      Column       |           Type           | Collation | Nullable |                    Default\n-------------------+--------------------------+-----------+----------+-----------------------------------------------\n id                | bigint                   |           | not null | nextval('available_flights_id_seq'::regclass)\n created_at        | timestamp with time zone |           |          |\n airline           | text                     |           |          |\n departure_time    | timestamp with time zone |           |          |\n departure_airport | text                     |           |          |\n arrival_time      | timestamp with time zone |           |          |\n arrival_airport   | text                     |           |          |\n code              | text                     |           |          |\n cost              | numeric                  |           |          |\n interest_id       | bigint                   |           |          |\n offer_sent        | boolean                  |           |          |\n user_id           | bigint                   |           |          |\n"})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"interests"})}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"         Column           |           Type           | Collation | Nullable |                Default\n---------------------------+--------------------------+-----------+----------+---------------------------------------\nid                        | bigint                   |           | not null | nextval('interests_id_seq'::regclass)\ncreated_at                | timestamp with time zone |           |          |\nflight1_departure_time    | timestamp with time zone |           |          |\nflight1_departure_airport | text                     |           |          |\nflight1_arrival_time      | timestamp with time zone |           |          |\nflight1_arrival_airport   | text                     |           |          |\nflight2_departure_time    | timestamp with time zone |           |          |\nflight2_departure_airport | text                     |           |          |\nflight2_arrival_time      | timestamp with time zone |           |          |\nflight2_arrival_airport   | text                     |           |          |\nuser_id                   | bigint                   |           |          |\n"})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"journeys"})}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"   Column   |           Type           | Collation | Nullable |               Default\n------------+--------------------------+-----------+----------+--------------------------------------\n id         | bigint                   |           | not null | nextval('journeys_id_seq'::regclass)\n created_at | timestamp with time zone |           |          |\n flight1_id | bigint                   |           |          |\n flight2_id | bigint                   |           |          |\n cost       | numeric                  |           |          |\n user_id    | bigint                   |           |          |\n"})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"offers"})}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"    Column    |           Type           | Collation | Nullable |              Default\n--------------+--------------------------+-----------+----------+------------------------------------\n id           | bigint                   |           | not null | nextval('offers_id_seq'::regclass)\n created_at   | timestamp with time zone |           |          |\n message      | text                     |           |          |\n expired      | text                     |           |          |\n token        | text                     |           |          |\n is_used      | boolean                  |           |          |\n payment_link | text                     |           |          |\n payment_paid | boolean                  |           |          |\n journey_id   | bigint                   |           |          |\n user_id      | bigint                   |           |          |\n"})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"rents"})}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"   Column   |           Type           | Collation | Nullable |              Default\n------------+--------------------------+-----------+----------+-----------------------------------\n id         | bigint                   |           | not null | nextval('rents_id_seq'::regclass)\n created_at | timestamp with time zone |           |          |\n name       | text                     |           |          |\n latitude   | numeric                  |           |          |\n longitude  | numeric                  |           |          |\n endpoint   | text                     |           |          |\n"})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"airlines"})}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"     Column     |           Type           | Collation | Nullable |               Default\n----------------+--------------------------+-----------+----------+--------------------------------------\n id             | bigint                   |           | not null | nextval('airlines_id_seq'::regclass)\n created_at     | timestamp with time zone |           |          |\n name           | text                     |           |          |\n login_username | text                     |           |          |\n login_password | text                     |           |          |\n endpoint       | text                     |           |          |\n"})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"invoices"})}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"       Column        |           Type           | Collation | Nullable |               Default\n---------------------+--------------------------+-----------+----------+--------------------------------------\n id                  | bigint                   |           | not null | nextval('invoices_id_seq'::regclass)\n created_at          | timestamp with time zone |           |          |\n rent_id             | text                     |           |          |\n rent_customer_name  | text                     |           |          |\n rent_pickup_address | text                     |           |          |\n rent_pickup_date    | text                     |           |          |\n rent_address        | text                     |           |          |\n journey_id          | bigint                   |           |          |\n user_id             | bigint                   |           |          |\n"})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.code,{children:"users"})}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"       Column        |           Type           | Collation | Nullable |              Default\n---------------------+--------------------------+-----------+----------+-----------------------------------\n id                  | bigint                   |           | not null | nextval('users_id_seq'::regclass)\n created_at          | timestamp with time zone |           |          |\n username            | text                     |           |          |\n password            | text                     |           |          |\n name                | text                     |           |          |\n email               | text                     |           |          |\n address             | text                     |           |          |\n prontogram_username | text                     |           |          |\n is_admin            | boolean                  |           |          |\n"})}),"\n",(0,a.jsx)(i.h2,{id:"messages",children:"Messages"}),"\n",(0,a.jsxs)(i.p,{children:["Servizio di message broking che fa uso di RabbitMQ. I messaggi si trasmettano nella\nrete mediante protocollo\n",(0,a.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol",children:"AMQP"}),"."]}),"\n",(0,a.jsxs)(i.p,{children:["Ad utilizzare la coda ",(0,a.jsx)(i.code,{children:"acme_messages"})," sono il servizio ",(0,a.jsx)(i.a,{href:"#worker",children:"worker"})," e\n",(0,a.jsx)(i.a,{href:"#acmesky-web",children:"backend web"})," in modalit\xe0 pub/sub."]}),"\n",(0,a.jsx)(i.p,{children:"Il backend pubblica i messaggi nella coda e il worker li attende, cos\xec da\neseguire una task."}),"\n",(0,a.jsx)(i.h2,{id:"worker",children:"Worker"}),"\n",(0,a.jsxs)(i.p,{children:["Grazie a ",(0,a.jsx)(i.a,{href:"https://camunda.io",children:"Camunda"}),", il nostro servizio \xe8 in grado di integrare la business logic all'interno dei processi BPMN ed eseguire le task corrispondenti."]}),"\n",(0,a.jsxs)(i.p,{children:["Il servizio, sviluppato in Go, si connette a un database ",(0,a.jsx)(i.a,{href:"https://postgresql.org",children:"PostgreSQL"})," per salvare i dati visualizzati nelle tabelle BPMN, come ",(0,a.jsx)(i.em,{children:"interessi"}),", ",(0,a.jsx)(i.em,{children:"voli disponibili"}),", ",(0,a.jsx)(i.em,{children:"offerte"})," e ",(0,a.jsx)(i.em,{children:"viaggi"}),".\nInoltre, il servizio dipende dal message broker ",(0,a.jsx)(i.a,{href:"https://rabbitmq.com",children:"RabbitMQ"}),", al quale si connette in modalit\xe0 ",(0,a.jsx)(i.em,{children:"subscriber"})," per ricevere messaggi nella coda ",(0,a.jsx)(i.code,{children:"acme_messages"}),".\nQuesti messaggi vengono utilizzati per creare nuovi ",(0,a.jsx)(i.code,{children:"NewPublishMessageCommand"})," nel client."]}),"\n",(0,a.jsxs)(i.p,{children:["Nella ",(0,a.jsx)(i.a,{href:"https://github.com/acme-sky/workers/tree/main/internal/handlers",children:"struttura Git"}),", ogni task \xe8 organizzata all'interno di un modulo Go per facilitare la gestione e l'ordine del codice."]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:"handlers\n\u251c\u2500\u2500 acmesky\n\u2502   \u251c\u2500\u2500 st_change_offer_status.go\n\u2502   \u251c\u2500\u2500 st_create_journeys.go\n\u2502   \u251c\u2500\u2500 st_get_user_interests.go\n\u2502   \u251c\u2500\u2500 st_offer_still_valid.go\n\u2502   \u251c\u2500\u2500 st_prepare_offer.go\n\u2502   \u251c\u2500\u2500 st_retrieve_offer.go\n\u2502   \u251c\u2500\u2500 st_save_flight.go\n\u2502   \u251c\u2500\u2500 st_save_flights_as_available.go\n\u2502   \u251c\u2500\u2500 st_save_last_minute_offer.go\n\u2502   \u251c\u2500\u2500 st_sort_rent_services.go\n\u2502   \u251c\u2500\u2500 tm_ack_flight_request_save.go\n\u2502   \u251c\u2500\u2500 tm_ask_for_rent.go\n\u2502   \u251c\u2500\u2500 tm_ask_payment_link.go\n\u2502   \u251c\u2500\u2500 tm_book_journey.go\n\u2502   \u251c\u2500\u2500 tm_compute_distance_user_airport.go\n\u2502   \u251c\u2500\u2500 tm_error_on_book_journey.go\n\u2502   \u251c\u2500\u2500 tm_error_on_check_offer.go\n\u2502   \u251c\u2500\u2500 tm_invoice.go\n\u2502   \u251c\u2500\u2500 tm_invoice_and_rent.go\n\u2502   \u251c\u2500\u2500 tm_invoice_rent_error.go\n\u2502   \u251c\u2500\u2500 tm_search_flight_on_airline.go\n\u2502   \u251c\u2500\u2500 tm_send_offer.go\n\u2502   \u2514\u2500\u2500 tm_send_payment_link.go\n\u251c\u2500\u2500 prontogram\n\u2502   \u251c\u2500\u2500 st_save_info_on_prontogram.go\n\u2502   \u2514\u2500\u2500 tm_propagate_message_from_prontogram.go\n\u2514\u2500\u2500 user\n    \u251c\u2500\u2500 tm_check_offer.go\n    \u2514\u2500\u2500 tm_new_request_save_flight.go\n"})}),"\n",(0,a.jsxs)(i.p,{children:["Nel file ",(0,a.jsx)(i.code,{children:"main.go"})," del worker, \xe8 possibile vedere come ogni handler sia associato a un job che rimane in attesa di un trigger, che pu\xf2 provenire da Camunda o da un altro job. Nel caso di un trigger da parte di un altro job, questo avviene mediante la pubblicazione di un messaggio (publish message)."]}),"\n",(0,a.jsx)(i.p,{children:"I messaggi utilizzati per attivare un sotto-processo non timer-catch sono i seguenti:"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:"Nuovo interesse"}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-json",children:'{\n    "name": "CM_New_Request_Save_Flight",\n    "correlation_key": "0",\n    "payload": {\n        "flight1_departure_airport": "CPH",\n        "flight1_departure_time": "2024-06-02T00:00:00Z",\n        "flight1_arrival_airport":"CTA",\n        "flight1_arrival_time": "2024-06-03T01:00:00Z",\n        "flight2_departure_airport": "CTA",\n        "flight2_departure_time": "2024-07-11T00:00:00Z",\n        "flight2_arrival_airport": "CPH",\n        "flight2_arrival_time": "2024-07-13T01:00:00Z",\n        "user_id": 1,\n    }\n}\n'})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:"Volo last minute"}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-json",children:'{\n    "name": "CM_Received_Last_Minute_Offer",\n    "correlation_key": "0",\n    "payload": {\n        "flight": {\n            "departure_airport": "CPH",\n            "departure_time": "2024-06-10T00:00:00Z",\n            "arrival_airport": "CTA",\n            "arrival_time": "2024-06-13T01:00:00Z",\n            "airline": "http://localhost:8080/v1",\n            "cost": 123,\n            "code": "IT1213"\n        }\n    }\n}\n'})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:"Controllo di un offerta ricevuta"}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-json",children:'{\n    "name": "CM_Check_Offer",\n    "correlation_key": "0",\n    "payload": {\n        "token": "M7QDS6"\n    }\n}\n'})}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:"Risposta di pagamento"}),"\n"]}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{children:'{\n    "name": "CM_Payment_Response",\n    "correlation_key": "0",\n    "payload": {\n        "payment_status": "OK"\n    }\n}\n'})}),"\n",(0,a.jsx)(i.h2,{id:"acmesky-web",children:"ACMESky Web"}),"\n",(0,a.jsx)(i.h3,{id:"backend",children:"Backend"}),"\n",(0,a.jsx)(i.p,{children:"La REST API \xe8 il cuore del servizio web di ACMESky, fungendo da punto di interazione principale tra il frontend e il backend del sistema. Gli utenti finali interagiscono con il servizio esclusivamente attraverso il frontend, il quale invia richieste alla REST API per eseguire varie operazioni."}),"\n",(0,a.jsx)(i.h4,{id:"separazione-della-business-logic",children:"Separazione della Business Logic"}),"\n",(0,a.jsx)(i.p,{children:"\xc8 importante notare che la REST API non contiene la business logic. Questa separazione \xe8 cruciale per mantenere una struttura del codice pulita e modulare. La business logic risiede invece nei worker, che sono componenti specializzati nell'esecuzione delle operazioni richieste.\nQuesto approccio consente di mantenere il backend leggero e focalizzato sulla visualizzazione per gli utenti finali."}),"\n",(0,a.jsx)(i.h4,{id:"flusso-di-lavoro",children:"Flusso di Lavoro"}),"\n",(0,a.jsx)(i.p,{children:"Quando un utente interagisce con il frontend, ad esempio per salvare un interesse per un viaggio, il processo avviene come segue:"}),"\n",(0,a.jsxs)(i.ol,{children:["\n",(0,a.jsxs)(i.li,{children:["\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"Richiesta HTTP dal Frontend"}),": L'utente invia una richiesta HTTP al backend attraverso il frontend, specificando l'azione desiderata. Questa richiesta pu\xf2 includere dati aggiuntivi necessari per completare l'azione, come i dettagli dell'interesse per il viaggio."]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:["\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"Inserimento nel Messaggio"}),": Il backend riceve la richiesta e incapsula i dati del payload in un messaggio. Questo messaggio viene poi trasmesso al message broker ",(0,a.jsx)(i.a,{href:"https://rabbitmq.com",children:"RabbitMQ"}),"."]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:["\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"Elaborazione del Worker"}),": Il worker, in ascolto sui messaggi in arrivo su RabbitMQ, riceve il messaggio e avvia l'elaborazione. \xc8 il worker a contenere ed eseguire la business logic necessaria per completare l'azione richiesta, come il salvataggio dell'interesse nel database."]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:["\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"Aggiornamento del Database"}),": Poich\xe9 il database ",(0,a.jsx)(i.a,{href:"https://postgresql.org",children:"PostgreSQL"})," \xe8 condiviso tra il backend e i worker, il worker salva i dati nel database una volta completata l'elaborazione."]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:["\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"Richieste GET"}),": Quando l'utente invia una richiesta GET per recuperare informazioni, come la lista degli interessi, il backend interroga il database condiviso e restituisce i dati richiesti al frontend."]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(i.h4,{id:"vantaggi-dellarchitettura",children:"Vantaggi dell'Architettura"}),"\n",(0,a.jsx)(i.p,{children:"Questo modello architetturale offre diversi vantaggi:"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Scalabilit\xe0"}),": La separazione della business logic nei worker permette di scalare orizzontalmente il sistema, aggiungendo pi\xf9 worker secondo necessit\xe0 senza influenzare il backend."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Manutenzione"}),": La manutenzione del codice \xe8 semplificata, poich\xe9 la business logic \xe8 isolata nei worker e non mischiata con la logica di gestione delle richieste HTTP."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Affidabilit\xe0"}),": Utilizzando RabbitMQ come message broker, garantiamo che le richieste siano processate in modo affidabile e che eventuali guasti possano essere gestiti senza perdita di dati."]}),"\n"]}),"\n",(0,a.jsx)(i.h3,{id:"frontend",children:"Frontend"}),"\n",(0,a.jsxs)(i.p,{children:["Il frontend di ACMESky rappresenta la vetrina attraverso la quale l'utente finale interagisce con il servizio. Sviluppato utilizzando ",(0,a.jsx)(i.a,{href:"https://nextjs.org",children:"Next.js"}),", un framework React per lo sviluppo di applicazioni web, il frontend fornisce un'interfaccia utente intuitiva e reattiva."]}),"\n",(0,a.jsx)(i.h4,{id:"interazione-con-il-backend",children:"Interazione con il Backend"}),"\n",(0,a.jsxs)(i.p,{children:["Il frontend si interfaccia esclusivamente con il ",(0,a.jsx)(i.a,{href:"#acmesky-web",children:"backend web"})," attraverso chiamate HTTP. Questo design permette una chiara separazione delle responsabilit\xe0 tra il frontend e il backend, migliorando la manutenibilit\xe0 e la scalabilit\xe0 dell'intero sistema. Ogni azione dell'utente, come la ricerca di voli, la visualizzazione delle offerte o la gestione degli interessi di viaggio, viene tradotta in una richiesta HTTP al backend, che gestisce la logica applicativa e l'accesso ai dati."]}),"\n",(0,a.jsx)(i.h4,{id:"sistema-di-autenticazione",children:"Sistema di Autenticazione"}),"\n",(0,a.jsxs)(i.p,{children:["La sicurezza e l'autenticazione sono gestite mediante JSON Web Tokens (",(0,a.jsx)(i.a,{href:"https://jwt.io",children:"JWT"}),"). Quando un utente si autentica, il backend genera un token JWT, che viene poi utilizzato per autenticare le successive richieste dell'utente. Il token JWT \xe8 incluso nell'header ",(0,a.jsx)(i.code,{children:"Authorization"})," delle richieste HTTP, garantendo che solo gli utenti autenticati possano accedere a determinate risorse e funzionalit\xe0 del servizio."]}),"\n",(0,a.jsx)(i.h4,{id:"vantaggi-dellarchitettura-1",children:"Vantaggi dell'Architettura"}),"\n",(0,a.jsx)(i.p,{children:"L'utilizzo di Next.js per il frontend e JWT per l'autenticazione offre numerosi vantaggi:"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Performance"}),": Next.js permette il rendering lato server e la generazione statica, migliorando le performance e l'ottimizzazione per i motori di ricerca (SEO)."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Sicurezza"}),": L'uso di JWT garantisce un sistema di autenticazione sicuro e scalabile, con la possibilit\xe0 di gestire facilmente sessioni utente e permessi."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Manutenibilit\xe0"}),": La separazione tra frontend e backend facilita lo sviluppo indipendente delle due componenti, permettendo aggiornamenti e miglioramenti senza interferenze reciproche."]}),"\n"]}),"\n",(0,a.jsx)(i.h2,{id:"servizi-esterni",children:"Servizi esterni"}),"\n",(0,a.jsxs)(i.p,{children:["Essi sono servizi usati dal ",(0,a.jsx)(i.a,{href:"#worker",children:"worker"})," e sono meglio descritti nel loro\ndettaglio in ",(0,a.jsx)(i.a,{href:"/docs/services/",children:"qui"}),"."]}),"\n",(0,a.jsx)(i.h3,{id:"geodistance",children:"Geodistance"}),"\n",(0,a.jsx)(i.p,{children:"Il servizio Geodistance \xe8 progettato per calcolare le distanze tra due indirizzi utilizzando le coordinate geografiche. Questo servizio \xe8 scritto in Go e sfrutta l'API di Google Maps per fornire risultati precisi ed efficienti."}),"\n",(0,a.jsx)(i.h4,{id:"comunicazione-tramite-grpc",children:"Comunicazione tramite gRPC"}),"\n",(0,a.jsxs)(i.p,{children:["La comunicazione tra il worker e il servizio Geodistance avviene tramite ",(0,a.jsx)(i.a,{href:"https://grpc.io",children:"gRPC"}),", un framework di chiamata di procedure remote (RPC) ad alte prestazioni sviluppato da Google. gRPC permette la trasmissione di dati in modo veloce e sicuro, garantendo un'interazione fluida e affidabile tra i vari componenti del sistema."]}),"\n",(0,a.jsx)(i.h4,{id:"calcolo-della-distanza",children:"Calcolo della distanza"}),"\n",(0,a.jsx)(i.p,{children:"Il servizio Geodistance utilizza le API di Google Maps per calcolare la distanza in metri tra due indirizzi. Gli indirizzi vengono specificati utilizzando le coordinate di latitudine e longitudine.\nQuest'ultime forniscono una rappresentazione precisa della posizione, riducendo al minimo gli errori nei calcoli della distanza."}),"\n",(0,a.jsx)(i.h4,{id:"conversione-degli-indirizzi",children:"Conversione degli indirizzi"}),"\n",(0,a.jsx)(i.p,{children:'Per facilitare l\'uso del servizio da parte degli utenti, Geodistance include anche la funzionalit\xe0 di conversione degli indirizzi. Gli utenti possono inserire gli indirizzi in formato stringa\n(ad esempio, "Mura Anteo Zamboni 7, Bologna"), e il servizio utilizza le API di Google Maps per convertire questi indirizzi nelle corrispondenti coordinate di latitudine e longitudine.'}),"\n",(0,a.jsx)(i.h3,{id:"airline",children:"Airline"}),"\n",(0,a.jsxs)(i.p,{children:["\xc8 progettato per simulare l'API di una compagnia aerea. Scritto in Go e utilizzando il framework Gin, Airline offre una REST API attraverso la quale il ",(0,a.jsx)(i.a,{href:"#worker",children:"worker"})," pu\xf2 effettuare richieste HTTP per cercare i voli di interesse per un utente."]}),"\n",(0,a.jsx)(i.h4,{id:"ricerca-dei-voli",children:"Ricerca dei voli"}),"\n",(0,a.jsx)(i.p,{children:"Allo scoccare del timer-event il worker di ACMESky invia una richiesta HTTP alla REST API del servizio Airline per la ricerca dei voli d'interesse.\nQuesta richiesta include i dettagli necessari, come gli aereiporti di destinazione/arrivo e le date di viaggio."}),"\n",(0,a.jsx)(i.h4,{id:"scalabilit\xe0",children:"Scalabilit\xe0"}),"\n",(0,a.jsx)(i.p,{children:"Un aspetto chiave del servizio Airline \xe8 la sua capacit\xe0 di essere scalabile e di simulare pi\xf9 compagnie aeree.\nQuesto \xe8 ottenuto attraverso la possibilit\xe0 di creare pi\xf9 istanze del servizio, ciascuna con il proprio database separato.\nOgni istanza rappresenta una compagnia aerea distinta, consentendo di simulare un ambiente realistico con diverse opzioni di voli: questo simula un servizio reale che va alla ricerca di pi\xf9 fonti per i propri utenti."}),"\n",(0,a.jsx)(i.h3,{id:"bank",children:"Bank"}),"\n",(0,a.jsx)(i.p,{children:"Questo servizio \xe8 composto da due parti principali: un backend scritto in Go e un frontend sviluppato in Vue.js."}),"\n",(0,a.jsx)(i.h4,{id:"backend-in-go",children:"Backend in Go"}),"\n",(0,a.jsxs)(i.p,{children:["Il backend del servizio di pagamento \xe8 scritto in Go, un linguaggio di programmazione funzionale. Questo backend espone una REST API che permette al ",(0,a.jsx)(i.a,{href:"#worker",children:"worker"})," di interfacciarsi con esso per eseguire varie operazioni di pagamento."]}),"\n",(0,a.jsx)(i.p,{children:"Quando un utente avvia una transazione di pagamento, il worker comunica con il backend attraverso chiamate REST. Queste chiamate includono le informazioni necessarie per processare il pagamento, come l'importo e le credenziali di pagamento dell'utente."}),"\n",(0,a.jsx)(i.h4,{id:"frontend-in-vuejs",children:"Frontend in Vue.js"}),"\n",(0,a.jsx)(i.p,{children:"Il frontend del servizio di pagamento \xe8 sviluppato in Vue.js, un framework JavaScript noto per la sua facilit\xe0 d'uso e capacit\xe0 di creare interfacce utente reattive e dinamiche."}),"\n",(0,a.jsxs)(i.ol,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"UI"}),": Gli utenti utilizzano il frontend per inserire le proprie credenziali di pagamento. Anche se le credenziali sono fittizie per scopi di simulazione, il processo \xe8 progettato per essere il pi\xf9 realistico possibile."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"UX"}),": L'interfaccia utente \xe8 intuitiva e guida l'utente attraverso i passaggi necessari per completare la transazione. Una volta che l'utente ha inserito le informazioni richieste, il frontend invia questi dati al backend tramite una richiesta HTTP."]}),"\n"]}),"\n",(0,a.jsx)(i.p,{children:"Una volta completato il processo, l'utente viene reindirizzato a un link di callback che conferma o nega il pagamento. Questo link pu\xf2 visualizzare un messaggio di successo o di errore, informando l'utente dell'esito della transazione."}),"\n",(0,a.jsx)(i.h3,{id:"prontogram",children:"Prontogram"}),"\n",(0,a.jsxs)(i.p,{children:["Il servizio di messaggistica Prontogram \xe8 progettata per consentire la comunicazione tra il sistema e gli utenti finali durante la fase di generazione di offerte. \xc8 diviso in due parti principali: un backend scritto in ",(0,a.jsx)(i.a,{href:"https://jolie-lang.org/",children:"Jolie"})," e un frontend sviluppato in ",(0,a.jsx)(i.a,{href:"https://react.dev",children:"React"}),"."]}),"\n",(0,a.jsx)(i.h4,{id:"backend-in-jolie",children:"Backend in Jolie"}),"\n",(0,a.jsxs)(i.p,{children:["Il backend del servizio Prontogram \xe8 sviluppato utilizzando Jolie, un linguaggio di programmazione progettato specificamente per la costruzione di microservizi e per il ",(0,a.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/Choreographic_programming",children:"paradigma di programmazione orientato alle coreografie"}),". Jolie facilita la creazione di servizi distribuiti, garantendo un'architettura modulare e scalabile."]}),"\n",(0,a.jsxs)(i.ol,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Interazione del worker"}),": Il ",(0,a.jsx)(i.a,{href:"#worker",children:"worker"})," di ACMESky comunica con il backend di Prontogram attraverso una REST API. Quando il worker deve inviare un messaggio a un utente, effettua una richiesta HTTP all'endpoint appropriato del backend."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Creazione di messaggi"}),": L'endpoint del backend di Prontogram \xe8 responsabile della creazione di nuovi messaggi. Per poter inviare un messaggio, l'utente destinatario deve avere specificato il campo ",(0,a.jsx)(i.code,{children:"prontogram_username"})," nel suo profilo ACMESky. Questo campo identifica univocamente l'utente all'interno del sistema Prontogram."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Gestione dei messaggi"}),": Una volta ricevuta la richiesta dal worker, il backend di Prontogram elabora i dati e crea un nuovo messaggio per l'utente selezionato, salvandolo nel database del servizio."]}),"\n"]}),"\n",(0,a.jsx)(i.h4,{id:"frontend-in-react",children:"Frontend in React"}),"\n",(0,a.jsx)(i.p,{children:"Il frontend del servizio Prontogram \xe8 sviluppato in React, una libreria JavaScript popolare per la costruzione di interfacce utente. React permette di creare componenti riutilizzabili e di mantenere un'interfaccia utente reattiva e dinamica."}),"\n",(0,a.jsxs)(i.ol,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Accesso dell'utente"}),": Gli utenti finali possono accedere al frontend di Prontogram per visualizzare i messaggi che gli sono stati inviati da ACMESky. L'interfaccia utente \xe8 progettata per essere intuitiva e facile da usare, consentendo agli utenti di leggere i loro messaggi in modo semplice."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Visualizzazione dei messaggi"}),": Il frontend offre una visualizzazione in sola lettura dei messaggi. Gli utenti possono vedere i messaggi ricevuti, ma non possono modificarli o rispondere tramite questa interfaccia. Questo garantisce che le comunicazioni importanti inviate da ACMESky rimangano intatte e non alterate."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"UX"}),": React garantisce un'esperienza utente fluida, con aggiornamenti in tempo reale e un'interfaccia reattiva. Gli utenti possono navigare attraverso i messaggi e visualizzare le informazioni pertinenti senza ritardi o interruzioni."]}),"\n"]}),"\n",(0,a.jsx)(i.h3,{id:"rent",children:"Rent"}),"\n",(0,a.jsxs)(i.p,{children:["Servizio progettato per fornire un'esperienza di transfer simile a quella offerta da aziende come ",(0,a.jsx)(i.a,{href:"https://uber.com",children:"Uber"})," o ",(0,a.jsx)(i.a,{href:"https://bolt.eu",children:"Bolt"}),". Scritto in ",(0,a.jsx)(i.a,{href:"https://jolie-lang.org",children:"Jolie"}),", questo servizio viene utilizzato per gestire le prenotazioni di transfer degli utenti dal loro indirizzo di casa all'aeroporto di partenza del viaggio, sotto determinate condizioni."]}),"\n",(0,a.jsx)(i.h4,{id:"funzionalit\xe0-del-servizio",children:"Funzionalit\xe0 del servizio"}),"\n",(0,a.jsx)(i.p,{children:"Il servizio viene attivato nelle seguenti circostanze:"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Prenotazioni di transfer"}),": Il servizio viene utilizzato quando il prezzo del viaggio supera i 1000\u20ac. In queste condizioni, ACMESky offre un servizio di transfer gratuito all'utente."]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.strong,{children:"Simulazione di agenzie reali"}),": Il servizio \xe8 progettato per simulare scenari realistici, permettendo la creazione di pi\xf9 istanze per rappresentare diverse agenzie di transfer. Ogni istanza funziona in modo indipendente e pu\xf2 essere contattata dal worker per trovare la soluzione di transfer pi\xf9 vicina e conveniente per l'utente."]}),"\n"]}),"\n",(0,a.jsxs)(i.p,{children:["Il ",(0,a.jsx)(i.a,{href:"#worker",children:"worker"})," di ACMESky \xe8 responsabile di interagire con il servizio di transfer tramite un'API SOAP. Questo protocollo di comunicazione garantisce una trasmissione dati sicura e affidabile tra il worker e il servizio."]}),"\n",(0,a.jsxs)(i.p,{children:["Per determinare la vicinanza delle agenzie di transfer all'indirizzo dell'utente, il servizio utilizza il servizio ",(0,a.jsx)(i.a,{href:"#geodistance",children:"Geodistance"}),". Questo consente di calcolare la distanza tra l'indirizzo dell'utente e le diverse agenzie di transfer, trovando la soluzione ottimale."]})]})}function u(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,a.jsx)(i,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},268:(e,i,n)=>{n.d(i,{A:()=>a});const a=n.p+"assets/images/architecture-a24f3817c486a9461211014a082437f3.png"},8453:(e,i,n)=>{n.d(i,{R:()=>l,x:()=>s});var a=n(6540);const r={},t=a.createContext(r);function l(e){const i=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function s(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),a.createElement(t.Provider,{value:i},e.children)}}}]);