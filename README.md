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

## sum(library[@genre="hip-hop"]//lenght)
sum(/discography/library/playlist/song[position() &lt;=2]/lenght/text())
sum(/*/library[@genre = "hip-hop"/playlist/song/lenght[number(.) = number(.)]])

 4. Operacijas <, =, + su skirtingų tipų operandais, ir paaiškinti, kaip apliekamas automatinis tipų konvertavimas (pvz. mokėti paaiškinti, kaip apskaičiuojamas išraiškos 5 < "kuku" rezultatas).

5. Reikia parašyti trijų žingsnių XPath išraišką (turi būti naudojamas bent vienas predikatas ir dvi skirtingos ašys) ir į atsiskaitymą atsinešti nupieštas aibes, kurios sukuriamos kiekvieno žingsnio apdorojimo rezultate

6. parašyti išraišką, su operatoriumi = arba != lyginančią:
    6.1. aibę ir skaičių,
    6.2. aibę ir eilutę,
    6.3. aibę ir loginę reikšmę,
    6.4. dvi aibes
bei mokėti paaiškinti visais atvejais atliekamus tipų konvertavimus


7. parašyti išraišką, su operatoriais <, > lyginančią dvi aibes ir mokėti paaiškinti atliekamus automatinius tipų konvertavimus
