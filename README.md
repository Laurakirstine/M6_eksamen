# Navn: Opgaveplanner 
## Version 1.0

## Beskrivelse
Dette er Nanna og Lauras projekt til M6 eksamen
Vores projekt er en opgaveplanner som er en webapplikation udviklet til at oprette og holde styr på opgaver. Systemet anvender Google Firebase Firestore som database til datalagring og real-time synkronisering.

## Indhold
Opgaveplanner er opbygget af
+ 5 html filer
+ 2 JavaScript filer
+ 1 CSS fil
+ 1 Google Firestore database

Opgaveplanner indeholder følgende funktioner:
+ Opret nye opgaver
+ Tilføj titel, beskrivelse og deadline
+ Markér opgaver som færdige eller igangværende
+ Slet opgaver
+ Naviger mellem:
   - Alle opgaver
   - Igangværende opgaver
   - Afsluttede opgaver
   - Tilføj opgave
+ Sortering af opgaver
   - Alfabetisk
   - Dato (stigende)
   - Dato (faldende)
+ Realtidsopdatering og lagring via Google Firestore

## Installering
+ Klon repositoriet
+ Installer udvidelsen "Live Server" i VS Code
+ Højreklik på index.html eller opgaveplanner.html i mappen SRC/websider/
+ Vælg "Open with Live Server"

### Database integration
Applikationen forbinder til en Firebase Firestore-database. Konfigurationen findes i `SRC/firebaseconfig.js`

## Brug

### Navigering

Applikationen har en navigationsmenu med fire hovedsider:

1. **Opgaveplanner** - Oversigt over alle dine opgaver med sorteringsindstillinger
2. **Tilføj Opgave** - Formular til at oprette nye opgaver
3. **Igangværende Opgaver** - Viser kun opgaver, der ikke er afsluttede
4. **Afsluttede Opgaver** - Viser kun afsluttede opgaver

### Opret en ny opgave

1. Klik på "Tilføj Opgave" i navigationsmenu
2. Udfyld følgende felter:
   - Titel: Opgavens navn
   - Beskrivelse: Beskrivelse af opgaven
   - Deadline: Vælg en deadline-dato
3. Klik "Tilføj opgave"
4. Du vil se en bekræftelsesmeddelelse
5. Opgaven tilføjes i databasen

### Se dine opgaver

1. Gå til "Opgaveplanner" for at se alle opgaver
2. Brug sorteringsmuligheder:
   - Ingen sortering: Opgaver i oprettelses rækkefølge
   - Alfabetisk: Sorteret efter titel
   - Dato (tidligste først): Sorteret efter deadline
   - Dato (seneste først): Sorteret efter deadline

### Opdater en opgaves status

- Klik på en opgaves afkrydsningsfelt i listen for at markere den som fuldført/ikke-fuldført
- Opgavens status opdateres straks i databasen

### Slet en opgave

- Find opgaven i listen
- Klik på slet-knappen
- Opgaven fjernes permanent

### Filtrer opgaver

- Igangværende Opgaver: Viser kun opgaver, der ikke er markeret som fuldført
- Afsluttede Opgaver: Viser kun opgaver, der er markeret som fuldført

## Forfattere

Nanna og Laura - M6 eksamenprojekt


