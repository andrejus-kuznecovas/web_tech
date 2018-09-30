# web_tech

1. Pasirinkti savo XML dokumente vieną žymę (turinčią bent vieną protėvį, ir bent vieną anūką), parašyti XPath kelią, unikaliai nueinantį prie tos žymės, ir prie to kelio prirašyti dar vieną žingsnį, naudojant šias ašis: ancestor, descendant, following-sibling, preceding-sibling, following, preceding, attribute (po vieną pavyzdį kiekvienai ašiai), mokėti paaiškinti rezultatą

    pasirinkta: playlist

## //playlist[name="All new Alt"][../@genre= "rock"]
arba
## (//playlist)[2]

ancestor::
grąžina protėvius
## (//playlist)[2]/ancestor::*

descendant:: grąžina palikuonis
## (//playlist)[2]/descendant::*

following-sibling:: grąžina sekančius tuos pačius elementus
## (//playlist)[2]/following-sibling::*

preceding-sibling::grąžina buvusius tuos pačius elementus
## (//playlist)[2]/preceding-sibling::*

following::grąžina sekančius elemetus
## (//playlist)[2]/following::*

preceding:
## (//playlist)[2]/preceding::*

attribute:
## (//playlist)[2]/preceding::*/attribute::*

2. Parašyti XPath kelią su predikatu, kurio viduje yra panaudotas XPath kelias (pvz.: rasti visas žymes A, kurių atributas x turi tokią pačią reikšmę kaip penktos dokumente žymės B atributas y; čia A, B, x, y pakeiskite į savo dokumento žymes/atributus), paaiškinti predikato veikimo principą

## //library[playlist/song/@number=//library[@genre="rock"]/playlist[@subgenre="punk"]/song/@number]/@*

output: genre : rock
        genre : hip-hop


3. Funkcijas count() ir sum() (pvz., suskaičiuoti, kiek yra tam tikrų žymių/atributų, susumuoti tam tikrų žymių turinį), gebėti paaiškinti, ką ir kodėl grąžina išraiška sum(//*)šiam XML dokumentui: <a><b>2</b><c>3</c></a> (dėstytojas pakeis XML dokumentą)

## sum(//playlist[1]/song/lenght)

## count(//library[@genre="hip-hop"]/playlist/song)


 4. Operacijas <, =, + su skirtingų tipų operandais, ir paaiškinti, kaip apliekamas automatinis tipų konvertavimas (pvz. mokėti paaiškinti, kaip apskaičiuojamas išraiškos 5 < "kuku" rezultatas).

 ## //rating < 5

 ## //playlist/@subgenre = "alternative"
 ## //song/@number= "2"

 ## not(boolean(count(//library[@genre="hip-hop"]/playlist/song)>5)) + //playlist/song/rating

5. Reikia parašyti trijų žingsnių XPath išraišką (turi būti naudojamas bent vienas predikatas ir dvi skirtingos ašys) ir į atsiskaitymą atsinešti nupieštas aibes, kurios sukuriamos kiekvieno žingsnio apdorojimo rezultate

## //song[./@number = "1"]/preceding::*[2]/text()
//song: song
        song
        song
        song
        song
        song
        song
        song
//song[./@number = "1"] :
        song
        song
        song
        song
//song[./@number = "1"]/preceding::*[2]
        name
        name
        name
        name
//song[./@number = "1"]/preceding::*[2]/text()
        #text : Punk rock powerhouse
        #text : All new Alt
        #text : Rap Mixtape
        #text : Old Thing Back


6. parašyti išraišką, su operatoriumi = arba != lyginančią:
    6.1. aibę ir skaičių,

## //rating = 4.8
    6.2. aibę ir eilutę,

## //released = "1997-10-25"
    6.3. aibę ir loginę reikšmę,

## //writers != false()
    6.4. dvi aibes

## //* = //song 
ar iš visų žymių yra tokios žymės, kurios yra //song aibėje
bei mokėti paaiškinti visais atvejais atliekamus tipų konvertavimus


7. parašyti išraišką, su operatoriais <, > lyginančią dvi aibes ir mokėti paaiškinti atliekamus automatinius tipų konvertavimus

## //rating > //lenght
