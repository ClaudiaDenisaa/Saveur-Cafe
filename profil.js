document.addEventListener('DOMContentLoaded', function() {
    const id_sesiune = localStorage.getItem('sesiune');
    fetch('profil.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_sesiune: id_sesiune }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('EROARE! Cererea AJAX a eșuat.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            const user = data.data;
            document.getElementById('raspuns').innerHTML = `
                <div id="numele"><h1>Bine te-am găsit ${user.nume}</h1><div>
                <table id="tabel">
                    <tr><td id="text">Numărul de telefon: ${user.telefon}</td></tr>
                    <tr><td id="text">Email: ${user.email}</td></tr>
                    <tr><td id="text">Numărul comenzilor: ${user.comenzi}</td></tr>
                </table>
            `;
        } else {
            document.getElementById('raspuns').innerHTML = data.data.error;
        }
    })
    .catch(error => {
        console.error('A apărut o eroare:', error.message);
        document.getElementById('raspuns').innerHTML = 'A apărut o eroare: ' + error.message;
    });
});
