document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product img').forEach(img => {
        img.addEventListener('click', function() {
            const productName = this.getAttribute('name');
            const quantityElement = document.querySelector(`.quantity-value[name="${productName}"]`);
            updateQuantity(quantityElement, 1);
            updateTotal(this, 1);
        });
    });
});


function decreaseQuantity(element) {
    const productName = element.getAttribute('data-product');
    const quantityElement = document.querySelector(`.quantity-value[name="${productName}"]`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) { 
        updateQuantity(quantityElement, -1);
        updateTotal(document.querySelector(`.product img[name="${productName}"]`), -1);
    }
}


function increaseQuantity(element) {
    const productName = element.getAttribute('data-product');
    const quantityElement = document.querySelector(`.quantity-value[name="${productName}"]`);
    updateQuantity(quantityElement, 1);
    updateTotal(document.querySelector(`.product img[name="${productName}"]`), 1);
}


function updateQuantity(quantityElement, increment) {
    let quantity = parseInt(quantityElement.textContent);
    quantity += increment;
    quantity = Math.max(quantity, 0); 
    quantityElement.textContent = quantity;
}


function updateTotal(img, increment) {
    const price = parseFloat(img.getAttribute('data-price'));
    const totalAmountElement = document.getElementById('total-amount');
    let currentTotal = parseFloat(totalAmountElement.textContent);
    currentTotal += price * increment;
    currentTotal = Math.max(currentTotal, 0);
    totalAmountElement.textContent = currentTotal.toFixed(2);
}




function generareOptiuni() {
    var selectElement = document.getElementById("ore");
    selectElement.innerHTML = ""; 

    var interval = 15;
    var oraStart = 7; 
    var oraStop = 16; 
    var minutStart = 0; 
    var minutStop = 45; 

    for (var ora = oraStart; ora <= oraStop; ora++) {
        var minutMax = (ora === oraStop) ? minutStop : 59;
        for (var minut = minutStart; minut <= minutMax; minut += interval) {
            var oraText = ora.toString().padStart(2, '0'); 
            var minutText = minut.toString().padStart(2, '0'); 
            var timp = oraText + ":" + minutText;
            var option = new Option(timp, timp);
            selectElement.add(option);
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    generareOptiuni(); // Apeleaz funcția când pagina este complet încărcată
});


//prelucrare date dupa plasarea comenzii
function add_comand(){
   
    var ora_selectata = document.getElementById("ore").value;
    var totalAmount = parseFloat(document.getElementById("total-amount").innerText);

    if (totalAmount === 0) {
        window.alert("Alegeți cel puțin un produs!\nOra selectată: " + ora_selectata);
        return; 
    }
    

    const now = new Date();
    const ora_ = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ora = `${ora_}:${min}`;

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');  
    const year = now.getFullYear();
    const data = `${year}-${month}-${day}`;

    const ziua = now.toLocaleDateString('ro-RO', { weekday: 'long' });

    const products = document.querySelectorAll('.product');
    const orderDetails = [];


      products.forEach(product => {
        const img = product.querySelector('img');
        const id_produs = img.getAttribute('data-product-id');
        const nume_produs = img.getAttribute('name');
        const pret = img.getAttribute('data-price');
        const cantitateElement = document.querySelector(`.quantity-value[name="${nume_produs}"]`);
        const cantitate = parseInt(cantitateElement.textContent);

        if (cantitate > 0) {
            orderDetails.push({
                id: id_produs,
                nume: nume_produs,
                cantitate: cantitate,
                pret: pret
            });
        }
    });


    const id_sesiune=localStorage.getItem('sesiune');
    const dataToSend = {
        id_utilizator:id_sesiune,
        ora: ora,
        ziua: ziua,
        data: data,
        pret_total: totalAmount,
        ora_ridicare_comanda: ora_selectata,
        orderDetails: orderDetails
    };

fetch('cont.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
})
.then(response => response.json())
.then(response => {
    if (response.success === true) {
        window.alert("Comanda dumneavoastră a fost finalizată cu succes!");
        let orderMessage = '';
        orderMessage += "Ora: " + ora + "\n\n";
        orderMessage += "Data: " + data + "\n\n";
        orderMessage += "Ziua: " + ziua + "\n\n";
        orderMessage += `Ora selectată pentru a ridica comanda: ` + ora_selectata + `\n\n`;
        orderMessage += `Produsele:\n\n`;
        orderDetails.forEach(product => {
            orderMessage += `- ${product.nume}, cantitate: ${product.cantitate}, preț per bucata: ${product.pret} lei` + `\n\n`;
        }); 
        orderMessage += `Total: ${totalAmount.toFixed(2)} lei\n\n`;
        window.alert(orderMessage);
        window.alert("Echipa vă transmite o zi voioasă la o cafea savuroasă!");

        window.location.reload();
    } else {window.alert("response.succes::::  " + response.succes);
        window.alert("Eroare la plasarea comenzii: " + response.message);
    }
})
.catch(error => {
    window.alert("Eroare la comunicarea cu serverul. Vă rugăm să încercați din nou mai târziu.");
});

}
