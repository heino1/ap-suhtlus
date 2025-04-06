# Integratsioonimustrid ja -arhitektuurid

Integratsioonimustrid ja -arhitektuurid on lähenemisviisid, mis võimaldavad erinevatel süsteemidel omavahel suhelda ja andmeid vahetada. Need mustrid pakuvad lahendusi levinud integratsiooniväljakutsetele ning aitavad luua paindlikke, skaleeritavaid ja hooldatavaid süsteeme.

## Punkt-punkt integratsioon

Punkt-punkt integratsioon (Point-to-Point Integration) on lihtsaim integratsioonimuster, kus süsteemid on otse ühendatud ilma vahendajata.

### Põhiomadused
- **Otsene ühendus** - süsteemid suhtlevad otse üksteisega
- **Kohandatud liidesed** - iga ühendus on tavaliselt spetsiaalselt loodud
- **Tihe sidumine** - süsteemid on tihedalt seotud ja sõltuvad üksteisest

### Eelised
- **Lihtsus** - lihtne mõista ja implementeerida
- **Jõudlus** - vähem vahendajaid tähendab väiksemat latentsi
- **Kontroll** - täielik kontroll iga ühenduse üle

### Puudused
- **Halva skaleeritavusega** - ühenduste arv kasvab eksponentsiaalselt süsteemide arvu kasvades (n*(n-1)/2)
- **Keeruline haldamine** - iga ühendus võib nõuda erinevat tehnoloogiat ja protokolli
- **Muudatuste mõju** - ühe süsteemi muutmine võib mõjutada kõiki sellega ühendatud süsteeme

### Näide logistika valdkonnast
Väike logistikaettevõte, kus:
- Tellimuste haldussüsteem on otse ühendatud laosüsteemiga
- Laosüsteem on otse ühendatud transpordisüsteemiga
- Transpordisüsteem on otse ühendatud arveldussüsteemiga
- Iga uue süsteemi lisamisel tuleb luua uued ühendused kõigi olemasolevate süsteemidega

## Teenusele orienteeritud arhitektuur (SOA)

Teenusele orienteeritud arhitektuur (Service-Oriented Architecture, SOA) on disainimuster, kus rakenduse komponendid pakuvad teenuseid teistele komponentidele läbi suhtlusprotokolli võrgu kaudu.

### Põhiprintsiibid
- **Standardiseeritud teenuslepingud** - teenused järgivad standardseid suhtlusprotokolle
- **Lõdvalt seotud teenused** - teenused on sõltumatud ja suhtlevad standardsete liideste kaudu
- **Teenuste abstraktsioon** - teenused varjavad oma sisemist loogikat
- **Teenuste taaskasutatavus** - teenused on disainitud taaskasutamiseks
- **Teenuste autonoomsus** - teenused kontrollivad oma keskkonda ja ressursse
- **Teenuste olekuta olek** - teenused minimeerivad olekuteabe säilitamist

### Komponendid
- **Teenused** - ärifunktsionaalsust pakkuvad komponendid
- **Teenuste register** - kataloog saadaolevatest teenustest
- **Teenuste siini** (Enterprise Service Bus, ESB) - vahendaja teenuste vahel
- **Äriprotsesside orkestratsioon** - teenuste koordineerimine äriprotsesside täitmiseks

### Eelised
- **Paindlikkus** - teenuseid saab kombineerida uute äriprotsesside loomiseks
- **Taaskasutatavus** - teenuseid saab kasutada erinevates rakendustes
- **Skaleeritavus** - teenuseid saab skaleerida sõltumatult
- **Tehnoloogiline sõltumatus** - teenused võivad kasutada erinevaid tehnoloogiaid

### Puudused
- **Keerukus** - SOA arhitektuuri loomine ja haldamine võib olla keeruline
- **Jõudlus** - vahendajad võivad põhjustada täiendavat latentsi
- **Halduskoormus** - nõuab head juhtimist ja haldust

### Näide logistika valdkonnast
Logistikaettevõte, kus on järgmised teenused:
- **Klienditeenindus** - klientide ja tellimuste haldamine
- **Laoteenus** - laosaldode ja komplekteerimise haldamine
- **Transporditeenused** - marsruutide planeerimine ja sõidukite haldamine
- **Arveldus** - arvete ja maksete haldamine

Kõik teenused suhtlevad läbi ESB, mis võimaldab:
- Sõnumite marsruutimist
- Protokollide teisendamist
- Andmete transformeerimist
- Sündmuste haldamist

## Mikroteenuste arhitektuur

Mikroteenuste arhitektuur on SOA edasiarendus, kus rakendus on jagatud väikesteks, iseseisvalt töötavateks teenusteks, mis suhtlevad omavahel kergekaaluliste mehhanismide kaudu.

### Põhiprintsiibid
- **Ühe vastutuse printsiip** - iga teenus vastutab ühe konkreetse funktsionaalsuse eest
- **Iseseisvalt juurutatavad** - teenuseid saab arendada, juurutada ja skaleerida sõltumatult
- **Detsentraliseeritud andmehaldus** - iga teenus haldab oma andmeid
- **Automatiseeritud juurutamine** - CI/CD (pidev integratsioon ja juurutamine)
- **Tõrkekindlus** - ühe teenuse tõrge ei põhjusta kogu süsteemi riket

### Erinevused SOA-st
- **Teenuste suurus** - mikroteenused on väiksemad ja fokuseeritumad
- **Andmehaldus** - iga mikroteenus haldab oma andmebaasi
- **Kommunikatsioon** - eelistatakse lihtsamaid protokolle (HTTP/REST, gRPC)
- **Juurutamine** - konteinerites (Docker) ja orkestraatorites (Kubernetes)

### Eelised
- **Agiilsus** - kiirem arendus ja juurutamine
- **Skaleeritavus** - teenuseid saab skaleerida vastavalt vajadusele
- **Tehnoloogiline mitmekesisus** - erinevad teenused võivad kasutada erinevaid tehnoloogiaid
- **Tõrkekindlus** - isoleeritud tõrked

### Puudused
- **Hajutatud süsteemi keerukus** - hajutatud süsteemide haldamine on keeruline
- **Andmete järjepidevus** - keeruline tagada andmete järjepidevust mitme teenuse vahel
- **Testimise keerukus** - end-to-end testimine on keerulisem
- **Võrgu latents** - teenustevaheline suhtlus võib põhjustada latentsi

### Näide logistika valdkonnast
Logistikaettevõtte mikroteenuste arhitektuur:
- **Tellimusteenus** - tellimuste vastuvõtmine ja haldamine
- **Klienditeenindus** - klientide andmete haldamine
- **Laoteenus** - laosaldode haldamine
- **Komplekteerimisteenus** - tellimuste komplekteerimine
- **Marsruuditeenus** - optimaalsete marsruutide arvutamine
- **Sõidukiteenus** - sõidukite haldamine ja jälgimine
- **Teavitusteenus** - klientide teavitamine
- **Arveldus** - arvete genereerimine ja maksete haldamine

Iga teenus:
- Töötab oma konteineris
- Haldab oma andmebaasi
- Suhtleb teiste teenustega REST API või sõnumivahendaja kaudu
- Saab skaleerida sõltumatult vastavalt koormusele

## API-gateway ja API haldus

API-gateway on vahendaja, mis toimib ühtse sisenemispunktina kõigile API päringutele, pakkudes lisafunktsionaalsust nagu autentimine, marsruutimine ja koormuse tasakaalustamine.

### API-gateway funktsioonid
- **Päringute marsruutimine** - suunab päringud õigetele mikroteenustele
- **Autentimine ja autoriseerimine** - kontrollib kasutaja õigusi
- **Koormuse tasakaalustamine** - jaotab koormust teenuste vahel
- **Puhverdamine** - vähendab päringute arvu tagantsüsteemidele
- **Protokollide teisendamine** - võimaldab erinevate protokollide kasutamist
- **Monitooring ja analüütika** - jälgib API kasutust
- **Päringu/vastuse transformeerimine** - muudab andmete formaati

### API haldus
API haldus (API Management) on laiem kontseptsioon, mis hõlmab API elutsükli haldamist:
- **API disain ja dokumentatsioon** - API spetsifikatsioonid (OpenAPI/Swagger)
- **API avaldamine ja propageerimine** - API portaalid ja kataloogid
- **API turvalisus** - autentimine, autoriseerimine, ründekaitse
- **API jõudluse jälgimine** - latents, läbilaskevõime, veamäärad
- **API kasutuse analüütika** - kes, millal ja kuidas API-sid kasutab
- **API versioonimine** - API-de elutsükli haldamine
- **API kasutuspiirangud** - päringute arvu piiramine (rate limiting)

### Populaarsed API-gateway ja halduse lahendused
- **Kong** - avatud lähtekoodiga API-gateway
- **Amazon API Gateway** - AWS pilvepõhine lahendus
- **Azure API Management** - Microsoft Azure lahendus
- **Apigee** - Google Cloud lahendus
- **MuleSoft** - Salesforce'i API haldusplatvorm

### Näide logistika valdkonnast
Logistikaettevõtte API-gateway:
- **Välised API-d** - klientidele ja partneritele
  - Tellimuste loomine ja jälgimine
  - Hinnapäringud
  - Saadetiste oleku päringud
- **Sisemised API-d** - ettevõtte süsteemidele
  - Laohaldus
  - Transpordiplaneerimine
  - Personalihaldus

API-gateway funktsioonid:
- Autendib kliendid API võtmete või OAuth abil
- Suunab päringud vastavatele mikroteenustele
- Piirab päringute arvu vastavalt kliendi lepingule
- Teisendab andmeid kliendile sobivasse formaati
- Jälgib API kasutust ja jõudlust

## Sündmuspõhine arhitektuur

Sündmuspõhine arhitektuur (Event-Driven Architecture, EDA) on disainimuster, kus süsteemi komponendid suhtlevad omavahel sündmuste kaudu, mitte otseste päringute kaudu.

### Põhikomponendid
- **Sündmused** - teated, mis kirjeldavad süsteemis toimunud muutusi
- **Sündmuste tootjad** - komponendid, mis genereerivad sündmusi
- **Sündmuste tarbijad** - komponendid, mis reageerivad sündmustele
- **Sündmuste vahendaja** - komponent, mis edastab sündmusi tootjatelt tarbijatele
- **Sündmuste hoidla** - sündmuste salvestamine hilisemaks töötlemiseks

### Sündmuspõhise arhitektuuri mustrid
- **Publish-Subscribe** - tootjad avaldavad sündmusi, tarbijad tellivad neid
- **Event Sourcing** - süsteemi oleku salvestamine sündmuste jadana
- **CQRS** (Command Query Responsibility Segregation) - käskude ja päringute eraldamine
- **Sündmuste töötlemine** (Event Processing) - sündmuste analüüsimine ja töötlemine

### Eelised
- **Lõdvalt seotud komponendid** - komponendid ei tea üksteisest
- **Skaleeritavus** - komponente saab skaleerida sõltumatult
- **Reaktiivsus** - süsteem reageerib sündmustele reaalajas
- **Ajaline detsentraliseerimine** - komponendid ei pea töötama samaaegselt

### Puudused
- **Keerukus** - sündmuste jälgimine ja silumine võib olla keeruline
- **Järjepidevus** - võib esineda ajutist andmete ebajärjepidevust
- **Sündmuste järjekord** - sündmuste järjekorra tagamine võib olla väljakutse

### Näide logistika valdkonnast
Logistikaettevõtte sündmuspõhine süsteem:

**Sündmused**:
- `TellimusLoodud` - uus tellimus on loodud
- `TellimusKinnitatud` - tellimus on kinnitatud
- `ToodetPuudub` - tellitud toode on laost otsas
- `KomplekteerimineAlustatud` - tellimuse komplekteerimine on alanud
- `KomplekteerimineLõpetatud` - tellimus on komplekteeritud
- `SaadetisLoodud` - saadetis on loodud
- `SaadetisVäljastatud` - saadetis on laost väljastatud
- `SaadetisKohaleToimetatud` - saadetis on kliendile kohale toimetatud

**Tööprotsess**:
1. Veebipood avaldab `TellimusLoodud` sündmuse
2. Laosüsteem tarbib sündmuse ja kontrollib toodete saadavust
   - Kui tooted on saadaval, avaldab `TellimusKinnitatud` sündmuse
   - Kui mõni toode puudub, avaldab `ToodetPuudub` sündmuse
3. Komplekteerimissüsteem tarbib `TellimusKinnitatud` sündmuse ja alustab komplekteerimist
4. Pärast komplekteerimist avaldab `KomplekteerimineLõpetatud` sündmuse
5. Transpordisüsteem tarbib sündmuse ja loob saadetise
6. Klienditeenindus tarbib kõiki sündmusi, et jälgida tellimuse olekut ja teavitada klienti

## Andmete integratsioon ja ETL protsessid

Andmete integratsioon on protsess, mille käigus andmed erinevatest allikatest kombineeritakse, et pakkuda kasutajatele ühtset vaadet. ETL (Extract, Transform, Load) on üks levinumaid andmete integratsiooni meetodeid.

### ETL protsess
- **Extract (Väljavõte)** - andmete kogumine erinevatest allikatest
- **Transform (Teisendamine)** - andmete puhastamine, normaliseerimine ja teisendamine
- **Load (Laadimine)** - töödeldud andmete laadimine sihtkoha süsteemi

### ETL vs ELT
- **ETL** - andmeid töödeldakse enne laadimist
- **ELT** (Extract, Load, Transform) - andmed laaditakse esmalt ja töödeldakse seejärel sihtkohas
  - Sobib suurandmete ja pilvepõhiste andmeladustega
  - Võimaldab paindlikumat andmeanalüüsi

### Andmete integratsiooni meetodid
- **Perioodiline ETL** - andmeid töödeldakse regulaarsete ajavahemike järel
- **Reaalajas integratsioon** - andmeid töödeldakse kohe pärast nende tekkimist
- **Andmete virtualiseerimine** - andmeid ei kopeerita, vaid päritakse otse allikatest
- **Andmete replikatsioon** - andmete kopeerimine ühest süsteemist teise

### Andmete integratsiooni väljakutsed
- **Andmekvaliteet** - ebatäielikud, ebatäpsed või vastuolulised andmed
- **Andmete heterogeensus** - erinevad formaadid ja struktuurid
- **Skaleeritavus** - suurte andmemahtude töötlemine
- **Jõudlus** - andmete töötlemise kiirus
- **Turvalisus** - tundlike andmete kaitsmine

### Näide logistika valdkonnast
Logistikaettevõtte andmete integratsioon:

**Andmeallikad**:
- Tellimuste haldussüsteem
- Laohaldussüsteem
- Transpordihaldussüsteem
- GPS jälgimisseadmed
- Kliendisuhete haldussüsteem (CRM)
- Raamatupidamissüsteem

**ETL protsess**:
1. **Extract**: Andmete kogumine kõigist allikatest
   - Tellimuste andmed tellimuste süsteemist
   - Laosaldod laosüsteemist
   - Sõidukite asukohad GPS süsteemist
   - Klientide andmed CRM-ist

2. **Transform**: Andmete puhastamine ja teisendamine
   - Aadresside standardiseerimine
   - Duplikaatide eemaldamine
   - Andmete rikastamine (nt geokodeerimine)
   - Arvutused (nt tarneaeg, kulude jaotus)

3. **Load**: Andmete laadimine andmelattu
   - Struktureeritud andmeladu ärianalüüsiks
   - Andmete organiseerimine dimensioonide ja faktide järgi

**Analüütika ja aruandlus**:
- Tarneahela jõudluse mõõdikud
- Kulude analüüs
- Klientide rahulolu analüüs
- Prognoosiv analüütika tulevaste vajaduste ennustamiseks
