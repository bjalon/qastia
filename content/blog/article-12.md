https://qastia.com/2018/10/02/wiremock/

Wiremock
Wiremock est un Serveur mock HTTP permettant la création de scénario évolutif. Particulièrement utile dans le cadre d’un polling où les data en entrée et l’url ne varient pas mais où on a besoin de tester différentes réponses.

Installation de Wiremock
Tout d’abord télécharger wiremock
Prendre la dernière version
Installer java 8
Démarrage du mock
Lancer ​wiremock-run.cmd
Attention, il faut le JAR avec JAVA 8. Si la JVM par défaut de votre poste de travail n’est pas celle-ci par défaut, il faut

créer un script sous windows en modifiant modifiant le PATH pour que cette version de JVM soit sélectionnée en premier, ex :
set PATH=C:\Program Files\Java\jre1.8.0_92\bin;%PATH%

java -cp "wiremock-body-transformer-xxxx.jar" com.github.tomakehurst.wiremock.standalone.WireMockServerRunner
ou utiliser java alternative sous linux
Comment fonctionne Wiremock
En lançant, la ligne de commande suivante :

java -cp "wiremock-body-transformer-xxxx.jar" com.github.tomakehurst.wiremock.standalone.WireMockServerRunner
Par défaut, wiremock va écouter tous les appels sur le port 8080 et traiter les appels en fonctions des indications fournies dans le répertoire mapping. Dans se répertoire se trouve des fichier json qui sont des descripteurs de réponses
à produire en fonction de règles.

Wiremock propose un certain nombre d’options :

–verbose : en mode verbose
–port : port découte de wiremock (par défaut 8080)
–extensions com.mon.package.MaClasseTransformer (on peut par exemple faire un
transformer qui enregistre une valeur dans un appel pour la restituer plus tard)
–https-port: If specified, enables HTTPS on the supplied port.
–bind-address: The IP address the WireMock server should serve from. Binds to all local network adapters if unspecified.
–https-keystore: Path to a keystore file containing an SSL certificate to use with HTTPS. The keystore must have a password of “password”. This option will only work if –https-port is specified. If this option isn’t used WireMock will default to its own self-signed certificate.
–keystore-password: Password to the keystore, if something other than “password”.
–https-truststore: Path to a keystore file containing client certificates. See https and proxy-client-certs for details.
–truststore-password: Optional password to the trust store. Defaults to “password” if not specified.
–https-require-client-cert: Force clients to authenticate with a client certificate. See https for details.
–root-dir: Sets the root directory, under which mappings and __files reside. This defaults to the current directory.
–record-mappings: Record incoming requests as stub mappings. See record-playback.
–match-headers: When in record mode, capture request headers with the keys specified. See record-playback.
–proxy-all: Proxy all requests through to another base URL e.g. –proxy-all= »http://api.someservice.com &raquo; Typically used in conjunction with –record-mappings such that a session on another service can be recorded.
–preserve-host-header: When in proxy mode, it passes the Host header as it comes from the client through to the proxied service. When this option is not present, the Host header value is deducted from the proxy URL. This option is only available if the –proxy-all option is specified.
–proxy-via: When proxying requests (either by using –proxy-all or by creating stub mappings that proxy to other hosts), route via another proxy server (useful when inside a corporate network that only permits internet access via an opaque proxy). e.g. –proxy-via webproxy.mycorp.com (defaults to port 80) or –proxy-via webproxy.mycorp.com:8080
–enable-browser-proxying: Run as a browser proxy. See browser-proxying.
–no-request-journal: Disable the request journal, which records incoming requests for later verification. This allows WireMock to be run (and serve stubs) for long periods (without resetting) without exhausting the heap. The –record-mappings option isn’t available if this one is specified.
–container-threads: The number of threads created for incoming requests. Defaults to 10.
–max-request-journal-entries: Set maximum number of entries in request journal (if enabled). When this limit is reached oldest entries will be discarded.
–jetty-acceptor-threads: The number of threads Jetty uses for accepting requests.
–jetty-accept-queue-size: The Jetty queue size for accepted requests.
–jetty-header-buffer-size: The Jetty buffer size for request headers, e.g. –jetty-header-buffer-size 16384, defaults to 8192K.
–async-response-enabled: Enable asynchronous request processing in Jetty. Recommended when using WireMock for performance testing with delays, as it allows much more efficient use of container threads and therefore higher throughput. Defaults to false.
–async-response-threads: Set the number of asynchronous (background) response threads. Effective only with asynchronousResponseEnabled=true. Defaults to 10.
–extensions: Extension class names e.g. com.mycorp.HeaderTransformer,com.mycorp.BodyTransformer. See extending-wiremock.
–print-all-network-traffic: Print all raw incoming and outgoing network traffic to console.
–global-response-templating: Render all response definitions using Handlebars templates.
–local-response-templating: Enable rendering of response definitions using Handlebars templates for specific stub mappings.
Créer des règles Wiremock
le format des fichiers de règles json sont de la forme suivante :

{
  "priority": N,      // priorité de cette règle
  "request": {
    ... description des requêtes prises en compte par cette règle ...
  },
  "response": {       // Déscription de la réponse
    "status": XXX,      // status de la réponse (200, 404, ...)
    "headers": {        // Liste des headers retournés (clé: valeur)
      "Access-Control-Allow-Origin": "*"
    },
    "jsonBody": {       // Contenu data de la réponse
      ... ici le json de réponse ...
    },
    "transformers": ["body-transformer"]  
     // ici on peut mettre en place des transformer (voir documentation wiremock)
  }
}
Les transformers sont expliqués dans la documentation de wiremock.

La structure de la valeur request est de la forme suivante :

"request": {
  "method": "POST|GET|DELETE|...",
  "urlPattern": "/genesys/2/chat/crcm(_[a-z]+)?/[a-zA-Z0-9]+/send", 
     // Regexp qui match
  "bodyPatterns" : [{
    "contains": "transcriptPosition=1"
  }]
},
Pour écrire la regexp qui match, nous vous conseillons d’utiliser ce site,
Les bodypatterns fournit un certain nombre de règles possible
« contains »: « string that match »
« equalToXml »: « <xmlStructure /> »
« matchesXPath » : « //xPathPattern »
« equalToJson » : « {} »
Pour en savoir plus voir, la documentation wiremock.

Créer des règles Wiremock avec état
Il est également possible de créer des scénarios à état, par exemple quand le end-point n’est pas stateless (j’appelle plusieurs fois le end-point et la réponse change) ou quand un appel produit un changement d’état de la ressource. Dans ce cas, il faut :

que toutes les règles indiquent à quel scénario à état celles-ci se rattachent avec l’entrée scenarioName.
pour la règle correspondant à la première réponse :
mettre comme pour toute règle un descripteur de request qui matche le end-point
pour indiquer qu’elle correspond à la première règle ajouter :
"requiredScenarioState": "Started"
Started est l’état de départ par défaut

Ensuite pour la règle provoquant un changement d’état, il suffit d’ajouter un attribut newScenarioState avec le nom de ce nouveau scénario:
"newScenarioState": "mon nom d'état du scénario"
Enfin, il n’y a qu’a à indiquer pour toutes les règles matchant ce nouvel état, ajouter une dépendance à cet état avec l’attribut requiredScenarioState
Donc si nous voulons simuler 3 états pour notre système mocké, avec les états suivants :

    Started (état de départ par défaut => ETAT_1 => ETAT_2

Il suffit de produire les json suivants :

Fichier règle initiale de mon end point
{
  "scenarioName": "MonScenar",
  "requiredScenarioState": "Started",
  "request": {
    "method": "GET", // ou ce qu'on veut (POST/DELETE/...)
    "url": "/mon-end-point"
  },
  "response": {
    ... Réponse au départ de notre système ...
  }
}
Fichier de la règle déclencheuse du changement d’état
{
  "scenarioName": "MonScenar",
  "requiredScenarioState": "Started",
  "newScenarioState": "ETAT_1",
  "request": {
    ... n'importe quel appel de votre choix qui provoque le changement d'état ...
  },
  "response": {
    ... La réponse à cet appel ...
  }
}
Fichier règle de mon end point dans l’état ETAT_1
{
  "scenarioName": "MonScenar",
  "requiredScenarioState": "ETAT_1",
  "request": {
    "method": "GET",
    "url": "/mon-end-point"
  },
  "response": {
    ... Réponse de notre système dans l'état ETAT_1 ...
  }
}
Il est bien sûr possible que la règle initiale change l’état ou que la règle déclencheuse provoque aussi un changement d’état… Il suffit tout simplement d’ajouter l’attribut newScenarioState.

Pour connaître tous les état possibles pour le scénario MonScenar, il suffit de faire la requête suivante dans le navigateur :

http://server:port/__admin/scenarios

Créer des règles Wiremock avec réponse dynamique en fonction d’un attribut de la request
Il est possible de construire une réponse en fonction du contenu de l’appel, il suffit :

d’ajouter le plugin transformer
et d’indiquer dans l’attribut
{{request.XXX}}

L’objet request contient les attribut suivants :

request.url – URL path and query
request.requestLine.path – URL path
request.requestLine.pathSegments.[<n>]- URL path segment (zero indexed) e.g. request.pathSegments.[2]
request.requestLine.query.<key>- First value of a query parameter e.g. request.query.search
request.requestLine.query.<key>.[<n>]- nth value of a query parameter (zero indexed) e.g. request.query.search.[5]
request.requestLine.method- request method e.g. POST
request.requestLine.host- hostname part of the URL e.g. my.example.com
request.requestLine.port- port number e.g. 8080
request.requestLine.scheme- protocol part of the URL e.g. https
request.requestLine.baseUrl- URL up to the start of the path e.g. https://my.example.com:8080
request.headers.<key>- First value of a request header e.g. request.headers.X-Request-Id
request.headers.[<key>]- Header with awkward characters e.g. request.headers.[$?blah]
request.headers.<key>.[<n>]- nth value of a header (zero indexed) e.g. request.headers.ManyThings.[1]
request.cookies.<key> – First value of a request cookie e.g. request.cookies.JSESSIONID
request.cookies.<key>.[<n>] – nth value of a request cookie e.g. request.cookies.JSESSIONID.[2]
request.body – Request body text (avoid for non-text bodies)
