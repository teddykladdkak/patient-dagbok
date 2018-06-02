# PatientDagboken
## Vär är detta
Detta är ett projekt som ämnar skapa en patientdagbok som fungerar oavsett var patienten är i vårdprocessen. Målet är att ge patient information i samma portal som inte är journal.

PatientDagbokens huvudsyfte är att vara attraktiv för både patient och vårdpersonal att använda.

## Bakgrund
Patientdagböcker är något som arbetats med under flertalet år, men då i analogt format. IVA är den verksamhet som kommit längst med dagbok skrivande. Dock är det viktigt att förstå skillnaden, det är IVAs vårdpersonal som skriver i patientens dagbok och inte patienten.

Senaste åren har flertalet avdelningar, verksamheter börjat arbeta med digitala lösningar. Alla försökt lösa problemen på sitt sätt. Många lösningar idag är specifikt utvecklade för en avdelning eller verksamhet och svåra att implementera på andra avdelningar eller landsting. Många är kopplade till patientorganisationen med sin specifika patientkategori.

I och med sökmotorer och sociala medier idag söker ofta patienter på sina besvär/diagnoser. Informationsfoldrar läses inte i lika stor utsträckning längre och vårdpersonalen behöver ett medium där de kan hänvisa patienten till rätt information. 

## Vyer
### Dagbok vyn
Applikationen bygger på att patienten har en dagboksvy där den har möjlighet att skriva själv.
### Vårdpersonal vyn
Applikation för vårdpersonalen, där färdigskrivna mallar finns som kan klistras in i patientens dagbok.
### Malljustering
Verktyg där vårdpersonalen själva ska ha möjlighet att justera och ändra informationen utifrån sin avdelning/mottagning m.m. Möjlighet att justera mallar men även informationssidor.

## Teknik
### Socket.io
Kopplingen med Dagboksvyn och Vårdpersonalens vy sker med hjälp av "Socket.io" (https://socket.io/).
### Stanford Javascript Crypto Library
För att kommunikation och information ska säkras får patienten välja en fyrsiffrig kod som används för att kryptera all information från patienten med "Stanford Javascript Crypto Library" (https://bitwiseshiftleft.github.io/sjcl/).
### Klickbaserad dokumentation
Egenutvecklad teknik/lokig vilket användts i mina tidigare projekt. Stommen är VIPS och bakom utarbetad information som används till vardags.
### QR-läsare
För att vårpersonalen ska kunna skicka information till patientens dagbok, behöver de dagbokens för tillfället unika ID, detta får vårdpersonalen genom att scanna QR-koden. För detta används instascan.js (https://github.com/schmich/instascan) som enbart verkar lokalt och är inte i behov av serverlogik. Denna teknik stödjs i nuläget enbart av Android (inte IOS) och datorer.
### Font Awsome
För att skapa en minimalistisk design används Font Awsome (https://fontawesome.com/).

## Säkerhet
All information lagras lokalt på patientens enhet. Ingen information skickas utanför telefonen och det är upp till patienten själv att bestämma ifall den vill delge vårdpersonalen sin information.

All information som lagras lokalt och är skrivet av patienten, genererat av bedömningsstöd eller skickat av vårdpersonal krypteras med patientens eget valda lösenord. Det som inte krypteras på enheten är informationssidorna.

Glömmer patienten bort sitt lösenord finns det ingen möjlighet att få tillbaka informationen.

Lösenord sparas så länge sidan är öppen. Stängs den ner glöms lösenordet och patienten behöver skriva in den igen.

För att kommunikation ska kunna ske mellan vårpersonalens applikation och patientens behövs dagbokens unika ID vilket ändras var gång sidan uppdateras.

## Mål/Syfte
* Attraktivt för patienten att använda.
* Attraktivt för vårdpersonal att använda.
* Möjlighet att använda olika språk.
* Möjlighet för vårdavdelningen att justera sin information och mallar.
* Tillgängligt för alla med dator, platta eller smartphone.
* Stärka informationsutbytet mellan patient och vårdpersonal.
* Möjlighet att referera patienten till rätt informationskälla.

Detta projekt ämnar att om den faller ut väl att bli en produkt, men även att inspirera andra som jobbar med digitala dagbokslösningar.

## Kvar att göra
* Skriva färdigt detta Readme dokumentet, översätta till engelsk version.
* Testa Personalapplikationen och QR läsaren på en Android telefon.
* Testa dagboken en längre tid.
* Skapa en grundmall och översätt till några språk.
* Att göra lista i PatientDagboken - Så patient kan skriva upp saker som de vill ta upp på ronden.
* Offline funktion för Dagboksvyn.
* Design/Stil/CSS, mobil och datoranpassad.
* Sökfunktion i dagboken.
* Inlogg för vårdpersonal, så de kommer åt sina specifika mallar och informationssidor.
* Malljusterings verktyget.
* Ta bort modal lösning och ersätt med helvy av iframe. Alt enbart göra det för sidor som behöver iframe formatet och ha kvar på bilder & filmer.

## Sponsorer
I nuläget finns inga sponsorer för detta projektet.
