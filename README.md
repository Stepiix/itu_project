# Projekt naší aplikace owesme pro rozdělování peněz
Tento projekt byl vytvořen v rámci předmětu "Tvorba uživatelských rozhraní" a slouží k dokumentaci a správě návrhu a implementace členů týmu.

# Video s vysvětlením aplikace

https://youtu.be/_A-sM7p1xNs

# Popis instalace

Pro správný běh aplikace je nutné mít nainstalovaný Angular a Laravel.

Pro instalaci frontendu je potřeba přejít do složky src a pote frontend a zadat příkaz "npm install"
a poté pro spuštění frontendu "ng serve".

Pro instalaci backendu je nutné přejít do složky src a pote backend a následně zadat příkaz "composer install"

Před spuštěním backendu je také potřeba ve složce backend vytvořit soubor se jménem .env a zkopírovat do něj obsah souboru .env.example a poté změnit řádky s nastavením databáze na tyto řádky.

	DB_CONNECTION=mysql
	DB_HOST=mysql-owesmedb-owesmeapp.a.aivencloud.com
	DB_PORT=17052
	DB_DATABASE=defaultdb
	DB_USERNAME=avnadmin
	DB_PASSWORD=AVNS_X3fw1ydNZyojJs4__mq



a poté ve složce backend pro spuštění backendu "php artisan serve".

Webovou stránku můžete otevřít na http://localhost:4200/


Testovací účty na které je možné se přihlásit:

	email: l@c
	heslo: 123456

	email: f@v
	heslo: 123456
