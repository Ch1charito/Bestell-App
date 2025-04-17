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
];


let cart = [];
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
                <div class="name-button kleiner-abstand einrücken"><h4 id="name-${index}">name</h4><button onclick="addToCart(${index})" class="add-button">+</button></div>
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

// ich brauche eine function die ich per onclick aufrufe immer wenn ich auf den button drücke zum hinzufügen des item --> dabei soll der name und der preis übergeben werden und in einem neuen template angezeigt werden

/* function addToCart(index) {
    let nameInput = document.getElementById(`name-${index}`).innerText;
    let priceInput = document.getElementById(`price-${index}`).innerText;
    cart.push({
        name: nameInput,
        price: priceInput,
        amount: 1,
    });
    console.log(cart);
    
    
}
console.log(cart); */

// ich brauche eine function um herauszufinden ob der name sich schon in cart befindet


function getNameIndex(name) {                               // eine function um zu prüfen ob der name bereits im array vergeben ist und wenn dann auch wo
    function checkItem(item) {                              // eine function innerhalb der function um jedes objekt im array zu prüfen
        return item.name === name;                          // vergleicht ob der name in dem array mit objekten bereits verwendet wird --> gibt ture oder flase aus
    }

    let nameIndex = cart.findIndex(checkItem);              // gibt nameIndex den Index im array cart wenn true bei checkItem rauskommt und -1 wenn false
    return nameIndex;
}

//ich muss die functionen verbinden und mache deswegen eine neue die erste lasse ich oben zur übersicht trotdem erstmal stehen

function addToCart(index) {
    let nameInput = document.getElementById(`name-${index}`).innerText;         // nameInput hat den aktuellen wert, da wir ihn in der template über die dynamische id mitgeben
    let priceInput = document.getElementById(`price-${index}`).innerText;       // das selbe nur bei price
    let nameIndex = getNameIndex(nameInput);                                    // wir geben nameIndex den wert aus der function getNameIndex mit dem parameter aus nameInput und kriegen als ergebnis entweder den index oder -1 raus
    if (nameIndex === -1) {                                                     // wenn es also noch nicht im array ist wird dem cart array mehrere objekt hinzugefügt
        cart.push({
        name: nameInput,
        price: priceInput,
        amount: 1,
    });
    } else {
        cart[nameIndex].amount++;                                               // sonst wenn es forhanden ist wird nur amount +1 erhöht
    }
    
    console.log(cart);
    renderCart();
}

// ich brauche eine function um mein cart array auch zu rendern

function renderCart() {
    let cartRef = document.getElementById('cart-content')
    cartRef.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        cartRef.innerHTML += getCartTemplate(i);
        renderCartName(i);
    }
    
}

// ein template für das was in dem warenkorb drinnen ist
function getCartTemplate(index){
    return `<div>
                <p class="kleiner-abstand" id="cart-name-${index}">gericht name</p>
                <div class="cart-display kleiner-abstand"><button class="cart-button">-</button><p id="cart-amount-${index}">amount</p><button class="cart-button">+</button><p id="cart-price-${index}">price</p><button class="cart-button">clear</button></div>
            </div>`
}

// ich brauche functionen um name amount und price zu rendern

function renderCartName(index) {
    let cartNameRef = document.getElementById(`cart-name-${index}`);
    cartNameRef.innerHTML = cart[index].name;
    
}

function renderCartAmount(index) {
    let cartAmountRef = document.getElementById(`cart-amount-${index}`);
    cartAmountRef.innerHTML = cart[index].amount;
}

function renderCartPrice(index) {
    let cartPriceRef = document.getElementById(`cart-price-${index}`);
    cartPriceRef.innerHTML = cart[index].price;
}