---
sidebar_position: 5
slug: /services/geodistance
---

# Geodistance

Il servizio "Geodistance" è un componente fondamentale utilizzato da ACMESky per calcolare la distanza tra due punti nello spazio, espressa in metri. È utilizzato dal worker in diversi punti.

## Set up

Prima di utilizzare il servizio "Geodistance", è necessario configurarlo correttamente. Ecco i passaggi da seguire:

1. **Ottenere una chiave API da Google Developer Console**: Il servizio "Geodistance" fa uso delle API di Google Places, pertanto è necessario creare una chiave API tramite Google Developer Console. La chiave deve avere accesso alle API necessarie, inclusa la **Distance Matrix API**, la **Directions API** e la **Geocoding API**.

2. **Client gRPC**: Per comunicare con il servizio "Geodistance", è necessario disporre di un client capace di inviare messaggi gRPC. Bisogna assicurarsi che il client sia configurato correttamente per comunicare con il servizio utilizzando la specifica di protocollo qui descritta.

```proto
syntax = "proto3";

option go_package = "github.com/acme-sky/geodistance-api/proto";

package distance;

// The definition for a distance service
service Distance
{
    // Sends a distance value in meters
    rpc FindDistance(DistanceRequest) returns (DistanceResponse) {}

    // Sends an address and returns a map position geometry
    rpc FindGeometry(AddressRequest) returns (MapPosition) {}
}

// Mesasage that refers to a map position tuple (latitude / longitude)
message MapPosition
{
    float latitude = 1;
    float longitude = 2;
}

// The request message containing two tuple of lat and lon
message DistanceRequest
{
    MapPosition origin = 1;
    MapPosition destination = 2;
}

// The response message containing the distance between the two positions in
// meters format
message DistanceResponse
{
    string origin = 1;
    string destination = 2;
    int32 distance = 3;
}

// Address request
message AddressRequest
{
    string address = 1;
}
```

## API

### `FindGeometry`

Metodo usato per trovare la geometria di latitudine e longitudine dato un
indirizzo in formato stringa.

```go
c := pb.NewDistanceClient(conn)

ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()
r, err := c.FindGeometry(ctx, &pb.AddressRequest{Address: "Mura Anteo Zamboni 7, Bologna"})
if err != nil {
    log.Fatalf("Could not find geometry: %v", err)
}
log.Printf("%d", r)

```

il client avrà in output la seguente stringa:

```
2024/06/03 22:40:18 latitude:44.497066 longitude:11.356107
```


### `FindDistance`

Metodo usato per trovare la distanza tra due geometrie.

```go
c := pb.NewDistanceClient(conn)

ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()
r, err := c.FindDistance(ctx, &pb.DistanceRequest{
    Origin: &pb.MapPosition{Latitude: 44.4969, Longitude: 11.3564347},
    Destination: &pb.MapPosition{Latitude: 37.5257372, Longitude: 15.0702872}})
if err != nil {
    log.Fatalf("Could not find distance: %v", err)
}

log.Printf("%d", r.GetDistance())
```

il client avrà in output la seguente stringa:

```
2024/04/15 14:21:21 origin:"Mura Anteo Zamboni, 7, 40126 Bologna BO, Italy" destination:"Viale Andrea Doria, 6, 95125 Catania CT, Italy" distance:1152664
```


## Uso

Geodistance è usato da ACMESky in diversi casi:

- **Trova la distanza Utente - Aeroporto**: Il servizio calcola la distanza tra la posizione dell'utente e l'aeroporto di partenza del viaggio. Questo aiuta ACMESky a fornire all'utente informazioni precise sulla distanza tra la propria posizione e l'aeroporto.

- **Trova la distanza dei [Rent](/services/rent/)**: Il servizio calcola le distanze tra tutte le compagnie di taxi disponibili e la posizione dell'utente. Utilizzando queste informazioni, ACMESky identifica la compagnia di taxi più vicina all'utente, facilitando il trasferimento rapido e conveniente da casa all'aeroporto.

## Codice sorgente

Il server, scritto anch'esso in Go, è presente alla seguente [repository Github](https://github.com/acme-sky/geodistance-api).
