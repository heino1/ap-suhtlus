# Sissejuhatus arvutiprogrammide vahelisse suhtlemisse

## Teema olulisus ettevõtluse valdkonnas

Tänapäeva ettevõtlus on muutunud järjest keerukamaks ja globaalsemaks. Ettevõtted peavad hallata keerulisi tarneahelaid, mis hõlmavad mitmeid osapooli, asukohti ja süsteeme. Sellises keskkonnas on arvutiprogrammide vaheline suhtlus muutunud kriitiliselt oluliseks, võimaldades:

1. **Reaalajas andmevahetus** - Kaupade asukoha, oleku ja liikumise jälgimine kogu tarneahela ulatuses
2. **Protsesside automatiseerimine** - Tellimuste töötlemine, laohaldus ja transpordi planeerimine ilma inimese sekkumiseta
3. **Andmete integreerimine** - Erinevate süsteemide (ERP, WMS, TMS) vaheline sujuv andmevahetus
4. **Otsuste tegemise toetamine** - Andmete kogumine ja analüüsimine optimaalsete otsuste tegemiseks
5. **Klienditeeninduse parandamine** - Täpsed tarneajad ja olekuteated klientidele

Logistika valdkonnas on arvutiprogrammide vaheline suhtlus eriti oluline, kuna see võimaldab luua terviklikke lahendusi, mis ühendavad erinevaid osapooli (tarnijad, tootjad, laod, transpordifirmad, kliendid) ühtsesse inforuumi.

## Arvutiprogrammide vahelise suhtlemise ajalugu ja areng

Arvutiprogrammide vaheline suhtlus on läbinud pika arenguteekonna:

### 1960-1970: Varased algused
- **Failipõhine andmevahetus** - Programmid vahetasid andmeid peamiselt failide kaudu
- **Pakettöötlus** (batch processing) - Andmeid töödeldi kogumitena, mitte reaalajas
- **Suurarvutid** (mainframe) - Tsentraliseeritud andmetöötlus

### 1980-1990: Võrgupõhised lahendused
- **Klient-server arhitektuur** - Andmeid hakati vahetama võrgu kaudu
- **EDI** (Electronic Data Interchange) - Standardiseeritud äridokumentide elektrooniline vahetus
- **RPC** (Remote Procedure Call) - Võimaldas kutsuda protseduure teistest programmidest

### 1990-2000: Interneti ja veebiteenuste algus
- **CORBA** (Common Object Request Broker Architecture) - Platvormist sõltumatu objektide vaheline suhtlus
- **DCOM** (Distributed Component Object Model) - Microsofti lahendus hajussüsteemidele
- **Java RMI** (Remote Method Invocation) - Java-põhine lahendus hajussüsteemidele

### 2000-2010: Veebiteenuste võidukäik
- **XML ja SOAP** - Standardiseeritud andmevahetusformaat ja protokoll
- **WSDL** (Web Services Description Language) - Veebiteenuste kirjeldamise keel
- **REST** (Representational State Transfer) - Lihtsam ja kergem alternatiiv SOAP-ile

### 2010-2020: Mikroteenused ja pilv
- **JSON** - Kergem alternatiiv XML-ile
- **Mikroteenuste arhitektuur** - Rakenduste jagamine väiksemateks, iseseisvalt töötavateks teenusteks
- **Pilveteenused** - Infrastruktuuri, platvormi ja tarkvara pakkumine teenusena
- **Konteineriseerimine** (Docker, Kubernetes) - Rakenduste pakendamine ja haldamine

### 2020-tänapäev: API-majandus ja integratsioonid
- **API-first lähenemine** - Rakenduste disainimine API-de ümber
- **GraphQL** - Kliendipoolne päringukeel API-dele
- **Serverless arhitektuur** - Funktsioonipõhine lähenemine
- **Event-driven arhitektuur** - Sündmustepõhine suhtlus
- **IoT** (Internet of Things) - Seadmete vaheline suhtlus

## Põhimõisted ja terminoloogia

### Üldised mõisted
- **API** (Application Programming Interface) - Rakendusliides, mis võimaldab programmidel omavahel suhelda
- **Protokoll** - Reeglite kogum, mis määratleb, kuidas andmeid vahetatakse
- **Endpoint** - Teenuse või API lõpp-punkt, millega saab ühendust võtta
- **Request/Response** - Päring/Vastus mudel, kus klient saadab päringu ja server vastab
- **Serialiseerimine** - Andmete teisendamine formaati, mida saab edastada või salvestada
- **Deserialiseerimine** - Serialiseeritud andmete teisendamine tagasi objektideks

### Arhitektuurilised mõisted
- **Klient-server mudel** - Arhitektuur, kus kliendid teevad päringuid serveritele
- **Peer-to-peer** - Arhitektuur, kus kõik osapooled on võrdsed ja suhtlevad otse
- **Hajussüsteem** - Süsteem, mille komponendid asuvad erinevates arvutites
- **Mikroteenused** - Arhitektuur, kus rakendus on jagatud väikesteks, iseseisvalt töötavateks teenusteks
- **Monoliit** - Ühtne rakendus, kus kõik komponendid on tihedalt seotud

### Suhtlusmeetodid
- **Sünkroonne suhtlus** - Klient ootab vastust enne jätkamist
- **Asünkroonne suhtlus** - Klient jätkab tööd ilma vastust ootamata
- **Sõnumivahetus** (Messaging) - Suhtlus toimub sõnumite vahetamise teel
- **Streaming** - Andmete pidev voog ühelt osapoolelt teisele
- **Polling** - Regulaarne päringu tegemine uute andmete kontrollimiseks
- **Webhooks** - Sündmuspõhised HTTP-tagasikutsed

### Andmeformaadid
- **JSON** (JavaScript Object Notation) - Kergekaaluline andmevahetusformaat
- **XML** (eXtensible Markup Language) - Märgenduspõhine andmevahetusformaat
- **Protocol Buffers** - Google'i loodud binaarformaat andmete serialiseerimiseks
- **YAML** - Inimloetav andmevahetusformaat
- **CSV** (Comma-Separated Values) - Lihtne tekstipõhine formaat

## Loengu eesmärgid ja õpiväljundid

### Loengu eesmärgid
1. Tutvustada arvutiprogrammide vahelise suhtlemise põhimõtteid ja olulisust ettevõtluses
2. Anda ülevaade erinevatest suhtlusprotokollidest ja -meetoditest
3. Selgitada integratsioonimustrite ja -arhitektuuride põhimõtteid
4. Tutvustada turvaaspekte programmide vahelises suhtluses
5. Pakkuda praktilisi näiteid ja harjutusi reaalsetest ettevõtluse stsenaariumitest

### Õpiväljundid
Pärast loengut on tudeng võimeline:
1. Mõistma arvutiprogrammide vahelise suhtlemise põhimõtteid ja terminoloogiat
2. Eristama erinevaid suhtlusprotokolle ja nende kasutusalasid
3. Analüüsima integratsiooni vajadusi ettevõtluses
4. Hindama erinevate integratsioonilahenduste sobivust konkreetsete äriprobleemide lahendamiseks
5. Kavandama lihtsamaid integratsioonilahendusi äri probleemide lahendamiseks
6. Arvestama turvaaspektidega programmide vahelise suhtluse planeerimisel
