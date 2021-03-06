const _ = require('lodash')
let fs = require('fs')
const recto = require('./recto-stern.json')
sectionHtml = ""
let groups = []
let dates = []

_.forEach(recto, section => {
    let match
    if (_.includes(dates, section.date) === false) {
        match = findSameType(recto, section)
    }
    dates.push(section.date)
    dates = _.uniq(dates)
    if (match) {
        groups.push(match)
    }
    match = []
})

_.forEach(groups, group => {
   _.forEach(group, recto => {
        sectionHtml += entireNode(recto)
   })
})



function findSameType(list, item) {
    let result
    if (item['type'] == "verso") {
        result = _.filter(list, {
            "date": item.date,
            "type": "verso"
        })
        //_.remove(result, {"manuscript": item.manuscript})
    }

    if (item['type'] == "recto") {
        result = _.filter(list, {
            "date": item.date,
            "type": "recto"
        })
        //_.remove(result, {"manuscript": item.manuscript})
    }

    return result
}

function entireNode(recto) {
    let html = `
    <div class="section">
        <div class="bead"></div>
        <div class="content verso">
            <p></p>
            <div class="entry">
            <p>
                <span class="eng">
                
                </span>
                <span class="tlp">
                
                </span>
                <span class="deu">
                
                </span>
            </p>
            </div>
        </div>
        <div class="content recto">
            <p>${recto.manuscript} * ${recto.date}</p>
            <div class="entry">
            <p>
                <span class="eng">
                ${recto.eng}
                </span>
                <span class="tlp">
                ${recto.eng}
                </span>
                <span class="deu">
                ${recto.ger}
                </span>
            </p>
            </div>
        </div>
    </div>
    `
    return html
}




function versoHtml(versoList) {
    let ger = ''
    let eng = ''
    let manuscript = ''
    let date = ''
    _.forEach(versoList, section => {
        manuscript += `${section.manuscript} `
        ger += `<p>${section.ger}</p>`
        eng += `<p>${section.eng}</p>`
        date = section.date
    })
    let html = `
    <div class="content verso">
    <p>${manuscript} - ${date}</p>
    <div class="entry">
       <p>
          <span class="eng">
          ${eng}
          </span>
          <span class="tlp">
          ${eng}
          </span>
          <span class="deu">
          ${ger}
          </span>
       </p>
    </div>
 </div>
    `
    return html
}

function rectoHtml(rectoList) {
    let ger = ''
    let eng = ''
    let manuscript = ''
    let date = ''
    _.forEach(rectoList, section => {
        manuscript += `${section.manuscript} `
        ger += `<p>${section.ger}</p>`
        eng += `<p>${section.eng}</p>`
        date = section.date
    })
    let html = `
    <div class="content recto">
    <p>${manuscript} - ${date}</p>
    <div class="entry">
       <p>
          <span class="eng">
          ${eng}
          </span>
          <span class="tlp">
          ${eng}
          </span>
          <span class="deu">
          ${ger}
          </span>
       </p>
    </div>
 </div>
    `
    return html
}

function head() {
    const head = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ludwig Wittgenstein's Manuscript Notebooks</title>
        <link rel="stylesheet" href="style.css">
    </head>
    
    <div class="bg-img">
      <div class="header1">
        <div class="topnav">
          <a href="#contact">Contact</a>
          <a href="#ms104">MS-104</a>
          <a href="#ms103">MS-103</a>
          <a href="#ms102">MS-102</a>
          <a href="#ms101">MS-101</a>
          <a href="#about">About</a>
          <br>
        </div>
      </div>
    </div>
    
    <body>
        <div class="container">
            <div class="top-section" id="about">
                <h1><em>Ludwig Wittgenstein's Manuscript Notebooks 1914-1918</em></h1>
                <p>This site hosts an interactive copy of several manuscripts composed by Ludwig Wittgenstein between 1914-1918 (MS-101-104)
                 in their original German alongside an English translation by David Stern. This translation and markup of the <em>Notebooks</em> provides
                  a useful mapping of portions of Wittgenstein's notebooks corresponding to entries in the <em>Tractatus-Logico-Philosophicus</em>.  
                  These similarities have been represented visually and made accessible in this site through a color-coded system; portions in
                   orange correspond to portions related or similar to entries in the <em>TLP</em> while yellow and green text correspond to those portions of increasing
                    similarity to entries found in the <em>TLP</em>. 
                    To access the different layers on this page, press [E] for Stern's English translation, [D] for the original Deutsch, 
                     [T] to display <em>TLP</em> entries (both colored and in italics), and [R] to display related entries from the proto-Tractatus.
                </p>
            </div>
            <div class="timeline">
                <div class="line"></div>
                `
    return head
}

function foot() {
    const foot = `</div>
    </div>
</div>

<script src="script.js"></script>
</body>
</html>`
    return foot
}

function sanityCheck() {
    const content = `                <div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>MS-101,1r[1] * 9 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        The day before yesterday was accepted after the medical examination for military
service and assigned to the 2nd Fortress Artillery Regiment in Krak??w. Left
Vienna yesterday morning. Arriving in Krak??w this morning. Good mood. Gave my
large notebook to Trenkler for safekeeping.<a href="#_ftn2" name="_ftnref2" title=""><sup>[2]</sup></a>
Will I be able to get work done now??? Very curious about my future life!<a
href="#_ftn3" name="_ftnref3" title=""><sup>[3]</sup></a>
The military authorities in Vienna were incredibly friendly. People who were
asked thousands of questions every day gave friendly and exhaustive answers.<a href="#_ftn4" name="_ftnref4" title="">
<sup>[4]</sup></a>
Such things are tremendously encouraging. It reminded me of the English way of
doing things.<sup></sup>
        </span>
        <span class="tlp">
        The day before yesterday was accepted after the medical examination for military
service and assigned to the 2nd Fortress Artillery Regiment in Krak??w. Left
Vienna yesterday morning. Arriving in Krak??w this morning. Good mood. Gave my
large notebook to Trenkler for safekeeping.<a href="#_ftn2" name="_ftnref2" title=""><sup>[2]</sup></a>
Will I be able to get work done now??? Very curious about my future life!<a
href="#_ftn3" name="_ftnref3" title=""><sup>[3]</sup></a>
The military authorities in Vienna were incredibly friendly. People who were
asked thousands of questions every day gave friendly and exhaustive answers.<a href="#_ftn4" name="_ftnref4" title="">
<sup>[4]</sup></a>
Such things are tremendously encouraging. It reminded me of the English way of
doing things.<sup></sup>
        </span>
        <span class="deu">
        Vorgestern bei der Assentierung genommen
worden &amp; dem 2<sup>ten</sup> <span style='color:red'>Festungsartillerie-Regiment</span>
in Krakau zugeteilt. Gestern <span>vormittag</span> von Wien ab. <span>Komme</span> heute <span>vormittag</span> in Krakau
an. <a name="_Hlk39698160">Guter <span style='color:red'>Stimmung</span>. </a>Gab
mein gro??es Schreibebuch <span>Trenkler</span> zur Aufbewahrung.
Werde ich jetzt arbeiten k??nnen??? Sehr gespannt auf mein kommendes Leben! Die
Milit??rbeh??rden in Wien waren von einer unglaublichen Freundlichkeit. <span>Leute</span> die von Tausenden t??glich um Rat gefragt werden gaben
freundliche &amp; ausf??hrliche Antworten. So etwas ermutigt ungeheuer. Es
erinnerte mich an englische Verh??ltnisse.</span></p>
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,1r[2]-2r[1] * 10 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">Have been kitted out as a recruit. Little hope of being able to make use of my technical knowledge. Need a great deal of good humor and philosophy to find my way about here. When I woke up today it was as if I was in one of those dreams where you suddenly and absurdly find yourself back at school.  Of course, my position has its amusing side too and I carry out the basest duties with an almost ironic smile. Got no work done. This is a trial by fire of character precisely because so much strength is needed in order not to lose one???s good mood and energy.
        </span>
        <span class="tlp">Have been kitted out as a recruit. Little hope of being able to make use of my technical knowledge. Need a great deal of good humor and philosophy to find my way about here. When I woke up today it was as if I was in one of those dreams where you suddenly and absurdly find yourself back at school.  Of course, my position has its amusing side too and I carry out the basest duties with an almost ironic smile. Got no work done. This is a trial by fire of character precisely because so much strength is needed in order not to lose one???s good mood and energy.
        </span>
        <span class="deu">Als Rekrut eingekleidet worden. Wenig Hoffnung meine technischen Kenntnisse verwenden zu k??nnen. Brauch sehr viel gute Laune & Philosophie um mich hier zurecht zu finden. Als ich heute aufwachte /  war es mir wie in einem jener Tr??ume worin man pl??tzlich ganz unsinniger Weise wieder in der Schule sitzt. In meiner Stellung ist freilich auch viel Humor & ich verrichte die niedrigsten Dienste mit fast ironischem L??cheln. Nicht gearbeitet. Dies ist eine Feuerprobe des Charakters eben darum weil so viel Kraft dazu geh??rt die gute Stimmung & die Energie nicht zu verlieren.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,2r[2] * 11 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">Slept badly (bugs). After I swept the room we marched up to a few old mortars and were taught how to use them. Terribly hot. The food is inedible. Will perhaps sleep outside the barracks in future. Wrote to David.  Am already longing for a letter from him so as not to lose the feeling of being in touch with my former life. Haven???t got any work done yet.
        </span>
        <span class="tlp">Slept badly (bugs). After I swept the room we marched up to a few old mortars and were taught how to use them. Terribly hot. The food is inedible. Will perhaps sleep outside the barracks in future. Wrote to David.  Am already longing for a letter from him so as not to lose the feeling of being in touch with my former life. Haven???t got any work done yet.
        </span>
        <span class="deu">Schlecht geschlafen (Ungeziefer). Nachdem ich das Zimmer gekehrt hatte marschierten wir zu ein paar alten M??rsern und wurden im Gebrauch instruiert. Furchtbar hei??. Das Essen ist une??bar. Werde vielleicht in Zukunft au??erhalb der Kaserne schlafen. An David geschrieben. Sehne mich schon nach einem Brief von ihm um das Gef??hl des Kontakts mit meinem fr??heren Leben nicht zu verlieren. Noch nicht gearbeitet.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,2r[3]-3r[1] * 13 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">Met the captain the day before yesterday. Was very confused and failed to stand at attention in the military way. He was somewhat ironic and not really my cup of tea. Result = 0. Today it came out that I had passed the school leaving exam etc. whereupon some people who had done that  called me ???dear colleague??? and urged me to assert my right to volunteer. I enjoyed this. (It bucked me up. ) Heavy catarrh yesterday and today and often feeling unwell. Sometimes a little depressed. Met a lieutenant in the canteen today who noticed that I was having lunch there. He asked me very nicely what I did in ordinary life, was very surprised that they hadn't enlisted me as a one-year volunteer and was generally very friendly, which pleased me a lot.
        </span>
        <span class="tlp">Met the captain the day before yesterday. Was very confused and failed to stand at attention in the military way. He was somewhat ironic and not really my cup of tea. Result = 0. Today it came out that I had passed the school leaving exam etc. whereupon some people who had done that  called me ???dear colleague??? and urged me to assert my right to volunteer. I enjoyed this. (It bucked me up. ) Heavy catarrh yesterday and today and often feeling unwell. Sometimes a little depressed. Met a lieutenant in the canteen today who noticed that I was having lunch there. He asked me very nicely what I did in ordinary life, was very surprised that they hadn't enlisted me as a one-year volunteer and was generally very friendly, which pleased me a lot.
        </span>
        <span class="deu">Vorgestern beim Hauptmann gewesen. War sehr verdattert und stand nicht milit??rm????ig vor ihm. Er war etwas ironisch und mir nicht / recht sympathisch. Resultat = 0. Heute kam es heraus da?? ich Matura etc. gemacht hatte worauf eine ganze Reihe der Einj??hrigen mich mit Herr Kollege betitelten & auf mich eindrangen ich solle doch mein Freiwilligenrecht geltend machen. Dies machte mir Spa??(. It bucked me up). Gestern & heute starken Katarrh & oft Unwohlbefinden. Manchmal ein wenig deprimiert. Traf heute in der Kantine einen Leutnant dem es auffiel da?? ich dort zu Mittag a??. Er fragte mich sehr nett was ich im Zivil sei wunderte sich sehr da?? sie mich nicht zu den einj??hrig Freiwilligen genommen hatten & war ??berhaupt sehr freundlich was mir sehr wohl tat.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,3r[2]-5r[1] * 15 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">So much  happens that a day seems as long as a week to me. I was ordered yesterday to operate a searchlight on a ship we captured on the Vistula.  The crew are a pack of pigs! No enthusiasm, unbelievably crude, stupid, and malicious!  So it is not true, after all, that a great common cause must make men nobler. As a result, utter drudgery becomes a kind of slave labour. It is odd how people make their own work into hideous toil. In all our external circumstances, our work on this boat could be a wonderfully happy time, and instead! - It will probably be impossible to communicate with the people here  (except, perhaps, for the Lieutenant who seems to be a fairly nice person). So do your work humbly and don't lose yourself for God's sake!!!!  The easiest way to lose oneself is to want to give oneself to other people.    
        </span>
        <span class="tlp">So much  happens that a day seems as long as a week to me. I was ordered yesterday to operate a searchlight on a ship we captured on the Vistula.  The crew are a pack of pigs! No enthusiasm, unbelievably crude, stupid, and malicious!  So it is not true, after all, that a great common cause must make men nobler. As a result, utter drudgery becomes a kind of slave labour. It is odd how people make their own work into hideous toil. In all our external circumstances, our work on this boat could be a wonderfully happy time, and instead! - It will probably be impossible to communicate with the people here  (except, perhaps, for the Lieutenant who seems to be a fairly nice person). So do your work humbly and don't lose yourself for God's sake!!!!  The easiest way to lose oneself is to want to give oneself to other people.    
        </span>
        <span class="deu">Es geschieht so viel da?? mir ein Tag so lange vorkommt wie eine Woche. Bin gestern zur Bedienung eines Scheinwerfers auf einem von uns gekaperten Schiffe auf der Weichsel / beordert worden. Die Bemannung ist eine Saubande! Keine Begeisterung, unglaubliche Rohheit, Dummheit & Bosheit! Es ist also doch nicht wahr da?? die gemeinsame gro??e Sache die Menschen adeln mu??. Hierdurch wird auch die l??stigste Arbeit zum Frondienst. Es ist merkw??rdig wie sich die Menschen ihre Arbeit selbst zu einer h????lichen M??hsal machen. Unter allen unseren ??u??eren Umst??nden k??nnte die Arbeit auf diesem Schiffe eine herrliche gl??ckliche Zeit geben und statt dessen! ??? Es wird wohl unm??glich sein sich hier mit den Leuten zu verst??ndigen (au??er etwa mit dem Leutnant der ein ganz netter Mensch zu sein scheint). Also in Demut die Arbeit verrichten und sich selbst um Gottes willen nicht verlieren!!!! N??mlich am leichtesten verliert man sich / selbst wenn man sich anderen Leuten schenken will.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,5r[2] * 16 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        On the "Goplana".  Once again: The stupidity, insolence and wickedness of these people knows no bounds. Every job grows into a torment.  But I have already got work done again today and will not lose heart. Wrote a card to dear David today. Heaven protect him and maintain his friendly feelings for me! - The journey itself along the Vistula is wonderful and I'm in a good mood.
        </span>
        <span class="tlp">
        On the "Goplana".  Once again: The stupidity, insolence and wickedness of these people knows no bounds. Every job grows into a torment.  But I have already got work done again today and will not lose heart. Wrote a card to dear David today. Heaven protect him and maintain his friendly feelings for me! - The journey itself along the Vistula is wonderful and I'm in a good mood.
        </span>
        <span class="deu">
        Auf der ???Goplana???. Nochmals: Die Dummheit, Frechheit & Bosheit dieser Menschen kennt keine Grenzen. Jede Arbeit wird zur Qual. Aber ich habe heute schon wieder gearbeitet & werde mich nicht unterkriegen lassen. Schrieb heute eine Karte an den lieben David. Der Himmel besch??tze ihn & erhalte mir seine Freundschaft! ??? Die Fahrt selbst entlang der Weichsel ist herrlich & ich bin in guter Stimmung.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,5r[3]</p>
    <div class="entry">
    <p>
        <span class="eng">
        aRb3 . aRc . bSc = aR [bSc] Def
        <br>??T??
        </span>
        <span class="tlp">
        aRb3 . aRc . bSc = aR [bSc] Def
        <br>??T??
        </span>
        <span class="deu">
        aRb3 . aRc . bSc = aR [bSc] Def
        <br>??T??
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,5r[4] et 6r[1] * 17 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        A gang of crooks! Only the officers are nice people, and some really very fine. Have to sleep on bare ground and without blankets. Are in Russia now. Due to the hard work, I have become completely unsensual . Haven???t worked yet today. Good mood.  It???s too cold on deck and below there are too many men talking, screaming, stinking etc. etc.
        </span>
        <span class="tlp">
        A gang of crooks! Only the officers are nice people, and some really very fine. Have to sleep on bare ground and without blankets. Are in Russia now. Due to the hard work, I have become completely unsensual . Haven???t worked yet today. Good mood.  It???s too cold on deck and below there are too many men talking, screaming, stinking etc. etc.
        </span>
        <span class="deu">
        Ein Gaunerpack! Die Offiziere nur sind nette Menschen & zum Teil wirklich / sehr fein. M??ssen auf der blo??en Erde schlafen und ohne Decken. Sind jetzt in Ru??land. Durch die schwere Arbeit bin ich ganz unsinnlich geworden. Heute noch nicht gearbeitet. G.S..  Auf dem Deck ist es zu kalt & unten sind zu viel Menschen die sprechen, schreien, stinken etc. etc.Bos
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,6r[2] et 7r[1] * 18 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        At 1 am I???m suddenly woken up, the lieutenant asks for me and says I have to man the searchlight immediately. "Don't get dressed." I ran onto the command bridge almost naked. Icy air, rain. I was sure I???d die now. Turned the searchlight on and went back to get dressed. It was a false alarm. I was frightfully agitated & groaned out loud. I felt the horrors of war. Now (in the evening) I have got over the horror again. If I don???t lose my present orientation, I will try with all my strength to stay alive. 
        </span>
        <span class="tlp">
        At 1 am I???m suddenly woken up, the lieutenant asks for me and says I have to man the searchlight immediately. "Don't get dressed." I ran onto the command bridge almost naked. Icy air, rain. I was sure I???d die now. Turned the searchlight on and went back to get dressed. It was a false alarm. I was frightfully agitated & groaned out loud. I felt the horrors of war. Now (in the evening) I have got over the horror again. If I don???t lose my present orientation, I will try with all my strength to stay alive. 
        </span>
        <span class="deu">
        Nachts um 1 werde ich pl??tzlich geweckt, der Oberleutnant fragt nach mir & sagt ich m??sse sofort zum Scheinwerfer. ???Nicht anziehen". Ich lief fast nackt auf die Kommandobr??cke. Eisige Luft, Regen. Ich war sicher jetzt w??rde ich sterben. Setzte den Scheinwerfer in Gang & zur??ck mich anzukleiden. Es war falscher Alarm. Ich war furchtbar aufgeregt und st??hnte laut. Ich empfand die Schrecken des Krieges. Jetzt (abends) / habe ich den Schreck schon wieder ??berwunden. Ich werde mein Leben mit aller Kraft zu erhalten trachten wenn ich nicht meinen gegenw??rtigen Sinn ??ndere.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,7r[2] * 21 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        The lieutenant and I have already talked many times about all kinds of thing; a very nice man. He is able to get along with the biggest scoundrels and be friendly without compromising himself. When we hear a Chinese person we tend to take their speech for inarticulate gurgling. One who understands Chinese will perceive the language in it. In the same way, I???m often unable to perceive the human being in someone etc.    Worked a little, but without success.
        </span>
        <span class="tlp">
        The lieutenant and I have already talked many times about all kinds of thing; a very nice man. He is able to get along with the biggest scoundrels and be friendly without compromising himself. When we hear a Chinese person we tend to take their speech for inarticulate gurgling. One who understands Chinese will perceive the language in it. In the same way, I???m often unable to perceive the human being in someone etc.    Worked a little, but without success.
        </span>
        <span class="deu">
        Der Leutnant & ich haben schon oft ??ber alles M??gliche gesprochen; ein sehr netter Mensch. Er kann mit den gr????ten Halunken umgehen und freundlich sein ohne sich etwas zu vergeben. Wenn wir einen Chinesen h??ren so sind wir geneigt sein Sprechen f??r ein unartikuliertes Gurgeln zu halten. Einer der Chinesisch versteht wird darin die Sprache erkennen. So kann ich oft nicht den Menschen im Menschen erkennen etc.. Ein wenig aber erfolglos gearbeitet.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,7r[3] et 8r[1]</p>
    <div class="entry">
    <p>
        <span class="eng">
        ??(x)       (x).??x (???x).??x
        <br>??(p)       ??((??) ????)
        </span>
        <span class="tlp">
           ??(x)       (x).??x (???x).??x
        <br>??(p)       ??((??) ????)
        </span>
        <span class="deu">
        ??(x)       (x).??x (???x).??x
        <br>??(p)       ??((??) ????)
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
    <p>
    
    </p>
</div>
<div class="content recto">
    <p>Ms-101,8r[2]</p>
    <div class="entry">
    <p>
        <span class="eng">
        Will I never be able to do my work again?!! The devil alone knows. Will I ever have new ideas? All the notions distinctive of my work seem utterly ???unfamiliar???  to me. I don't see anything at all!!! 
        </span>
        <span class="tlp">
        Will I never be able to do my work again?!! The devil alone knows. Will I ever have new ideas? All the notions distinctive of my work seem utterly ???unfamiliar???  to me. I don't see anything at all!!! 
        </span>
        <span class="deu">
        Ob es jetzt f??r immer mit meinem Arbeiten aus ist?!! Das wei?? der Teufel. Ob mir nie mehr etwas einfallen wird? Ich bin mit allen den Begriffen meiner Arbeit ganz & gar "unfamili??r". Ich sehe gar nichts!!!
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p>Ms-101,8r[3] * 22 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
        Have been stuck on a sandbar for 3 days. Work, often with many interruptions, and so far completely unsuccessfully. Still can't come up with anything <u>solid</u>. Everything dissolves in fog. Go ahead!!!
        </span>
        <span class="tlp">
        Have been stuck on a sandbar for 3 days. Work, often with many interruptions, and so far completely unsuccessfully. Still can't come up with anything <u>solid</u>. Everything dissolves in fog. Go ahead!!!
        </span>
        <span class="deu">
        Stehen schon 3 Tage auf einer Sandbank. Arbeite oft mit vielen Unterbrechungen & bisher ganz erfolglos. Kann noch immer auf nichts <u>Festes</u> kommen. Alles geht in Dunst auf. Nur zu!!!
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,8r[4] * 22 August 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
          <a style="color:lightgreen">Logic must take care of itself.</a>
        </span>
        <span class="tlp">
        5.473 (1): <a style="color:lightgreen"><em>Logic must take care of itself.</a>
        </em></span>
        <span class="deu">
        Die Logik mu?? f??r sich selber sorgen.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,8r[5] et 9r[1] * 22 August 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          If syntactic rules for functions can be set up <u>at all</u>, then the whole theory of things, properties etc. is superfluous. It is also very remarkable that neither Basic Laws nor Principia Mathematica speak of such a theory. Once again: because logic must take care of itself. <a style="color:#f4ed7c">A <u>possible</u> sign must be able to signify too. Whatever is possible at all is also legitimate (permissible). Let???s remember the explanation why ???Socrates is Plato??? is nonsense. That is, because <u>we</u> have not set up an arbitrary convention, <u>not</u> because a sign is illegitimate in and of itself!</a>
          </span>
        <span class="tlp">
        5.473 (2-3): <a style="color:yellow"><em> A possible sign must also be able to signify. Everything which is possible in logic is also permitted. (???Socrates is identical??? means nothing because there is no property which is called ???identical???. The proposition is senseless because we have not made some arbitrary determination, not because the symbol is in itself unpermissible.)</a>
        </em></span>
        <span class="deu">
        Wenn sich syntaktische Regeln f??r Funktionen ??berhaupt aufstellen / lassen, dann ist die ganze Theorie der Dinge, Eigenschaften etc. ??berfl??ssig. Es ist auch gar zu auff??llig da?? weder in den ???Grundgesetzen??? noch in den ???Principia Mathematica??? von dieser Theorie die Rede ist. Nochmals: denn die Logik mu?? f??r sich selbst sorgen. Ein m??gliches Zeichen mu?? auch bezeichnen k??nnen. Alles was ??berhaupt m??glich ist, ist auch legitim || erlaubt. Erinnern wir uns an die Erkl??rung warum ???Sokrates ist Plato??? unsinnig ist. N??mlich darum weil wir eine willk??rliche Bestimmung nicht getroffen haben, aber nicht darum weil das Zeichen an und f??r sich etwa illegitim sei!
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,9r[2] et 10r[1] et 11r[1] * 25 August 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Yesterday was an awful day. The searchlight wouldn???t work in the evening. When I wanted to examine it, the crew disrupted me with jeering, shouting, etc. Wanted to examine it more closely. The platoon leader took it from my hand. I can hardly go on writing. It was terrible. I saw one thing: there is not a single decent person in the whole crew.  But what should be my future attitude towards all that? Should I simply go on suffering? And what if I don't want to do that? Then I???ll have to live in a perpetual struggle. What is better? In the second case, I would certainly wear myself out. Maybe not in the first. It will be an extremely difficult time for me from now on because I have been betrayed and sold out just as I was long ago at school in Linz. Only one thing is necessary: to be able to contemplate everything that happens to you; collect yourself!  God help me!
          </span>
        <span class="tlp">
        Yesterday was an awful day. The searchlight wouldn???t work in the evening. When I wanted to examine it, the crew disrupted me with jeering, shouting, etc. Wanted to examine it more closely. The platoon leader took it from my hand. I can hardly go on writing. It was terrible. I saw one thing: there is not a single decent person in the whole crew.  But what should be my future attitude towards all that? Should I simply go on suffering? And what if I don't want to do that? Then I???ll have to live in a perpetual struggle. What is better? In the second case, I would certainly wear myself out. Maybe not in the first. It will be an extremely difficult time for me from now on because I have been betrayed and sold out just as I was long ago at school in Linz. Only one thing is necessary: to be able to contemplate everything that happens to you; collect yourself!  God help me!
          </span>
        <span class="deu">
        Gestern ein furchtbarer Tag. Abends wollte der Scheinwerfer nicht funktionieren. Als ich ihn untersuchen wollte wurde ich von der Mannschaft durch Zurufe / Gr??len etc. gest??rt. Wollte ihn genauer untersuchen da nahm ihn der Zugsf??hrer mir aus der Hand. Ich kann gar nicht weiter schreiben. Es war entsetzlich. Das Eine habe ich gesehen: Es ist nicht ein einziger anst??ndiger Kerl in der ganzen Mannschaft. Wie aber soll ich mich in Zukunft zu dem Allen stellen? Soll ich einfach dulden? Und wenn ich das nicht tun will? Dann mu?? ich in einem fortw??hrenden Kampf leben. Was ist besser? Im 2. Fall w??rde ich mich sicher aufreiben. Im ersten vielleicht nicht. Es wird jetzt f??r mich eine enorm schwere Zeit kommen denn ich bin jetzt tats??chlich wieder so verkauft und verraten wie seinerzeit in der Schule in Linz. Nur eines ist n??tig: Alles was einem geschieht betrachten / k??nnen; sich sammeln! Gott helfe mir!
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,11r[2] * 26 August 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Yesterday, I resolved to not put up any resistance. To make my exterior very light, so to speak, to leave my interior undisturbed.
          </span>
        <span class="tlp">
        Yesterday, I resolved to not put up any resistance. To make my exterior very light, so to speak, to leave my interior undisturbed.
           </span>
        <span class="deu">
        Habe mir gestern vorgenommen keinen Widerstand zu leisten. Mein ??u??eres sozusagen ganz leicht zu machen um mein Inneres ungest??rt zu lassen.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,11r[3] * 29 August 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Every night I stand on the command bridge until about 3:30 a.m. I have not yet fully carried out my plan of complete passivity. My comrades??? malice is still terrible to me. But just stay true to yourself! Get a little work done every day, yet still without any real success. Although some things are beginning to dawn.
          </span>
        <span class="tlp">
        Every night I stand on the command bridge until about 3:30 a.m. I have not yet fully carried out my plan of complete passivity. My comrades??? malice is still terrible to me. But just stay true to yourself! Get a little work done every day, yet still without any real success. Although some things are beginning to dawn.
        </span>
        <span class="deu">
        Jede Nacht stehe ich auf der Kommandobr??cke bis etwa 3?? a.m. Mein Vorhaben der vollkommenen Passivit??t habe ich noch nicht recht ausgef??hrt. Die Niedertracht der Kameraden ist mir noch immer schrecklich. Aber nur bei sich bleiben! Arbeite t??glich etwas aber noch ohne rechten Erfolg. Obwohl schon manches aufd??mmert.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,11r[4] et 12r[1] * 2 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Every night, except yesterday, on the searchlight. I sleep during the day.<br>
          This duty is pleasant to me insofar as it takes me further away from the malice of my comrades.  Yesterday we heard about an enormous battle that has already been going on for 5 days.  If only it were decisive! Masturbated yesterday for the first time in 3 weeks. I'm almost completely unsensual. While I used to imagine conversations with a friend, this almost never happens now. Work a little bit every day but am too tired and distracted. Yesterday I started reading Tolstoy's exposition of the Gospels.  A magnificent work. But it does not yet offer me what I expected from it.
          </span>
        <span class="tlp">
        Every night, except yesterday, on the searchlight. I sleep during the day.<br>
          This duty is pleasant to me insofar as it takes me further away from the malice of my comrades.  Yesterday we heard about an enormous battle that has already been going on for 5 days.  If only it were decisive! Masturbated yesterday for the first time in 3 weeks. I'm almost completely unsensual. While I used to imagine conversations with a friend, this almost never happens now. Work a little bit every day but am too tired and distracted. Yesterday I started reading Tolstoy's exposition of the Gospels.  A magnificent work. But it does not yet offer me what I expected from it.
          </span>
        <span class="deu">
        Jede Nacht mit Ausnahme von gestern beim Scheinwerfer. Am Tag schlafe ich.<br>
        / Dieser Dienst ist mir insofern angenehm als ich dadurch der Bosheit der Kameraden mehr entzogen bin Gestern h??rten wir hier von einer enormen Schlacht die schon 5 Tage im Gang sei. W??re es nur schon die Entscheidung! Gestern zum ersten Mal seit 3 Wochen onaniert. Bin fast ganz unsinnlich. W??hrend ich mir fr??her immer Gespr??che mit einem Freund vorstellte geschieht dies jetzt fast nie. Arbeite t??glich ein ganz klein wenig bin aber zu m??de und abgelenkt. Gestern fing ich an in Tolstois Erl??uterungen zu den Evangelien zu lesen. Ein herrliches Werk. Es ist mir aber noch nicht das was ich davon erwartete.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,12r[2] et 13r[1] * 2 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          <a style="color:lightgreen">
          It must, in a certain sense be impossible for us to go wrong in logic.
          </a> This is already partly expressed by saying: Logic must take care for itself. This is an extremely profound & important insight.
          </span>
        <span class="tlp">
        5.473(2-3)**: <a style="color:lightgreen"><em>In a certain sense we cannot make mistakes in logic.</em></a>
        </span>
        <span class="deu">
        Wir m??ssen in einem gewissen Sinne uns nicht in der Logik irren k??nnen. Dies ist schon teilweise / darin ausgedr??ckt: Die Logik mu?? f??r sich selbst sorgen. Dies ist eine ungemein tiefe & wichtige Erkenntnis.
        </span>
    </p>
    </div>
</div>
</div>



<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,13r[2] * 2 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          <a style="color:#f4ed7c">
          Frege says: any well-formed sentence must make sense. And I say: any possible sentence is well-formed, and, if it doesn???t make sense, that can only be because we have not given any meaning to some of its constituents. Even if we think we have.
          </a>
          </span>
        <span class="tlp">
        5.4733 (1-2)*: 	<a style="color:#f4ed7c"><em>Frege says: Every legitimately constructed proposition must have a sense; and I say: Every possible proposition is legitimately constructed, and if it has no sense this can only be because we have given no meaning to some of its constituent parts.
        <br>(Even if we believe that we have done so.)</em>
        </a>
        </span>
        <span class="pt">
        5.3064: <a style="color:#f4ed7c"><em>Frege says: any well-formed proposition must have a sense. And I say: any possible proposition is well-formed, and, if it doesn???t make sense, that can only be because we have failed to give a meaning to some of its constituents. Even if we think we have.</em>
        </a>
        </span>
        <span class="deu">
        Frege sagt: jeder rechtm????ig gebildete Satz mu?? einen Sinn haben und ich sage: jeder m??gliche Satz ist rechtm????ig gebildet & wenn er keinen Sinn hat so kann das nur daran liegen da?? wir einigen seiner Bestandteile keine Bedeutung gegeben haben. Wenn wir auch glauben es getan zu haben.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,13r[3] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Worked yesterday, not completely unsuccessfully. Read Tolstoy with great profit.
          </span>
          <span class="tlp">
        Worked yesterday, not completely unsuccessfully. Read Tolstoy with great profit.
          </span>
        <span class="deu">
        Gestern nicht ganz erfolglos gearbeitet. In Tolstoi gelesen mit gro??em Gewinn.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,13r[3] et 14r[1] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          How can the task of philosophy be reconciled with logic???s having to look after itself? For example, if we ask: <a style="color:#ffab40">Is such and such a fact of the subject-predicate form?</a> / then we must know what we mean by the "subject-predicate form". We must know whether there is such a form at all. How can we know this? "From the signs!" But how? For we haven???t got any signs of this form. To be sure, we can say: We have signs that behave like those of the subject-predicate form, but does that prove that there really must be facts of this form? Namely: if those signs are completely analyzed. And here the question is again: Is there such a complete analysis? And if not: what is the task of philosophy then?!!?
          </span>
          <span class="tlp">
        4.1274 (2)**: <a style="color:#ffab40"><em>(So, for example, one cannot ask: ???Are there unanalyzable subject-predicate sentences????)</em></a>
        </span>
        <span class="deu">
        Wie ist es mit der Aufgabe der Philosophie vereinbar da?? die Logik f??r sich selbst sorgen soll? Wenn wir z.B. fragen: ist die & die Tatsache von der Subjekt-Pr??dikat Form / dann m??ssen wir doch wissen was wir unter der ???Subjekt-Pr??dikat Form??? verstehen. Wir m??ssen wissen ob es so eine Form ??berhaupt gibt. Wie k??nnen wir dies wissen? ???Aus den Zeichen!??? Aber wie? Wir haben ja gar keine Zeichen von dieser Form. Wir k??nnen zwar sagen: Wir haben Zeichen die sich so benehmen wie solche von der Subjekt-Pr??dikat Form, aber beweist das da?? es wirklich Tatsachen dieser Form geben mu??? N??mlich: wenn diese vollst??ndig analysiert sind. Und hier fr??gt es sich wieder: gibt es so eine vollst??ndige Analyse? Und wenn nicht: Was ist denn dann die Aufgabe der Philosophie?!!?
        </span>
    </p>
    </div>
</div>
</div>



<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,14r[2] et 15r[1] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          So we can ask ourselves: Does the subject-predicate form exist? Does the relational form exist? Do any / any of the forms exist at all that Russell and I have always spoken? (Russell would say: "Yes! Because that???s self-evident." Hah!)
          </span>
          <span class="tlp">
        So we can ask ourselves: Does the subject-predicate form exist? Does the relational form exist? Do any / any of the forms exist at all that Russell and I have always spoken? (Russell would say: "Yes! Because that???s self-evident." Hah!)
        </span>
        <span class="deu">
        Also k??nnen wir uns fragen: Gibt es die Subjekt-Pr??dikat Form? Gibt es die Relationsform? Gibt es ??berhaupt / irgend eine der Formen von denen Russell und ich immer gesprochen haben? (Russell w??rde sagen: ???ja! denn das ist einleuchtend.??? Jaha!)
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,15r[2] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          So: if everything that needs to be shown is shown by the existence of subject-predicate sentences etc. then the task of philosophy is different from what I originally assumed. But if that is not so, then what is lacking would have to be shown by some kind of experience and I consider that to be out of the question.
          </span>
          <span class="tlp">
        So: if everything that needs to be shown is shown by the existence of subject-predicate sentences etc. then the task of philosophy is different from what I originally assumed. But if that is not so, then what is lacking would have to be shown by some kind of experience and I consider that to be out of the question.
        </span>
        <span class="deu">
        Also: wenn alles was gezeigt werden braucht durch die Existenz der Subjekt-Pr??dikat S??tze etc. gezeigt wird dann ist die Aufgabe der Philosophie eine andere als ich urspr??nglich annahm. Wenn dem aber nicht so ist so m????te das Fehlende durch eine Art Erfahrung gezeigt werden und das halte ich f??r ausgeschlossen.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
   <div class="entry">
    <p>
        <span class="eng">
        
        </span>
        <span class="tlp">
        
        </span>
        <span class="deu">
        
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,15r[3] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          The obscurity obviously resides in the question ???What does the logical identity of a sign and what it signifies really consist in????! And this question is (once again) a principal way of framing the whole philosophical problem.
          </span>
          <span class="tlp">
        The obscurity obviously resides in the question ???What does the logical identity of a sign and what it signifies really consist in????! And this question is (once again) a principal way of framing the whole philosophical problem.
        </span>
        <span class="deu">
        Die Unklarheit liegt offenbar in der Frage worin eigentlich die logische Identit??t von Zeichen und Bezeichnetem besteht! Und diese Frage ist (wieder) eine Hauptansicht des ganzen philosophischen Problems.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p>Ms-101,16v[2] * 4 September 1914 </p>
   <div class="entry">
    <p>
        <span class="eng">
        Things are moving! ??? Pluck up courage!  - Work hard.
        </span>
        <span class="tlp">
        Things are moving! ??? Pluck up courage!  - Work hard.
        </span>
        <span class="deu">
        Es geht! ??? Nur Mut! ??? Arbeite viel.
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,16r[1] et 17r[1] * 3 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          Consider some philosophical question, such as whether "A is good" is a subject-predicate proposition; or whether "A is brighter than B" is a relational proposition. How can such a question be resolved at all? What kind of evidence can reassure me that - for example - the first question must be answered in the affirmative? (This is an exceptionally important question). Is the only evidence here once again that extremely dubious "self-evidence"? Let's take a very similar question, which is however simpler & more fundamental, namely this one: Is a point in our visual field a "simple object", a thing? Up to now, I have always regarded such questions as the real philosophical ones - and they surely are in some sense - but / once again: what evidence could resolve such a question? Isn't there a mistake in the formulation of the qustion here, for it seems to me that nothing at all were self-evident to me about this question; it seems to me that I can say with certainty that these questions could never be resolved at all.
          </span>
          <span class="tlp">
        Consider some philosophical question, such as whether "A is good" is a subject-predicate proposition; or whether "A is brighter than B" is a relational proposition. How can such a question be resolved at all? What kind of evidence can reassure me that - for example - the first question must be answered in the affirmative? (This is an exceptionally important question). Is the only evidence here once again that extremely dubious "self-evidence"? Let's take a very similar question, which is however simpler & more fundamental, namely this one: Is a point in our visual field a "simple object", a thing? Up to now, I have always regarded such questions as the real philosophical ones - and they surely are in some sense - but / once again: what evidence could resolve such a question? Isn't there a mistake in the formulation of the qustion here, for it seems to me that nothing at all were self-evident to me about this question; it seems to me that I can say with certainty that these questions could never be resolved at all.
        </span>
        <span class="deu">
        Es sei eine Frage der Philosophie gegeben: etwa die ob ??? A ist gut??? ein Subjekt-Pr??dikat Satz sei; oder die ob ???A ist heller als B??? ein Relationssatz3 sei! Wie l????t sich so eine Frage ??berhaupt entscheiden?! Was f??r eine Evidenz kann mich dar??ber beruhigen da?? ??? zum Beispiel ??? die erste Frage bejaht werden mu??? (Dies ist eine ungemein wichtige Frage). Ist die einzige Evidenz hier wieder jenes h??chst zweifelhafte ???Einleuchten????? Nehmen wir eine ganz ??hnliche Frage die aber einfacher & grundlegender ist; n??mlich diese: ist ein Punkt in unserem Gesichtsbild ein ???einfacher Gegenstand???4, ein Ding? Solche Fragen habe ich doch bisher immer als die eigentlichen philosophischen angesehen ??? und sie sind es auch gewi?? in einem Sinne ??? aber / nochmals: welche Evidenz k??nnte so eine Frage ??berhaupt entscheiden? Ist hier nicht ein Fehler in der Fragestellung denn es scheint als leuchtete mir ??ber diese Frage gar nichts ein; es scheint als k??nnte ich mit Bestimmtheit sagen, da?? diese Fragen ??berhaupt nie entschieden werden k??nnten.
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p>Ms-101,17v[2] * 5 September 1914 </p>
   <div class="entry">
    <p>
        <span class="eng">
        I am on my way to a great discovery. But will I get there?! Am more sensual than before. Masturbated again today.  It's icy and stormy outside. Am lying on the straw on the ground, writing and reading on a small wooden case (price 2.50 crowns).
        </span>
        <span class="tlp">
        I am on my way to a great discovery. But will I get there?! Am more sensual than before. Masturbated again today.  It's icy and stormy outside. Am lying on the straw on the ground, writing and reading on a small wooden case (price 2.50 crowns).
        </span>
        <span class="deu">
        Ich bin auf dem Wege zu einer gro??en Entdeckung. Aber ob ich dahingelangen werde?! Bin sinnlicher / als fr??her. Heute wieder onaniert. Drau??en ist es eisig & st??rmisch. Ich liege auf dem Stroh am Boden & schreibe & lese auf einem kleinen Holzkoffer (Preis 2??50 Kronen).
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,17r[2] * 4 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          If the existence of the subject-predicate sentence does not show everything necessary, then it could surely only be shown by the existence of some specific fact of that form. And knowing such a fact cannot be essential for logic.
          </span>
          <span class="tlp">
        If the existence of the subject-predicate sentence does not show everything necessary, then it could surely only be shown by the existence of some specific fact of that form. And knowing such a fact cannot be essential for logic.
        </span>
        <span class="deu">
        Wenn nicht die Existenz des Subjekt-Pr??dikat Satzes alles N??tige zeigt dann k??nnte es doch nur die
        Existenz irgend einer besonderen Tatsache jener Form zeigen. Und die Kenntnis einer solchen kann nicht f??r die Logik wesentlich sein.
        </span>
    </p>
    </div>
</div>
</div>


<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p></p>
   <div class="entry">
    <p>
        <span class="eng">
        </span>
        <span class="tlp">
        </span>
        <span class="deu">
        </span>
    </p>
    </div>
</div>
<div class="content recto">
    <p>Ms-101,17r[3] et 18r[1] * 5 September 1914</p>
    <div class="entry">
    <p>
        <span class="eng">
          Suppose we had a sign that really was of the subject-predicate form, would this be somehow more suitable for expressing subject-predicate propositions than our subject-predicate sentences are? It seems not! / Does this arise from the signifying relation?
          </span>
          <span class="tlp">
        Suppose we had a sign that really was of the subject-predicate form, would this be somehow more suitable for expressing subject-predicate propositions than our subject-predicate sentences are? It seems not! / Does this arise from the signifying relation?
        </span>
        <span class="deu">
        Gesetzt den Fall wir h??tten ein Zeichen das wirklich von der Subjekt-Pr??dikat Form w??re, w??re dieses f??r den Ausdruck von Subjekt-Pr??dikat S??tzen irgendwie geeigneter als unsere Subjekt-Pr??dikat S??tze? Es scheint nein! / Liegt das an der bezeichnenden Relation?
        </span>
    </p>
    </div>
</div>
</div>

<div class="section">
<div class="bead"></div>
<div class="content verso">
    <p>Ms-101,18v[2] * 6 September 1914 </p>
   <div class="entry">
    <p>
        <span class="eng">
        Still being tormented by most of the comrades, as before. I still haven't found any response to it that would be satisfactory. I have not yet opted for outright passivity. And that's probably foolish, because I'm powerless against all these men. I wear myself out uselessly if I defend myself.
        </span>
        <span class="tlp">
        Still being tormented by most of the comrades, as before. I still haven't found any response to it that would be satisfactory. I have not yet opted for outright passivity. And that's probably foolish, because I'm powerless against all these men. I wear myself out uselessly if I defend myself.
        </span>
        <span class="deu">
        Werde von den meisten Kameraden nach wie vor gequ??lt. Ich habe noch immer kein Verhalten dagegen gefunden das zufriedenstellend w??re. Zur vollkommenen Passivit??t habe ich mich noch nicht entschlossen. Und wahrscheinlich ist das eine Torheit; denn ich bin ja gegen alle diese Menschen ohnm??chtig. Ich reibe mich nutzlos auf wenn ich mich wehre.
        </span>
        </p>
    </div>
</div>
<div class="content recto">
    <p> Ms-101,18r[2] * 4 September 1914 </p>
    <div class="entry">
    <p>
        <span class="eng">
          If logic can be completed without answering certain questions then it must be completed without answering them.
          </span>
          <span class="tlp">
        If logic can be completed without answering certain questions then it must be completed without answering them.
        </span>
        <span class="deu">
        Wenn sich die Logik ohne die Beantwortung gewisser Fragen abschlie??en l????t dann mu?? sie ohne sie abgeschlossen werden.
        </span>
    </p>
    </div>
</div>`
return content
}

function writeFile() {
    let html = head()
    html += sectionHtml
    //html += sanityCheck()
    html += foot()
    fs.writeFile('index.html', html, function(err) {
        if (err) return console.log(err);
        console.log('worked');
    })
}

writeFile()