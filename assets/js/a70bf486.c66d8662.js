"use strict";(self.webpackChunkacme_sky_docs=self.webpackChunkacme_sky_docs||[]).push([[565],{7395:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>t,metadata:()=>o,toc:()=>c});var r=n(4848),s=n(8453);const t={sidebar_position:6,slug:"/services/"},a="Servizi",o={id:"services/index",title:"Servizi",description:"ACMESky",source:"@site/docs/services/index.md",sourceDirName:"services",slug:"/services/",permalink:"/docs/services/",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,slug:"/services/"},sidebar:"defaultSidebar",previous:{title:"Diagrammi UML",permalink:"/docs/uml/"},next:{title:"Airline",permalink:"/docs/services/airline"}},l={},c=[{value:"ACMESky",id:"acmesky",level:2},{value:"Worker",id:"worker",level:3},{value:"Backend",id:"backend",level:3},{value:"Frontend",id:"frontend",level:3},{value:"Esterni",id:"esterni",level:2}];function d(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{id:"servizi",children:"Servizi"}),"\n",(0,r.jsx)(i.h2,{id:"acmesky",children:"ACMESky"}),"\n",(0,r.jsx)(i.h3,{id:"worker",children:"Worker"}),"\n",(0,r.jsxs)(i.p,{children:["L'architettura del worker \xe8 descritta nella sua ",(0,r.jsx)(i.a,{href:"/docs/architecture#worker",children:"sezione\napposita"}),". Qui di seguito viene descritto un suo set\nup d'esempio."]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:'export ZEEBE_ADDRESS="localhost:26500"\nexport BPMN_FILE="bpmn/acmesky.bpmn"\nexport PROCESS_ID="Process_User"\nexport RABBITMQ_URI="amqp://guest:guest@localhost:5672/"\nexport SENTRY_DSN="<dsn che viene generato da Sentry>"\nexport DATABASE_DSN="host=host user=user password=pass dbname=acmesky port=5432"\nexport OFFER_VALIDATION_TIME=24\nexport PRONTOGRAM_ENDPOINT=http://prontogram:8000/api\nexport BANK_ENDPOINT=http://bankservice-api:8080\nexport BANK_PAYMENT_ENDPOINT=http://http://localhost:9281/?id=\nexport BANK_CALLBACK=http://acmesky-api:8080/v1/offers/pay\nexport BANK_TOKEN=token\nexport GEODISTANCE_API=acmesky-geodistance:50051\n'})}),"\n",(0,r.jsxs)(i.p,{children:["Una tabella ",(0,r.jsx)(i.code,{children:"airlines"})," con una sola compagnia aerea pu\xf2 essere:"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:" id | created_at |  name   | login_username | login_password |             endpoint\n----+------------+---------+----------------+----------------+-----------------------------------\n  1 |            | WizzAir | wizzadmin      | pass           | http://airlineservice-api:8080/v1\n"})}),"\n",(0,r.jsxs)(i.p,{children:["Una tabella ",(0,r.jsx)(i.code,{children:"rents"})," con una sola compagnia di rent pu\xf2 essere:"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:" id | created_at | name |  latitude  | longitude  |                  endpoint\n----+------------+------+------------+------------+---------------------------------------------\n  1 |            | Uber | 37.4844103 | 15.0729718 | http://rent-leonardo:8081/uber-acmesky.wsdl\n"})}),"\n",(0,r.jsxs)(i.p,{children:["\xc8 possibile fare un deploy del worker e di ",(0,r.jsx)(i.a,{href:"https://github.com/camunda/camunda-platform",children:"Camunda\nPlatform"})," usando docker-compose\npresente nella cartella del codice sorgente."]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:"$ docker build -t acmesky-workers .\n$ git clone git@github.com:acme-sky/workers.git\n$ docker compose up\n"})}),"\n",(0,r.jsx)(i.p,{children:"Se non viene usato Docker, il servizio pu\xf2 essere eseguito con"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"$ go run main.go\n"})}),"\n",(0,r.jsx)(i.h3,{id:"backend",children:"Backend"}),"\n",(0,r.jsx)(i.p,{children:"TODO"}),"\n",(0,r.jsx)(i.h3,{id:"frontend",children:"Frontend"}),"\n",(0,r.jsx)(i.p,{children:"Il Frontend del progetto Acmesky \xe8 sviluppato utilizzando Next.js, una scelta che garantisce facilit\xe0, modularit\xe0 e un'integrazione fluida con il resto del sistema. Grazie alla sua struttura modulare, Next.js permette di costruire componenti riutilizzabili e facilmente manutenibili, semplificando l'aggiornamento e l'espansione delle funzionalit\xe0. Le pagine principali di Acmesky evidenziano le caratteristiche distintive del progetto: la home page infatti offre una panoramica intuitiva e veloce delle funzioni chiave usufruibili dall'utente.\nIl design \xe8 pensato per essere intuibile e reattivo, garantendo un'esperienza utente fluida su qualsiasi dispositivo. L'interfaccia semplice e pulita assicura che gli utenti possano navigare facilmente tra le diverse sezioni, trovando rapidamente le informazioni di cui hanno bisogno."}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:"Dashboard: contiene i links alle diverse sezioni e features del sito, oltre ad un recap delle informazioni dell'utente."}),"\n",(0,r.jsx)(i.li,{children:"Add a new Interest: permette all'untente di aggiungere un interesse per un futuro viaggio."}),"\n",(0,r.jsx)(i.li,{children:"My interests: permette di visualizzare gli interessi salvati."}),"\n",(0,r.jsx)(i.li,{children:"Journeys: permette di visualizzare i journeys creati da AcmeSky in base agli interessi dell'utente."}),"\n",(0,r.jsx)(i.li,{children:"Offers: permette di visualizzare / riscattare le offerte create da AcmeSky per l'utente."}),"\n",(0,r.jsx)(i.li,{children:"Invoices: permette di visualizzare le ricevute e i relativi journeys dell'utente, oltre alle eventuali informazioni per il servizio premium."}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"esterni",children:"Esterni"}),"\n",(0,r.jsx)(i.p,{children:"Qui di seguito sono presenti i collegamenti alle pagine per singolo servizio\nesterno. Viene illustrato il loro set up e il link al codice sorgente."}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.a,{href:"/services/airline",children:"Airline"})}),". Usato come gestore di una compagnia aerea."]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.a,{href:"/services/bank",children:"Bank"})}),". Usato come gateway di un servizio bancario."]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.a,{href:"/services/rent",children:"Rent"})}),". Usato per gestire le compagnie di taxi."]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.a,{href:"/services/geodistance",children:"Geodistance"})}),". Usato per ritrovare la distanza in metri tra due\npunti nello spazio."]}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.a,{href:"/services/prontogram",children:"Prontogram"})}),". Usato come sistema di messaggistica."]}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>a,x:()=>o});var r=n(6540);const s={},t=r.createContext(s);function a(e){const i=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(t.Provider,{value:i},e.children)}}}]);