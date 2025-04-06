# Arvutiprogrammide vahelise suhtlemise põhimõtted

## Klient-server arhitektuur

Klient-server arhitektuur on üks levinumaid mudeleid arvutiprogrammide vahelises suhtluses. See on fundamentaalne kontseptsioon, millel põhinevad paljud tänapäeva süsteemid, sealhulgas veebiteenused, andmebaasid ja hajussüsteemid.

### Põhimõte
Klient-server arhitektuuris on rollid selgelt jaotatud:
- **Server** - pakub teenuseid, ressursse või funktsionaalsust
- **Klient** - kasutab serveri pakutavaid teenuseid

Suhtlus toimub tavaliselt järgmiselt:
1. Klient algatab ühenduse, saates serverile päringu
2. Server töötleb päringu ja genereerib vastuse
3. Server saadab vastuse kliendile
4. Klient töötleb vastuse

### Eelised
- **Selge rollide jaotus** - vastutus on selgelt jagatud
- **Tsentraliseeritud ressursid** - andmed ja teenused on koondatud
- **Skaleeritavus** - servereid saab lisada vastavalt vajadusele
- **Turvalisus** - ligipääsu saab kontrollida tsentraalselt

### Puudused
- **Üksikpunkti rike** (single point of failure) - serveri tõrge mõjutab kõiki kliente
- **Võrgulatents** - suhtlus võib olla aeglane kaugete klientide puhul
- **Ressursside piiratus** - server võib ülekoormatud saada

### Näide logistika valdkonnast
Logistika ettevõtte keskne tellimuste haldussüsteem (server) suhtleb erinevate klientrakendustega:
- Laotöötajate mobiilirakendused
- Autojuhtide navigatsioonisüsteemid
- Klientide veebiliides tellimuste jälgimiseks
- Partnerite süsteemid automaatseks andmevahetuseks

## Hajussüsteemid

Hajussüsteem on arvutisüsteem, mille komponendid asuvad erinevates arvutites ja suhtlevad omavahel võrgu kaudu, kuid kasutajale näivad ühtse süsteemina.

### Põhiomadused
- **Hajutatus** - komponendid töötavad erinevates arvutites
- **Autonoomsus** - komponendid töötavad iseseisvalt
- **Läbipaistvus** - süsteemi keerukus on kasutaja eest varjatud
- **Skaleeritavus** - süsteemi saab laiendada lisades uusi komponente
- **Tõrkekindlus** - ühe komponendi rike ei põhjusta kogu süsteemi riket

### Väljakutsed
- **Võrguprobleemid** - latents, ebausaldusväärsus, ribalaiuse piirangud
- **Koordineerimine** - komponentide tegevuse sünkroniseerimine
- **Järjepidevus** - andmete järjepidevuse tagamine kõigis komponentides
- **Turvalisus** - hajutatud süsteemi kaitsmine on keerulisem

### Näide logistika valdkonnast
Globaalne logistika ettevõte, mille süsteemid on jaotatud erinevate piirkondade vahel:
- Iga piirkond haldab oma lao- ja transpordisüsteeme
- Keskne süsteem koordineerib globaalseid operatsioone
- Andmed sünkroniseeritakse piirkondade vahel
- Kliendid näevad ühtset vaadet olenemata sellest, millises piirkonnas nende kaup asub

## Sünkroonne vs asünkroonne suhtlus

Arvutiprogrammide vahelises suhtluses on kaks peamist mudelit: sünkroonne ja asünkroonne suhtlus.

### Sünkroonne suhtlus
- **Põhimõte**: Klient saadab päringu ja ootab vastust enne jätkamist
- **Analoogia**: Telefonikõne - mõlemad osapooled on samaaegselt seotud
- **Eelised**:
  - Lihtne mõista ja implementeerida
  - Otsene tagasiside
  - Lihtne veahaldus
- **Puudused**:
  - Blokeerib kliendi, kuni vastus saabub
  - Ressursside raiskamine ootamise ajal
  - Tundlik võrguprobleemide suhtes

### Asünkroonne suhtlus
- **Põhimõte**: Klient saadab päringu ja jätkab tööd ilma vastust ootamata
- **Analoogia**: E-kiri - saatja jätkab tegevust pärast kirja saatmist
- **Eelised**:
  - Parem ressursside kasutus
  - Suurem skaleeritavus
  - Vastupidavus võrguprobleemidele
- **Puudused**:
  - Keerulisem implementeerida
  - Keerulisem veahaldus
  - Võib tekitada keerukaid olekuhalduse probleeme

### Näide logistika valdkonnast
- **Sünkroonne**: Laotöötaja skanneerib toote ja ootab kohest kinnitust, et toode on süsteemis registreeritud
- **Asünkroonne**: Tellimuse esitamine süsteemi, mis töötleb tellimusi järjekorras ja saadab hiljem e-kirja kinnitusega

## Sõnumipõhine suhtlus

Sõnumipõhine suhtlus on asünkroonse suhtluse vorm, kus programmid vahetavad andmeid sõnumite kaudu, kasutades tavaliselt sõnumivahendajat (message broker).

### Põhikomponendid
- **Sõnumid** - andmeüksused, mida vahetatakse
- **Sõnumijärjekorrad** - sõnumite ajutised hoiukohad
- **Tootjad** (producers) - loovad ja saadavad sõnumeid
- **Tarbijad** (consumers) - võtavad vastu ja töötlevad sõnumeid
- **Sõnumivahendaja** - haldab sõnumite liikumist tootjate ja tarbijate vahel

### Sõnumiedastuse mustrid
- **Point-to-Point** - üks sõnum jõuab täpselt ühe tarbijani
- **Publish-Subscribe** - üks sõnum jõuab kõigi huvitatud tarbijateni
- **Request-Reply** - sõnumile oodatakse vastust, kuid asünkroonselt
- **Competing Consumers** - mitu tarbijat konkureerivad sõnumite pärast

### Populaarsed sõnumivahendajad
- **RabbitMQ** - AMQP protokollil põhinev sõnumivahendaja
- **Apache Kafka** - kõrge läbilaskevõimega hajutatud sõnumisüsteem
- **Amazon SQS/SNS** - AWS pilvepõhised sõnumisteenused
- **Azure Service Bus** - Microsoft Azure pilvepõhine sõnumiteenus

### Näide logistika valdkonnast
Tellimuste töötlemise süsteem:
1. Veebipood saadab uue tellimuse sõnumi järjekorda
2. Laosüsteem tarbib sõnumi ja kontrollib toodete saadavust
3. Laosüsteem saadab komplekteerimiskorralduse sõnumi
4. Komplekteerimissüsteem tarbib sõnumi ja algatab komplekteerimisprotsessi
5. Pärast komplekteerimist saadetakse sõnum transpordisüsteemile
6. Transpordisüsteem planeerib tarne ja saadab kliendile teavituse

## Andmete serialiseerimine ja deserialiseerimine

Andmete serialiseerimine on protsess, mille käigus andmestruktuurid või objektid teisendatakse formaati, mida saab salvestada või edastada ja hiljem taastada. Deserialiseerimine on vastupidine protsess.

### Serialiseerimise vajadus
- Programmid töötavad mälus keerukate andmestruktuuridega
- Võrgu kaudu saab edastada ainult baidijada
- Erinevad programmeerimiskeeled kasutavad erinevaid andmestruktuure

### Levinud serialiseerimisformaadid
- **JSON** (JavaScript Object Notation)
  - Inimloetav tekstipõhine formaat
  - Toetab põhilisi andmetüüpe (numbrid, stringid, massiivid, objektid)
  - Laialdaselt toetatud kõigis programmeerimiskeeltes
  - Näide:
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
  - Märgenduspõhine formaat
  - Võimaldab keerukamat struktuuri ja valideerimist (XSD)
  - Veidi mahukam kui JSON
  - Näide:
    ```xml
    <tellimus>
      <tellimus_id>12345</tellimus_id>
      <klient>AS Näidis</klient>
      <tooted>
        <toode>
          <kood>ABC123</kood>
          <kogus>5</kogus>
        </toode>
        <toode>
          <kood>XYZ789</kood>
          <kogus>2</kogus>
        </toode>
      </tooted>
    </tellimus>
    ```

- **Protocol Buffers** (Google)
  - Binaarne formaat, väiksem maht
  - Kiirem töötlemine kui JSON/XML
  - Nõuab skeemi defineerimist
  - Vähem inimloetav

- **Avro** (Apache)
  - Binaarne formaat, toetab skeemide evolutsiooni
  - Populaarne suurandmete töötluses

### Serialiseerimise väljakutsed
- **Versioonihaldus** - kuidas käsitleda skeemi muutusi
- **Ühilduvus** - tagasiühilduvus ja edasiühilduvus
- **Jõudlus** - serialiseerimise ja deserialiseerimise kiirus
- **Turvalisus** - deserialiseerimisega seotud turvaohud

### Näide logistika valdkonnast
Transpordiettevõte ja e-pood vahetavad andmeid:
1. E-pood serialiseerib tellimuse andmed JSON-formaati
2. Andmed saadetakse API kaudu transpordiettevõttele
3. Transpordiettevõte deserialiseerib andmed oma süsteemis
4. Transpordiettevõte serialiseerib tarneinfo XML-formaati
5. Andmed saadetakse tagasi e-poele
6. E-pood deserialiseerib tarneinfo ja kuvab selle kliendile
