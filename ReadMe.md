Det här arbetet utdelades till oss i syfte att lära oss om SQL och databaser.
Jag har följt instruktionerna och inte gjort så mycket anmärkningsvärt utöver
en annorlunda still på stilen av sidan (CSS), och har i slutändan en sida där
man kan:
    skapa en qveet
    redigera qveets
    radera qveets
Jag missade lektionen om delete delen i CRUD, men jag frågade klasskamrater om
vad vi gjort den lektionen, och jag fick det att fungera med allt annat, därför
är jag ganska säker på att det inte är något som jag har missat, men det kan
vara viktigt att nämna ändå.

De routes jag har gjort är relativt enkla att förklara. Jag har en route för
sidans "frontpage" ("/") där alla tweets från databasen skrivs ut i ett format.
Sedan har jag så klart en get route för sidan som skapar en qveet och en post
för att lägga upp den.
För att radera en qveet har jag en get route som tar id från den qveet man vill
radera, och sedan en post route som skickar uppdateringen om att qveeten har
blivit raderad.
Redigeringen fungerar väldigt lika, med en get route som tar id från den qveet
man vill redigera och skickar en till en sida där man får se qveeten och ändra
den för att sedan uppdatera den med en post route.

Något som jag gärna hade lagt till som inte finns i min qvitter sida just nu, är
funktionen att även kunna skapa och radera andra användare, vilket jag inte tror
skulle vara så svårt att göra eftersom att jag redan gjort samma sak med qveets.
Jag hade bara behövt ändra SQL frågan egentligen.

Några positiva erfarenheter jag har fått av det här arbetet är att jag känner att
jag på någon bas nivå förstår hur SQL och tableplus fungerar. Kanske inte så att
jag skulle kunna göra om allt själv utan att ta hjälp, men jag hade definitivt
haft mindre frågor. Eftersom att vi arbetat med routes i nästan varje arbete som
vi haft i denna kurs, så känner jag även att jag förstår mig på routes och hur de
jobbar tillsammans bättre efter all repetition.

Just det här med id och hur man kopplar ihop MySQL (tableplus) databasen med sidan
är jag inte helt hundra på så jag skulle nog helst lära mig det.