document.addEventListener('DOMContentLoaded', function() {
    const id_utilizator = localStorage.getItem('sesiune');
    
    if (!id_utilizator) {
        console.error('ID utilizator lipsă.');
        return;
    }

    fetch('status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_utilizator: id_utilizator }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Răspuns JSON:', data);
        if (data.success) {
            const comanda = data.data[0];
            const tabel = document.getElementById('table').querySelector('tbody');
            tabel.innerHTML = '';

            const trComanda = document.createElement('tr');
            const tdComanda = document.createElement('td');
            tdComanda.colSpan = 3;
            tdComanda.innerHTML = `
                <strong style="text-shadow: 2px 2px 5px rgba(42, 40, 40, 0.81);">Comanda #${comanda.id_comenzi}</strong><br>
                Data: ${comanda.data}<br>
                Ora: ${comanda.ora}<br>
                Ziua: ${comanda.ziua}<br>
                Pret Total: ${comanda.pret_total}<br>
                Ora Ridicare: ${comanda.ora_ridicare_comanda}<br><br>
                <button id="pickupButton" style="background-color: red;">Ridică comanda</button><br><br>
            `;
            trComanda.appendChild(tdComanda);
            tabel.appendChild(trComanda);

            comanda.produse.forEach(produs => {
                const trProdus = document.createElement('tr');
                trProdus.innerHTML = `
                    <td>${produs.nume_produs}</td>
                    <td>${produs.pret_produs}</td>
                    <td>${produs.cantitate}</td>
                `;
                tabel.appendChild(trProdus);
            });

            const pickupButton = document.getElementById('pickupButton');
            const oraRidicare = new Date(comanda.ora_ridicare_comanda);
            const now = new Date();
            const timeDifference = oraRidicare.getTime() - now.getTime() - 10 * 60 * 1000;

            if (timeDifference > 0) {
                setTimeout(() => {
                    pickupButton.style.backgroundColor = 'green';
                    pickupButton.textContent = 'Comanda este gata pentru ridicare';
                }, timeDifference);
            } else {
                pickupButton.style.backgroundColor = 'green';
                pickupButton.textContent = 'Comanda este gata pentru ridicare';
            }
        } else {
            document.getElementById('table').querySelector('tbody').innerHTML = '<tr><td colspan="3">Nu s-au găsit comenzi pentru acest utilizator.</td></tr>';
        }
    });
});
