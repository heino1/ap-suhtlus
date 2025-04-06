# Praktiline näide 3: Integratsioonistsenaariumi läbimängimine

## Eesmärk
Selles praktilises näites simuleerime reaalset integratsioonistsenaariumit logistika valdkonnas, kus erinevad süsteemid suhtlevad omavahel. Eesmärk on demonstreerida, kuidas erinevad integratsioonimustrid ja -tehnoloogiad töötavad koos tervikliku lahenduse loomiseks.

## Stsenaariumi kirjeldus
Simuleerime e-poe, laosüsteemi, transpordisüsteemi ja klienditeeninduse süsteemi vahelist integratsiooni. Protsess algab tellimuse esitamisega e-poes ja lõpeb saadetise kohaletoimetamisega kliendile.

## Vajalikud tööriistad
- Python 3.x
- RabbitMQ (sõnumivahendaja)
- pika teek (RabbitMQ klient Pythonis)
- requests teek (HTTP päringuteks)
- Flask (lihtsa API loomiseks)

## Samm-sammuline juhend

### 1. Ettevalmistus ja süsteemide seadistamine

Esmalt loome projekti struktuuri ja vajalikud failid:

```bash
mkdir -p logistika_integratsioon/{e_poe_susteem,lao_susteem,transpordi_susteem,klienditeenindus}
touch logistika_integratsioon/{e_poe_susteem,lao_susteem,transpordi_susteem,klienditeenindus}/__init__.py
```

Installime vajalikud teegid:

```bash
pip install pika requests flask
```

### 2. Sõnumivahendaja seadistamine (RabbitMQ)

RabbitMQ on sõnumivahendaja, mis võimaldab süsteemidel asünkroonselt suhelda. Siin on lihtne skript RabbitMQ ühenduse loomiseks ja järjekordade seadistamiseks:

```python
# logistika_integratsioon/rabbitmq_setup.py
import pika

def setup_rabbitmq():
    # Loome ühenduse RabbitMQ serveriga
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    # Loome vajalikud järjekorrad
    queues = [
        'new_orders',          # Uued tellimused e-poest laosüsteemi
        'order_confirmations', # Tellimuse kinnitused laosüsteemist e-poele
        'shipping_orders',     # Tarnetellimused laosüsteemist transpordisüsteemi
        'delivery_updates',    # Tarne uuendused transpordisüsteemist klienditeenindusele
        'customer_notifications' # Teavitused klienditeenindusest e-poele
    ]
    
    for queue in queues:
        channel.queue_declare(queue=queue, durable=True)
    
    print("RabbitMQ järjekorrad on seadistatud!")
    connection.close()

if __name__ == "__main__":
    setup_rabbitmq()
```

### 3. E-poe süsteemi implementeerimine

E-poe süsteem võtab vastu tellimusi ja saadab need laosüsteemi:

```python
# logistika_integratsioon/e_poe_susteem/app.py
from flask import Flask, request, jsonify
import pika
import json
import uuid
import threading
import time

app = Flask(__name__)

# Tellimuste andmebaasi simulatsioon
orders_db = {}

def setup_rabbitmq_listener():
    """Seadistab RabbitMQ kuulaja tellimuse kinnituste ja kliendi teavituste jaoks"""
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    # Tellimuse kinnituste kuulamine
    channel.queue_declare(queue='order_confirmations', durable=True)
    channel.basic_consume(
        queue='order_confirmations',
        on_message_callback=process_order_confirmation,
        auto_ack=True
    )
    
    # Kliendi teavituste kuulamine
    channel.queue_declare(queue='customer_notifications', durable=True)
    channel.basic_consume(
        queue='customer_notifications',
        on_message_callback=process_customer_notification,
        auto_ack=True
    )
    
    print("E-poe süsteem on valmis sõnumeid vastu võtma...")
    channel.start_consuming()

def process_order_confirmation(ch, method, properties, body):
    """Töötleb laosüsteemist saabunud tellimuse kinnituse"""
    confirmation = json.loads(body)
    order_id = confirmation['order_id']
    
    if order_id in orders_db:
        orders_db[order_id]['status'] = confirmation['status']
        orders_db[order_id]['warehouse_confirmation'] = confirmation
        print(f"Tellimus {order_id} on kinnitatud: {confirmation['status']}")
    else:
        print(f"Hoiatus: Tellimust {order_id} ei leitud andmebaasist")

def process_customer_notification(ch, method, properties, body):
    """Töötleb klienditeenindusest saabunud teavituse"""
    notification = json.loads(body)
    order_id = notification['order_id']
    
    if order_id in orders_db:
        orders_db[order_id]['status'] = notification['status']
        orders_db[order_id]['delivery_status'] = notification
        print(f"Tellimuse {order_id} tarne staatus: {notification['status']}")
        
        # Siin võiks olla kliendi teavitamine e-kirja või SMS-i teel
        print(f"Kliendile saadetud teavitus: {notification['message']}")
    else:
        print(f"Hoiatus: Tellimust {order_id} ei leitud andmebaasist")

@app.route('/orders', methods=['POST'])
def create_order():
    """Loob uue tellimuse ja saadab selle laosüsteemi"""
    order_data = request.json
    
    # Lisame tellimuse ID ja algse staatuse
    order_id = str(uuid.uuid4())
    order_data['order_id'] = order_id
    order_data['status'] = 'new'
    order_data['created_at'] = time.strftime('%Y-%m-%d %H:%M:%S')
    
    # Salvestame tellimuse "andmebaasi"
    orders_db[order_id] = order_data
    
    # Saadame tellimuse laosüsteemi
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    channel.queue_declare(queue='new_orders', durable=True)
    channel.basic_publish(
        exchange='',
        routing_key='new_orders',
        body=json.dumps(order_data),
        properties=pika.BasicProperties(
            delivery_mode=2,  # Püsiv sõnum
        )
    )
    
    connection.close()
    
    print(f"Uus tellimus {order_id} on loodud ja saadetud laosüsteemi")
    return jsonify({"order_id": order_id, "status": "new"})

@app.route('/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    """Tagastab tellimuse info"""
    if order_id in orders_db:
        return jsonify(orders_db[order_id])
    else:
        return jsonify({"error": "Tellimust ei leitud"}), 404

if __name__ == "__main__":
    # Käivitame RabbitMQ kuulaja eraldi lõimes
    listener_thread = threading.Thread(target=setup_rabbitmq_listener)
    listener_thread.daemon = True
    listener_thread.start()
    
    # Käivitame Flask rakenduse
    app.run(port=5001, debug=True, use_reloader=False)
```

### 4. Laosüsteemi implementeerimine

Laosüsteem töötleb tellimusi, kontrollib toodete saadavust ja saadab tarnetellimusi transpordisüsteemi:

```python
# logistika_integratsioon/lao_susteem/app.py
import pika
import json
import time
import threading

# Lao andmebaasi simulatsioon
inventory_db = {
    "PRD001": {"name": "Sülearvuti Dell XPS 15", "stock": 10, "location": "A1-B2"},
    "PRD002": {"name": "Monitor Dell 27\"", "stock": 15, "location": "A2-C3"},
    "PRD003": {"name": "Klaviatuur Logitech MX Keys", "stock": 20, "location": "B3-D4"},
    "PRD004": {"name": "Hiir Logitech MX Master", "stock": 25, "location": "B4-D5"}
}

# Tellimuste andmebaasi simulatsioon
warehouse_orders = {}

def process_new_order(ch, method, properties, body):
    """Töötleb e-poest saabunud uue tellimuse"""
    order = json.loads(body)
    order_id = order['order_id']
    
    print(f"Laosüsteem sai uue tellimuse: {order_id}")
    
    # Salvestame tellimuse
    warehouse_orders[order_id] = order
    warehouse_orders[order_id]['warehouse_status'] = 'processing'
    
    # Kontrollime toodete saadavust
    all_available = True
    unavailable_items = []
    
    for item in order['items']:
        product_id = item['product_id']
        quantity = item['quantity']
        
        if product_id in inventory_db and inventory_db[product_id]['stock'] >= quantity:
            # Vähendame laoseisu
            inventory_db[product_id]['stock'] -= quantity
        else:
            all_available = False
            unavailable_items.append(product_id)
    
    # Saadame kinnituse e-poele
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    if all_available:
        confirmation = {
            'order_id': order_id,
            'status': 'confirmed',
            'message': 'Kõik tooted on saadaval',
            'processing_time': time.strftime('%Y-%m-%d %H:%M:%S')
        }
        warehouse_orders[order_id]['warehouse_status'] = 'confirmed'
        
        # Simuleerime komplekteerimist
        print(f"Komplekteerime tellimust {order_id}...")
        time.sleep(2)  # Simuleerime tööd
        
        # Saadame tarnetellimuse transpordisüsteemi
        shipping_order = {
            'order_id': order_id,
            'customer': order['customer'],
            'shipping_address': order['shipping_address'],
            'items': order['items'],
            'warehouse_reference': f"WH-{order_id}",
            'ready_for_pickup': time.strftime('%Y-%m-%d %H:%M:%S')
        }
        
        channel.queue_declare(queue='shipping_orders', durable=True)
        channel.basic_publish(
            exchange='',
            routing_key='shipping_orders',
            body=json.dumps(shipping_order),
            properties=pika.BasicProperties(
                delivery_mode=2,  # Püsiv sõnum
            )
        )
        
        print(f"Tarnetellimus {order_id} on saadetud transpordisüsteemi")
    else:
        confirmation = {
            'order_id': order_id,
            'status': 'rejected',
            'message': f'Järgmised tooted pole saadaval: {", ".join(unavailable_items)}',
            'processing_time': time.strftime('%Y-%m-%d %H:%M:%S')
        }
        warehouse_orders[order_id]['warehouse_status'] = 'rejected'
    
    channel.queue_declare(queue='order_confirmations', durable=True)
    channel.basic_publish(
        exchange='',
        routing_key='order_confirmations',
        body=json.dumps(confirmation),
        properties=pika.BasicProperties(
            delivery_mode=2,  # Püsiv sõnum
        )
    )
    
    connection.close()
    print(f"Tellimuse {order_id} kinnitus on saadetud: {confirmation['status']}")

def start_warehouse_system():
    """Käivitab laosüsteemi"""
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    channel.queue_declare(queue='new_orders', durable=True)
    channel.basic_consume(
        queue='new_orders',
        on_message_callback=process_new_order,
        auto_ack=True
    )
    
    print("Laosüsteem on käivitatud ja ootab tellimusi...")
    channel.start_consuming()

if __name__ == "__main__":
    start_warehouse_system()
```

### 5. Transpordisüsteemi implementeerimine

Transpordisüsteem haldab saadetiste transporti ja saadab uuendusi klienditeenindusele:

```python
# logistika_integratsioon/transpordi_susteem/app.py
import pika
import json
import time
import threading
import random

# Saadetiste andmebaasi simulatsioon
shipments_db = {}

# Sõidukite andmebaasi simulatsioon
vehicles_db = {
    "VEH001": {"type": "van", "status": "available", "location": "Tallinn"},
    "VEH002": {"type": "truck", "status": "available", "location": "Tartu"},
    "VEH003": {"type": "van", "status": "available", "location": "Pärnu"}
}

def process_shipping_order(ch, method, properties, body):
    """Töötleb laosüsteemist saabunud tarnetellimuse"""
    shipping_order = json.loads(body)
    order_id = shipping_order['order_id']
    
    print(f"Transpordisüsteem sai uue tarnetellimuse: {order_id}")
    
    # Loome saadetise
    shipment_id = f"SHP-{order_id}"
    shipments_db[shipment_id] = {
        'shipment_id': shipment_id,
        'order_id': order_id,
        'status': 'processing',
        'customer': shipping_order['customer'],
        'shipping_address': shipping_order['shipping_address'],
        'created_at': time.strftime('%Y-%m-%d %H:%M:%S'),
        'tracking_events': []
    }
    
    # Määrame sõiduki
    available_vehicles = [v_id for v_id, v in vehicles_db.items() if v['status'] == 'available']
    if available_vehicles:
        vehicle_id = random.choice(available_vehicles)
        vehicles_db[vehicle_id]['status'] = 'assigned'
        shipments_db[shipment_id]['vehicle_id'] = vehicle_id
        
        # Simuleerime saadetise elutsüklit eraldi lõimes
        shipment_thread = threading.Thread(
            target=simulate_shipment_lifecycle,
            args=(shipment_id, order_id)
        )
        shipment_thread.daemon = True
        shipment_thread.start()
    else:
        print(f"Hoiatus: Pole saadaval sõidukeid saadetise {shipment_id} jaoks")
        shipments_db[shipment_id]['status'] = 'waiting_for_vehicle'

def simulate_shipment_lifecycle(shipment_id, order_id):
    """Simuleerib saadetise elutsüklit ja saadab uuendusi"""
    shipment = shipments_db[shipment_id]
    vehicle_id = shipment['vehicle_id']
    
    # Saadetise olekud ja sõnumid
    statuses = [
        {'status': 'picked_up', 'message': 'Saadetis on laost välja võetud'},
        {'status': 'in_transit', 'message': 'Saadetis on teel'},
        {'status': 'out_for_delivery', 'message': 'Saadetis on kohaletoomiseks välja saadetud'},
        {'status': 'delivered', 'message': 'Saadetis on kohale toimetatud'}
    ]
    
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='delivery_updates', durable=True)
    
    for status_info in statuses:
        # Simuleerime aega olekute vahel
        time.sleep(random.uniform(1, 3))
        
        status = status_info['status']
        message = status_info['message']
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
        
        # Uuendame saadetise olekut
        shipments_db[shipment_id]['status'] = status
        shipments_db[shipment_id]['tracking_events'].append({
            'status': status,
            'timestamp': timestamp,
            'message': message,
            'vehicle_id': vehicle_id
        })
        
        # Saadame uuenduse klienditeenindusele
        update = {
            'shipment_id': shipment_id,
            'order_id': order_id,
            'status': status,
            'message': message,
            'timestamp': timestamp,
            'vehicle_id': vehicle_id
        }
        
        channel.basic_publish(
            exchange='',
            routing_key='delivery_updates',
            body=json.dumps(update),
            properties=pika.BasicProperties(
                delivery_mode=2,  # Püsiv sõnum
            )
        )
        
        print(f"Saadetise {shipment_id} uuendus saadetud: {status}")
    
    # Vabastame sõiduki
    vehicles_db[vehicle_id]['status'] = 'available'
    connection.close()

def start_transport_system():
    """Käivitab transpordisüsteemi"""
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    channel.queue_declare(queue='shipping_orders', durable=True)
    channel.basic_consume(
        queue='shipping_orders',
        on_message_callback=process_shipping_order,
        auto_ack=True
    )
    
    print("Transpordisüsteem on käivitatud ja ootab tarnetellimusi...")
    channel.start_consuming()

if __name__ == "__main__":
    start_transport_system()
```

### 6. Klienditeeninduse süsteemi implementeerimine

Klienditeeninduse süsteem jälgib saadetiste olekut ja teavitab kliente:

```python
# logistika_integratsioon/klienditeenindus/app.py
import pika
import json
import time
from flask import Flask, jsonify

app = Flask(__name__)

# Saadetiste jälgimise andmebaasi simulatsioon
tracking_db = {}

def process_delivery_update(ch, method, properties, body):
    """Töötleb transpordisüsteemist saabunud tarne uuenduse"""
    update = json.loads(body)
    shipment_id = update['shipment_id']
    order_id = update['order_id']
    
    # Salvestame või uuendame jälgimisinfot
    if shipment_id not in tracking_db:
        tracking_db[shipment_id] = {
            'shipment_id': shipment_id,
            'order_id': order_id,
            'status': update['status'],
            'events': []
        }
    
    tracking_db[shipment_id]['status'] = update['status']
    tracking_db[shipment_id]['events'].append({
        'status': update['status'],
        'message': update['message'],
        'timestamp': update['timestamp']
    })
    
    print(f"Klienditeenindus sai uuenduse saadetise {shipment_id} kohta: {update['status']}")
    
    # Saadame teavituse e-poele (ja sealt kliendile)
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    notification = {
        'order_id': order_id,
        'shipment_id': shipment_id,
        'status': update['status'],
        'message': update['message'],
        'timestamp': update['timestamp']
    }
    
    channel.queue_declare(queue='customer_notifications', durable=True)
    channel.basic_publish(
        exchange='',
        routing_key='customer_notifications',
        body=json.dumps(notification),
        properties=pika.BasicProperties(
            delivery_mode=2,  # Püsiv sõnum
        )
    )
    
    connection.close()
    print(f"Kliendi teavitus saadetud tellimuse {order_id} kohta")

@app.route('/tracking/<shipment_id>', methods=['GET'])
def get_tracking_info(shipment_id):
    """Tagastab saadetise jälgimisinfo"""
    if shipment_id in tracking_db:
        return jsonify(tracking_db[shipment_id])
    else:
        return jsonify({"error": "Saadetist ei leitud"}), 404

def start_customer_service():
    """Käivitab klienditeeninduse süsteemi"""
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    
    channel.queue_declare(queue='delivery_updates', durable=True)
    channel.basic_consume(
        queue='delivery_updates',
        on_message_callback=process_delivery_update,
        auto_ack=True
    )
    
    print("Klienditeeninduse süsteem on käivitatud ja ootab tarne uuendusi...")
    channel.start_consuming()

if __name__ == "__main__":
    # Käivitame RabbitMQ kuulaja eraldi lõimes
    import threading
    listener_thread = threading.Thread(target=start_customer_service)
    listener_thread.daemon = True
    listener_thread.start()
    
    # Käivitame Flask rakenduse
    app.run(port=5002, debug=True, use_reloader=False)
```

### 7. Integratsioonistsenaariumi testimine

Loome skripti, mis testib kogu integratsiooni:

```python
# logistika_integratsioon/test_integration.py
import requests
import json
import time

def test_integration():
    """Testib kogu integratsioonistsenaariumit"""
    print("=== LOGISTIKA INTEGRATSIOONI TESTIMINE ===")
    
    # 1. Loome uue tellimuse e-poe süsteemis
    order_data = {
        "customer": {
            "name": "Jaan Tamm",
            "email": "jaan.tamm@example.com",
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
                "quantity": 1,
                "unit_price": 1299.99
            },
            {
                "product_id": "PRD003",
                "name": "Klaviatuur Logitech MX Keys",
                "quantity": 2,
                "unit_price": 119.99
            }
        ],
        "shipping_method": "standard",
        "payment_method": "credit_card"
    }
    
    print("\n1. Tellimuse loomine e-poe süsteemis...")
    response = requests.post('http://localhost:5001/orders', json=order_data)
    
    if response.status_code == 200:
        order_result = response.json()
        order_id = order_result['order_id']
        print(f"Tellimus loodud ID-ga: {order_id}")
        
        # 2. Ootame ja kontrollime tellimuse olekut
        print("\n2. Ootame tellimuse töötlemist...")
        for _ in range(5):
            time.sleep(2)
            response = requests.get(f'http://localhost:5001/orders/{order_id}')
            if response.status_code == 200:
                order_status = response.json()
                print(f"Tellimuse olek: {order_status['status']}")
                
                # Kui tellimus on kinnitatud, jätkame jälgimisinfoga
                if 'warehouse_confirmation' in order_status and order_status['warehouse_confirmation']['status'] == 'confirmed':
                    break
        
        # 3. Ootame ja kontrollime saadetise olekut
        print("\n3. Ootame saadetise tarne uuendusi...")
        shipment_id = None
        
        # Ootame, kuni saame saadetise ID
        for _ in range(10):
            time.sleep(3)
            response = requests.get(f'http://localhost:5001/orders/{order_id}')
            if response.status_code == 200:
                order_info = response.json()
                
                if 'delivery_status' in order_info:
                    shipment_id = order_info['delivery_status']['shipment_id']
                    print(f"Saadetise ID: {shipment_id}")
                    print(f"Saadetise olek: {order_info['delivery_status']['status']}")
                    
                    # Kui saadetis on kohale toimetatud, lõpetame
                    if order_info['delivery_status']['status'] == 'delivered':
                        break
        
        # 4. Kontrollime jälgimisinfot klienditeeninduse süsteemist
        if shipment_id:
            print("\n4. Kontrollime jälgimisinfot klienditeeninduse süsteemist...")
            response = requests.get(f'http://localhost:5002/tracking/{shipment_id}')
            
            if response.status_code == 200:
                tracking_info = response.json()
                print(f"Saadetise {shipment_id} jälgimisinfo:")
                print(json.dumps(tracking_info, indent=2))
                
                print("\nSaadetise sündmused:")
                for event in tracking_info['events']:
                    print(f"- {event['timestamp']}: {event['status']} - {event['message']}")
            else:
                print(f"Viga jälgimisinfo pärimisel: {response.status_code}")
        
        print("\n=== INTEGRATSIOONISTSENAARIUM LÕPETATUD ===")
    else:
        print(f"Viga tellimuse loomisel: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_integration()
```

### 8. Integratsioonistsenaariumi käivitamine

Integratsioonistsenaariumi käivitamiseks tuleb käivitada kõik süsteemid eraldi terminalides:

```bash
# Terminal 1: RabbitMQ seadistamine
python logistika_integratsioon/rabbitmq_setup.py

# Terminal 2: E-poe süsteemi käivitamine
python logistika_integratsioon/e_poe_susteem/app.py

# Terminal 3: Laosüsteemi käivitamine
python logistika_integratsioon/lao_susteem/app.py

# Terminal 4: Transpordisüsteemi käivitamine
python logistika_integratsioon/transpordi_susteem/app.py

# Terminal 5: Klienditeeninduse süsteemi käivitamine
python logistika_integratsioon/klienditeenindus/app.py

# Terminal 6: Integratsioonistsenaariumi testimine
python logistika_integratsioon/test_integration.py
```

## Integratsioonimustrite analüüs

Selles näites kasutasime mitut erinevat integratsioonimustrit:

1. **Sõnumipõhine integratsioon (Messaging)**: Süsteemid suhtlevad omavahel RabbitMQ sõnumivahendaja kaudu, mis võimaldab asünkroonset suhtlust.

2. **Publish-Subscribe muster**: Süsteemid avaldavad sündmusi (nt tarne uuendused) ja teised süsteemid tellivad neid.

3. **Point-to-Point muster**: Mõned sõnumid liiguvad otse ühelt süsteemilt teisele (nt e-poest laosüsteemi).

4. **REST API**: Klienditeeninduse süsteem pakub REST API-t jälgimisinfo pärimiseks.

5. **Sündmuspõhine arhitektuur**: Kogu süsteem reageerib erinevatele sündmustele (tellimuse loomine, tarne uuendused jne).

## Harjutused tudengitele

1. **Lihtne harjutus**: Lisage süsteemi uus komponent - maksesüsteem, mis töötleb tellimuste makseid.

2. **Keskmine harjutus**: Implementeerige veakäsitlus ja taastemehhanism juhuks, kui mõni süsteem ei ole saadaval või tekib viga.

3. **Keeruline harjutus**: Laiendage süsteemi, lisades API Gateway, mis toimib ühtse sisenemispunktina kõigile välistele päringutele ja suunab need õigetesse süsteemidesse.

## Täiendavad ressursid
- [RabbitMQ ametlik dokumentatsioon](https://www.rabbitmq.com/documentation.html)
- [Pika teegi dokumentatsioon](https://pika.readthedocs.io/)
- [Flask dokumentatsioon](https://flask.palletsprojects.com/)
- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)
- [Microservices.io - integratsioonimustrite kataloog](https://microservices.io/patterns/index.html)
