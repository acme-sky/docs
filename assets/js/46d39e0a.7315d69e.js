"use strict";(self.webpackChunkacme_sky_docs=self.webpackChunkacme_sky_docs||[]).push([[889],{4214:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var i=s(4848),r=s(8453);const t={sidebar_position:5,slug:"/services/prontogram"},o="Prontogram",a={id:"services/prontogram",title:"Prontogram",description:"Prontogram \xe8 un servizio di messagistica scritto sottoforma di API REST in Jolie.",source:"@site/docs/services/prontogram.md",sourceDirName:"services",slug:"/services/prontogram",permalink:"/docs/services/prontogram",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,slug:"/services/prontogram"},sidebar:"defaultSidebar",previous:{title:"Geodistance",permalink:"/docs/services/geodistance"}},l={},d=[{value:"Set up manuale",id:"set-up-manuale",level:2},{value:"Set up automatico (docker)",id:"set-up-automatico-docker",level:2},{value:"API",id:"api",level:2},{value:"Formato dei dati",id:"formato-dei-dati",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"prontogram",children:"Prontogram"}),"\n",(0,i.jsx)(n.p,{children:"Prontogram \xe8 un servizio di messagistica scritto sottoforma di API REST in Jolie."}),"\n",(0,i.jsx)(n.h2,{id:"set-up-manuale",children:"Set up manuale"}),"\n",(0,i.jsxs)(n.p,{children:["Il server in Jolie \xe8 stato realizzato con in mente l'utilizzo di ",(0,i.jsx)(n.a,{href:"https://docs.jolie-lang.org/v1.11.x/language-tools-and-standard-library/rest/jolier/index.html",children:"Jolier"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"jolier server.ol WebPort localhost:8000 -headerHandler\n"})}),"\n",(0,i.jsxs)(n.p,{children:["L'utilizzo del parametro ",(0,i.jsx)(n.code,{children:"-headerHandler"})," \xe8 quindi necessario in quanto il server ne fa utilizzo per la gestione di cookies e Headers nelle risposte HTTP."]}),"\n",(0,i.jsxs)(n.p,{children:["A questo punto il server sar\xe0 raggiungibile a ",(0,i.jsx)(n.code,{children:"http://localhost:8000/"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Prima di utilizzare il server \xe8 necessario avviare un database Postgres, per il quale \xe8 fornito un ",(0,i.jsx)(n.code,{children:"docker-compose.yml"})," in ",(0,i.jsx)(n.code,{children:"/db"}),", con annesso ",(0,i.jsx)(n.code,{children:"init.sql"}),".\nN.B. per l'utilizzo dell'interfaccia ",(0,i.jsx)(n.code,{children:"Database"})," di Jolie \xe8 necessario anche il ",(0,i.jsx)(n.code,{children:"postgresql-{version}.jar"})," fornito in ",(0,i.jsx)(n.code,{children:"/lib"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Il ",(0,i.jsx)(n.code,{children:"docker-compose.yml"})," \xe8 in grado di effettuare il setup del database in maniera automatica, basta eseguire il comando ",(0,i.jsx)(n.code,{children:"docker compose up"})," nella directory del file."]}),"\n",(0,i.jsx)(n.h2,{id:"set-up-automatico-docker",children:"Set up automatico (docker)"}),"\n",(0,i.jsx)(n.p,{children:"TODO"}),"\n",(0,i.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,i.jsxs)(n.p,{children:["Il servizio offre una API di tipo REST che permette di effettuare le operazioni di login, registrazione di un utente, log dei messaggi, invio di un messaggio e logout.\n",(0,i.jsx)(n.img,{alt:"Prontogram routes",src:s(9854).A+"",width:"2033",height:"780"})]}),"\n",(0,i.jsxs)(n.p,{children:["Il ",(0,i.jsx)(n.strong,{children:"mapping"})," e il ",(0,i.jsx)(n.strong,{children:"metodo"})," delle richieste \xe8 descritto all'interno di ",(0,i.jsx)(n.code,{children:"rest_template.json"}),", necessario per l'utilizzo di jolier."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n    "login": {\n        "method":"post",\n        "template": "api/login"\n    },\n    "getMessages": {\n        "method":"get",\n        "template":"api/getMessages/{username}"\n    },\n    "register": {\n        "method":"post",\n        "template":"api/register"\n    },\n    "logout": {\n        "method":"post",\n        "template": "api/logout"\n    },\n    "sendMessage": {\n        "method":"post",\n        "template": "api/sendMessage"\n    }\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"formato-dei-dati",children:"Formato dei dati"}),"\n",(0,i.jsxs)(n.p,{children:["Strutture dati (custom types) necessarie per le richieste e risposte sono descritte in ",(0,i.jsx)(n.code,{children:"pronto.iol"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jolie",children:"type loginRequest{\n    .username: string\n    .password: string\n}\n\ntype logoutRequest{\n    .username?: string\n    .sid?:      string\n}\n\ntype registerRequest{\n    .username: string\n    .password: string\n    .name:     string\n    .surname:  string\n}\n\ntype messagesRequest{\n    .username: string\n    .sid?:      string\n}\n\ntype prontoResponse :void{\n    .message:  string\n    .sid?:       string\n    .status?:    int\n}\n\ntype sendMessageRequest{\n    .message:   string\n    .username:      string\n    .expiration?:    string\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Nelle strutture, l'attributo ",(0,i.jsx)(n.code,{children:"sid"})," \xe8 l'identificatore univoco generato dal server Jolie per il managing delle sessioni utente, che agir\xe0 come valore del cookie in grado di gestire l'autenticazione."]}),"\n",(0,i.jsxs)(n.p,{children:["All'interno di ",(0,i.jsx)(n.code,{children:"RestHandler.ol"})," troviamo:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jolie",children:'main{\n    [incomingHeaderHandler(request)(response){\n        if ( request.operation == "api/login" ){\n            getJsonValue@JsonUtils(request.headers.("data"))(credentials)\n            response.username = credentials.username\n            response.password = credentials.password\n        } else if (request.operation == "api/register") {\n            getJsonValue@JsonUtils(request.headers.("data"))(credentials)\n            response.username = credentials.username\n            response.password = credentials.password\n            response.name = credentials.name\n            response.surname = credentials.surname\n        } else if (request.operation == "getMessages" || request.operation == "logout"){\n                response.sid = request.headers.cookies.session\n            }\n    }]\n\n...\n}\n'})}),"\n",(0,i.jsx)(n.p,{children:"che si occupa della gestione dei dati in ingresso quando vengono effettuate le chiamate di login, register."}),"\n",(0,i.jsxs)(n.p,{children:["Come si evince dal codice queste vengono inviate in formato JSON da un client all'interno dell'header ",(0,i.jsx)(n.code,{children:"credentials"}),", seguendo la nomenclatura dei custom types sopra illustrati."]})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},9854:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/prontogram_recap-3c0a99b1a71766b88d549c48c256b311.png"},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var i=s(6540);const r={},t=i.createContext(r);function o(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);