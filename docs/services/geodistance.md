---
sidebar_position: 5
slug: /services/geodistance
---

# Geodistance

Questo servizio è usato da ACMESky per ritrovare la distanza (in questo caso in metri) tra due punti nello spazio.

## Set up

Fa uso delle API di Google Places per fare ciò, dunque bisogna creare,
attraverso la Google Developer Console una chiave in grado di accedere a
**Distance Matrix API** e **Directions API**. 

Inoltre serve un client capace di inviare dei messaggi [gRPC](https://grpc.io) al servizio usando
la specifica qui descritta:

```protobuffer
service Distance
{
    rpc FindDistance(DistanceRequest) returns (DistanceResponse) {}
}

message MapPosition
{
    float latitude = 1;
    float longitude = 2;
}

message DistanceRequest
{
    MapPosition origin = 1;
    MapPosition destination = 2;
}

message DistanceResponse
{
    string origin = 1;
    string destination = 2;
    int32 distance = 3;
}
```

## API

Usando il protofile descritto nel paragrafo sopra, possiamo creare una richiesta
per richiedere la distanza tra due punti contrassegnati da latitudine e
longitudine.

Usando un esempio di client in Go possiamo eseguire

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

1. Trovare la distanza utente - areoporto.
2. Trovare le distanze di tutte le compagnie di taxi con l'utente e trovare
   quella più vicina.

## Codice sorgente

Il server, scritto anch'esso in Go, è presente alla seguente [repository Github](https://github.com/acme-sky/geodistance-api).
