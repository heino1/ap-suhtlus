# Andmevahetuse protokollid ja standardid

Andmevahetuse protokollid on reeglite kogumid, mis määratlevad, kuidas arvutiprogrammid omavahel suhtlevad. Need protokollid määravad andmete formaadi, edastamise viisi ja suhtluse reeglid. Järgnevalt käsitleme olulisemaid protokolle ja standardeid, mis on kasutusel tänapäeva tarkvarasüsteemides.

## HTTP/HTTPS ja RESTful arhitektuur

### HTTP/HTTPS ülevaade
HTTP (HyperText Transfer Protocol) on veebipõhise suhtluse alustala, mis võimaldab veebilehtede ja -rakenduste andmevahetust.

- **Põhiomadused**:
  - Klient-server mudel
  - Olekuta (stateless) protokoll
  - Teksti- ja meediafailide edastamine
  - Standardiseeritud päringumeetodid ja vastusekoodid

- **HTTPS** on HTTP turvaline versioon, mis kasutab TLS/SSL krüpteerimist andmete kaitsmiseks

- **HTTP meetodid**:
  - GET - andmete pärimine
  - POST - uute andmete loomine
  - PUT - olemasolevate andmete täielik uuendamine
  - PATCH - olemasolevate andmete osaline uuendamine
  - DELETE - andmete kustutamine
  - HEAD - metaandmete pärimine ilma sisu laadimata
  - OPTIONS - toetatud meetodite info pärimine

- **HTTP vastusekoodid**:
  - 1xx - Informatiivne (nt. 100 Continue)
  - 2xx - Edukas (nt. 200 OK, 201 Created)
  - 3xx - Ümbersuunamine (nt. 301 Moved Permanently)
  - 4xx - Kliendi viga (nt. 400 Bad Request, 404 Not Found)
  - 5xx - Serveri viga (nt. 500 Internal Server Error)

### RESTful arhitektuur
REST (Representational State Transfer) on arhitektuuristiil, mis kasutab HTTP protokolli võimalusi ressursipõhise suhtluse loomiseks.

- **REST põhiprintsiibid**:
  - **Ressursipõhisus** - kõik on ressurss, millel on unikaalne identifikaator (URI)
  - **Olekuta suhtlus** - iga päring sisaldab kogu vajalikku infot
  - **Ühtne liides** - standardsed HTTP meetodid ressursside haldamiseks
  - **Vahemälu kasutamine** - vastuseid saab vahemälus hoida jõudluse parandamiseks
  - **Kihiline süsteem** - klient ei tea, kas ta suhtleb otse serveriga või vahendajaga

- **RESTful API näide**:
  - Ressurss: Tellimused
  - Endpoint: `/orders`
  - Operatsioonid:
    - `GET /orders` - kõigi tellimuste nimekiri
    - `GET /orders/123` - tellimuse nr 123 detailid
    - `POST /orders` - uue tellimuse loomine
    - `PUT /orders/123` - tellimuse nr 123 täielik uuendamine
    - `DELETE /orders/123` - tellimuse nr 123 kustutamine

- **Eelised**:
  - Lihtne ja intuitiivne
  - Skaleeritav
  - Platvormist sõltumatu
  - Laialdaselt toetatud

- **Puudused**:
  - Üleliigne andmete edastamine (over-fetching)
  - Mitme ressursi pärimine nõuab mitut päringut
  - Versioonihalduse väljakutsed

### Näide logistika valdkonnast
E-poe ja logistikateenuse pakkuja vaheline REST API:
```
# Uue saadetise loomine
POST /shipments
{
  "recipient": {
    "name": "Jaan Tamm",
    "address": "Pikk 5, Tallinn",
    "phone": "+372 5555 5555"
  },
  "packages": [
    {
      "weight": 2.5,
      "dimensions": "30x20x15",
      "description": "Raamatud"
    }
  ],
  "service_type": "standard"
}

# Vastus
201 Created
{
  "shipment_id": "SH12345678",
  "tracking_url": "https://logistics.example.com/track/SH12345678",
  "estimated_delivery": "2025-04-05"
}
```

## SOAP ja XML-põhised teenused

SOAP (Simple Object Access Protocol) on XML-põhine protokoll, mis võimaldab struktureeritud info vahetamist hajussüsteemides.

### SOAP ülevaade
- **Põhiomadused**:
  - Platvormist ja keelest sõltumatu
  - Tugev tüübikontroll
  - Sisseehitatud veahaldus
  - Toetab erinevaid transpordiprotokolle (HTTP, SMTP, jne)
  - Formaalne teenuste kirjeldus (WSDL)

- **SOAP sõnumi struktuur**:
  - Envelope (ümbrik) - sõnumi juurelement
  - Header (päis) - valikuline metainfo
  - Body (keha) - tegelik sõnumi sisu
  - Fault (viga) - veateated

- **WSDL** (Web Services Description Language):
  - XML-põhine keel veebiteenuste kirjeldamiseks
  - Defineerib teenuse liidesed, operatsioonid, andmetüübid
  - Võimaldab automaatset kliendiliidese genereerimist

- **Eelised**:
  - Rangelt defineeritud
  - Tugev tüübikontroll
  - Sisseehitatud turvalisus (WS-Security)
  - Sobib keerukateks äriprotsessideks

- **Puudused**:
  - Keerukam kui REST
  - Suurem andmemaht XML-i tõttu
  - Aeglasem töötlemine

### SOAP näide
```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Header>
    <auth:Credentials xmlns:auth="http://example.org/auth">
      <auth:Username>kasutaja</auth:Username>
      <auth:Password>parool</auth:Password>
    </auth:Credentials>
  </soap:Header>
  <soap:Body>
    <m:GetShipmentStatus xmlns:m="http://example.org/logistics">
      <m:ShipmentId>SH12345678</m:ShipmentId>
    </m:GetShipmentStatus>
  </soap:Body>
</soap:Envelope>
```

### Näide logistika valdkonnast
Rahvusvahelise logistikaettevõtte SOAP teenus, mis võimaldab:
- Saadetiste staatuse pärimist
- Uute saadetiste registreerimist
- Veoteenuste hinnapäringuid
- Tollidokumentide edastamist

## gRPC ja Protocol Buffers

gRPC on Google'i loodud avatud lähtekoodiga kõrgjõudlusega RPC (Remote Procedure Call) raamistik, mis kasutab Protocol Buffers andmete serialiseerimiseks.

### gRPC ülevaade
- **Põhiomadused**:
  - Kõrge jõudlus ja väike latents
  - Tugev tüübikontroll
  - Koodigenereerimine erinevatele programmeerimiskeeltele
  - Toetab voogedastust (streaming)
  - Põhineb HTTP/2 protokollil

- **Suhtlusmustrid**:
  - Unary RPC - tavaline päring-vastus
  - Server streaming - server saadab mitu vastust ühele päringule
  - Client streaming - klient saadab mitu päringut ja saab ühe vastuse
  - Bidirectional streaming - mõlemad osapooled saadavad andmevoo

- **Protocol Buffers**:
  - Binaarne serialiseerimisformaat
  - Väiksem andmemaht võrreldes JSON/XML-iga
  - Kiirem töötlemine
  - Skeemipõhine (`.proto` failid)
  - Toetab skeemi evolutsiooni

- **Eelised**:
  - Väga kiire
  - Kompaktne andmeformaat
  - Tugev tüübikontroll
  - Mitmekeelne tugi

- **Puudused**:
  - Vähem inimloetav kui JSON/REST
  - Nõuab spetsiaalset klienti (ei saa brauseris lihtsalt testida)
  - Keerulisem seadistada

### Protocol Buffers näide
```protobuf
syntax = "proto3";

package logistics;

service ShipmentService {
  rpc CreateShipment (ShipmentRequest) returns (ShipmentResponse) {}
  rpc TrackShipment (TrackingRequest) returns (stream TrackingUpdate) {}
}

message ShipmentRequest {
  Recipient recipient = 1;
  repeated Package packages = 2;
  string service_type = 3;
}

message Recipient {
  string name = 1;
  string address = 2;
  string phone = 3;
}

message Package {
  float weight = 1;
  string dimensions = 2;
  string description = 3;
}

message ShipmentResponse {
  string shipment_id = 1;
  string tracking_url = 2;
  string estimated_delivery = 3;
}

message TrackingRequest {
  string shipment_id = 1;
}

message TrackingUpdate {
  string status = 1;
  string location = 2;
  string timestamp = 3;
  string description = 4;
}
```

### Näide logistika valdkonnast
Reaalajas saadetiste jälgimissüsteem:
- Klient teeb päringu konkreetse saadetise jälgimiseks
- Server alustab voogedastust ja saadab uuendusi iga kord, kui saadetise staatus muutub
- Klient näeb reaalajas saadetise liikumist ilma pideva pärimiseta

## WebSocket ja reaalajasüsteemid

WebSocket on protokoll, mis võimaldab täisdupleks-sidet (full-duplex) üle TCP ühenduse, võimaldades reaalajas andmevahetust serveri ja kliendi vahel.

### WebSocket ülevaade
- **Põhiomadused**:
  - Püsiv ühendus kliendi ja serveri vahel
  - Kahesuunaline suhtlus
  - Madal latents
  - Väiksem üldkoormus võrreldes HTTP päringutega

- **Tööpõhimõte**:
  1. Ühenduse loomine HTTP käepigistusega (handshake)
  2. Protokolli üleminek HTTP-lt WebSocket-ile
  3. Kahesuunaline andmevahetus
  4. Ühenduse sulgemine

- **Eelised**:
  - Reaalajas suhtlus
  - Väiksem latents
  - Väiksem võrgukoormus
  - Sobib interaktiivsetele rakendustele

- **Puudused**:
  - Keerulisem implementeerida kui REST
  - Nõuab olekuhaldust serveris
  - Võib nõuda täiendavaid mehhanisme ühenduse hoidmiseks

### WebSocket näide (JavaScript)
```javascript
// Kliendipoolne kood
const socket = new WebSocket('wss://logistics.example.com/tracking');

// Ühenduse avamine
socket.addEventListener('open', (event) => {
  console.log('Ühendus loodud');
  // Saada päring konkreetse saadetise jälgimiseks
  socket.send(JSON.stringify({
    action: 'subscribe',
    shipment_id: 'SH12345678'
  }));
});

// Sõnumite vastuvõtmine
socket.addEventListener('message', (event) => {
  const update = JSON.parse(event.data);
  console.log('Uuendus saadetisele:', update);
  // Uuenda kasutajaliidest uue infoga
  updateTrackingUI(update);
});

// Ühenduse sulgemine
socket.addEventListener('close', (event) => {
  console.log('Ühendus suletud');
});
```

### Näide logistika valdkonnast
Logistikakeskuse reaalajas jälgimissüsteem:
- Dispetšerid näevad reaalajas sõidukite asukohti kaardil
- Süsteem teavitab koheselt viivitustest või probleemidest
- Kliendid saavad jälgida oma saadetise liikumist reaalajas
- Laotöötajad saavad reaalajas teavitusi uutest tellimustest

## Järjekorra- ja sõnumisüsteemid (RabbitMQ, Kafka)

Järjekorra- ja sõnumisüsteemid on vahendajad, mis võimaldavad asünkroonset suhtlust erinevate süsteemide vahel, tagades sõnumite usaldusväärse edastamise.

### RabbitMQ
- **Põhiomadused**:
  - AMQP (Advanced Message Queuing Protocol) põhine
  - Toetab erinevaid sõnumivahetusmustrid
  - Sõnumite kinnitamine (acknowledgment)
  - Järjekordade püsivus (persistence)
  - Koormusjaotur (load balancing)

- **Põhimõisted**:
  - Exchange - sõnumite vastuvõtja tootjatelt
  - Queue - sõnumite järjekord
  - Binding - seosed exchange'ide ja järjekordade vahel
  - Routing key - määrab, kuidas sõnumeid suunatakse

- **Sõnumivahetusmustrid**:
  - Direct exchange - täpne routing key vaste
  - Topic exchange - mustripõhine routing key vaste
  - Fanout exchange - saadab kõigile seotud järjekordadele
  - Headers exchange - päiste põhine suunamine

### Apache Kafka
- **Põhiomadused**:
  - Hajutatud voogedastusplatvorm
  - Kõrge läbilaskevõime
  - Skaleeritavus
  - Andmete püsivus ja tõrkekindlus
  - Toetab voogtöötlust (stream processing)

- **Põhimõisted**:
  - Topic - sõnumite kategooria või kanal
  - Partition - teema alamosa, võimaldab paralleeltöötlust
  - Producer - sõnumite looja ja saatja
  - Consumer - sõnumite vastuvõtja ja töötleja
  - Consumer group - tarbijate rühm, kes töötlevad erinevaid partitsioone

- **Eelised võrreldes traditsiooniliste sõnumijärjekordadega**:
  - Parem skaleeritavus
  - Kõrgem läbilaskevõime
  - Andmete säilitamine pikema aja jooksul
  - Toetab andmevoogude töötlust

### Näide logistika valdkonnast
Tellimuste töötlemise süsteem:

**RabbitMQ näide**:
1. Veebipood saadab uue tellimuse sõnumi exchange'i
2. Exchange suunab sõnumi vastavalt tellimuse tüübile õigesse järjekorda
3. Laosüsteem tarbib sõnumi ja alustab komplekteerimist
4. Pärast komplekteerimist saadab laosüsteem sõnumi transpordijärjekorda
5. Transpordisüsteem tarbib sõnumi ja planeerib tarne

**Kafka näide**:
1. Veebipood toodab sõnumi "new-orders" teemasse
2. Laosüsteem tarbib sõnumi ja alustab komplekteerimist
3. Laosüsteem toodab sõnumi "order-status" teemasse
4. Transpordisüsteem ja klienditeenindus tarbivad mõlemad "order-status" teemat
5. Kõik sõnumid säilitatakse hilisemaks analüüsiks
