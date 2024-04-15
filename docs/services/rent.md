---
sidebar_position: 4
slug: /services/rent
---

# Rent

Al contrario di quello che potrebbe sembrare, questo servizio fa riferimento ad
un servizio di taxi, o meglio, di car sharing.

È usato da ACMESky, in caso di viaggi con costo superiore ai 1000€, per
prenotare un transfer per l'utente da casa all'areoporto.

## Set up

Rent è un'API SOAP scritta in [Jolie](https://www.jolie-lang.org). Per avviare
il server bisogna prima generare yn servizi per un dato `namespace`.

```shell
jolie2wsdl --namespace <namespace> --portName RentPort --portAddr <portaddr> --outputFile <file.wsdl> server.ol
```

Ad esempio, per un possibile `uber.acmesky.cs.unibo.it` simile al noto servizio
[Uber](https://www.uber.com/it/it/) che gira nella porta locale `8080` avremmo:

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
        "wsdl": "./uber-acmesky.wsdl"
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
venga mappata automaticamente nel volume in `/etc/data`. Dunque, il WSDL, in
produzione, sarebbe qualcosa del tipo `/etc/data/uber-acmesky.wsdl`.

## API

![Rent input port](/img/rent-inputport.png)


- La richiesta è del tipo `RentRequest`.
```
type RentRequest: void {
     .CustomerSurname[1,1]: string
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
         <CustomerSurname>Rossi</CustomerSurname>
         <PickupAddress>Via Zamboni 33, Bologna</PickupAddress>
         <Address>Mura Anteo Zamboni 7, Bologna</Address>
         <PickupDate>2024-03-02T13:10:00Z</PickupDate>
      </rent:BookRent>
   </soapenv:Body>
</soapenv:Envelope>
```

## Codice sorgente

Il server è presente alla seguente [repository Github](https://github.com/acme-sky/rentservice-api).
