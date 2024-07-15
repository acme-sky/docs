---
sidebar_position: 4
slug: /choreos/
---

# Coreografie

### Legenda

| Nome                | Sigla            | Note                                |
| - | - | - |
| ACME                | ACME             | Indica l'azienda AcmeSky                |
| Airline service     | AIR<sub>k</sub>  | Indica la k-esima compagnia aerea       |
| Rent service      | RENT<sub>t</sub> | Indica la t-esima compagnia di noleggio |
| Prontogram          | PTG              | Indica il servizio di messagistica      |
| Bank service        | BANK             | Indica il servizio bancario             |
| Geodistance service | GEO              | Indica il servizio di calcolo distanze  |
| User                | USER<sub>x</sub> | Indica l'x-esimo utente                 |


### Coreografie globali
```JS

( requestInterest: USERₓ -> ACME ; responseInterest: ACME -> USERₓ )* 
|   

( queryFlights: ACME -> AIRₖ ; responseFlights: AIRₖ -> ACME )* 
| 

( sendLastMinute: AIRₖ -> ACME ; responseLastMinute: ACME -> AIRₖ )*
|

( offerToken: ACME -> PTG ; notifyUser: PTG -> USERₓ ; 
  notifyResponse: USERₓ -> PTG ; messageSended: PTG -> ACME )*
|

( 
  confirmOffer: USERₓ -> ACME ; 
  (
    (   
      responseOfferOk: ACME -> USERₓ ;
      requestPaymentLink: USERₓ -> ACME ;
      bookTickets: ACME -> AIRₖ ;
      (
        (
          responseTickets: AIRₖ -> ACME ;
          requestBankLink: ACME -> BANK ; 
          responselink: BANK -> ACME ;
          paymentLink: ACME -> USERₓ ;

          (
            (
              payment: USERₓ -> BANK ;
              successPaymentBank: BANK -> ACME ;
              (
                // Richiesta a Geodistance se costo > 1000€
                1 
                + 
                (
                  requestDistance: ACME -> GEO ; 
                  responseDistance: GEO -> ACME ; 
                  ( // Richiesta a Rent service se distanza <30Km
                    1 
                    +  
                    (
                      (
                        requestDistanceRent: ACME -> GEO ; 
                        responseDistanceRent: GEO -> ACME ;
                      )* ;
                      requestRent: ACME -> RENTₜ ; 
                      responseRent: RENTₜ-> ACME ;
                    )
                  )
                )
              ) ;
              SendJourneyInvoice: ACME -> USERₓ;
            )
          ) 
        )
      )
    )
  )
)*
```
### Verifica connectedness delle coreografie

Per verificare se la coreografia fornita verifica la proprietà di connessione, dobbiamo scomporla e analizzare ogni composizione, scelta e iterazione sequenziale. Di seguito un'analisi dettagliata della coreografia asincrona precedentemente rappresentata, passo dopo passo:
Per quanto riguarda la prima parte della coreografia globale:
```JS
( requestInterest: USERₓ -> ACME ; responseInterest: ACME -> USERₓ )* 
|   
( queryFlights: ACME -> AIRₖ ; responseFlights: AIRₖ -> ACME )* 
| 
( sendLastMinute: AIRₖ -> ACME ; responseLastMinute: ACME -> AIRₖ )*
|
( offerToken: ACME -> PTG ; notifyUser: PTG -> USERₓ ; 
  notifyResponse: USERₓ -> PTG ; messageSended: PTG -> ACME )*
```
La proprietà di connectedness è verificata in quanto si tratta di operazioni parallele, in cui il mittente della prima operazione è il ricevente della seconda operazione e, viceversa, il ricevente della prima operazione è il mittente della seconda e i ruoli rimangono gli stessi.

Per quanto riguarda invece l'operazione ```confirmOffer```:
```JS
confirmOffer: USERₓ -> ACME ; 
(
  // Confirmation of the offer
  responseOfferOk: ACME -> USERₓ ;
  requestPaymentLink: USERₓ -> ACME ;
  bookTickets: ACME -> AIRₖ ;
  (
    // Booking tickets and payment link generation
    responseTickets: AIRₖ -> ACME ;
    requestBankLink: ACME -> BANK ; 
    responselink: BANK -> ACME ;
    paymentLink: ACME -> USERₓ ;
    (
      // Payment process
      payment: USERₓ -> BANK ;
      successPaymentBank: BANK -> ACME ;
      (
        // Additional services based on payment amount
        1 
        + 
        (
          requestDistance: ACME -> GEO ; 
          responseDistance: GEO -> ACME ; 
          (
            1 
            +  
            (
              requestDistanceRent: ACME -> GEO ; 
              responseDistanceRent: GEO -> ACME ;
              requestRent: ACME -> RENTₜ ; 
              responseRent: RENTₜ -> ACME ;
            )
          )
        )
      ) ;
      SendJourneyInvoice: ACME -> USERₓ;
    )
  )
)
```
**Passo 1**: confirmOffer: USERₓ -> ACME ; responseOfferOk: ACME -> USERₓ
- USERₓ -> ACME
- ACME -> USERₓ
- Connettività: USERₓ è il mittente della prima interazione e il ricevente della seconda interazione, quindi è connesso.

**Passo 2**: responseOfferOk: ACME -> USERₓ ; requestPaymentLink: USERₓ -> ACME- 
- ACME -> USERₓ
- USERₓ -> ACME
- Connettività: USERₓ è coinvolto in entrambe le interazioni, garantendo la connettività.

**Passo 3**: requestPaymentLink: USERₓ -> ACME ; bookTickets: ACME -> AIRₖ
- USERₓ -> ACME
- ACME -> AIRₖ
- Connettività: ACME è coinvolto in entrambe le interazioni, garantendo la connettività.

**Passo 4**: bookTickets: ACME -> AIRₖ ; responseTickets: AIRₖ -> ACME
- ACME -> AIRₖ
- AIRₖ -> ACME
- Connettività: ACME e AIRₖ sono coinvolti in entrambe le interazioni, garantendo la connettività.

**Passo 5**: responseTickets: AIRₖ -> ACME ; requestBankLink: ACME -> BANK
- AIRₖ -> ACME
- ACME -> BANK
- Connettività: ACME è coinvolto in entrambe le interazioni, garantendo la connettività.

**Passo 6**: requestBankLink: ACME -> BANK ; responselink: BANK -> ACME
- ACME -> BANK
- BANK -> ACME
- Connettività: ACME e BANK sono coinvolti in entrambe le interazioni, garantendo la connettività.

**Passo 7**: responselink: BANK -> ACME ; paymentLink: ACME -> USERₓ
- BANK -> ACME
- ACME -> USERₓ
- Connettività: ACME è coinvolto in entrambe le interazioni, garantendo la connettività.

**Passo 8**: paymentLink: ACME -> USERₓ ; payment: USERₓ -> BANK
- ACME -> USERₓ
- USERₓ -> BANK
- Connettività: USERₓ è coinvolto in entrambe le interazioni, garantendo la connettività.

**Passo 9**: payment: USERₓ -> BANK ; successPaymentBank: BANK -> ACME
- USERₓ -> BANK
- BANK -> ACME
- Connettività: BANK è coinvolto in entrambe le interazioni, garantendo la connettività.

**Passo 10**: successPaymentBank: BANK -> ACME

- Branch 1: 1

- Branch 2: requestDistance: ACME -> GEO ; responseDistance: GEO -> ACME

  - Connettività: Il primo Branch 1 rappresenta un elemento neutro (nessuna interazione), quindi è connesso.
  Nel secondo Branch, ACME è coinvolto in entrambe le interazioni:
  ACME -> GEO ; GEO -> ACME

**Passo 11**: responseDistance: GEO -> ACME

- Branch 1: 1

- Branch 2: requestDistanceRent: ACME -> GEO ; responseDistanceRent: GEO -> ACME
  ; requestRent: ACME -> RENTₜ ; responseRent: RENTₜ -> ACME
  - Connettività: Il primo Branch 1 è un elemento neutro. 
  Nel secondo Branch: ACME -> GEO ; GEO -> ACME; ACME -> RENTₜ ; RENTₜ -> ACME.
   ACME è coinvolto in tutte le interazioni, garantendo la connettività.

**Passo 12**: Interazione finale
SendJourneyInvoice: ACME -> USERₓ in risposta a USERₓ -> ACME

#### Conclusione

Ogni composizione sequenziale si connette appropriatamente con almeno un ruolo condiviso.
Ogni scelta assicura che gli stessi ruoli siano coinvolti inizialmente e non crea rami disconnessi.
Le iterazioni coinvolgono ruoli consistenti durante tutto il corpo del ciclo.
Pertanto, l'operazione confirmOffer, insieme alle sue interazioni annidate, verifica la proprietà di connettività, assicurando che la coreografia sia connessa.

### Proiezioni

Nella sezione seguente vengono descritte solamente le proiezioni considerante significative per i rispettivi ruoli / attori.

#### ACMEsky

```JS
proj(FlightQuery, ACME) = 
    ____________
  ( queryFlights@AIRₖ ; responseFlights@AIRₖ )*
```
```JS
proj(ReceiveLastMinute, ACME) = 
                          __________________
  ( sendLastMinute@AIRₖ ; responseLastMinute@AIRₖ )*
```
```JS
proj(RegisterInterest, ACME) = 
                            ________________
  ( requestInterest@USERₓ ; responseInterest@USERₓ )*
```
```JS
proj(SendOffer, ACME) = 
    __________
  ( offer@PTG ; 1 ; 1 ; messageSent@PTG )*
```
```JS
proj(confirmOffer, ACME) = 
  ( confirmOffer@USERₓ ; 
    (  _______________                                    ___________
      (responseOfferOk@USERₓ ; requestPaymentLink@USERₓ ; bookTickets@AIRₖ
        (
          ( 
            responseTickets@AIRₖ ;
            ______________
            requestBankLink@BANK ; responselink@BANK ;
            ___________
            paymentLink@USERₓ ; 1 ;
            (
              (
                1; successPaymentBank@BANK ;
                        _______________
                ( 1 + ( requestDistance@GEO ; responseDistance@GEO ;
                            ___________________
                  ( 1 + ( ( requestDistanceRent@GEO ; responseDistanceRent@GEO )* ;
                    ___________
                    requestRent@RENTₜ ; responseRent@RENTₜ ;
                      ) 
                    )
                  ); __________________
                )    SendJourneyInvoice@USERₓ
              ) 
            )
          )
        )
      )
    )
  )*
```

#### Utente

```JS
proj(RegisterInterest, USERₓ) = 
    _______________
  ( requestInterest@ACME ; responseInterest@ACME )*
```
```JS
proj(SendOffer, USERₓ) = 
                         ______________
  ( 1 ; notifyUser@PTG ; notifyResponse@PTG ; 1 )*
```
```JS
proj(confirmOffer, USERₓ) = 
    ____________
  ( confirmOffer@ACME ; 
    (                          __________________
      ( responseOfferOk@ACME ; requestPaymentLink@ACME ; 1 ;
        (                                  _______
          ( 1 ; 1 ; 1 ; paymentLink@ACME ; payment@BANK ;
            (
              (
                1 ; //successPaymentBank: BANK ->ACME
                ( 1 + ( 1 ; 1 ; //req distance
                  ( 1 + (( 1 ; 1)* ; 1 ; 1 ;))
                  )
                );  SendJourneyInvoice@ACME
              )
            )
          )
        )
      )
    )
  )*
```

#### Airline service

```JS
proj(QueryFlights, AIRₖ) = 
                        _______________
  ( queryFlights@ACME ; responseFlights@ACME )*
```
```JS
proj(sendLastMinute, AIRₖ) = 
    ______________
  ( sendLastMinute@ACME ; responseLastMinute@ACME )*
```
```JS
proj(confirmOffer, AIRₖ) =
  ( 1 ; 
    (
      (1 ; 1 ; bookTickets@ACME ;
        (
          ( _______________
            responseTickets@ACME ;
            1 ; 1 ; 1 ;
            (
              ( 1; 1 ;
                ( 1 + ( 1 ; 1 ;)*
                  (1 ; 1 )
                ) 1 ;
              )
            ) 
          ) 
        )
      )
    )
  )*
```

#### Prontogram

```JS
proj(SendOffer, PTG) = 
                      __________
  ( offerToken@ACME ; notifyUser@USERₓ ; 
                           _____________
    notifyResponse@USERₓ ; messageSended@ACME )*
```

#### Bank service
```JS
proj(confirmOffer, BANK) = 
  ( 1 ; 
    (
      ( 1 ; 1 ; 1 ;
        (
          (                            ____________
            1 ; requestBankLink@ACME ; responselink@ACME ; 1
            (
              (                __________________
                payment@USERₓ ;successPaymentBank@ACME ;
                (
                 1 + ( 1 ; 1 ;
                  ( 1 + (( 1 ; 1)* ; 1 ; 1))
                ))  1 ;
              )
            )
          )
        )
      )
    )
  )*
```

#### Geographical Distance service

```JS
proj(confirmOffer, GEO) = 
  ( 1 ; 
    (
      ( 1 ; 1 ; 1 ;
        (
          ( 1 ; 1 ; 1 ; 1;
            (
              (
                1 ; 1;
                                               ________________
                  ( 1 + ( requestDistance@ACME ; responseDistance@ACME ;
                                                        ____________________
                    ( 1 + (( requestDistanceRent@ACME ; responseDistanceRent@ACME )* ; 
                  ) 1; 1)
                )
              )  1 ;
            )
          )
         )
        )
      )
    )
  )*
```

#### Rent Service

```JS
proj(confirmOffer, RENTₜ) = 
  ( 1 ; 
    (
      ( 1 ; 1 ; 1 ;
        (
          ( 1 ; 1 ; 1 ; 1 ;
            (
              ( 1 ; 1 ;  
                ( 1 + ( ( 1 ; 1 )*; 
                                             ____________
                          requestRent@ACME ; responseRent@ACME ;
                    )
                ) 1 ;
              )
            )
          )
        )
      ) 
    )
  )*
```