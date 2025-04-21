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
    let rawPrice = document.getElementById(`price-${index}`).innerText;       // das selbe nur bei price
    let priceInput = parseFloat(rawPrice.replace(" €", "").trim());             // damit ich später mit dem preis rechnen kann muss ich den string(rawPrice)in eine number parsen dazu replace ich € damit es weg ist und trim falls wir ein leerzeichen zu viel iwo haben
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
        renderCartAmount(i);
        renderCartPrice(i);
    }
    renderZwischensumme();
    renderGesamt();
    
}

// ein template für das was in dem warenkorb drinnen ist
function getCartTemplate(index){
    return `<div>
                <p class="kleiner-abstand" id="cart-name-${index}">gericht name</p>
                <div class="cart-display kleiner-abstand"><button onclick="removeAmount(${index})" class="cart-button">-</button><p id="cart-amount-${index}">amount</p><button onclick="addAmount(${index})" class="cart-button">+</button><p id="cart-price-${index}">price</p><button onclick="removeItemFromCart(${index})" class="cart-button">&#128465;</button></div>
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
    let totalPrice = cart[index].price * cart[index].amount;                // ich berechnet hier den gesamt preis also price * amount
    cartPriceRef.innerHTML = totalPrice.toFixed(2) + " €";
}

// eine function mit der wir wieder aus dem cart rauslöschen können
function removeItemFromCart(index) {                                         // der parameter ist die aktuelle position der schlaufe durch die wir rendern (ist der dynamische index)
    cart.splice(index, 1);                                                  // ich entferne es aus dem array und lasse dan das array cart neu rendern
    renderCart();
    renderCartOverlay();
}

// ich brauche nun nurnoch 2 functionen mit denen ich den amount enweder erhöhe oder -1 rechne

function addAmount(index) {
    cart[index].amount++;                       // amount +1
    renderCart();
    renderCartOverlay();
}

function removeAmount(index) {
    if (cart[index].amount > 1){                // ich prüfe das amount auch größer 1 ist damit ich nicht unter 1 bei amount komme --> dafür ist dann reomveitemFrom cart function da
        cart[index].amount--;                   // amount -1
    }
    renderCart();
    renderCartOverlay();
}

// ich brauche jetzt eine function mit der ich immer alle preise als summe zusammen rechne

function calculateZwischensumme() {
    let total = 0;                                  // ich starte mit der zwischensumme 0

    for (let i = 0; i < cart.length; i++) {         // ich lasse durch cart wiederholen weil ich ja auf jedes objekt innerhalb des arrays zugreifen möchte
        let item = cart[i];                         // ich speicher das aktuelle objekt in der zwischen variablen item wieder ---> also das objekt auf welches wir gerade innherlab der schleife zugreifen
        let itemTotal = item.price * item.amount;   // ich lasse in der zwischenvariablen itemTotal dann jedes mal den Price mal dem Amount rechnen
        total += itemTotal;                         // am ende füge ich die summe immer der zwischensumme zu ---> das heißt wenn die schleife neu beginnt wird der wert am ende immer hinzugefügt und nicht gleichgesetzt
    }
    return total;                                   // die gesamte summe wird dann return
    
}

function renderZwischensumme() {                                        // die function führe ich bei renderCart aus weil ich ja will das der wert immer aktualisiert wird sobald ich etwas in meinem cart veränder
    let total = calculateZwischensumme();                               // ich gebe meiner variablen den returnten wert aus der function bei der ich durch jedes objekt in meinem array wiederhole 
    let zwischensummeRef = document.getElementById('zwischensumme');    // ich sage wo ich das anzeigen lassen will
    zwischensummeRef.innerHTML = total.toFixed(2) + " €";               // ich lasse wie alles andere auch mit 2 nachkommastellen und € ins html einfügen
}

function renderGesamt() {
    let zwischensumme = calculateZwischensumme();
    let total = zwischensumme + 5;
    let totalRef = document.getElementById('gesamtkosten');
    totalRef.innerHTML = total.toFixed(2) + " €";
}

// jetzt brauche ich eine function mit der ich den warenkorb einblenden lassen kann

function toggleCartOverlay() {
    let overlayRef = document.getElementById('warenkorb-overlay');
    overlayRef.classList.toggle('d_none');
    renderCartOverlay();
    
}

/* function getCartContent() {
    let contentRef = document.getElementById('overlay-content');
    let cartcontent = document.getElementById('shop-cart');
    contentRef.innerHTML = cartcontent.innerHTML;
    
} */


// ich brauche eine function mit der ich das cart render für das overlay
function renderCartOverlay() {
    let cartRef = document.getElementById('overlay-content')
    cartRef.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        cartRef.innerHTML += getCartOverlayTemplate(i);
        renderCartOverlayName(i);
        renderCartOverlayAmount(i);
        renderCartOverlayPrice(i);
    }
    renderOverlayZwischensumme();
    renderOverlayGesamt();
}

function getCartOverlayTemplate(index){
    return `<div>
                <p class="kleiner-abstand" id="overlay-cart-name-${index}">gericht name</p>
                <div class="cart-display kleiner-abstand"><button onclick="removeAmount(${index})" class="cart-button">-</button><p id="overlay-cart-amount-${index}">amount</p><button onclick="addAmount(${index})" class="cart-button">+</button><p id="overlay-cart-price-${index}">price</p><button onclick="removeItemFromCart(${index})" class="cart-button">&#128465;</button></div>
            </div>`
}

function renderCartOverlayName(index) {
    let cartNameRef = document.getElementById(`overlay-cart-name-${index}`);
    cartNameRef.innerHTML = cart[index].name;
    
}

function renderCartOverlayAmount(index) {
    let cartAmountRef = document.getElementById(`overlay-cart-amount-${index}`);
    cartAmountRef.innerHTML = cart[index].amount;
}

function renderCartOverlayPrice(index) {
    let cartPriceRef = document.getElementById(`overlay-cart-price-${index}`);
    let totalPrice = cart[index].price * cart[index].amount;                
    cartPriceRef.innerHTML = totalPrice.toFixed(2) + " €";
}

function renderOverlayZwischensumme() {                                        
    let total = calculateZwischensumme();                                
    let zwischensummeRef = document.getElementById('overlay-zwischensumme');    
    zwischensummeRef.innerHTML = total.toFixed(2) + " €";               
}

function renderOverlayGesamt() {
    let zwischensumme = calculateZwischensumme();
    let total = zwischensumme + 5;
    let totalRef = document.getElementById('overlay-gesamtkosten');
    totalRef.innerHTML = total.toFixed(2) + " €";
}