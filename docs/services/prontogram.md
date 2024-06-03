---
sidebar_position: 5
slug: /services/prontogram
---


# Prontogram
Prontogram è un servizio di messagistica scritto sottoforma di API REST in Jolie.

## Set up manuale
Il server in Jolie è stato realizzato con in mente l'utilizzo di [Jolier](https://docs.jolie-lang.org/v1.11.x/language-tools-and-standard-library/rest/jolier/index.html).
```bash
jolier server.ol WebPort localhost:8000 -headerHandler
```
L'utilizzo del parametro ```-headerHandler``` è quindi necessario in quanto il server ne fa utilizzo per la gestione di cookies e Headers nelle risposte HTTP.

A questo punto il server sarà raggiungibile a ```http://localhost:8000/```.

Prima di utilizzare il server è necessario avviare un database Postgres, per il quale è fornito un ```docker-compose.yml``` in ```/db```, con annesso ```init.sql```.
N.B. per l'utilizzo dell'interfaccia ```Database``` di Jolie è necessario anche il ```postgresql-{version}.jar``` fornito in ```/lib```.

Il ```docker-compose.yml``` è in grado di effettuare il setup del database in maniera automatica, basta eseguire il comando ```docker compose up``` nella directory del file.

## Set up docker
E' possibile utilizzare il servizio tramite il ```docker-compose.yml``` fornito nella home della repository.
Per fare ciò è necessario innanzitutto creare il file ```config.json``` nella root del progetto che si occupa della connessione al database, del quale viene fornito un template.
```JSON
{
"database": {
        "username": "db_user_username",
        "password": "db_user_password",
        "host": "container_name",
        "database": "database_name",
        "driver": "postgresql" #DON'T CHANGE UNLESS YOU WANT TO USE A DIFFERENT DATABASE
    }
}
```
Successivamente va buildata l'immagine con il ```Dockerfile``` fornito sempre nella root del progetto. (E' possibile buildare direttamente con ```docker compose build``` utilizzando il ```docker-compose.yml```).
Infine, ```docker compose up```, il server sarà disponibile a ```localhost:8000```.


## API
Il servizio offre una API di tipo REST che permette di effettuare le operazioni di login, registrazione di un utente, log dei messaggi, invio di un messaggio e logout.
![Prontogram routes](/img/prontogram_recap.png)

Il **mapping** e il **metodo** delle richieste è descritto all'interno di ```rest_template.json```, necessario per l'utilizzo di jolier.
```json
{
    "login": {
        "method":"post",
        "template": "api/login"
    },
    "getMessages": {
        "method":"get",
        "template":"api/getMessages/{username}"
    },
    "register": {
        "method":"post",
        "template":"api/register"
    },
    "logout": {
        "method":"post",
        "template": "api/logout"
    },
    "sendMessage": {
        "method":"post",
        "template": "api/sendMessage"
    }
}
```

### Formato dei dati
Strutture dati (custom types) necessarie per le richieste e risposte sono descritte in ```pronto.iol```:
```jolie
type loginRequest{
    .username: string
    .password: string
}

type logoutRequest{
    .username?: string
    .sid?:      string
}

type registerRequest{
    .username: string
    .password: string
    .name:     string
    .surname:  string
}

type messagesRequest{
    .username: string
    .sid?:      string
}

type prontoResponse :void{
    .message:  string
    .sid?:       string
    .status?:    int
}

type sendMessageRequest{
    .message:   string
    .username:      string
    .expiration?:    string
}
```
Nelle strutture, l'attributo ```sid``` è l'identificatore univoco generato dal server Jolie per il managing delle sessioni utente, che agirà come valore del cookie in grado di gestire l'autenticazione.

All'interno di ```RestHandler.ol``` troviamo:

```jolie
main{
    [incomingHeaderHandler(request)(response){
        if ( request.operation == "api/login" ){
            getJsonValue@JsonUtils(request.headers.("data"))(credentials)
            response.username = credentials.username
            response.password = credentials.password
        } else if (request.operation == "api/register") {
            getJsonValue@JsonUtils(request.headers.("data"))(credentials)
            response.username = credentials.username
            response.password = credentials.password
            response.name = credentials.name
            response.surname = credentials.surname
        } else if (request.operation == "getMessages" || request.operation == "logout"){
                response.sid = request.headers.cookies.session
            }
    }]

...
}
```
che si occupa della gestione dei dati in ingresso quando vengono effettuate le chiamate di login, register. 

Come si evince dal codice queste vengono inviate in formato JSON da un client all'interno dell'header ```credentials```, seguendo la nomenclatura dei custom types sopra illustrati.
