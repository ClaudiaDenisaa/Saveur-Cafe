# Saveur-Cafe
Elemente de web design (HTMAL, CSS, JavaScript, PHP)  (phpMyAdmin-baza e date)


## *Descriere*
<br>
Numele site -lui este Saveur Café. Este un site al unei cafenele care are
locație fizică. Orice client poate să-și facă cont și să se logheze pentru a-și
comandă o cafea sau mai multe,selectând ora la care să fie gata.Acesta
urmează să preia comanda din locatia fizică la ora pe care a selectat-o fără să
mai aștepte.


Manual site
<br>
Pentru a putea accesa site-ul,mai intâi trebuie să instalezi XAMPP pe PC.
După ce ați instalat aplicația este nevoie să apăsăți pe Manage Servers și să
apăsăți pe MySQL Database și apoi pe start , același lucru pentru Apache
Web Server.
<br>
Site ul se află în documentul htdocs din XAMPP. Pentru a accesa site ul e
nevoie să deschideți o fereastră localhost ,acolo aveți posibilitatea de a
accesa PROIECT EWD, iar apoi apăsăți fișierul logare.html.


Baza de date
<br>
Am folosit o baza de date numită ewd_savoir_cafe(http://localhost/phpmyadmin/index.php?route=/server/databases) cu patru tabele fiecare având mai multe coloane:


1.Utilizator:
<br>
• id_utilizator (cheie primara)
<br>
• nume
<br>
• parola
<br>
• telefon
<br>
• email
<br>
• comenzi


2.Comanda:
<br>
• id_comenzi (cheie primara)
<br>
• id_utilizator (cheie straina)
<br>
• ora
<br>
• ziua
<br>
• data
<br>
• pret_total
<br>
• ora_ridicare_comanda


3.Detali:
<br>
• id_detali (cheie primara)
<br>
• id_comenzi (cheie straina)
<br>
• id_produs (cheie straina)
<br>
• cantitate


4.produs:
<br>
• id_produs (cheie primara)
<br>
• nume
<br>
• pret


Funcționalitate


Un client se poate conecta cu nume și parolă,dacă nu are cont trebuie să-
și creeze unul.Când crează un cont trebuie să introducă un nume,să creeze o
parolă,să introducă numărul de telefon și emailul.Toate aceste date se vor
adaugă în baza de date în tabelul Utilizator.Pe urmă este redirecționat să se
logheze cu numele și parola.
<br>
În momentul în care acesta se logheza vom reține în localStorge id ul
utilizatorului pentru a fi folosit ulterior.După logare apare pagina
Cumpărături.Aici clientul poate selecta produse fie apăsând imaginea, fie
săgeta din dreapta .În momentul acela se va incrementa cantitatea cu 1 și
prețul produsului se va adăuga la valoarea Total care reprezintă suma totală a
tuturor produselor.Pentru a scoate un produs se va apasă pe săgeata din
stânga cantității.
<br>
La final,clientul va selecta ora la care dorește să ridice produsele din
magazinul fizic.Apoi va apasa butonul Pune comandă.Când acesta apasă
butonul, în spate se vor adăuga în baza de date, datele comenziii, în tabelul
Comandă, respective în tabelul Detalii (aici se vor adăuga fiecare produs și
cantitatea acestuia,având id ul comenzii (o comandă conține mai multe
produse).Pe ecran clientul va putea vizualiza întreaga comandă și detalile
aferente acesteia.
<br>
Putem, de asemena, să vizualizam istoricul tuturor comenzilor apăsând
Istoric comenzi din meniu(din colțul stânga de sus a paginii).Profilul clientului
cu date precum număr de telefon,email și numărul comenzilor efectuate de
acesta poate fi vizibil apăsând Profil din meniu.
Pentru a apela cafeneaua puteți prelua numărul de telefon din subsolul
paginilor.
