# Praktiline näide 4: Rühmatöö ülesanne - Logistika protsessi automatiseerimine

## Eesmärk
Selle rühmatöö eesmärk on rakendada loengus õpitud teadmisi arvutiprogrammide vahelisest suhtlusest, et lahendada reaalset logistika valdkonna probleemi. Ülesanne aitab tudengitel mõista, kuidas erinevad integratsioonimustrid ja -tehnoloogiad töötavad koos tervikliku lahenduse loomiseks.

## Ülesande kirjeldus
Rühm peab disainima ja kirjeldama logistika protsessi automatiseerimise lahenduse, mis ühendab mitu erinevat süsteemi. Lahendus peab hõlmama vähemalt kolme erinevat süsteemi, mis suhtlevad omavahel, kasutades erinevaid suhtlusprotokolle ja integratsioonimeetodeid.

## Stsenaarium: E-kaubanduse tarneahela optimeerimine

Kujutage ette, et olete logistika konsultandid, kes on palgatud aitama keskmise suurusega e-kaubanduse ettevõtet nende tarneahela optimeerimisel. Ettevõttel on järgmised väljakutsed:

1. Tellimuste töötlemine on aeglane ja vigaderohke
2. Laoseis ei ole reaalajas nähtav, mis põhjustab üle- või alamüüki
3. Tarnete jälgimine on keeruline ja kliendid ei saa täpseid uuendusi
4. Tagastuste töötlemine on manuaalne ja aeganõudev
5. Puudub analüütika, mis aitaks optimeerida laoseisu ja tarneaegu

## Rühmatöö ülesanded

### 1. Süsteemide kaardistamine (20 minutit)
- Identifitseerige kõik süsteemid, mis peaksid olema integreeritud (nt e-pood, laohaldussüsteem, transpordisüsteem, klienditeenindus, raamatupidamine)
- Määratlege iga süsteemi põhifunktsioonid ja andmed, mida need haldavad
- Looge süsteemide kaart, mis näitab, kuidas need peaksid omavahel suhtlema

### 2. Integratsioonimustrite valimine (20 minutit)
- Valige iga süsteemipaari jaoks sobiv integratsioonimuster (nt punkt-punkt, sõnumipõhine, API-põhine, sündmuspõhine)
- Põhjendage oma valikuid, arvestades süsteemide omadusi ja ärivajadusi
- Määratlege, millised andmed liiguvad süsteemide vahel

### 3. Tehnoloogiate valimine (20 minutit)
- Valige konkreetsed tehnoloogiad ja protokollid iga integratsiooni jaoks (nt REST API, SOAP, WebSocket, RabbitMQ, Kafka)
- Põhjendage oma valikuid, arvestades tehnoloogiate eeliseid ja puudusi
- Kirjeldage, kuidas valitud tehnoloogiad toetavad ärivajadusi

### 4. Arhitektuuri disainimine (30 minutit)
- Looge arhitektuuridiagramm, mis näitab kõiki süsteeme, nende vahelisi ühendusi ja andmevooge
- Kirjeldage, kuidas tagatakse süsteemi skaleeritavus, töökindlus ja turvalisus
- Määratlege, kuidas käsitletakse vigu ja erandolukordi

### 5. Implementatsiooni plaan (20 minutit)
- Looge implementatsiooni tegevuskava, mis kirjeldab, millises järjekorras integratsioonid teostatakse
- Määratlege olulisemad verstapostid ja ajakava
- Kirjeldage, kuidas mõõta implementatsiooni edukust

### 6. Esitlus (10 minutit rühma kohta)
- Esitlege oma lahendust teistele rühmadele
- Selgitage oma disainiotsuseid ja põhjendage tehnoloogilisi valikuid
- Vastake küsimustele ja andke tagasisidet teiste rühmade lahendustele

## Nõuded lahendusele

Teie lahendus peab sisaldama vähemalt:

1. **Süsteemide kaart**: Visuaalne esitus kõigist süsteemidest ja nende vahelistest seostest

2. **Integratsioonimustrite kirjeldus**: Iga süsteemipaari jaoks valitud integratsioonimustri kirjeldus ja põhjendus

3. **Tehnoloogiate valik**: Konkreetsed tehnoloogiad ja protokollid, mida kasutatakse, koos põhjendustega

4. **Arhitektuuridiagramm**: Detailne diagramm, mis näitab süsteeme, ühendusi, andmevooge ja komponente

5. **Implementatsiooni plaan**: Tegevuskava integratsioonide teostamiseks

## Hindamiskriteeriumid

Lahendusi hinnatakse järgmiste kriteeriumide alusel:

1. **Terviklikkus**: Kas lahendus katab kõiki ärivajadusi ja probleeme?

2. **Tehnoloogiline sobivus**: Kas valitud tehnoloogiad ja mustrid on sobivad antud probleemi lahendamiseks?

3. **Põhjendatus**: Kas disainiotsused on hästi põhjendatud?

4. **Realistlikkus**: Kas lahendus on realistlik ja teostatav?

5. **Esitlus**: Kui selgelt ja veenvalt on lahendus esitletud?

## Näidislahenduse elemendid

### Näide: Süsteemide kaart

```
+-------------+      +----------------+      +------------------+
|             |      |                |      |                  |
|   E-pood    +----->+ Laohaldus     +----->+ Transpordisüsteem|
|             |      |                |      |                  |
+------+------+      +--------+-------+      +---------+--------+
       |                      |                        |
       |                      |                        |
       v                      v                        v
+------+------+      +--------+-------+      +---------+--------+
|             |      |                |      |                  |
| Kliendi-    |      | Raamatu-       |      | Analüütika-     |
| teenindus   |      | pidamine       |      | süsteem         |
|             |      |                |      |                  |
+-------------+      +----------------+      +------------------+
```

### Näide: Integratsioonimustri kirjeldus

**E-pood → Laohaldus**
- **Muster**: REST API
- **Põhjendus**: E-pood peab saama reaalajas infot laoseisu kohta ja edastama tellimusi. REST API võimaldab lihtsat ja kiiret suhtlust, mis on oluline kliendi ostukogemuse jaoks.
- **Andmevoog**: Tellimuste edastamine, laoseisu päringud

**Laohaldus → Transpordisüsteem**
- **Muster**: Sõnumipõhine (Message Queue)
- **Põhjendus**: Tellimuste komplekteerimine ja transport ei pea toimuma sünkroonselt. Sõnumijärjekord võimaldab süsteemidel töötada sõltumatult ja tagab, et ükski tellimus ei lähe kaduma.
- **Andmevoog**: Komplekteeritud tellimused, tarneinfo

### Näide: Tehnoloogiate valik

**E-pood → Laohaldus**
- **Tehnoloogia**: REST API üle HTTPS
- **Andmeformaat**: JSON
- **Autentimine**: OAuth 2.0
- **Põhjendus**: JSON on kompaktne ja kergesti töödeldav. OAuth 2.0 tagab turvalise juurdepääsu.

**Laohaldus → Transpordisüsteem**
- **Tehnoloogia**: RabbitMQ
- **Sõnumivorming**: AMQP
- **Põhjendus**: RabbitMQ on usaldusväärne sõnumivahendaja, mis tagab sõnumite kohaletoimetamise ka süsteemitõrgete korral.

## Lisaressursid

- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)
- [API Design Patterns](https://www.apiacademy.co/resources/api-design-patterns)
- [Microservices Patterns](https://microservices.io/patterns/index.html)
- [Event-Driven Architecture](https://martinfowler.com/articles/201701-event-driven.html)

## Nõuanded edukaks rühmatööks

1. **Rollide jaotamine**: Määrake rühmas rollid (nt arhitekt, tehnoloogiaekspert, ärianalüütik)

2. **Ajaplaneerimine**: Jälgige aega ja liikuge edasi, kui üks etapp on lõpetatud

3. **Fookus**: Keskenduge kõigepealt põhiprobleemidele ja lisage detaile hiljem

4. **Visuaalne esitus**: Kasutage diagramme ja jooniseid ideede selgitamiseks

5. **Kriitiline mõtlemine**: Analüüsige oma lahenduse tugevusi ja nõrkusi
