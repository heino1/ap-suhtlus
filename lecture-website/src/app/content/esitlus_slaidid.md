# Arvutiprogrammid ja nende omavaheline suhtlemine

## Loeng äriinformaatika kursusel
### Logistika 5. aasta tudengitele

---

## Loengu eesmärgid

- Mõista arvutiprogrammide vahelise suhtluse põhimõtteid
- Tutvuda erinevate suhtlusprotokollidega ja -standarditega
- Õppida tundma integratsioonimustrite ja -arhitektuuride põhimõtteid
- Mõista turvaaspekte programmide vahelises suhtluses
- Tutvuda kaasaegsete trendide ja tehnoloogiatega
- Rakendada teadmisi praktilistes näidetes

---

## Teema olulisus logistika valdkonnas

- **Reaalajas andmevahetus** - kaupade asukoha, oleku ja liikumise jälgimine
- **Protsesside automatiseerimine** - tellimuste töötlemine, laohaldus, transpordi planeerimine
- **Andmete integreerimine** - erinevate süsteemide (ERP, WMS, TMS) vaheline sujuv andmevahetus
- **Otsuste tegemise toetamine** - andmete kogumine ja analüüsimine
- **Klienditeeninduse parandamine** - täpsed tarneajad ja olekuteated

---

## Loengu struktuur

1. Sissejuhatus arvutiprogrammide vahelisse suhtlemisse
2. Arvutiprogrammide vahelise suhtlemise põhimõtted
3. Andmevahetuse protokollid ja standardid
4. Integratsioonimustrid ja -arhitektuurid
5. Turvaaspektid programmide vahelises suhtluses
6. Kaasaegsed trendid ja tehnoloogiad
7. Praktilised näited ja harjutused
8. Kokkuvõte ja arutelu

---

# 1. Sissejuhatus arvutiprogrammide vahelisse suhtlemisse

---

## Arvutiprogrammide vahelise suhtluse ajalugu

![Ajalugu](https://via.placeholder.com/800x400?text=Arvutiprogrammide+vahelise+suhtluse+ajalugu)

- **1960-1970**: Failipõhine andmevahetus, pakettöötlus
- **1980-1990**: Klient-server arhitektuur, EDI, RPC
- **1990-2000**: CORBA, DCOM, Java RMI
- **2000-2010**: XML, SOAP, REST
- **2010-2020**: JSON, mikroteenused, pilveteenused
- **2020-tänapäev**: API-majandus, GraphQL, serverless

---

## Põhimõisted

- **API** (Application Programming Interface) - rakendusliides
- **Protokoll** - reeglite kogum andmevahetuseks
- **Endpoint** - teenuse või API lõpp-punkt
- **Request/Response** - päring/vastus mudel
- **Serialiseerimine** - andmete teisendamine edastamiseks
- **Deserialiseerimine** - serialiseeritud andmete taastamine

---

# 2. Arvutiprogrammide vahelise suhtlemise põhimõtted

---

## Klient-server arhitektuur

![Klient-server](https://via.placeholder.com/800x400?text=Klient-server+arhitektuur)

- **Server** - pakub teenuseid, ressursse või funktsionaalsust
- **Klient** - kasutab serveri pakutavaid teenuseid
- **Eelised**: selge rollide jaotus, tsentraliseeritud ressursid
- **Puudused**: üksikpunkti rike, võrgulatents

---

## Hajussüsteemid

![Hajussüsteemid](https://via.placeholder.com/800x400?text=Hajussüsteemid)

- **Hajutatus** - komponendid töötavad erinevates arvutites
- **Autonoomsus** - komponendid töötavad iseseisvalt
- **Läbipaistvus** - süsteemi keerukus on kasutaja eest varjatud
- **Väljakutsed**: võrguprobleemid, koordineerimine, järjepidevus

---

## Sünkroonne vs asünkroonne suhtlus

![Sünkroonne vs asünkroonne](https://via.placeholder.com/800x400?text=Sünkroonne+vs+asünkroonne+suhtlus)

- **Sünkroonne**: klient ootab vastust enne jätkamist
  - Eelised: lihtne mõista, otsene tagasiside
  - Puudused: blokeerib kliendi, ressursside raiskamine

- **Asünkroonne**: klient jätkab tööd ilma vastust ootamata
  - Eelised: parem ressursside kasutus, skaleeritavus
  - Puudused: keerulisem implementeerida, olekuhaldus

---

## Sõnumipõhine suhtlus

![Sõnumipõhine suhtlus](https://via.placeholder.com/800x400?text=Sõnumipõhine+suhtlus)

- **Sõnumid** - andmeüksused, mida vahetatakse
- **Sõnumijärjekorrad** - sõnumite ajutised hoiukohad
- **Tootjad** (producers) - loovad ja saadavad sõnumeid
- **Tarbijad** (consumers) - võtavad vastu ja töötlevad sõnumeid
- **Sõnumivahendaja** - haldab sõnumite liikumist

---

## Andmete serialiseerimine

- **JSON** (JavaScript Object Notation)
  ```json
  {
    "tellimus_id": 12345,
    "klient": "AS Näidis",
    "tooted": [
      {"kood": "ABC123", "kogus": 5},
      {"kood": "XYZ789", "kogus": 2}
    ]
  }
  ```

- **XML** (eXtensible Markup Language)
  ```xml
  <tellimus>
    <tellimus_id>12345</tellimus_id>
    <klient>AS Näidis</klient>
    <tooted>
      <toode><kood>ABC123</kood><kogus>5</kogus></toode>
      <toode><kood>XYZ789</kood><kogus>2</kogus></toode>
    </tooted>
  </tellimus>
  ```

---

# 3. Andmevahetuse protokollid ja standardid

---

## HTTP/HTTPS ja RESTful arhitektuur

![REST API](https://via.placeholder.com/800x400?text=REST+API)

- **HTTP meetodid**: GET, POST, PUT, DELETE, PATCH
- **HTTP vastusekoodid**: 2xx (edukas), 4xx (kliendi viga), 5xx (serveri viga)
- **REST põhiprintsiibid**:
  - Ressursipõhisus
  - Olekuta suhtlus
  - Ühtne liides
  - Vahemälu kasutamine
  - Kihiline süsteem

---

## REST API näide

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

---

## SOAP ja XML-põhised teenused

![SOAP](https://via.placeholder.com/800x400?text=SOAP)

- **SOAP sõnumi struktuur**:
  - Envelope (ümbrik)
  - Header (päis)
  - Body (keha)
  - Fault (viga)
- **WSDL** - veebiteenuste kirjeldamise keel
- **Eelised**: rangelt defineeritud, tugev tüübikontroll
- **Puudused**: keerukam kui REST, suurem andmemaht

---

## SOAP näide

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

---

## gRPC ja Protocol Buffers

![gRPC](https://via.placeholder.com/800x400?text=gRPC)

- **Kõrge jõudlus** ja väike latents
- **Tugev tüübikontroll**
- **Koodigenereerimine** erinevatele programmeerimiskeeltele
- **Suhtlusmustrid**: Unary, Server streaming, Client streaming, Bidirectional
- **Protocol Buffers**: binaarne serialiseerimisformaat

---

## Protocol Buffers näide

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
```

---

## WebSocket ja reaalajasüsteemid

![WebSocket](https://via.placeholder.com/800x400?text=WebSocket)

- **Püsiv ühendus** kliendi ja serveri vahel
- **Kahesuunaline suhtlus**
- **Madal latents**
- **Tööpõhimõte**:
  1. Ühenduse loomine HTTP käepigistusega
  2. Protokolli üleminek HTTP-lt WebSocket-ile
  3. Kahesuunaline andmevahetus
  4. Ühenduse sulgemine

---

## Järjekorra- ja sõnumisüsteemid

![Message Queue](https://via.placeholder.com/800x400?text=Message+Queue)

- **RabbitMQ**:
  - AMQP protokoll
  - Exchange, Queue, Binding, Routing key
  - Sõnumivahetusmustrid: Direct, Topic, Fanout, Headers

- **Apache Kafka**:
  - Hajutatud voogedastusplatvorm
  - Topic, Partition, Producer, Consumer, Consumer group
  - Kõrge läbilaskevõime ja skaleeritavus

---

# 4. Integratsioonimustrid ja -arhitektuurid

---

## Punkt-punkt integratsioon

![Punkt-punkt](https://via.placeholder.com/800x400?text=Punkt-punkt+integratsioon)

- **Otsene ühendus** - süsteemid suhtlevad otse üksteisega
- **Kohandatud liidesed** - iga ühendus on spetsiaalselt loodud
- **Eelised**: lihtsus, jõudlus, kontroll
- **Puudused**: halva skaleeritavusega, keeruline haldamine

---

## Teenusele orienteeritud arhitektuur (SOA)

![SOA](https://via.placeholder.com/800x400?text=SOA)

- **Standardiseeritud teenuslepingud**
- **Lõdvalt seotud teenused**
- **Teenuste abstraktsioon ja taaskasutatavus**
- **Komponendid**:
  - Teenused
  - Teenuste register
  - Teenuste siin (ESB)
  - Äriprotsesside orkestratsioon

---

## Mikroteenuste arhitektuur

![Mikroteenused](https://via.placeholder.com/800x400?text=Mikroteenused)

- **Ühe vastutuse printsiip** - iga teenus vastutab ühe funktsionaalsuse eest
- **Iseseisvalt juurutatavad** - teenuseid saab arendada ja juurutada sõltumatult
- **Detsentraliseeritud andmehaldus** - iga teenus haldab oma andmeid
- **Erinevused SOA-st**: teenuste suurus, andmehaldus, kommunikatsioon, juurutamine

---

## API-gateway ja API haldus

![API Gateway](https://via.placeholder.com/800x400?text=API+Gateway)

- **API-gateway funktsioonid**:
  - Päringute marsruutimine
  - Autentimine ja autoriseerimine
  - Koormuse tasakaalustamine
  - Puhverdamine
  - Protokollide teisendamine
  - Monitooring ja analüütika

- **API haldus**: API elutsükli haldamine

---

## Sündmuspõhine arhitektuur

![Event-Driven](https://via.placeholder.com/800x400?text=Sündmuspõhine+arhitektuur)

- **Sündmused** - teated süsteemis toimunud muutustest
- **Sündmuste tootjad ja tarbijad**
- **Sündmuste vahendaja ja hoidla**
- **Mustrid**:
  - Publish-Subscribe
  - Event Sourcing
  - CQRS
  - Sündmuste töötlemine

---

## Andmete integratsioon ja ETL

![ETL](https://via.placeholder.com/800x400?text=ETL)

- **Extract (Väljavõte)** - andmete kogumine erinevatest allikatest
- **Transform (Teisendamine)** - andmete puhastamine ja teisendamine
- **Load (Laadimine)** - töödeldud andmete laadimine sihtkoha süsteemi
- **ETL vs ELT**: töötlemine enne või pärast laadimist

---

# 5. Turvaaspektid programmide vahelises suhtluses

---

## Autentimine ja autoriseerimine

![Auth](https://via.placeholder.com/800x400?text=Autentimine+ja+autoriseerimine)

- **Autentimine**: kasutaja või süsteemi identiteedi kinnitamine
  - Kasutajanimi ja parool
  - API võtmed
  - Sertifikaadipõhine
  - JWT (JSON Web Tokens)
  - Mitmefaktoriline (MFA)

- **Autoriseerimine**: määrab, millised toimingud on lubatud
  - RBAC (rollidel põhinev)
  - ABAC (atribuutidel põhinev)
  - ACL (pääsuloendid)

---

## API võtmed ja OAuth

![OAuth](https://via.placeholder.com/800x400?text=OAuth)

- **API võtmed**:
  - Lihtsad staatilised identifikaatorid
  - Piiratud turvalisus
  - Jõudluse jälgimine ja kasutuspiirangud

- **OAuth 2.0**:
  - Autoriseerimiskoodi voog
  - Implitsiitne voog
  - Ressursiomaniku parooli mandaatide voog
  - Kliendi mandaatide voog

---

## Andmete krüpteerimine

![Encryption](https://via.placeholder.com/800x400?text=Andmete+krüpteerimine)

- **Transpordikihi turvalisus**: TLS/SSL, HTTPS
- **Andmete krüpteerimine talletamisel**:
  - Sümmeetriline: AES, 3DES
  - Asümmeetriline: RSA, ECC
  - Räsifunktsioonid: SHA-256, HMAC
- **Võtmehaldus**: genereerimine, säilitamine, roteerumine, taastamine

---

## Turvalisuse parimad praktikad

- **Disaini parimad praktikad**:
  - Turvalisus disaini osana
  - Vähimate õiguste printsiip
  - Kaitse sügavuti
  - Vaikimisi turvaline

- **Implementatsiooni parimad praktikad**:
  - Sisendi valideerimine
  - Väljundi kodeerimine
  - Turvalised krüptograafilised algoritmid
  - Turvavigade käsitlemine

---

## Levinud turvaohud

- **Süstimisrünnakud** (Injection)
- **Autentimise nõrkused**
- **Tundlike andmete paljastamine**
- **XML välised üksused (XXE)**
- **Puudulik juurdepääsukontroll**
- **Turvakonfiguratsiooni vead**
- **Ristisaidi skriptimine (XSS)**
- **Ebaturvaline deserialiseerimine**

---

# 6. Kaasaegsed trendid ja tehnoloogiad

---

## Pilvepõhised integratsiooniteenused

![iPaaS](https://via.placeholder.com/800x400?text=iPaaS)

- **iPaaS** (Integration Platform as a Service)
- **Valmis konnektorid** populaarsete rakenduste ja teenustega
- **Visuaalsed töövood** integratsioonide loomiseks
- **Skaleeritavus** ja **monitooring**
- **Näited**: MuleSoft, Dell Boomi, Microsoft Azure Integration Services

---

## Serverless arhitektuur

![Serverless](https://via.placeholder.com/800x400?text=Serverless)

- **Funktsioonipõhisus** - kood on organiseeritud väikesteks funktsioonideks
- **Sündmuspõhine käivitamine**
- **Automaatne skaleerumine**
- **Kasutuspõhine arveldus**
- **Näited**: AWS Lambda, Azure Functions, Google Cloud Functions

---

## API-first lähenemine

![API-First](https://via.placeholder.com/800x400?text=API-First)

- **API kui toode**
- **Disain enne implementatsiooni**
- **Lepingupõhine arendus**
- **Dokumentatsioon kui prioriteet**
- **API spetsifikatsioonid**: OpenAPI (Swagger), AsyncAPI, GraphQL Schema

---

## GraphQL

![GraphQL](https://via.placeholder.com/800x400?text=GraphQL)

- **Kliendipoolne päringud** - klient määrab täpselt, milliseid andmeid ta vajab
- **Üks endpoint** kõigi päringute jaoks
- **Tüübisüsteem** andmete kirjeldamiseks
- **Hierarhilised päringud** - seotud andmete pärimine ühes päringus
- **Reaalajas uuendused** - sündmuspõhised tellimused

---

## Konteineriseerimine ja orkestreerimine

![Containers](https://via.placeholder.com/800x400?text=Konteineriseerimine)

- **Docker**:
  - Docker Engine, Dockerfile, Image, Container, Registry
  - Järjepidevus, isolatsioon, ressursitõhusus

- **Kubernetes**:
  - Pod, Service, Deployment, Namespace, ConfigMap, Secret
  - Automaatne skaleerumine, iseparanemine, teenuste avastamine

---

## Tulevikutrendid

- **Edge Computing** - töötlemine andmeallika lähedal
- **5G ja uued võrgutehnoloogiad** - suurem kiirus, madalam latents
- **AI ja masinõpe integratsioonides** - intelligentne marsruutimine, anomaaliate tuvastamine
- **Blockchain ja hajutatud süsteemid** - usaldusväärne andmevahetus
- **Kvantarvutus** - mõju krüptograafiale ja andmetöötlusele

---

# 7. Praktilised näited

---

## Praktiline näide 1: REST API kasutamine

```python
import requests
import json

def get_address_by_postal_code(postal_code, country_code="ee"):
    """
    Funktsioon, mis pärib aadressi info postiindeksi põhjal
    """
    url = f"https://api.postit.ee/v1/{country_code}/postalcode/{postal_code}"
    
    # Teeme GET päringu
    response = requests.get(url)
    
    # Kontrollime, kas päring õnnestus
    if response.status_code == 200:
        # Teisendame vastuse JSON formaati
        data = response.json()
        return data
    else:
        print(f"Viga: {response.status_code}")
        return None
```

---

## Praktiline näide 2: Andmevahetuse formaadid

```python
# JSON näide
order_json = json.dumps(order_data, indent=4, ensure_ascii=False)
print(order_json)

# XML näide
def create_xml_manually(order_data):
    """Loob XML-i käsitsi ElementTree abil"""
    # Loome juureelemendi
    root = ET.Element("order")
    
    # Lisame tellimuse ID
    ET.SubElement(root, "order_id").text = order_data["order_id"]
    
    # Lisame kliendi info
    customer = ET.SubElement(root, "customer")
    ET.SubElement(customer, "name").text = order_data["customer"]["name"]
    
    # ... jne
```

---

## Praktiline näide 3: Integratsioonistsenaarium

![Integration](https://via.placeholder.com/800x400?text=Integratsioonistsenaarium)

- E-poe süsteem
- Laosüsteem
- Transpordisüsteem
- Klienditeeninduse süsteem
- Sõnumivahendaja (RabbitMQ)
- Asünkroonne suhtlus

---

## Praktiline näide 4: Rühmatöö

**Stsenaarium: E-kaubanduse tarneahela optimeerimine**

**Ülesanded**:
1. Süsteemide kaardistamine
2. Integratsioonimustrite valimine
3. Tehnoloogiate valimine
4. Arhitektuuri disainimine
5. Implementatsiooni plaan
6. Esitlus

---

# 8. Kokkuvõte ja arutelu

---

## Kokkuvõte

- Arvutiprogrammide vaheline suhtlus on logistika valdkonnas kriitilise tähtsusega
- Erinevad suhtlusprotokolli ja -meetodid sobivad erinevateks olukordadeks
- Integratsioonimustrid aitavad luua skaleeritavaid ja hooldatavaid süsteeme
- Turvalisus peab olema integreeritud algusest peale
- Kaasaegsed trendid liiguvad pilvepõhiste, serverless ja API-first lahenduste suunas

---

## Soovitused edasiseks õppimiseks

- **Raamatud**:
  - "Enterprise Integration Patterns" - Gregor Hohpe, Bobby Woolf
  - "Building Microservices" - Sam Newman
  - "RESTful Web APIs" - Leonard Richardson, Mike Amundsen

- **Veebikursused**:
  - Coursera: "API Design and Fundamentals of Google Cloud's Apigee API Platform"
  - edX: "Introduction to Cloud Computing"
  - Udemy: "Microservices with Spring Boot and Spring Cloud"

---

## Küsimused ja vastused

![Q&A](https://via.placeholder.com/800x400?text=Küsimused+ja+vastused)

---

## Täname tähelepanu eest!

![Täname](https://via.placeholder.com/800x400?text=Täname+tähelepanu+eest!)

Kontakt: [email@example.com](mailto:email@example.com)
