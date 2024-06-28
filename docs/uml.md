---
sidebar_position: 5
slug: /uml/
---

# Diagrammi UML
In questa sezione viene rappresentata, sotto forma di diagrammi UML con profilo TinySOA, la modellazione della SOA di cui fa parte l'organizzazione ACMESky. I seguenti diagrammi hanno lo scopo di evidenziare, per ogni servizio, quali sono le capability accessibili tramite il sistema e le interfacce che le espongono, esternamente e/o internamente, da ogni organizzazione facente parte della SOA.
In particolare, si distinguono tre tipi di servizi:

- Task (o Process): espone capability realizzate attraverso processi interni all'organizzazione, eventualmente svolti da umani. Sono strettamente legati al dominio del problema;
- Entity: corrisponde a una singola attività, solitamente automatica (per esempio, il salvataggio di un record in una base di dati);
- Utility: come i Task, ma non sono prettamente legati al dominio del problema.

### Interest
![UML Interest](/img/UML_interest.PNG)
### Flights Query
![UML Flights Query](/img/UML_ricerca_voli.PNG)
### Offer Creation
![UML Offer Creation](/img/UML_offer_creation.PNG)
### Confirm Offer
![UML Confirm Offer](/img/UML_confirm_offer.PNG)
### Rent
![UML Rent](/img/UML_rent.PNG)
