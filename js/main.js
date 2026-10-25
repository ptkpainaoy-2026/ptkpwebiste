/* ====== EDIT THESE ====== */
var CONFIG = {
  phone: "358400370275",
  email: "ptkpaina@gmail.com",
  confirmEmail: false,   // set to true AFTER the Google Form auto-reply script is installed (then the thank-you box also says a confirmation email was sent)
  facebook: "https://www.facebook.com/",   // paste PTKP Aina Oy Facebook page link
  instagram: "https://www.instagram.com/", // paste Instagram profile link
  // EASY SETUP: paste the Google Form "pre-filled link" here (Form > ⋮ > Get pre-filled link, with all 8 questions filled in).
  // The website then finds the form address and all 8 entry ids by itself. Leave "" to use the manual settings below.
  prefilledLink: "https://docs.google.com/forms/d/e/1FAIpQLSejic0utd-BM1YjjAl4FTaGKC4N7wuojJ_m8gVrruhMaTDgkg/viewform?usp=pp_url&entry.1802199988=dhana&entry.1752453211=dhana@gmail.com&entry.246135523=%2B358449329747&entry.1471687547=Plumbing&entry.1934949963=malimi&entry.542085198=hasfhsaoh&entry.606514811=jasj.dka&entry.1398241750=Email",
  // MANUAL SETUP (only if you do not use prefilledLink): paste the formResponse URL and the 8 entry ids.
  // Leave url empty and the website will open the visitor's email app instead.
  gform: {
    url: "",
    name: "entry.1111111111", email: "entry.2222222222", phone: "entry.3333333333",
    service: "entry.4444444444", location: "entry.5555555555", subject: "entry.6666666666",
    message: "entry.7777777777", method: "entry.8888888888"
  }
};
/* ======================== */
/* Auto-read form address and entry ids from the pre-filled link (order = order of the 8 questions) */
(function(){var g=CONFIG.gform;
  if(!g.url&&CONFIG.prefilledLink){
    try{
      var u=new URL(CONFIG.prefilledLink),ids=[];
      u.searchParams.forEach(function(v,k){if(/^entry\.\d+$/.test(k))ids.push(k)});
      // Only switch the form on when all 8 question ids were found; otherwise keep the email fallback.
      if(ids.length>=8){
        g.url=u.origin+u.pathname.replace(/\/(viewform|prefill|formResponse)$/,"")+"/formResponse";
        ["name","email","phone","service","location","subject","message","method"].forEach(function(k,i){g[k]=ids[i]});
      }
    }catch(e){}
  }
})();
document.querySelectorAll("[data-wa]").forEach(function(a){a.href="https://wa.me/"+CONFIG.phone});
/* social links: show only when a real page link is set (the bare site address is a placeholder) */
[["data-fb",CONFIG.facebook,/^https?:\/\/(www\.)?facebook\.com\/?$/i],["data-ig",CONFIG.instagram,/^https?:\/\/(www\.)?instagram\.com\/?$/i]].forEach(function(x){
  document.querySelectorAll("["+x[0]+"]").forEach(function(a){
    if(!x[1]||x[2].test(x[1])){var h=a.closest("p")&&a.closest("p").textContent.trim().length<60?a.closest("p"):a;h.style.display="none"}
    else a.href=x[1]})});
var m=document.querySelector(".menu"),n=document.querySelector(".nav");
m.addEventListener("click",function(){var o=n.classList.toggle("open");m.setAttribute("aria-expanded",o)});
var f=document.getElementById("enquiry");
if(f){
  var q=new URLSearchParams(location.search).get("service");
  if(q){var s=f.elements.service;for(var i=0;i<s.options.length;i++)if(s.options[i].value===q)s.selectedIndex=i}
  var ok=document.getElementById("ok"),btn=f.querySelector("button[type=submit]");
  var err=document.createElement("div");err.id="err";err.setAttribute("role","alert");err.style.display="none";
  err.textContent="Sorry, sending failed. Please try again or contact us by phone or WhatsApp.";
  ok.parentNode.insertBefore(err,ok.nextSibling);
  var okText=ok.textContent;
  var ti=btn.querySelector(".t-idle"),tb=btn.querySelector(".t-busy");
  function setBusy(b){if(ti)ti.hidden=b;if(tb)tb.hidden=!b}
  function show(msg,good){
    ok.style.display=good?"block":"none";err.style.display=good?"none":"block";
    if(good&&msg){ok.className="";ok.textContent=msg;ok.removeAttribute("data-t")}
    (good?ok:err).scrollIntoView({behavior:"smooth",block:"center"});
    if(typeof applyLang==="function"&&typeof curLang!=="undefined")applyLang(curLang);
  }
  var T={
    fi:{h:"Kiitos{n}! Pyyntösi on vastaanotettu.",p:"Olemme saaneet tiedustelusi palvelusta {s}. Otamme sinuun yhteyttä mahdollisimman pian valitsemaasi tapaa käyttäen.",mail:"Lähetimme vahvistuksen myös sähköpostiisi {e}.",w:"Jatka WhatsAppissa",c:"Soita meille",wt:"Hei! Lähetin juuri tarjouspyynnön verkkosivujen kautta{n2}. Palvelu: {s}."},
    en:{h:"Thank you{n}! Your request has been received.",p:"We have received your enquiry about {s}. We will contact you as soon as possible in the way you chose.",mail:"We also sent a confirmation to your email {e}.",w:"Continue on WhatsApp",c:"Call us",wt:"Hello! I just sent a quote request through the website{n2}. Service: {s}."}
  };
  /* Ready-written WhatsApp message with everything the customer typed (the customer still has to press Send in WhatsApp). */
  function waText(c,fi,svc,first){
    var L=fi?{h:"Hei! Lähetin juuri tarjouspyynnön verkkosivujen kautta.",n:"Nimi",s:"Palvelu",p:"Puhelin",e:"Sähköposti",l:"Sijainti",m:"Viesti",c:"Toivottu yhteydenottotapa"}
            :{h:"Hello! I just sent a quote request through the website.",n:"Name",s:"Service",p:"Phone",e:"Email",l:"Location",m:"Message",c:"Preferred contact"};
    var msg=(c.message||"").replace(/\s+/g," ").trim();if(msg.length>350)msg=msg.slice(0,350)+"...";
    var meth=c.method||"";if(fi){meth={"Email":"Sähköposti","Phone":"Puhelin","Either is fine":"Kumpi vain käy"}[meth]||meth}
    var out=[L.h,"",L.n+": "+(c.name||first||""),L.s+": "+svc];
    if(c.phone)out.push(L.p+": "+c.phone);
    if(c.email)out.push(L.e+": "+c.email);
    if(c.location)out.push(L.l+": "+c.location);
    if(meth)out.push(L.c+": "+meth);
    if(msg)out.push(L.m+": "+msg);
    return out.join("\n");
  }
  window.lastC=null;
  window.renderConfirm=function(){
    var c=window.lastC;if(!c)return;var fi=(typeof curLang!=="undefined"&&curLang==="fi"),t=T[fi?"fi":"en"];
    var first=(c.name||"").trim().split(/\s+/)[0]||"";
    var svc=(fi&&FI[c.service])||c.service;
    function R(x){return x.split("{n}").join(first?", "+first:"").split("{n2}").join(first?(fi?" (nimi: ":" (name: ")+first+")":"").split("{s}").join(svc).split("{e}").join(c.email||"")}
    function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
    ok.className="rich";ok.removeAttribute("data-t");ok.textContent="";
    ok.appendChild(el("strong","ok-h",R(t.h)));ok.appendChild(el("p","",R(t.p)));
    if(CONFIG.confirmEmail&&c.email)ok.appendChild(el("p","",R(t.mail)));
    var row=el("div","ok-btns");
    var w=el("a","btn g",t.w);w.href="https://wa.me/"+CONFIG.phone+"?text="+encodeURIComponent(waText(c,fi,svc,first));w.target="_blank";w.rel="noopener";
    var ph=el("a","btn o2",t.c);ph.href="tel:+"+CONFIG.phone;
    row.appendChild(w);row.appendChild(ph);ok.appendChild(row);
  };
  f.addEventListener("submit",function(e){
    e.preventDefault();var g=CONFIG.gform,v=function(k){return f.elements[k].value};
    var method=(f.querySelector("input[name=method]:checked")||{}).value||"Either is fine";
    var svc=v("service"),msg=v("message");
    /* the Google Form has no "Logistics & Moving" choice yet: send it as "Other" and keep the real service in the message */
    if(svc==="Logistics & Moving"){svc="Other";msg="[Logistics & Moving] "+msg}
    ok.style.display="none";err.style.display="none";
    if(g.url){
      var d=new FormData();
      d.append(g.name,v("name"));d.append(g.email,v("email"));d.append(g.phone,v("phone"));
      d.append(g.service,svc);d.append(g.location,v("location"));d.append(g.subject,v("subject"));
      d.append(g.message,msg);d.append(g.method,method);
      /* Google Forms built-in "collect email addresses" field. Ignored if the form does not collect emails; needed (and used for the automatic copy to the customer) when it does. */
      d.append("emailAddress",v("email"));
      var sent={name:v("name"),service:v("service"),email:v("email"),phone:v("phone"),location:v("location"),message:v("message"),method:method};
      btn.disabled=true;setBusy(true);
      fetch(g.url,{method:"POST",mode:"no-cors",body:d}).then(function(){
        btn.disabled=false;setBusy(false);f.reset();lastC=sent;renderConfirm();show("",true);
      }).catch(function(){
        btn.disabled=false;setBusy(false);show("",false);
      });
    }else{
      var b="Service: "+v("service")+"\nLocation: "+v("location")+"\n\n"+v("message")+"\n\nName: "+v("name")+"\nPhone: "+v("phone")+"\nEmail: "+v("email")+"\nPreferred contact: "+method;
      location.href="mailto:"+CONFIG.email+"?subject="+encodeURIComponent(v("subject")||"Enquiry")+"&body="+encodeURIComponent(b);
      lastC=null;
      show("Your email app has opened with your message. Please press Send there to complete your enquiry.",true);
    }
  });
}

/* ====== LANGUAGE (EN / FI) ====== */
var FI={
"Home":"Etusivu","Services":"Palvelut","Contact Us":"Ota yhteyttä","Request a Quote":"Pyydä tarjous","Contact":"Yhteystiedot","Quick Links":"Pikalinkit",
"Reliable Services. Quality Work. Lasting Trust.":"Luotettavaa palvelua. Laadukasta työtä. Pysyvää luottamusta.",
"PTKP Aina Oy provides professional construction, renovation, carpentry, plumbing, cleaning and other essential services.":"PTKP Aina Oy tarjoaa ammattimaista rakennus-, remontti-, puusepän-, putki-, siivous- ja muita tärkeitä palveluita.",
"Explore Our Services":"Tutustu palveluihimme","About PTKP Aina Oy":"Tietoa PTKP Aina Oy:stä",
"PTKP Aina Oy is a Finnish limited liability company based in Vantaa, offering a diverse range of services to support residential, commercial and operational needs.":"PTKP Aina Oy on vantaalainen osakeyhtiö, joka tarjoaa monipuolisia palveluita asuin-, liike- ja toimintatilojen tarpeisiin.",
"Our activities include construction, carpentry, plumbing, surface finishing, cleaning services, and logistics and moving services.":"Toimintaamme kuuluvat rakentaminen, puusepäntyöt, putkityöt, pintakäsittely, siivouspalvelut sekä logistiikka- ja muuttopalvelut.",
"Our Main Services":"Pääpalvelumme","We provide a wide range of services to meet your needs.":"Tarjoamme laajan valikoiman palveluita tarpeidesi mukaan.","View all services":"Katso kaikki palvelut",
"Construction & Renovation":"Rakentaminen ja remontointi","Carpentry":"Puusepäntyöt","Plumbing":"Putkityöt","Painting & Surface Finishing":"Maalaus ja pintakäsittely","Cleaning Services":"Siivouspalvelut",
"Interior and full-home renovation for homes and business premises.":"Sisä- ja kokonaisremontit koteihin ja liiketiloihin.",
"Terraces, decking, flooring, kitchen installation, framing and custom woodwork.":"Terassit, lattiat, keittiöasennus, rungot ja mittatilauspuutyöt.",
"Plumbing repairs and installations for homes and business premises.":"Putkikorjaukset ja -asennukset koteihin ja liiketiloihin.",
"Painting and surface treatment for clean, well-presented spaces.":"Maalaus ja pintakäsittely siisteihin ja edustaviin tiloihin.",

"Cleaning for residential and commercial spaces, including windows, floors and after construction.":"Siivous koteihin ja liiketiloihin, myös ikkunat, lattiat ja rakennustöiden jälkeen.",

"Why Work With Us?":"Miksi valita meidät?","Diverse Services":"Monipuoliset palvelut","Many service categories under one company.":"Monta palvelua yhdeltä yritykseltä.",
"Quality-Focused Work":"Laatuun keskittyvä työ","Emphasis on workmanship and attention to detail.":"Painotamme ammattitaitoa ja huolellisuutta.",
"Customer-Oriented":"Asiakaslähtöisyys","Services and discussions tailored to your needs.":"Palvelut ja keskustelut räätälöidään tarpeidesi mukaan.",
"Convenient Enquiries":"Helpot tiedustelut","Contact us through a simple online form, phone or WhatsApp.":"Ota yhteyttä helpolla lomakkeella, puhelimella tai WhatsAppilla.",
"How It Works":"Näin se toimii","Tell Us What You Need":"Kerro tarpeesi","Choose a service and describe your request.":"Valitse palvelu ja kuvaile pyyntösi.",
"Discuss Your Requirements":"Käydään vaatimukset läpi","We review your enquiry and contact you to clarify details.":"Käymme tiedustelusi läpi ja otamme yhteyttä tarkentaaksemme tietoja.",
"Receive a Proposal":"Saat tarjouksen","Pricing, scope and availability are agreed before work starts.":"Hinta, laajuus ja aikataulu sovitaan ennen työn alkua.",
"Have a Project in Mind?":"Onko sinulla projekti mielessä?","Construction, carpentry, plumbing, painting, cleaning or moving – contact PTKP Aina Oy.":"Rakennus, puusepäntyöt, putkityöt, maalaus, siivous tai muutto – ota yhteyttä PTKP Aina Oy:hyn.","Contact Us Today":"Ota yhteyttä tänään",
"Our Services":"Palvelumme","The range of services offered by PTKP Aina Oy – from construction, carpentry and plumbing to painting, cleaning and moving.":"PTKP Aina Oy:n palvelut – rakentamisesta, puusepäntöistä ja putkitöistä maalaukseen, siivoukseen ja muuttoihin.",
"Services include:":"Palveluihimme kuuluvat:",
"Interior and full-home renovation":"Sisä- ja kokonaisremontit",
"Terraces and decking":"Terassit ja kansirakenteet","Flooring installation":"Lattioiden asennus","Framing and partition walls":"Rungot ja väliseinät","Kitchen installation":"Keittiöasennus","Custom woodwork and repairs":"Mittatilaustyöt ja korjaukset",
"Sink, tap and pipe repairs":"Altaiden, hanojen ja putkien korjaukset","Leak detection and repair":"Vuotojen etsintä ja korjaus","Fixture installation":"Kalusteiden asennus","Bathroom and kitchen plumbing":"Kylpyhuoneen ja keittiön putkityöt",
"Interior painting":"Sisämaalaus","Exterior painting":"Ulkomaalaus","Wall and surface finishing":"Seinien ja pintojen viimeistely","Preparation and treatment":"Esikäsittely ja pintakäsittely",

"Residential cleaning":"Kotisiivous","Commercial cleaning":"Liiketilojen siivous","Building cleaning":"Rakennusten siivous","Post-renovation cleaning":"Remontin jälkisiivous","Window washing":"Ikkunanpesu","Floor washing & waxing":"Lattianpesu ja vahaus",

"Enquire About Construction →":"Tiedustele rakentamisesta →","Enquire About Carpentry →":"Tiedustele puusepäntöistä →","Enquire About Plumbing →":"Tiedustele putkitöistä →","Enquire About Painting →":"Tiedustele maalauksesta →","Enquire About Cleaning Services →":"Tiedustele siivouksesta →",
"Looking for a Reliable Service Partner?":"Etsitkö luotettavaa palvelukumppania?","Tell us about your project and we will get in touch to discuss the details.":"Kerro projektistasi, niin otamme yhteyttä ja käymme tiedot läpi.","Send an Enquiry →":"Lähetä tiedustelu →",
"Contact PTKP Aina Oy":"Ota yhteyttä PTKP Aina Oy:hyn","Have a project, service requirement or business enquiry? Fill out the form below and our team will review your request and contact you.":"Onko sinulla projekti, palvelutarve tai yritystiedustelu? Täytä lomake, niin tiimimme käy pyyntösi läpi ja ottaa yhteyttä.",
"Get in Touch":"Yhteystiedot","Send an Enquiry":"Lähetä tiedustelu","View on Google Maps →":"Näytä Google Mapsissa →",
"Full Name *":"Koko nimi *","Email Address *":"Sähköpostiosoite *","Phone Number *":"Puhelinnumero *","Service Required *":"Tarvittava palvelu *","Select a service":"Valitse palvelu","Other":"Muu",
"Project Location":"Työkohteen sijainti","Subject":"Aihe","Describe Your Requirements *":"Kuvaile tarpeesi *","Preferred Contact Method":"Toivottu yhteydenottotapa","Email":"Sähköposti","Phone":"Puhelin","Either is fine":"Kumpi vain käy",
"Submit Enquiry":"Lähetä tiedustelu","Thank you! We will contact you soon.":"Kiitos! Otamme pian yhteyttä.","Your information will only be used to respond to your enquiry.":"Tietojasi käytetään vain tiedusteluusi vastaamiseen.",
"Your Privacy Matters":"Yksityisyytesi on tärkeää","The information you provide will be used only to respond to your enquiry and will not be shared with third parties. You can contact us at any time regarding your personal data or to request deletion of your information.":"Antamiasi tietoja käytetään vain tiedusteluusi vastaamiseen, eikä niitä luovuteta kolmansille osapuolille. Voit ottaa meihin yhteyttä milloin tahansa henkilötietoihisi liittyen tai pyytää tietojesi poistamista.",
"© 2026 PTKP Aina Oy. All rights reserved.":"© 2026 PTKP Aina Oy. Kaikki oikeudet pidätetään.",

"Services – PTKP Aina Oy":"Palvelut – PTKP Aina Oy","Contact Us – PTKP Aina Oy":"Ota yhteyttä – PTKP Aina Oy"
};
FI["Your email app has opened with your message. Please press Send there to complete your enquiry."]="Sähköpostiohjelmasi avautui viestin kanssa. Paina siellä Lähetä viimeistelläksesi tiedustelun.";FI["Sorry, sending failed. Please try again or contact us by phone or WhatsApp."]="Valitettavasti lähetys epäonnistui. Yritä uudelleen tai ota yhteyttä puhelimitse tai WhatsAppilla.";FI["CEO:"]="Toimitusjohtaja:";FI["Based in Vantaa"]="Toimipaikka Vantaa";FI["Quality guaranteed"]="Laatu takuulla";FI["Free quotation"]="Maksuton tarjous";FI["Business ID 3589678-3"]="Y-tunnus 3589678-3";
Object.assign(FI,{"Business ID: 3589678-3":"Y-tunnus: 3589678-3","What We Do":"Mitä teemme","Other Services":"Muut palvelumme","Need This Service?":"Tarvitsetko tätä palvelua?","We work in Vantaa and across the Helsinki metropolitan area.":"Työskentelemme Vantaalla ja koko pääkaupunkiseudulla.","Read more →":"Lue lisää →","Our Services":"Palvelumme","Frequently Asked Questions":"Usein kysytyt kysymykset","Answers to common questions about working with us.":"Vastauksia yleisiin kysymyksiin yhteistyöstä kanssamme.","Whether you are updating a single room or renovating an entire home, we carry out the work for homes and business premises.":"Päivitätpä yhtä huonetta tai remontoit koko kotia, hoidamme työn koteihin ja liiketiloihin.","From new terraces to flooring and kitchen installations, our carpentry work focuses on solid workmanship and attention to detail.":"Uusista terasseista lattioihin ja keittiöasennuksiin – puusepäntyömme keskittyy laadukkaaseen toteutukseen ja huolellisuuteen.","Dripping tap, leaking pipe or a new fixture to install? We handle plumbing repairs and installations for homes and business premises.":"Tippuva hana, vuotava putki tai uusi kaluste asennettavana? Hoidamme putkikorjaukset ja -asennukset koteihin ja liiketiloihin.","Fresh paint and well-prepared surfaces make a space look clean and cared for, inside and out.":"Raikas maalipinta ja huolella valmistellut pinnat saavat tilan näyttämään siistiltä ja hoidetulta sekä sisällä että ulkona.","From regular home cleaning to post-renovation cleaning and window washing, we keep residential and commercial spaces clean.":"Tavallisesta kotisiivouksesta remonttien jälkeiseen siivoukseen ja ikkunanpesuun – pidämme koti- ja liiketilat puhtaina.","How do I request a quote?":"Miten pyydän tarjouksen?","Fill in the enquiry form, call us or message us on WhatsApp. We review your request and contact you to clarify the details.":"Täytä tiedustelulomake, soita meille tai laita viesti WhatsAppilla. Käymme pyyntösi läpi ja otamme yhteyttä tarkentaaksemme tietoja.","Is the quotation free?":"Onko tarjous maksuton?","Yes, quotations are free of charge. Pricing, scope and availability are agreed before work starts.":"Kyllä, tarjous on maksuton. Hinta, laajuus ja aikataulu sovitaan ennen työn alkua.","Which areas do you serve?":"Millä alueilla toimitte?","We are based in Vantaa and serve homes and businesses across the Helsinki metropolitan area. Not sure about your location? Just ask.":"Toimipaikkamme on Vantaalla, ja palvelemme koteja ja yrityksiä koko pääkaupunkiseudulla. Etkö ole varma sijainnistasi? Kysy rohkeasti.","Do you work for homes and for businesses?":"Teettekö töitä sekä kotitalouksille että yrityksille?","Yes. We carry out work for private homes as well as business premises.":"Kyllä. Teemme töitä sekä yksityisille kodeille että liiketiloihin.","Which services do you offer?":"Mitä palveluita tarjoatte?","Construction and renovation, carpentry, plumbing, painting and surface finishing, cleaning services, and logistics and moving.":"Rakentaminen ja remontointi, puusepäntyöt, putkityöt, maalaus ja pintakäsittely, siivouspalvelut sekä logistiikka ja muuttopalvelut.","Can I contact you by phone or WhatsApp?":"Voinko ottaa yhteyttä puhelimitse tai WhatsAppilla?","Yes. You can call or message us on +358 400 370 275, or send an email to ptkpaina@gmail.com.":"Kyllä. Voit soittaa tai laittaa viestin numeroon +358 400 370 275 tai lähettää sähköpostia osoitteeseen ptkpaina@gmail.com."});
Object.assign(FI,{"Construction · Renovation · Cleaning · Moving":"Rakentaminen · Remontointi · Siivous · Muutto","Our Services in Pictures":"Palvelumme kuvina","A look at the kind of work we do for homes and businesses.":"Katsaus töihin, joita teemme koteihin ja yrityksille.","Service Area":"Toiminta-alue","Based in Vantaa, we serve homes and businesses across the Helsinki metropolitan area.":"Toimipaikkamme on Vantaalla, ja palvelemme koteja ja yrityksiä koko pääkaupunkiseudulla.","Not sure we cover your location? Contact us and we will gladly help.":"Etkö ole varma, palvelemmeko alueellasi? Ota yhteyttä, autamme mielellämme.","Call":"Soita","Quote":"Tarjous"});
Object.assign(FI,{"Menu":"Valikko","Services menu":"Palvelut-valikko","Quick contact":"Pikayhteys","Help":"Apua","Close":"Sulje","Painting":"Maalaus","Cleaning":"Siivous","Construction and renovation":"Rakentaminen ja remontointi","Carpenter building a terrace":"Puuseppä rakentamassa terassia","PTKP Aina Oy logo":"PTKP Aina Oy -logo","PTKP Aina Oy, Vantaa":"PTKP Aina Oy, Vantaa"});
Object.assign(FI,{"Logistics & Moving": "Logistiikka ja muuttopalvelut", "Moving house or need goods transported? We help with moving, loading and transport for homes and businesses in the Helsinki area.": "Muutatko tai tarvitsetko tavaroiden kuljetusta? Autamme muutoissa, lastauksessa ja kuljetuksissa koteihin ja yrityksiin pääkaupunkiseudulla.", "Moving, loading and transport services for homes and business premises.": "Muutto-, lastaus- ja kuljetuspalvelut koteihin ja liiketiloihin.", "Moving, loading and transport for homes and businesses.": "Muutot, lastaus ja kuljetukset koteihin ja yrityksille.", "PTKP Aina Oy moving van": "PTKP Aina Oy:n muuttoauto", "Enquire About Logistics & Moving →": "Tiedustele logistiikasta ja muutoista →", "Home and apartment moving": "Koti- ja asuntomuutot", "Office and business moving": "Yritys- ja toimistomuutot", "Furniture and goods transport": "Huonekalu- ja tavarakuljetukset", "Loading, unloading and carrying": "Lastaus, purku ja kantaminen", "Transport of building materials": "Rakennusmateriaalien kuljetukset"});
Object.assign(FI,{"I agree that my details are used only to handle and respond to this enquiry.": "Hyväksyn, että tietojani käytetään vain tämän tiedustelun käsittelyyn ja siihen vastaamiseen.", "Send enquiry": "Lähetä tiedustelu", "Sending...": "Lähetetään...", "Your enquiry is sent straight to us. We will reply by email or phone.": "Tiedustelusi lähetetään suoraan meille. Vastaamme sähköpostitse tai puhelimitse.", "Your privacy matters.": "Yksityisyytesi on meille tärkeää.", "Please avoid including sensitive personal information. Enquiry details are used only for handling and responding to your request.": "Älä liitä viestiin arkaluonteisia henkilötietoja. Tiedustelun tietoja käytetään vain pyyntösi käsittelyyn ja siihen vastaamiseen."});
var PH={"City / Area":"Kaupunki / alue","Optional":"Valinnainen"};
var store=new WeakMap(),curLang="en";
document.querySelectorAll("option").forEach(function(o){if(!o.hasAttribute("value"))o.value=o.textContent.trim()});
function applyLang(l){
  curLang=l;document.documentElement.lang=l;
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
  while((n=w.nextNode())){
    if(n.parentNode.closest("script,style"))continue;
    var o=store.get(n);
    if(o===undefined){var t=n.nodeValue.trim();if(!t||!FI[t])continue;o=n.nodeValue;store.set(n,o)}
    var k=o.trim();
    n.nodeValue=(l==="fi"&&FI[k])?o.replace(k,function(){return FI[k]}):o;
  }
  document.querySelectorAll("[placeholder]").forEach(function(e){
    if(!e.hasAttribute("data-en-ph"))e.setAttribute("data-en-ph",e.placeholder);
    var en=e.getAttribute("data-en-ph");e.placeholder=(l==="fi"&&PH[en])?PH[en]:en;
  });
  if(!document.documentElement.hasAttribute("data-en-title"))document.documentElement.setAttribute("data-en-title",document.title);
  var et=document.documentElement.getAttribute("data-en-title");document.title=(l==="fi"&&FI[et])?FI[et]:et;
  document.querySelectorAll("[alt],[aria-label],iframe[title]").forEach(function(e){
    [["alt","data-en-alt"],["aria-label","data-en-aria"],["title","data-en-ttl"]].forEach(function(p){
      if(p[0]==="title"&&e.tagName!=="IFRAME")return;
      if(!e.hasAttribute(p[0]))return;
      if(!e.hasAttribute(p[1]))e.setAttribute(p[1],e.getAttribute(p[0]));
      var en=e.getAttribute(p[1]);e.setAttribute(p[0],(l==="fi"&&FI[en])?FI[en]:en)})});
  document.querySelectorAll("iframe[src*='google.com/maps']").forEach(function(fr){
    var u=fr.getAttribute("src").replace(/&hl=\w+/,"")+"&hl="+l;if(fr.getAttribute("src")!==u)fr.setAttribute("src",u)});
  document.querySelectorAll(".lang button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.lang===l)});
  try{localStorage.setItem("lang",l)}catch(e){}
  if(window.lastC&&typeof window.renderConfirm==="function")window.renderConfirm();
}
document.querySelectorAll(".lang button").forEach(function(b){b.addEventListener("click",function(){applyLang(b.dataset.lang)})});
(function(){var s=null;try{s=localStorage.getItem("lang")}catch(e){}
  if(!s)s="fi";
  if(s==="fi")applyLang("fi")})();

/* subtle reveal on scroll */
(function(){if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".card,.row,.feat>div,.steps>div,.split>*,.priv,form").forEach(function(el){el.classList.add("rv");io.observe(el)})})();


/* header shadow on scroll */
(function(){var h=document.querySelector(".site-header");if(!h)return;
function t(){h.classList.toggle("scrolled",window.scrollY>8)}t();addEventListener("scroll",t,{passive:true})})();

/* gallery lightbox */
(function(){var d=document.querySelector(".lb");if(!d||!d.showModal)return;
var im=d.querySelector("img"),cp=d.querySelector("p");
document.querySelectorAll(".g-item").forEach(function(b){b.addEventListener("click",function(){
  var i=b.querySelector("img");im.src=i.src;im.alt=i.alt;cp.textContent=b.querySelector("span").textContent;d.showModal()})});
d.querySelector(".x").addEventListener("click",function(){d.close()});
d.addEventListener("click",function(e){if(e.target===d)d.close()})})();

/* hero logo: gentle tilt toward the pointer (desktop only) */
(function(){var h=document.querySelector(".hero-logo"),c=h&&h.querySelector(".hl-stage .hl-card");
if(!c||matchMedia("(prefers-reduced-motion: reduce)").matches||!matchMedia("(hover: hover)").matches)return;
h.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))/(innerWidth/2),y=(e.clientY-(r.top+r.height/2))/(innerHeight/2);
  c.style.setProperty("--ry",Math.max(-1,Math.min(1,x))*9+"deg");c.style.setProperty("--rx",Math.max(-1,Math.min(1,y))*-7+"deg")});
h.addEventListener("mouseleave",function(){c.style.setProperty("--rx","0deg");c.style.setProperty("--ry","0deg")})})();

/* services dropdown: tap / keyboard toggle (hover works from CSS on desktop) */
(function(){
  document.querySelectorAll(".dd-b").forEach(function(b){var d=b.parentNode;
    b.addEventListener("click",function(e){e.stopPropagation();var o=d.classList.toggle("open");b.setAttribute("aria-expanded",o)})});
  document.addEventListener("click",function(e){document.querySelectorAll(".dd.open").forEach(function(d){
    if(!d.contains(e.target)){d.classList.remove("open");d.querySelector(".dd-b").setAttribute("aria-expanded","false")}})});
})();

/* help chat: quick actions in the corner */
(function(){
  if(document.querySelector(".hc"))return;
  Object.assign(FI,{"Welcome to PTKP Aina Oy!":"Tervetuloa PTKP Aina Oy:n sivuille!","How can we help you today?":"Miten voimme auttaa sinua tänään?","Call us":"Soita meille","Message us on WhatsApp":"Laita viesti WhatsAppilla"});
  var h=document.createElement("div");h.className="hc";
  h.innerHTML='<div class="hc-panel" role="dialog" aria-label="Help"><div class="hc-head"><img src="images/ptkp-logo-icon.png" alt=""><div><strong>Welcome to PTKP Aina Oy!</strong><span>How can we help you today?</span></div><button type="button" class="hc-x" aria-label="Close">&times;</button></div>'
   +'<div class="hc-opts"><a class="p" href="contact.html">Request a Quote</a><a href="tel:+358400370275">Call us</a><a href="https://wa.me/'+CONFIG.phone+'" target="_blank" rel="noopener">Message us on WhatsApp</a><a href="services.html">Explore Our Services</a></div></div>'
   +'<button type="button" class="hc-btn" aria-label="Help" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>';
  document.body.appendChild(h);
  var btn=h.querySelector(".hc-btn");
  function set(o){h.classList.toggle("open",o);btn.setAttribute("aria-expanded",o);try{sessionStorage.setItem("hc","1")}catch(e){}}
  btn.addEventListener("click",function(){set(!h.classList.contains("open"))});
  h.querySelector(".hc-x").addEventListener("click",function(){set(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false)});
  document.addEventListener("click",function(e){if(h.classList.contains("open")&&!h.contains(e.target))set(false)});
  var seen=false;try{seen=!!sessionStorage.getItem("hc")}catch(e){}
  if(!seen&&!matchMedia("(max-width: 820px)").matches)setTimeout(function(){if(!h.classList.contains("open"))h.classList.add("open"),btn.setAttribute("aria-expanded","true")},7000);
  if(typeof applyLang==="function"&&typeof curLang!=="undefined")applyLang(curLang);
})();


/* form validation messages in the chosen language (browser default follows the browser's own language) */
(function(){var f=document.getElementById("enquiry");if(!f)return;
  var M={fi:{chk:"Valitse tämä ruutu jatkaaksesi.",req:"Täytä tämä kenttä.",sel:"Valitse vaihtoehto luettelosta.",mail:"Anna kelvollinen sähköpostiosoite."},en:{chk:"Please tick this box to continue.",req:"Please fill out this field.",sel:"Please select an item in the list.",mail:"Please enter a valid email address."}};
  f.querySelectorAll("input,select,textarea").forEach(function(e){
    e.addEventListener("invalid",function(){var m=M[curLang]||M.en;
      e.setCustomValidity(e.validity.valueMissing?(e.tagName==="SELECT"?m.sel:(e.type==="checkbox"?m.chk:m.req)):(e.validity.typeMismatch?m.mail:""))});
    e.addEventListener("input",function(){e.setCustomValidity("")});
    e.addEventListener("change",function(){e.setCustomValidity("")})})})();

/* phones: keep the FI/EN switch in the top bar, next to the menu button */
(function(){
  var lang=document.querySelector(".nav .lang"),bar=document.querySelector(".bar"),menu=document.querySelector(".menu"),nav=document.querySelector(".nav");
  if(!lang||!bar||!menu||!nav)return;
  var mq=matchMedia("(max-width: 820px)");
  function place(){
    if(mq.matches){if(lang.parentNode!==bar)bar.insertBefore(lang,menu);lang.classList.add("lang-bar")}
    else{if(lang.parentNode!==nav)nav.appendChild(lang);lang.classList.remove("lang-bar")}
  }
  place();
  (mq.addEventListener?mq.addEventListener("change",place):mq.addListener(place));
})();
