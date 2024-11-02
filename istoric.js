
document.addEventListener('DOMContentLoaded', function() {
    const id_utilizator = localStorage.getItem('sesiune');
    
    if (!id_utilizator) {
        console.error('ID utilizator lipsă.');
        return;
    }

    fetch('istoric.php', {
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
            const comenzi = data.data;
            const tabel = document.getElementById('table').querySelector('tbody');
            tabel.innerHTML = '';

            comenzi.forEach(comanda => {
                const trComanda = document.createElement('tr');
                const tdComanda = document.createElement('td');
                tdComanda.colSpan = 3;
                tdComanda.innerHTML = `
                    <br><br><br><strong style="text-shadow: 2px 2px 5px rgba(42, 40, 40, 0.81);">Comanda #${comanda.id_comenzi}</strong><br>
                    Data: ${comanda.data}<br>
                    Ora: ${comanda.ora}<br>
                    Ziua: ${comanda.ziua}<br>
                    Pret Total: ${comanda.pret_total}<br>
                    Ora Ridicare: ${comanda.ora_ridicare_comanda}<br><br>
                `;
                trComanda.appendChild(tdComanda);
                tabel.appendChild(trComanda);

                comanda.produse.forEach(produs => {
                    const trProdus = document.createElement('tr');
                    trProdus.innerHTML = `
                      
                        <td style="color: grey;">${produs.nume_produs}</td>
                        <td style="color: grey;">${produs.pret_produs}</td>
                        <td style="color: grey;">${produs.cantitate}</td>
                    `;
                    tabel.appendChild(trProdus);
                });
            });
        } else {
            document.getElementById('table').querySelector('tbody').innerHTML = '<tr><td colspan="3">Nu s-au găsit comenzi pentru acest utilizator.</td></tr>';
        }
    })

});