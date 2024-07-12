"use strict";(self.webpackChunkacme_sky_docs=self.webpackChunkacme_sky_docs||[]).push([[166],{2541:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>t,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=n(4848),s=n(8453);const a={sidebar_position:2,slug:"/services/airline"},o="Airline",l={id:"services/airline",title:"Airline",description:"Il servizio Airline \xe8 progettato per gestire le operazioni di una compagnia aerea, consentendo la ricerca e la prenotazione di voli. Tuttavia, l'utente finale non interagisce direttamente con Airline per le prenotazioni; \xe8 ACMESky che si occupa di gestire queste operazioni attraverso le sue interfacce.",source:"@site/docs/services/airline.md",sourceDirName:"services",slug:"/services/airline",permalink:"/docs/services/airline",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,slug:"/services/airline"},sidebar:"defaultSidebar",previous:{title:"Servizi",permalink:"/docs/services/"},next:{title:"Bank",permalink:"/docs/services/bank"}},t={},c=[{value:"Funzionalit\xe0 del Servizio",id:"funzionalit\xe0-del-servizio",level:4},{value:"Set up",id:"set-up",level:3},{value:"Variabili d&#39;Ambiente",id:"variabili-dambiente",level:4},{value:"Deploy",id:"deploy",level:3},{value:"API",id:"api",level:2},{value:"/v1/airports/",id:"v1airports",level:3},{value:"/v1/flights/",id:"v1flights",level:3},{value:"/v1/hooks/",id:"v1hooks",level:3},{value:"/v1/journeys/",id:"v1journeys",level:3},{value:"Codice sorgente",id:"codice-sorgente",level:2}];function d(e){const i={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{id:"airline",children:"Airline"}),"\n",(0,r.jsx)(i.p,{children:"Il servizio Airline \xe8 progettato per gestire le operazioni di una compagnia aerea, consentendo la ricerca e la prenotazione di voli. Tuttavia, l'utente finale non interagisce direttamente con Airline per le prenotazioni; \xe8 ACMESky che si occupa di gestire queste operazioni attraverso le sue interfacce."}),"\n",(0,r.jsx)(i.h4,{id:"funzionalit\xe0-del-servizio",children:"Funzionalit\xe0 del Servizio"}),"\n",(0,r.jsx)(i.p,{children:"Airline offre una serie di funzionalit\xe0 essenziali per la gestione dei voli:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"Ricerca voli"}),": Consente di cercare voli disponibili in base a diversi criteri come data, destinazione e prezzo."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"Prenotazione voli"}),": Permette la prenotazione dei voli selezionati, gestendo la disponibilit\xe0 dei posti e confermando la prenotazione."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:"Gestione prenotazioni"}),": Include la visualizzazione e la gestione delle prenotazioni esistenti."]}),"\n"]}),"\n",(0,r.jsx)(i.h3,{id:"set-up",children:"Set up"}),"\n",(0,r.jsx)(i.p,{children:"Il servizio \xe8 implementato come una REST API scritta in Go. Di seguito sono riportati i passaggi necessari per configurare e avviare il servizio Airline."}),"\n",(0,r.jsx)(i.h4,{id:"variabili-dambiente",children:"Variabili d'Ambiente"}),"\n",(0,r.jsx)(i.p,{children:"Per configurare il servizio, \xe8 necessario definire alcune variabili d'ambiente:"}),"\n",(0,r.jsxs)(i.ol,{children:["\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:"Database DSN"}),": A differenza degli altri servizi, la connessione al database \xe8 definita come una stringa DSN (Data Source Name). Questa stringa deve essere specificata nella variabile d'ambiente ",(0,r.jsx)(i.code,{children:"DATABASE_DSN"}),"."]}),"\n",(0,r.jsx)(i.p,{children:"Esempio di configurazione:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:'export DATABASE_DSN="user:password@host:port/dbname"\n'})}),"\n",(0,r.jsx)(i.p,{children:"A seguire bisogner\xe0 specificare anche:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:"export POSTGRES_USER=user\nexport POSTGRES_PASSWORD=password\nexport POSTGRES_DB=dbname\n"})}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:"JWT token"}),": Alcuni endpoint del servizio richiedono l'autenticazione tramite token JWT. La chiave usata per generare il token JWT \xe8 specificata nella variabile d'ambiente ",(0,r.jsx)(i.code,{children:"JWT_TOKEN"}),"."]}),"\n",(0,r.jsx)(i.p,{children:"Esempio di configurazione:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:'export JWT_TOKEN="your_jwt_secret_key"\n'})}),"\n"]}),"\n",(0,r.jsxs)(i.li,{children:["\n",(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:"Debug"}),": Se impostata a ",(0,r.jsx)(i.code,{children:"1"})," saranno stampati ulteriori informazioni nel\nlog di sistema. \xc8 consigliato impostare il valore a ",(0,r.jsx)(i.code,{children:"0"})," in produzione."]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:"export DEBUG=0\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(i.h3,{id:"deploy",children:"Deploy"}),"\n",(0,r.jsx)(i.p,{children:"Una volta impostate le variabili d'ambiente bisogna passare alla build del\ncodice sorgente e il deploy."}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:"git clone git@github.com:acme-sky/airline-api.git\ndocker build -t acmesky-airlineservice-api .\ndocker compose up\n"})}),"\n",(0,r.jsx)(i.p,{children:"e poi, infine, creare un utente usando come campo di password una stringa in\nSHA256."}),"\n",(0,r.jsxs)(i.blockquote,{children:["\n",(0,r.jsxs)(i.p,{children:["Si pu\xf2 fare l'hash di una stringa su Linux con ",(0,r.jsx)(i.code,{children:'echo -n "password" | sha256sum'})]}),"\n"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-sh",children:'$ docker ps                                                                                                                                                         1 \u21b5\nCONTAINER ID   IMAGE                        COMMAND                  CREATED          STATUS          PORTS                                       NAMES\n646fc7c342fd   acmesky-airlineservice-api   "./main"                 57 seconds ago   Up 56 seconds   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   airlineservice-api\nc8f8f8782838   postgres:16-alpine           "docker-entrypoint.s\u2026"   57 seconds ago   Up 56 seconds   5432/tcp                                    airlineservice-postgres\n$ docker exec -it c8 psql -U acme -d db -W\nPassword:\npsql (16.2)\nType "help" for help.\n\ndb=# create user\nuser              user mapping for\ndb=# insert into users (username, password) values (\'sa\', \'6ea044c786f237c955b497b04b9247f2a663c5038e54175e62308c8b8457e23e\');\nINSERT 0 1\n'})}),"\n",(0,r.jsx)(i.h2,{id:"api",children:"API"}),"\n",(0,r.jsx)(i.p,{children:(0,r.jsx)(i.img,{alt:"Swagger screenshot",src:n(7120).A+"",width:"1920",height:"1675"})}),"\n",(0,r.jsx)(i.p,{children:"Si pu\xf2 procedere con il login per la creazione del token di autorizzazione agli endpoint."}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:'$ curl -X POST http://airlineservice-api/v1/login/ -H \'content-type: application/json\' -d \'{"username":"sa","password":"*****"}\'\nHTTP/1.1 200 OK\nContent-Length: 147\nContent-Type: application/json; charset=utf-8\nDate: Tue, 02 Apr 2024 10:14:41 GMT\n\n{\n    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiZXhwIjoxNzEyMDU2NDgxfQ.7R87BuuVkvOwojBpLmJ8OKtKC0B9Iq-wWSA_pqGBVXE"\n}\n'})}),"\n",(0,r.jsx)(i.p,{children:"Ecco una descrizione dei principali gruppi di endpoint dell'API di Airline:"}),"\n",(0,r.jsx)(i.h3,{id:"v1airports",children:"/v1/airports/"}),"\n",(0,r.jsxs)(i.p,{children:["Questo endpoint gestisce le informazioni sugli aeroporti. Il metodo POST \xe8 accessibile solo agli utenti registrati e consente loro di visualizzare e gestire i dati degli aeroporti.\nGli utenti non registrati possono accedere alla visualizzazione delle\ninformazioni sfruttando il codice dell'aereoporto (ad esempio\n",(0,r.jsx)(i.code,{children:"/v1/airports/blq/"}),")."]}),"\n",(0,r.jsx)(i.h3,{id:"v1flights",children:"/v1/flights/"}),"\n",(0,r.jsxs)(i.p,{children:["Questo endpoint gestisce le informazioni sui voli. \xc8 accessibile solo agli utenti registrati e offre funzionalit\xe0 di ricerca e gestione dei voli.\nGli utenti possono filtrare i voli in base a diversi criteri come orario di partenza, orario di arrivo, ID dell'aeroporto di partenza e ID dell'aeroporto di arrivo sfruttando ",(0,r.jsx)(i.code,{children:"/v1/flights/filter/"}),"."]}),"\n",(0,r.jsx)(i.h3,{id:"v1hooks",children:"/v1/hooks/"}),"\n",(0,r.jsxs)(i.p,{children:["Questo endpoint gestisce gli endpoint di callback a cui la compagnia aerea pu\xf2 fare richieste per inviare offerte. Quando una nuova offerta viene fatta, la compagnia aerea effettua una chiamata HTTP POST a ",(0,r.jsx)(i.code,{children:"<url>/v1/hooks/offer/"})," includendo il parametro ",(0,r.jsx)(i.code,{children:"flight_id"}),". Questo endpoint \xe8 utile per ricevere notifiche in tempo reale su offerte e promozioni relative ai voli."]}),"\n",(0,r.jsx)(i.h3,{id:"v1journeys",children:"/v1/journeys/"}),"\n",(0,r.jsxs)(i.p,{children:["Questo endpoint gestisce le informazioni sui viaggi degli utenti. Gli utenti possono creare un viaggio utilizzando il campo ",(0,r.jsx)(i.code,{children:"email"})," per contrassegnare l'utente della propria piattaforma. Questo endpoint consente agli utenti di visualizzare e gestire i propri viaggi, inclusa la creazione, la modifica e l'eliminazione dei viaggi associati al proprio account."]}),"\n",(0,r.jsx)(i.h2,{id:"codice-sorgente",children:"Codice sorgente"}),"\n",(0,r.jsxs)(i.p,{children:["Il server \xe8 presente alla seguente ",(0,r.jsx)(i.a,{href:"https://github.com/acme-sky/airline-api",children:"repository Github"}),"."]})]})}function p(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},7120:(e,i,n)=>{n.d(i,{A:()=>r});const r=n.p+"assets/images/swagger-airline-777e0e1720f71d1323acf5dd9723dfc4.png"},8453:(e,i,n)=>{n.d(i,{R:()=>o,x:()=>l});var r=n(6540);const s={},a=r.createContext(s);function o(e){const i=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(a.Provider,{value:i},e.children)}}}]);