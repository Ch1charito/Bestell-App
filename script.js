let hauptgerichte = [
    {
        "name": "Spaghetti alle Vongole",
        "price": 17.99,
        "descripton": "Spaghetti mit frischen Venusmuscheln in einer leckeren Weißweinsoße"
    },
    {
        "name": "Pizza Margherita",
        "price": 12.99,
        "descripton": "eine knusprige Steinofenpizza mit Büffel-Mozarella"
    },
    
    {
        "name": "Spaghetti Carbonara",
        "price": 14.25,
        "descripton": "Spaghetti mit frischem Guanciale und Pecorino Romano"
    },
    {
        "name": "Risotto ai funghi",
        "price": 16.75,
        "descripton": "Risotto in einer Weißweinsoße mit Steinpilzen und frischem Parmesan"
    },
]

// ich möchte eine render Function die mir alle daten zu meinen Hauptgerichten rendert

function renderHauptgerichte() {
    let hauptgerichteRef = document.getElementById('hauptgerichte-content');
    for (let i = 0; i <hauptgerichte.length; i++) {
        hauptgerichteRef.innerHTML += getGerichteTemplate(i);
        renderName(i);
        renderPrice(i);
        renderDescription(i);
    }
    
}

function getGerichteTemplate(index) {
    return `<div class="abstand border">
                <div class="name-button kleiner-abstand einrücken"><h4 id="name-${index}">name</h4><button class="add-button">+</button></div>
                <p id="description-${index}" class="einrücken kleiner-abstand">beschreibung</p>
                <p id="price-${index}" class="einrücken kleiner-abstand">preis</p>
            </div>`
    
}

// als nächstes möchte ich den namen die beschreibung und den preis rendern

function renderName(index) {
    let nameRef = document.getElementById(`name-${index}`);
    nameRef.innerHTML = hauptgerichte[index].name;
}

function renderDescription(index) {
    let descriptionRef = document.getElementById(`description-${index}`)
    descriptionRef.innerHTML = hauptgerichte[index].descripton;
    
}

function renderPrice(index) {
    let priceRef = document.getElementById(`price-${index}`);
    priceRef.innerHTML = hauptgerichte[index].price + " €";
    
}