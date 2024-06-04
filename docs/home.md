---
sidebar_position: 1
slug: /
---

# Home

Questa repository si riferisce alla documentazione del progetto d'esame per il corso [Ingegneria del Software Orientata ai Servizi](https://www.unibo.it/en/teaching/course-unit-catalogue/course-unit/2023/479037) tenuto presso l'[Università di Bologna](https://www.unibo.it).

## Testo

### Descrizione del dominio e del problema

ACMESky offre un servizio che permette ai clienti di specificare, attraverso un portale web, il proprio interesse a trasferimenti aerei di andata e ritorno che si tengano in un periodo definito e ad un costo inferiore ad un certo limite impostato.
ACMESky quotidianamente interroga le compagnie aeree per ottenere le quotazioni dei voli di interesse per i propri clienti.
ACMESky riceve anche offerte last-minute dalle compagnie che le inviano al momento dell'attivazione senza cadenza prefissata.
Quando ACMESky trova un volo compatibile con una richiesta di un cliente prepara un'offerta.
L'offerta viene inviata al cliente tramite l'APP di messaggistica Prontogram. Il cliente, se interessato, ha quindi 24 ore di tempo per connettersi al portale web di ACMESky per confermare l'offerta, specificandone il codice ricevuto via Prontogram.
In fase di conferma il cliente deve anche procedere al pagamento, per la gestione del quale ACMESky si appoggia ad un fornitore di servizi bancari: ACMESky reindirizza il cliente verso il sito del fornitore e quindi attende dal fornitore il messaggio che conferma l'avvenuto pagamento.
Nel caso in cui il costo del volo risulti essere superiore ai 1000 euro ACMESky offre al cliente un servizio gratuito di trasferimento da/verso l'aeroporto se questo si trova entro i 30 chilometri dal suo domicilio.
In questo caso ACMESky fa uso di diverse compagnie di noleggio con autista con cui ha degli accordi commerciali. La compagnia scelta è quella che risulta avere una sede più vicina al domicilio del cliente. A tale compagnia ACMESky invia una richiesta per prenotare un trasferimento che parta due ore prima dell'orario previsto per il decollo del volo.
Si progetti e si realizzi una SOA che supporti le attività di ACMESky.

### Workflow e artefatti

Si modellino le comunicazioni dello scenario sopra esposto usando una coreografia, si discutano le sue proprietà di connectedness ed eventualmente si raffini la coreografia per migliorare tali proprietà. Si proietti la coreografia in un sistema di ruoli.
Utilizzando uno o più diagrammi di collaborazione BPMN si modelli l'intera realtà descritta compresi i dettagli di ogni partecipante riferibile ad ACMESky. Tale modellazione ha scopo documentativo quindi il livello di dettaglio deve essere consistente con tale scopo. I partecipanti “esterni” (compagnie aeree, sistema bancario, ecc…) possono apparire come collapsed pools.
Si progetti una SOA per la realizzazione del sistema e la si documenti utilizzando una notazione grafica (possibilmente UML con o senza profilo specifico).
Le interfacce esposte dei servizi descritti nella modellazione (dove possono apparire in forma semplificata) dovranno poi essere effettivamente realizzate nell'implementazione.
Si realizzi il sistema usando come tecnologie un BPMS (si consiglia di utilizzare Camunda) e Jolie.
Il BPMS deve essere utilizzato per supportare i processi di ACMESky.
Si assume che il sistema integri sotto forma di servizi (almeno) le seguenti capability esterne:

- Calcolo distanze geografiche (preferibilmente con API Rest)
- Sistema bancario
- Compagnie di noleggio con autista (Jolie con interfaccia SOAP)
- Compagnie aeree
- Prontogram (Jolie con interfaccia Rest)

Tali servizi vanno implementati (con logica elementare) come parte del progetto.

I modelli di processo BPMN da utilizzare per il BPMS devono essere consistenti con la modellazione a scopo documentativo precedentemente realizzata; volendo si può anche scegliere di dettagliare compiutamente già dal primo modello le pool eseguibili. Quindi nel primo caso si avrebbe un modello BPMN documentativo e poi tanti modelli BPMN eseguibili quanti i partecipanti realizzati attraverso BPMS; in alternativa si avrebbe un unico modello BPMN con le pool eseguibili completamente dettagliate e gli altri partecipanti dettagliati a livello documentativo.

## Note 

- Alcuni eventi in Camunda 8.4 non sono supportati, come ad esempio il
  "Signal Boundary" e il "Compensate Boundary".
- Le transazioni in Camunda 8.4 non sono supportate.
