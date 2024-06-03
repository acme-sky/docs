---
sidebar_position: 4
slug: /services/rent
---

# Rent

Il servizio "Rent" è un componente fondamentale dell'ecosistema ACMESky. Contrariamente alle aspettative, questo servizio non è un sistema di noleggio di veicoli, bensì fa riferimento a un servizio di taxi o car sharing simile a piattaforme famose come Uber o Bolt.

ACMESky utilizza il servizio "Rent" per garantire un'esperienza completa ai suoi utenti durante il processo di prenotazione dei viaggi. In particolare, il servizio viene attivato quando il costo di un viaggio supera la soglia dei 1000€. In queste circostanze, ACMESky prenota automaticamente un trasferimento per l'utente dalla propria residenza all'aeroporto di partenza del viaggio.


## Set up

Rent è un'API SOAP scritta in [Jolie](https://www.jolie-lang.org). Per avviare
il server bisogna prima generare un servizio per un dato `namespace`.

```shell
jolie2wsdl --namespace <namespace> --portName RentPort --portAddr <portaddr> --outputFile <file.wsdl> server.ol
```

Ad esempio, per un possibile `uber.acmesky.cs.unibo.it` simile al noto servizio
[Uber](https://www.uber.com/it/it/) che gira nella porta locale `8080` potremmo avere:

```
jolie2wsdl --namespace uber.acmesky.cs.unibo.it --portName RentPort --portAddr http://localhost:8080 --outputFile uber-acmesky.wsdl server.ol
```

Successivamente basterà creare un file di configurazione `config.json`
specificando:

```json
{
    "location": "socket://localhost:8080",
    "proto": {
        "$": "soap",
        "wsdl": "/etc/data/uber-acmesky.wsdl"
    },
    "database": {
        "username": "username",
        "password": "password",
        "host": "localhost",
        "name": "rent"
    }
}
```

Dal file di configurazione di Docker compose si vede come la cartella corrente
venga mappata automaticamente nel volume in `/etc/data`. Dunque, il WSDL in
produzioneu sarà `/etc/data/uber-acmesky.wsdl`.

Bisogna inoltre mettere _up_ un servizio di webserver per esporre il WSDL online
così da poter essere richiamato dal Worker di ACMESky.

La build può proseguire con:

1. Build del servizio di Rent.

```
$ docker build -t acmesky-rentservice .
```

2. File WSDL in cartella statica.

```
$ mkdir www
$ copy uber-acmesky.wsdl www
```

3. Creazione di config per il webserver Leonardo.

```
# config-leonardo.json
{
    "location": "<location>",
    "documentDir": "/etc/data/www/"
}
```

4. Build del servizio Leonardo.

```
$ docker build -t acmesky-rentleonardo -f Dockerfile-leonardo .
```

Infine grazie a Docker compose si possono mettere entrambi i servizi _up_.

```
$ docker compose up
```


## API

![Rent input port](/img/rent-inputport.png)


- La richiesta è del tipo `RentRequest`.
```
type RentRequest: void {
     .PickupAddress[1,1]: string
     .Address[1,1]: string
     .CustomerName[1,1]: string
     .PickupDate[1,1]: string
}
```

- La risposta è del tipo `RentResponse`.

```
type RentResponse: void {
     .Status[1,1]: string
     .RentId[0,1]: string
     .Error[0,1]: string
}
```

Un test può essere fatto dal seguente payload:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:rent="uber.acmesky.cs.unibo.it.xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <rent:BookRent>
         <CustomerName>Mario</CustomerName>
         <PickupAddress>Via Zamboni 33, Bologna</PickupAddress>
         <Address>Mura Anteo Zamboni 7, Bologna</Address>
         <PickupDate>2024-03-02T13:10:00Z</PickupDate>
      </rent:BookRent>
   </soapenv:Body>
</soapenv:Envelope>
```


## Codice sorgente

Il server è presente alla seguente [repository Github](https://github.com/acme-sky/rentservice-api).
