# Turvaaspektid programmide vahelises suhtluses

Programmide vahelise suhtluse turvalisus on kriitilise tähtsusega, eriti logistika valdkonnas, kus liigub tundlikku äri- ja kliendiinfot. Turvalisuse tagamine on mitmetahuline väljakutse, mis hõlmab erinevaid meetodeid ja tehnoloogiaid.

## Autentimine ja autoriseerimine

Autentimine ja autoriseerimine on kaks peamist turvamehhanismi, mis kontrollivad juurdepääsu süsteemidele ja andmetele.

### Autentimine
Autentimine on protsess, mis kinnitab, et kasutaja või süsteem on see, kellena ta end esitleb.

#### Autentimismeetodid
- **Kasutajanimi ja parool** - traditsiooniline, kuid mitte kõige turvalisem meetod
- **API võtmed** - staatilised võtmed, mis identifitseerivad API kasutajat
- **Sertifikaadipõhine autentimine** - kasutab digitaalseid sertifikaate (X.509)
- **JWT (JSON Web Tokens)** - allkirjastatud tokenid, mis sisaldavad kasutaja identiteeti ja metaandmeid
- **Mitmefaktoriline autentimine (MFA)** - kombineerib mitut autentimismeetodit

#### Autentimise väljakutsed
- **Võtmete haldamine** - API võtmete ja sertifikaatide turvaline hoidmine
- **Paroolide turvalisus** - tugevate paroolide tagamine
- **Skaleeritavus** - autentimissüsteemi skaleeritavus suure kasutajate arvuga

### Autoriseerimine
Autoriseerimine määrab, millised toimingud on autenditud kasutajal või süsteemil lubatud teha.

#### Autoriseerimismeetodid
- **Rollidel põhinev juurdepääsukontroll (RBAC)** - õigused on seotud rollidega
- **Atribuutidel põhinev juurdepääsukontroll (ABAC)** - õigused põhinevad erinevatel atribuutidel
- **Pääsuloendid (ACL)** - määravad, millised kasutajad pääsevad ligi konkreetsetele ressurssidele
- **OAuth skoop** - määrab, millised toimingud on lubatud OAuth tokeni abil

#### Autoriseerimise väljakutsed
- **Granulaarsustasakaal** - liiga üldine vs liiga detailne juurdepääsukontroll
- **Õiguste haldamine** - õiguste haldamine suure kasutajate arvuga
- **Kontekstipõhine autoriseerimine** - juurdepääsu piiramine vastavalt kontekstile (aeg, asukoht)

### Näide logistika valdkonnast
Logistikaettevõtte API turvamine:
- **Autentimine**:
  - Partnerid autentivad end OAuth 2.0 kliendi mandaatide vooga
  - Sisemised süsteemid kasutavad sertifikaadipõhist autentimist
  - Mobiilirakendused kasutavad JWT tokeneid
- **Autoriseerimine**:
  - Kliendid näevad ainult oma tellimusi
  - Laotöötajad pääsevad ligi ainult oma lao andmetele
  - Transpordijuhid näevad ainult oma piirkonna sõidukeid
  - Administraatorid pääsevad ligi kõigile andmetele, kuid tundlikud toimingud nõuavad täiendavat kinnitust

## API võtmed ja OAuth

API võtmed ja OAuth on kaks levinud mehhanismi API-de turvamiseks, kuid neil on erinevad kasutusalad ja turvatasemed.

### API võtmed
API võtmed on lihtsad staatilised identifikaatorid, mis võimaldavad API-le juurdepääsu.

#### Omadused
- **Lihtsus** - lihtne implementeerida ja kasutada
- **Staatiline** - võti ei muutu aja jooksul
- **Identifitseerimine** - identifitseerib API kasutaja
- **Piiratud turvalisus** - ei paku kõrgetasemelist turvalisust

#### Kasutamine
- **Päringutes** - võtmeid saab edastada URL-is, päises või küpsistes
- **Jõudluse jälgimine** - võimaldab jälgida API kasutust
- **Kasutuspiirangud** - võimaldab piirata päringute arvu

#### Puudused
- **Turvalisus** - võtmed võivad lekkida või neid võidakse varastada
- **Granulaarsustasakaal** - ei võimalda detailset juurdepääsukontrolli
- **Kasutaja kontekst** - ei sisalda infot lõppkasutaja kohta

### OAuth 2.0
OAuth 2.0 on avatud standard autoriseerimiseks, mis võimaldab kolmandatel osapooltel pääseda ligi kasutaja ressurssidele ilma kasutaja mandaate jagamata.

#### Põhivood
- **Autoriseerimiskoodi voog** - veebirakendustele
- **Implitsiitne voog** - ühelehekülje rakendustele (SPA)
- **Ressursiomaniku parooli mandaatide voog** - usaldusväärsetele rakendustele
- **Kliendi mandaatide voog** - süsteemidevaheliseks suhtluseks

#### Komponendid
- **Ressursiomanik** - kasutaja, kes omab ressursse
- **Klient** - rakendus, mis soovib ressurssidele ligi pääseda
- **Autoriseerimisserver** - väljastab juurdepääsutokeneid
- **Ressursiserver** - hoiab kaitstud ressursse

#### Eelised
- **Delegeeritud juurdepääs** - võimaldab juurdepääsu ilma mandaate jagamata
- **Piiratud skoop** - juurdepääs ainult konkreetsetele ressurssidele
- **Tokenipõhine** - lühiajalised tokenid vähendavad riske
- **Standardiseeritud** - laialdaselt toetatud

#### Väljakutsed
- **Keerukus** - keerulisem implementeerida kui API võtmeid
- **Tokenihaldus** - tokenite elutsükli haldamine
- **Turvalisus** - nõuab hoolikat implementeerimist

### Näide logistika valdkonnast
Logistikaettevõtte API turvamine:
- **API võtmed**:
  - Kasutatakse lihtsate avalike API-de jaoks (nt saadetise jälgimine)
  - Võimaldavad jälgida ja piirata API kasutust
- **OAuth 2.0**:
  - Kasutatakse tundlikumate API-de jaoks (nt tellimuste haldamine)
  - Partnerid kasutavad kliendi mandaatide voogu
  - Mobiilirakendused kasutavad autoriseerimiskoodi voogu
  - Tokenid kehtivad piiratud aja ja piiratud skoobiga

## Andmete krüpteerimine

Andmete krüpteerimine on protsess, mille käigus andmed muudetakse loetamatuks kõigile peale volitatud osapoolte.

### Krüpteerimise tüübid
- **Transpordikihi krüpteerimine** - andmete kaitsmine edastamise ajal
- **Talletuskihi krüpteerimine** - andmete kaitsmine salvestamise ajal
- **End-to-end krüpteerimine** - andmete kaitsmine kogu elutsükli jooksul

### Transpordikihi turvalisus
- **TLS/SSL** - krüpteerib andmed võrgu kaudu edastamise ajal
- **HTTPS** - HTTP protokoll TLS/SSL-iga
- **Sertifikaadid** - kinnitavad serveri identiteeti
- **Sertifitseerimiskeskused (CA)** - väljastavad ja kinnitavad sertifikaate

### Andmete krüpteerimine talletamisel
- **Sümmeetriline krüpteerimine** - sama võti krüpteerimiseks ja dekrüpteerimiseks
  - AES (Advanced Encryption Standard)
  - 3DES (Triple Data Encryption Standard)
- **Asümmeetriline krüpteerimine** - erinevad võtmed krüpteerimiseks ja dekrüpteerimiseks
  - RSA (Rivest-Shamir-Adleman)
  - ECC (Elliptic Curve Cryptography)
- **Räsifunktsioonid** - ühepoolsed funktsioonid andmete tervikluse kontrollimiseks
  - SHA-256, SHA-3
  - HMAC (Hash-based Message Authentication Code)

### Võtmehaldus
- **Võtmete genereerimine** - turvaliselt genereeritud juhuslikud võtmed
- **Võtmete säilitamine** - turvaline võtmete hoiustamine
- **Võtmete roteerumine** - võtmete regulaarne uuendamine
- **Võtmete taastamine** - protseduurid kadunud võtmete taastamiseks

### Näide logistika valdkonnast
Logistikaettevõtte andmete krüpteerimine:
- **Transpordikihi krüpteerimine**:
  - Kõik API-d kasutavad HTTPS-i
  - Mobiilirakendused kontrollivad sertifikaatide kehtivust
- **Andmete krüpteerimine talletamisel**:
  - Klientide isikuandmed on krüpteeritud AES-256 algoritmiga
  - Krediitkaardi andmed on tokeniseeritud
  - Paroolid on salvestatud räsituna (bcrypt)
- **Võtmehaldus**:
  - Krüptovõtmeid hoitakse eraldi turvalises võtmehaldussüsteemis
  - Võtmeid roteeritakse iga 90 päeva järel
  - Juurdepääs võtmetele on rangelt piiratud

## Turvalisuse parimad praktikad

Programmide vahelise suhtluse turvalisuse tagamiseks on oluline järgida parimaid praktikaid.

### Disaini parimad praktikad
- **Turvalisus disaini osana** - turvalisus peab olema integreeritud algusest peale
- **Vähimate õiguste printsiip** - anda ainult minimaalsed vajalikud õigused
- **Kaitse sügavuti** - kasutada mitut kaitsekihti
- **Vaikimisi turvaline** - süsteemid peavad olema vaikimisi turvalised
- **Avatud disain** - turvalisus ei tohi sõltuda disaini saladuses hoidmisest

### Implementatsiooni parimad praktikad
- **Sisendi valideerimine** - kontrollida kõiki sisendandmeid
- **Väljundi kodeerimine** - vältida XSS ja süstimisrünnakuid
- **Turvalised krüptograafilised algoritmid** - kasutada standardseid, testitud algoritme
- **Turvavigade käsitlemine** - vältida tundliku info leket veateadetes
- **Logide haldamine** - logida turvalisuse seisukohalt olulised sündmused

### Operatsioonilised parimad praktikad
- **Regulaarsed turvaauditid** - süsteemide regulaarne kontrollimine
- **Turvapaigad** - hoida tarkvara ajakohasena
- **Monitooring ja tuvastamine** - jälgida ebatavalisi tegevusi
- **Intsidentide haldus** - protseduurid turvaintsidentide käsitlemiseks
- **Taasteplaan** - protseduurid süsteemide taastamiseks pärast rünnakut

### API turvalisuse parimad praktikad
- **Kasutuspiirangud** - piirata API päringute arvu (rate limiting)
- **API versioonihaldus** - hallata API versioone turvaliselt
- **Dokumentatsioon** - dokumenteerida turvamehhanismid
- **API gateway** - kasutada API gateway-d turvakihi lisamiseks
- **Monitooring** - jälgida API kasutust anomaaliate tuvastamiseks

### Näide logistika valdkonnast
Logistikaettevõtte turvalisuse parimad praktikad:
- **Disain**:
  - Tundlikud andmed (nt klientide aadressid) on eraldatud üldistest andmetest
  - Juurdepääs on piiratud vastavalt rollile ja vajadusele
- **Implementatsioon**:
  - Kõik API sisendid valideeritakse rangelt
  - Paroolid salvestatakse turvaliselt räsituna
  - Tundlikud andmed krüpteeritakse
- **Operatsioonid**:
  - Süsteeme auditeeritakse regulaarselt
  - Turvapaigad paigaldatakse kiiresti
  - Kahtlaste tegevuste monitooring on pidev
- **API turvalisus**:
  - API päringute arv on piiratud kliendi kohta
  - API kasutust jälgitakse anomaaliate tuvastamiseks
  - API gateway kontrollib kõiki päringuid

## Levinud turvaohud ja nende vältimine

Programmide vahelises suhtluses on mitmeid levinud turvaohtusid, mida tuleb teada ja osata vältida.

### Levinud turvaohud
- **Süstimisrünnakud** (Injection)
  - SQL süstimine
  - NoSQL süstimine
  - OS käsu süstimine
  - LDAP süstimine
- **Autentimise nõrkused**
  - Nõrgad paroolid
  - Seansi kaaperdamine
  - Kredentsiaalide leke
- **Tundlike andmete paljastamine**
  - Krüpteerimata andmete edastamine
  - Tundlike andmete salvestamine lihttekstina
- **XML välised üksused (XXE)**
  - XML töötlejate haavatavused
- **Puudulik juurdepääsukontroll**
  - Horisontaalne õiguste eskaleerumine
  - Vertikaalne õiguste eskaleerumine
- **Turvakonfiguratsiooni vead**
  - Vaikeväärtuste kasutamine
  - Ebaturvalised seadistused
- **Ristisaidi skriptimine (XSS)**
  - Salvestatud XSS
  - Peegeldatud XSS
  - DOM-põhine XSS
- **Ebaturvaline deserialiseerimine**
  - Kaugjuhitav koodi täitmine
  - Andmete manipuleerimine
- **Teadaolevate haavatavustega komponentide kasutamine**
  - Vananenud teegid
  - Paigata haavatavused
- **Ebapiisav logimine ja monitooring**
  - Rünnakute tuvastamise puudumine
  - Aeglane reageerimine intsidentidele

### Kaitsemeetmed
- **Süstimisrünnakute vastu**:
  - Parameetrite sidumine (prepared statements)
  - ORM-id (Object-Relational Mapping)
  - Sisendi valideerimine
- **Autentimise turvamine**:
  - Tugevad paroolid ja MFA
  - Turvaline seansi haldus
  - Kredentsiaalide turvaline hoiustamine
- **Tundlike andmete kaitsmine**:
  - Krüpteerimine transpordil ja talletamisel
  - Tundlike andmete minimaalne säilitamine
- **XXE vastu**:
  - XML töötlejate turvaseadistused
  - Lihtsamate andmeformaatide kasutamine (JSON)
- **Juurdepääsukontrolli tugevdamine**:
  - Vähimate õiguste printsiip
  - Juurdepääsukontrolli rakendamine serveripoolel
- **Turvakonfiguratsiooni parandamine**:
  - Turvalised vaikeväärtused
  - Minimaalse funktsionaalsusega serverid
- **XSS vastu**:
  - Väljundi kodeerimine
  - Content Security Policy (CSP)
  - Modernse raamistiku kasutamine
- **Deserialiseerimine**:
  - Deserialiseerimine ainult usaldusväärsetest allikatest
  - Tüübikontroll ja valideerimine
- **Komponentide haldus**:
  - Regulaarne komponentide audit
  - Automaatne haavatavuste skaneerimine
- **Logimine ja monitooring**:
  - Keskne logisüsteem
  - Reaalajas monitooring ja hoiatused
  - Intsidentide haldusplaan

### Näide logistika valdkonnast
Logistikaettevõtte turvaohtude vältimine:
- **Süstimisrünnakud**:
  - Kõik SQL päringud kasutavad parameetrite sidumist
  - Aadresside otsing valideerib sisendi enne päringut
- **Autentimine**:
  - Kõik paroolid vastavad tugevusnõuetele
  - Administraatorid kasutavad MFA-d
  - API-d kasutavad lühiajalisi tokeneid
- **Tundlikud andmed**:
  - Klientide isikuandmed on krüpteeritud
  - Krediitkaardi andmeid ei salvestata
- **Juurdepääsukontroll**:
  - Kliendid näevad ainult oma tellimusi
  - Laotöötajad pääsevad ligi ainult oma lao andmetele
- **Monitooring**:
  - Kõik API päringud logitakse
  - Ebatavalised mustrid käivitavad hoiatused
  - Turvaintsidentide haldusplaan on olemas ja testitud
