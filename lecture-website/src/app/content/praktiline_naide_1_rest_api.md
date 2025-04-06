# Praktiline näide 1: REST API kasutamine

## Eesmärk
Selles praktilises näites õpime, kuidas kasutada REST API-t logistika kontekstis. Näide demonstreerib, kuidas teha päringuid avalikule API-le, töödelda vastuseid ja kasutada saadud andmeid.

## Kasutatav API
Kasutame näites avalikku postiindeksite API-t, mis võimaldab otsida aadresside ja postiindeksite infot. See on lihtne näide, mis sarnaneb logistikasüsteemides kasutatavate aadresside valideerimise ja geokodeerimise API-dega.

## Vajalikud tööriistad
- Python 3.x
- Requests teek (HTTP päringute tegemiseks)
- JSON teek (vastuste töötlemiseks)

## Samm-sammuline juhend

### 1. Ettevalmistus
Esmalt loome uue Python faili ja impordime vajalikud teegid:

```python
import requests
import json

# Funktsioon, mis vormindab JSON vastuse loetavamaks
def print_json(json_data):
    print(json.dumps(json_data, indent=4, ensure_ascii=False))
```

### 2. API päring
Teeme päringu, et saada infot konkreetse postiindeksi kohta:

```python
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

# Testime funktsiooni Tallinna postiindeksiga
postal_code = "10115"
address_data = get_address_by_postal_code(postal_code)

if address_data:
    print(f"Info postiindeksi {postal_code} kohta:")
    print_json(address_data)
```

### 3. Andmete töötlemine
Nüüd töötleme saadud andmeid ja eraldame vajaliku info:

```python
def extract_address_components(address_data):
    """
    Funktsioon, mis eraldab aadressiandmetest olulised komponendid
    """
    if not address_data or "addresses" not in address_data:
        return []
    
    result = []
    for address in address_data["addresses"]:
        address_info = {
            "tänav": address.get("street", ""),
            "linn": address.get("city", ""),
            "maakond": address.get("county", ""),
            "postiindeks": address.get("postalcode", "")
        }
        result.append(address_info)
    
    return result

# Eraldame aadressikomponendid
address_components = extract_address_components(address_data)

# Kuvame tulemused
print("\nAadressikomponendid:")
for i, address in enumerate(address_components, 1):
    print(f"Aadress {i}:")
    for key, value in address.items():
        print(f"  {key}: {value}")
```

### 4. Mitme postiindeksi pärimine
Laiendame näidet, et pärida infot mitme postiindeksi kohta:

```python
def get_multiple_postal_codes(postal_codes, country_code="ee"):
    """
    Funktsioon, mis pärib info mitme postiindeksi kohta
    """
    results = {}
    
    for code in postal_codes:
        data = get_address_by_postal_code(code, country_code)
        if data:
            results[code] = extract_address_components(data)
    
    return results

# Testime mitme postiindeksiga
postal_codes = ["10115", "51005", "80010"]
multiple_results = get_multiple_postal_codes(postal_codes)

print("\nMitme postiindeksi info:")
for code, addresses in multiple_results.items():
    print(f"\nPostiindeks {code}:")
    for i, address in enumerate(addresses, 1):
        print(f"  Aadress {i}:")
        for key, value in address.items():
            print(f"    {key}: {value}")
```

### 5. Logistika rakendus
Loome lihtsa logistika rakenduse, mis kasutab postiindeksi API-t saadetiste valideerimiseks:

```python
def validate_shipment_address(recipient_name, street, city, postal_code, country_code="ee"):
    """
    Funktsioon, mis valideerib saadetise aadressi
    """
    # Kontrollime, kas postiindeks on olemas
    address_data = get_address_by_postal_code(postal_code, country_code)
    
    if not address_data or "addresses" not in address_data or not address_data["addresses"]:
        return {
            "valid": False,
            "error": "Postiindeks ei ole kehtiv"
        }
    
    # Kontrollime, kas linn vastab postiindeksile
    valid_cities = set()
    for address in address_data["addresses"]:
        if "city" in address:
            valid_cities.add(address["city"].lower())
    
    if city.lower() not in valid_cities:
        return {
            "valid": False,
            "error": f"Linn ei vasta postiindeksile. Võimalikud linnad: {', '.join(valid_cities)}"
        }
    
    # Kui kõik kontrollid läbiti, on aadress kehtiv
    return {
        "valid": True,
        "normalized_address": {
            "recipient": recipient_name,
            "street": street,
            "city": city,
            "postal_code": postal_code,
            "country": country_code.upper()
        }
    }

# Testime aadressi valideerimist
test_addresses = [
    {
        "recipient": "Jaan Tamm",
        "street": "Narva mnt 18",
        "city": "Tallinn",
        "postal_code": "10120"
    },
    {
        "recipient": "Mari Mets",
        "street": "Riia mnt 5",
        "city": "Võru",  # Vale linn postiindeksi jaoks
        "postal_code": "51005"
    }
]

print("\nAadresside valideerimine:")
for address in test_addresses:
    result = validate_shipment_address(
        address["recipient"],
        address["street"],
        address["city"],
        address["postal_code"]
    )
    
    print(f"\nValideeritakse: {address['recipient']}, {address['street']}, {address['city']}, {address['postal_code']}")
    if result["valid"]:
        print("Aadress on kehtiv!")
        print("Normaliseeritud aadress:")
        for key, value in result["normalized_address"].items():
            print(f"  {key}: {value}")
    else:
        print(f"Aadress ei ole kehtiv: {result['error']}")
```

## Harjutused tudengitele

1. **Lihtne harjutus**: Modifitseerige koodi, et see töötaks mõne teise riigi postiindeksitega (nt Läti, Soome).

2. **Keskmine harjutus**: Lisage funktsionaalsus, mis arvutab ligikaudse kauguse kahe postiindeksi vahel (vihje: kasutage geokodeerimist ja Haversine'i valemit).

3. **Keeruline harjutus**: Looge lihtne veebirakendus Flask'i abil, mis võimaldab kasutajal sisestada saadetise andmed, valideerib need API abil ja kuvab tulemuse.

## Täiendavad ressursid
- [Requests teegi dokumentatsioon](https://docs.python-requests.org/)
- [JSON teegi dokumentatsioon](https://docs.python.org/3/library/json.html)
- [RESTful API disaini juhised](https://restfulapi.net/)
- [Postman - API testimise tööriist](https://www.postman.com/)
