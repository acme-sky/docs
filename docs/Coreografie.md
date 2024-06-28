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

// Registrazione interesse dell'utente (ripetuta per tutti gli  utenti)
// requestInterest: messaggio di richiesta con A/R
// responseInterest: risposta successo o fallimento
( requestInterest: USERₓ -> ACME ; responseInterest: ACME -> USERₓ )* 
|   

// Query dei voli (ripetuta per tutte le compagnie aeree)
// Viene ripetuta per ogni compagnia aerea collegata ad ACMEsky
// queryFlights: Richesta di voli d'interesse per l'utente
// responseFlights: Voli disponibili dell'Airline company
( queryFlights: ACME -> AIRₖ ; responseFlights: AIRₖ -> ACME )* 
| 

// Ricezione offerte last minute (ripetuta per tutte le compagnie aeree)
// Viene ripetuta per ogni compagnia aerea collegata ad ACMEsky
// sendLastMinute: invia le offerte last minute
// responseLastMinute: risposta successo o fallimento
( sendLastMinute: AIRₖ -> ACME ; responseLastMinute: ACME -> AIRₖ )*
|

// Notifica dell'offerta all'utente
// offerToken: mesaagio di offerta A/R
// notifyUser: messaggio di notifica di Prontogram
// notifyResponse: risposta da parte dell'utene dell'avvenuta ricezione
// messageSended: risposta da parte di prontogram dell'avvenuto invio
( offerToken: ACME -> PTG ; notifyUser: PTG -> USERₓ ; 
  notifyResponse: USERₓ -> PTG ; messageSended: PTG -> ACME )*
|

// Richiesta ticket
// getreceipt: mesaagio di richiesta ricevuta dell'offerta pagata
// receipt: messaggio con la ricevuta del viaggio
( getreceipt: USERₓ -> ACME ; receipt: ACME -> USERₓ )*
|

// Conferma dell'offerta e pagamento
// confirmOffer: messaggio di conferma offerta e pagamento
( 
  confirmOffer: USERₓ -> ACME ; 
  (
    // ACMEsky conferma che l'offerta è disponibile
    // responseOfferOk: messaggio di conferma offerta
    // requestPaymentLink: richiesta di pagamento da parte dell'utente
    (   
      responseOfferOk: ACME -> USERₓ ;
      requestPaymentLink: USERₓ -> ACME ;
      bookTickets: ACME -> AIRₖ ;
      (   
        // Tickets ok
        // bookTickets: prenota i biglietti 
        // responseTickets: biglietti prenotati
        // requestBankLink: richiesta creazione link di pagamento
        // responselink: link di pagamento generato dalla banca
        // paymentLink: link di pagamento generato dalla banca

        (
          responseTickets: AIRₖ -> ACME ;
          requestBankLink: ACME -> BANK ; 
          responselink: BANK -> ACME ;
          paymentLink: ACME -> USERₓ ;

          (
            // Pagamento avvenuto con successo
            // successPaymentBank: esito pagamento
            // payment: pagamento attraverso il link generato
            (
              payment: USERₓ -> BANK ;
              successPaymentBank: BANK -> ACME ;
              //sendConfirm: ACME -> BANK;
              // Controllo Premium service
              (
                // Richiesta a Geodistance se costo > 1000€
                1 
                + 
                // requestDistance: richiesta calcolo della distanza
                // responseDistance: distanza calcolata
                (
                  requestDistance: ACME -> GEO ; 
                  responseDistance: GEO -> ACME ; 
                  ( // Richiesta a Rent service se distanza <30Km
                    1 
                    +  
                    (
                      (
                        // requestDistanceRent: richiesta distanza noleggio
                        // responseDistanceRent: risposta con distanza
                        requestDistanceRent: ACME -> GEO ; 
                        responseDistanceRent: GEO -> ACME ;
                      )* ;
                      // requestRent: richiesta noleggio
                      // responseRent: risposta noleggio
                      requestRent: ACME -> RENTₜ ; 
                      responseRent: RENTₜ-> ACME ;
                    )
                  )
                )
              ) ;
                // SendJourneyReceipt: resoconto complessivo inviato all'utente
              SendJourneyReceipt: ACME -> USERₓ;
            )
          ) 
        )
      )
    )
  )
)*
```



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
proj(RequestReceipt, ACME) = 
                       _______
  ( getReceipt@USERₓ ; receipt@USERₓ )*
```
```JS
proj(confirmOffer, ACME) = 
  ( confirmOffer@USERₓ ; 
    (                                                     ___________
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
                successPaymentBank@BANK ;
                        _______________
                ( 1 + ( requestDistance@GEO ; responseDistance@GEO ;
                            ___________________
                  ( 1 + ( ( requestDistanceRent@GEO ; responseDistanceRent@GEO )* ;
                    ____________________
                    requestRent@RENTₜ ; responseRent@RENTₜ ;
                  ) )
                ) )
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
proj(RequestReceipt, USERₓ) = 
    __________
  ( getReceipt@ACME ; receipt@ACME )*
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
                ))
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
                )
              )
            ) 
          ) 
        )
      ) + 1
    )
  )*
```

#### Prontogram

```JS
proj(QueryFlights, PTG) = 
  ( 1 ; 1 )*
```
```JS
proj(RicezioneOfferteLastMinute, PTG) =
  ( 1 ; 1 )*
```
```JS
proj(RegistrazioneInteresse, PTG) = 
  ( 1 ; 1 )*
```
```JS
proj(NotificaOfferta, PTG) = 
                      __________
  ( offerToken@ACME ; notifyUser@USERₓ ; 
                           _____________
    notifyResponse@USERₓ ; messageSended@ACME )*
```
```JS
proj(RequestReceipt, PTG) =
  ( 1 ; 1 )*
```
```JS
proj(confirmOffer, PTG) = 
  ( 1 ; 
    (
      ( 1 ; 1 ; 1 ;
        (
          ( 1 ; 1 ; 1 ; 1 ; 1 ;
            (
              ( 1 ;
                ( 1 + ( 1 ; 1 ;
                  ( 1 + (( 1 ; 1)* ; 1 ; 1 ; 1 ; 1 ))
                ))
              ) + ( 1 ; 1 )
            )
          ) + ( 1 ; 1 )
        )
      ) + 1
    )
  )*
```

#### Bank service

```JS
proj(QueryFlights, BANK) = 
  ( 1 ; 1 )*
```
```JS
proj(RicezioneOfferteLastMinute, BANK) = 
  ( 1 ; 1 )*
```
```JS
proj(RegistrazioneInteresse, BANK) = 
  ( 1 ; 1 )*
```
```JS
proj(NotificaOfferta, BANK) = 
  ( 1 ; 1 ; 1 ; 1 )*
```
```JS
proj(RequestReceipt, BANK) = 
  ( 1 ; 1 )*
```
```JS
proj(confirmOffer, BANK) = 
  ( 1 ; 
    (
      ( 1 ; 1 ; 1 ;
        (
          (                            ____________
            1 ; requestBankLink@ACME ; responselink@ACME ; 
            1 ; payment@USERₓ ;
            (
              ( __________________
                successPaymentBank@ACME ;
                        _______________
                ( 1 + ( 1 ; 1 ;
                  ( 1 + (( 1 ; 1)* ; 1 ; 1 ; 1 ; 1 ))
                ))
              ) + ( 1 ; emitCoupon@ACME )
            )
          ) + ( 1 ; 1 )
        )
      ) + 1
    )
  )*
```

#### Geographical Distance service

```JS
proj(QueryFlights, GEO) = 
  ( 1 ; 1 )*
```
```JS
proj(RicezioneOfferteLastMinute, GEO) = 
  ( 1 ; 1 )*
```
```JS
proj(RegistrazioneInteresse, GEO) = 
  ( 1 ; 1 )*
```
```JS
proj(NotificaOfferta, GEO) = 
  ( 1 ; 1 ; 1 ; 1 )*
```
```JS
proj(RequestReceipt, GEO) = 
  ( 1 ; 1 )*
```
```JS
proj(confirmOffer, GEO) = 
  ( 1 ; 
    (
      ( 1 ; 1 ; 1 ;
        (
          ( 1 ; 1 ; 1 ; 1 ; 1 ;
            (
              ( 1 ;
                                               ________________
                ( 1 + ( requestDistance@ACME ; responseDistance@ACME ;
                                                      ____________________
                  ( 1 + (( requestDistanceRent@ACME ; responseDistanceRent@ACME )* ; 
                    1 ; 1 ; 1 ; 1 ))
                ))
              ) + ( 1 ; 1 )
            )
          ) + ( 1 ; 1 )
        )
      ) + 1
    )
  )*
```

#### Rent Service

```JS
proj(QueryFlights, RENTₜ) = 
  ( 1 ; 1 )*
```
```JS
proj(RicezioneOfferteLastMinute, RENTₜ) = 
  ( 1 ; 1 )*
```
```JS
proj(RegistrazioneInteresse, RENTₜ) = 
  ( 1 ; 1 )*
```
```JS
proj(NotificaOfferta, RENTₜ) = 
  ( 1 ; 1 ; 1 ; 1 )*
```
```JS
proj(RequestReceipt, RENTₜ) = 
  ( 1 ; 1 )*
```
```JS
proj(confirmOffer, RENTₜ) = 
  ( 1 ; 
    (
      ( 1 ; 1 ; 1 ;
        (
          ( 1 ; 1 ; 1 ; 1 ; 1 ;
            (
              ( 1 ;
                ( 1 + ( 1 ; 1 ;  
                  ( 1 + (( 1 ; 1)* ; 
                                                _____________________
                    requestRentDeparture@ACME ; responseRentDeparture@ACME ;
                                             __________________
                    requestRentReturn@ACME ; responseRentReturn@ACME ))
                ))
              ) + ( 1 ; 1 )
            )
          ) + ( 1 ; 1 )
        )
      ) + 1
    )
  )*
```