# Praktiline näide 2: Andmevahetuse formaadid (JSON, XML)

## Eesmärk
Selles praktilises näites tutvume erinevate andmevahetusformaatidega, keskendudes peamiselt JSON ja XML formaatidele. Õpime, kuidas andmeid neis formaatides luua, lugeda ja teisendada, mis on oluline oskus programmide vahelise suhtluse mõistmiseks.

## Vajalikud tööriistad
- Python 3.x
- json teek (sisseehitatud)
- xml.etree.ElementTree teek (sisseehitatud)
- dicttoxml teek (XML genereerimiseks)

## Samm-sammuline juhend

### 1. Ettevalmistus
Esmalt loome uue Python faili ja impordime vajalikud teegid:

```python
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
import dicttoxml
from xml.dom.minidom import parseString

# Installime vajaliku teegi, kui see puudub
try:
    import dicttoxml
except ImportError:
    import pip
    pip.main(['install', 'dicttoxml'])
    import dicttoxml
```

### 2. Logistika andmete näidis
Loome näidisandmed, mis esindavad logistika valdkonna tüüpilist infot:

```python
# Näidisandmed - logistika tellimus
order_data = {
    "order_id": "ORD12345",
    "customer": {
        "name": "AS Näidisettevõte",
        "contact_person": "Jaan Tamm",
        "email": "jaan.tamm@naidis.ee",
        "phone": "+372 5123 4567"
    },
    "shipping_address": {
        "street": "Tartu mnt 123",
        "city": "Tallinn",
        "postal_code": "10115",
        "country": "Estonia"
    },
    "items": [
        {
            "product_id": "PRD001",
            "name": "Sülearvuti Dell XPS 15",
            "quantity": 2,
            "unit_price": 1299.99,
            "weight_kg": 1.8
        },
        {
            "product_id": "PRD002",
            "name": "Monitor Dell 27\"",
            "quantity": 3,
            "unit_price": 349.99,
            "weight_kg": 5.2
        }
    ],
    "shipping_method": "express",
    "requested_delivery_date": "2025-04-15",
    "total_weight_kg": 19.2,
    "total_price": 3649.95,
    "status": "processing"
}
```

### 3. JSON formaat
JSON (JavaScript Object Notation) on üks levinumaid andmevahetusformaate tänu oma lihtsusele ja kompaktsusele.

#### 3.1 Andmete teisendamine JSON-iks

```python
def convert_to_json(data):
    """Teisendab Pythoni andmestruktuuri JSON stringiks"""
    return json.dumps(data, indent=4, ensure_ascii=False)

# Teisendame tellimuse andmed JSON formaati
order_json = convert_to_json(order_data)
print("=== TELLIMUS JSON FORMAADIS ===")
print(order_json)
```

#### 3.2 JSON-i lugemine

```python
def parse_json(json_string):
    """Parsib JSON stringi Pythoni andmestruktuuriks"""
    return json.loads(json_string)

# Parsime JSON stringi tagasi Pythoni andmestruktuuriks
parsed_order = parse_json(order_json)
print("\n=== TELLIMUSE KOKKUVÕTE (PARSITUD JSON-IST) ===")
print(f"Tellimuse ID: {parsed_order['order_id']}")
print(f"Klient: {parsed_order['customer']['name']}")
print(f"Tarneaadress: {parsed_order['shipping_address']['street']}, {parsed_order['shipping_address']['city']}")
print(f"Toodete arv: {len(parsed_order['items'])}")
print(f"Kogusumma: {parsed_order['total_price']} EUR")
```

#### 3.3 JSON-i salvestamine ja lugemine failist

```python
def save_json_to_file(data, filename):
    """Salvestab andmed JSON failina"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Andmed salvestatud faili: {filename}")

def load_json_from_file(filename):
    """Loeb andmed JSON failist"""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

# Salvestame tellimuse andmed faili
save_json_to_file(order_data, "tellimus.json")

# Loeme andmed failist
loaded_order = load_json_from_file("tellimus.json")
print("\n=== FAILIST LAETUD TELLIMUS ===")
print(f"Tellimuse ID: {loaded_order['order_id']}")
print(f"Staatus: {loaded_order['status']}")
```

### 4. XML formaat
XML (eXtensible Markup Language) on struktureeritud märgenduskeel, mis on laialdaselt kasutusel andmevahetuses, eriti ettevõtete vahelistes süsteemides.

#### 4.1 Andmete teisendamine XML-iks

```python
def convert_to_xml(data):
    """Teisendab Pythoni andmestruktuuri XML stringiks"""
    xml = dicttoxml.dicttoxml(data, custom_root='order', attr_type=False)
    dom = parseString(xml)
    return dom.toprettyxml()

# Teisendame tellimuse andmed XML formaati
order_xml = convert_to_xml(order_data)
print("\n=== TELLIMUS XML FORMAADIS ===")
print(order_xml)
```

#### 4.2 XML-i loomine ElementTree abil

```python
def create_xml_manually(order_data):
    """Loob XML-i käsitsi ElementTree abil"""
    # Loome juureelemendi
    root = ET.Element("order")
    
    # Lisame tellimuse ID
    ET.SubElement(root, "order_id").text = order_data["order_id"]
    
    # Lisame kliendi info
    customer = ET.SubElement(root, "customer")
    ET.SubElement(customer, "name").text = order_data["customer"]["name"]
    ET.SubElement(customer, "contact_person").text = order_data["customer"]["contact_person"]
    ET.SubElement(customer, "email").text = order_data["customer"]["email"]
    ET.SubElement(customer, "phone").text = order_data["customer"]["phone"]
    
    # Lisame tarneaadressi
    address = ET.SubElement(root, "shipping_address")
    ET.SubElement(address, "street").text = order_data["shipping_address"]["street"]
    ET.SubElement(address, "city").text = order_data["shipping_address"]["city"]
    ET.SubElement(address, "postal_code").text = order_data["shipping_address"]["postal_code"]
    ET.SubElement(address, "country").text = order_data["shipping_address"]["country"]
    
    # Lisame tooted
    items = ET.SubElement(root, "items")
    for item in order_data["items"]:
        item_elem = ET.SubElement(items, "item")
        ET.SubElement(item_elem, "product_id").text = item["product_id"]
        ET.SubElement(item_elem, "name").text = item["name"]
        ET.SubElement(item_elem, "quantity").text = str(item["quantity"])
        ET.SubElement(item_elem, "unit_price").text = str(item["unit_price"])
        ET.SubElement(item_elem, "weight_kg").text = str(item["weight_kg"])
    
    # Lisame ülejäänud info
    ET.SubElement(root, "shipping_method").text = order_data["shipping_method"]
    ET.SubElement(root, "requested_delivery_date").text = order_data["requested_delivery_date"]
    ET.SubElement(root, "total_weight_kg").text = str(order_data["total_weight_kg"])
    ET.SubElement(root, "total_price").text = str(order_data["total_price"])
    ET.SubElement(root, "status").text = order_data["status"]
    
    # Teisendame XML-i ilusaks stringiks
    rough_string = ET.tostring(root, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ")

# Loome XML-i käsitsi
manual_xml = create_xml_manually(order_data)
print("\n=== KÄSITSI LOODUD XML ===")
print(manual_xml)
```

#### 4.3 XML-i parsimine

```python
def parse_xml(xml_string):
    """Parsib XML stringi ja tagastab olulise info"""
    root = ET.fromstring(xml_string)
    
    # Loome tulemuse sõnastiku
    result = {
        "order_id": root.find("order_id").text,
        "customer_name": root.find("customer/name").text,
        "shipping_address": f"{root.find('shipping_address/street').text}, {root.find('shipping_address/city').text}",
        "items": []
    }
    
    # Lisame tooted
    for item in root.findall("items/item"):
        item_info = {
            "name": item.find("name").text,
            "quantity": int(item.find("quantity").text),
            "price": float(item.find("unit_price").text)
        }
        result["items"].append(item_info)
    
    return result

# Parsime käsitsi loodud XML-i
parsed_xml_data = parse_xml(ET.tostring(ET.fromstring(manual_xml)))
print("\n=== PARSITUD XML INFO ===")
print(f"Tellimuse ID: {parsed_xml_data['order_id']}")
print(f"Klient: {parsed_xml_data['customer_name']}")
print(f"Tarneaadress: {parsed_xml_data['shipping_address']}")
print("Tooted:")
for item in parsed_xml_data['items']:
    print(f"  - {item['name']} (kogus: {item['quantity']}, hind: {item['price']} EUR)")
```

#### 4.4 XML-i salvestamine ja lugemine failist

```python
def save_xml_to_file(xml_string, filename):
    """Salvestab XML stringi failina"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(xml_string)
    print(f"XML salvestatud faili: {filename}")

def load_xml_from_file(filename):
    """Loeb XML faili ja tagastab juureelemendi"""
    tree = ET.parse(filename)
    return tree.getroot()

# Salvestame XML-i faili
save_xml_to_file(manual_xml, "tellimus.xml")

# Loeme XML-i failist
loaded_xml_root = load_xml_from_file("tellimus.xml")
print("\n=== FAILIST LAETUD XML INFO ===")
print(f"Tellimuse ID: {loaded_xml_root.find('order_id').text}")
print(f"Tarneviis: {loaded_xml_root.find('shipping_method').text}")
print(f"Soovitud tarnekuupäev: {loaded_xml_root.find('requested_delivery_date').text}")
```

### 5. JSON ja XML võrdlus

```python
def compare_formats(data):
    """Võrdleb JSON ja XML formaate"""
    # Teisendame andmed mõlemasse formaati
    json_data = json.dumps(data, ensure_ascii=False)
    xml_data = dicttoxml.dicttoxml(data, custom_root='order', attr_type=False)
    
    # Võrdleme suurust
    json_size = len(json_data)
    xml_size = len(xml_data)
    
    print("\n=== JSON JA XML VÕRDLUS ===")
    print(f"JSON suurus: {json_size} baiti")
    print(f"XML suurus: {xml_size} baiti")
    print(f"Erinevus: XML on {round((xml_size/json_size - 1) * 100, 2)}% suurem")
    
    # Mõõdame parsimise kiirust
    import time
    
    # JSON parsimise kiirus
    start_time = time.time()
    for _ in range(1000):
        json.loads(json_data)
    json_parse_time = time.time() - start_time
    
    # XML parsimise kiirus
    start_time = time.time()
    for _ in range(1000):
        ET.fromstring(xml_data)
    xml_parse_time = time.time() - start_time
    
    print(f"\nJSON parsimise aeg (1000 korda): {json_parse_time:.4f} sekundit")
    print(f"XML parsimise aeg (1000 korda): {xml_parse_time:.4f} sekundit")
    print(f"Erinevus: XML parsimine on {round((xml_parse_time/json_parse_time - 1) * 100, 2)}% aeglasem")

# Võrdleme formaate
compare_formats(order_data)
```

### 6. Praktiline rakendus: Tellimuste teisendamine erinevate süsteemide vahel

```python
def convert_between_systems(order_data, source_format, target_format):
    """
    Teisendab tellimuse andmed ühest formaadist teise,
    simuleerides erinevate süsteemide vahelist andmevahetust
    """
    print(f"\n=== TELLIMUSE TEISENDAMINE: {source_format} -> {target_format} ===")
    
    # Teisendame lähteformaati
    if source_format == "internal":
        source_data = order_data
        print("Lähteandmed: Sisemise süsteemi formaat (Python sõnastik)")
    elif source_format == "json":
        source_data = json.dumps(order_data)
        print("Lähteandmed: E-poe süsteem (JSON)")
    elif source_format == "xml":
        source_data = dicttoxml.dicttoxml(order_data, custom_root='order', attr_type=False)
        print("Lähteandmed: Tarnija süsteem (XML)")
    else:
        print(f"Tundmatu lähteformaat: {source_format}")
        return None
    
    # Teisendame sihtformaati
    if target_format == "internal":
        if source_format == "internal":
            target_data = source_data
        elif source_format == "json":
            target_data = json.loads(source_data)
        elif source_format == "xml":
            # Lihtsustatud XML parsimine
            root = ET.fromstring(source_data)
            target_data = {"message": "XML edukalt parsitud sisemiseks formaadiks"}
        print("Sihtformaat: Sisemise süsteemi formaat (Python sõnastik)")
    
    elif target_format == "json":
        if source_format == "internal":
            target_data = json.dumps(source_data, indent=2, ensure_ascii=False)
        elif source_format == "json":
            target_data = source_data
        elif source_format == "xml":
            # XML -> JSON teisendus
            root = ET.fromstring(source_data)
            # Lihtsustatud teisendus
            target_data = json.dumps({"message": "XML edukalt teisendatud JSON-iks"})
        print("Sihtformaat: E-poe süsteem (JSON)")
    
    elif target_format == "xml":
        if source_format == "internal":
            target_data = dicttoxml.dicttoxml(source_data, custom_root='order', attr_type=False)
        elif source_format == "json":
            # JSON -> XML teisendus
            data_dict = json.loads(source_data)
            target_data = dicttoxml.dicttoxml(data_dict, custom_root='order', attr_type=False)
        elif source_format == "xml":
            target_data = source_data
        print("Sihtformaat: Tarnija süsteem (XML)")
    
    else:
        print(f"Tundmatu sihtformaat: {target_format}")
        return None
    
    print("Teisendamine õnnestus!")
    return target_data

# Simuleerime andmevahetust erinevate süsteemide vahel
# 1. Sisemisest süsteemist e-poele (Internal -> JSON)
json_for_eshop = convert_between_systems(order_data, "internal", "json")

# 2. E-poest tarnijale (JSON -> XML)
xml_for_supplier = convert_between_systems(json.loads(json_for_eshop), "internal", "xml")

# 3. Tarnijalt tagasi sisemisse süsteemi (XML -> Internal)
internal_from_supplier = convert_between_systems(xml_for_supplier, "xml", "internal")
```

## Harjutused tudengitele

1. **Lihtne harjutus**: Laiendage näidisandmeid, lisades tellimuse juurde makseinfo (makseviis, makse staatus, arve number jne).

2. **Keskmine harjutus**: Looge funktsioon, mis teisendab XML formaadis tellimuse CSV formaati, et seda saaks importida tabelarvutusprogrammi.

3. **Keeruline harjutus**: Implementeerige tellimuste valideerimissüsteem, mis kontrollib nii JSON kui ka XML formaadis tellimusi ja tagastab veateated, kui andmed ei vasta nõuetele (nt puuduvad kohustuslikud väljad, negatiivsed kogused jne).

## Täiendavad ressursid
- [JSON ametlik veebileht](https://www.json.org/)
- [XML spetsifikatsioon](https://www.w3.org/XML/)
- [Python json mooduli dokumentatsioon](https://docs.python.org/3/library/json.html)
- [Python xml.etree.ElementTree dokumentatsioon](https://docs.python.org/3/library/xml.etree.elementtree.html)
- [dicttoxml teegi dokumentatsioon](https://pypi.org/project/dicttoxml/)
