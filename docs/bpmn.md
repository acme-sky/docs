---
sidebar_position: 2
slug: /bpmn/
---

# Diagramma BPMN

Questa documentazione fornisce una panoramica dettagliata del diagramma BPMN (Business Process Model and Notation) sviluppato utilizzando il Camunda Modeler e testato con il plugin Token Simulator. Il diagramma BPMN è uno strumento essenziale per modellare, visualizzare e ottimizzare i processi aziendali complessi, garantendo che tutte le fasi del processo siano chiaramente delineate e comprensibili.

![Screenshot BPMN](https://raw.githubusercontent.com/acme-sky/workers/main/assets/screenshot.png)

Nel diagramma BPMN progettato sono presenti diversi partecipanti che rappresentano i principali attori e componenti del sistema. Di seguito viene descritta la configurazione dei partecipanti e le loro interazioni all'interno del processo.

## Partecipanti

### User
Il partecipante **User** rappresenta l'utente finale del sistema. Questo partecipante è eseguibile e avvia specifiche azioni nel processo, come esprimere un nuovo interesse o avviare un processo di conferma del token di un viaggio.

### ACMESky
Il partecipante **ACMESky** è suddiviso in tre sotto-parti, chiamate "lane", ognuna delle quali gestisce una specifica funzionalità del sistema:
1. **Profilo utente**: Gestisce le operazioni relative al profilo dell'utente, inclusa l'espressione di nuovi interessi e la conferma dei token di viaggio.
2. **Manager degli interessi**: Gestisce gli interessi espressi dagli utenti. Questa pool è attivata unicamente da eventi di Timer catch.
3. **Manager dei voli**: Gestisce le informazioni sui voli disponibili. Anche questa pool è attivata solo da eventi di Timer catch ma anche da hook del servizio di Airline.

### Prontogram
Anche se non richiesto dal testo d'esame, è stato incluso il partecipante **Prontogram** per favorire una migliore integrazione tra l'utente e ACMESky. Prontogram rappresenta un servizio di messaggistica esterno che permette di inviare notifiche e aggiornamenti all'utente riguardo ai suoi interessi e voli.
