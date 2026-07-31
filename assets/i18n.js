/* Endless Studio — built-in translations (EN / DE / ES / FR)
   Pure client-side: swaps text nodes + placeholders. Works locally and live.
   Choice persists across pages via localStorage. English = source. */
(function(){
  var T = {
    // ── nav ──
    "The Grad Project": {de:"Das Abschlussprojekt", es:"El Proyecto de Graduación", fr:"Le Projet de Diplôme"},
    "Corporate Clothing": {de:"Firmenbekleidung", es:"Ropa Corporativa", fr:"Vêtements d'Entreprise"},
    "About Endless": {de:"Über Endless", es:"Sobre Endless", fr:"À Propos d'Endless"},
    "Contact Us": {de:"Kontakt", es:"Contáctanos", fr:"Contactez-Nous"},
    "Graduation Studio": {de:"Abschluss-Studio", es:"Estudio de Graduación", fr:"Studio de Diplôme"},
    // ── footer ──
    "Home": {de:"Startseite", es:"Inicio", fr:"Accueil"},
    "Explore": {de:"Entdecken", es:"Explorar", fr:"Explorer"},
    "Studio": {de:"Studio", es:"Estudio", fr:"Studio"},
    "Follow": {de:"Folgen", es:"Síguenos", fr:"Suivez-Nous"},
    "Disclaimer": {de:"Haftungsausschluss", es:"Aviso Legal", fr:"Avertissement"},
    "A graduation & corporate wear brand": {de:"Eine Marke für Abschluss- und Firmenbekleidung", es:"Una marca de ropa de graduación y corporativa", fr:"Une marque de vêtements de diplôme et d'entreprise"},
    "Amsterdam · Always Grateful": {de:"Amsterdam · Immer Dankbar", es:"Ámsterdam · Siempre Agradecidos", fr:"Amsterdam · Toujours Reconnaissants"},
    "Always Grateful — Class of 2026": {de:"Immer Dankbar — Jahrgang 2026", es:"Siempre Agradecidos — Promoción 2026", fr:"Toujours Reconnaissants — Promotion 2026"},
    // ── home: products ──
    "ISAlmere Graduation Zip-Up Hoodie": {de:"ISAlmere Abschluss-Zip-Hoodie", es:"Sudadera con Cremallera de Graduación ISAlmere", fr:"Hoodie Zippé de Diplôme ISAlmere"},
    "Black Oversized Classic Embroidery Hoodie": {de:"Schwarzer Oversized Classic Stick-Hoodie", es:"Sudadera Negra Oversized Clásica Bordada", fr:"Hoodie Noir Oversize Brodé Classique"},
    "Worn by her": {de:"Von ihr getragen", es:"Llevado por ella", fr:"Porté par elle"},
    "Best Seller": {de:"Bestseller", es:"Más Vendido", fr:"Meilleure Vente"},
    "Description": {de:"Beschreibung", es:"Descripción", fr:"Description"},
    "Materials": {de:"Materialien", es:"Materiales", fr:"Matériaux"},
    "Size Guide": {de:"Größentabelle", es:"Guía de Tallas", fr:"Guide des Tailles"},
    "Packaging": {de:"Verpackung", es:"Embalaje", fr:"Emballage"},
    "Shipping & Returns": {de:"Versand & Rückgabe", es:"Envío y Devoluciones", fr:"Livraison & Retours"},
    "What Endless Studio Provides": {de:"Was Endless Studio bietet", es:"Lo que ofrece Endless Studio", fr:"Ce que propose Endless Studio"},
    // ── grad project ──
    "Why we do this": {de:"Warum wir das tun", es:"Por qué lo hacemos", fr:"Pourquoi nous le faisons"},
    "Start Your Class Project →": {de:"Starte euer Klassenprojekt →", es:"Inicia el proyecto de tu clase →", fr:"Lancez le projet de votre classe →"},
    "Enquire for your class →": {de:"Für eure Klasse anfragen →", es:"Consulta para tu clase →", fr:"Renseignez-vous pour votre classe →"},
    "Made to order": {de:"Auf Bestellung gefertigt", es:"Hecho por encargo", fr:"Fabriqué sur commande"},
    "Clients": {de:"Kunden", es:"Clientes", fr:"Clients"},
    "and more": {de:"und mehr", es:"y más", fr:"et plus"},
    // ── about ──
    "Private Access": {de:"Privater Zugang", es:"Acceso Privado", fr:"Accès Privé"},
    "We're building the go-to wardrobe for every graduating class, team and company — designed with you, made for you.":
      {de:"Wir schaffen die erste Wahl an Kleidung für jeden Abschlussjahrgang, jedes Team und jedes Unternehmen — mit euch entworfen, für euch gemacht.",
       es:"Estamos creando el vestuario de referencia para cada promoción, equipo y empresa — diseñado contigo, hecho para ti.",
       fr:"Nous créons la garde-robe de référence pour chaque promotion, équipe et entreprise — conçue avec vous, faite pour vous."},
    "Enquire": {de:"Anfragen", es:"Consultar", fr:"Renseignez-vous"},
    // ── corporate ──
    "Launching · October 2026": {de:"Start · Oktober 2026", es:"Lanzamiento · Octubre 2026", fr:"Lancement · Octobre 2026"},
    "Coming soon.": {de:"Bald verfügbar.", es:"Próximamente.", fr:"Bientôt disponible."},
    "Considered wardrobes for teams who care how they show up — premium fabrics, clean embroidery, and your identity stitched in. Designed with you, made to be worn proudly.":
      {de:"Durchdachte Garderoben für Teams, denen ihr Auftritt wichtig ist — hochwertige Stoffe, saubere Stickerei und eure Identität eingenäht. Mit euch entworfen, mit Stolz getragen.",
       es:"Vestuarios cuidados para equipos que valoran cómo se presentan — tejidos premium, bordados limpios y tu identidad cosida. Diseñado contigo, para llevar con orgullo.",
       fr:"Des tenues soignées pour les équipes soucieuses de leur image — tissus premium, broderie nette et votre identité cousue. Conçu avec vous, à porter avec fierté."},
    "See you in October.": {de:"Wir sehen uns im Oktober.", es:"Nos vemos en octubre.", fr:"Rendez-vous en octobre."},
    "Register your interest →": {de:"Interesse anmelden →", es:"Registra tu interés →", fr:"Manifestez votre intérêt →"},
    // ── graduation studio ──
    "Graduation": {de:"Abschluss", es:"Graduación", fr:"Diplôme"},
    "Studio.": {de:"Studio.", es:"Estudio.", fr:"Studio."},
    "A private studio built for your graduating class. Enter the access code shared by your school to view your piece, choose your size, and place your order — designed and developed by Endless Studio.":
      {de:"Ein privates Studio für euren Abschlussjahrgang. Gib den von deiner Schule geteilten Zugangscode ein, um dein Stück anzusehen, deine Größe zu wählen und zu bestellen — entworfen und entwickelt von Endless Studio.",
       es:"Un estudio privado para tu promoción. Introduce el código de acceso que comparte tu escuela para ver tu prenda, elegir tu talla y hacer tu pedido — diseñado y desarrollado por Endless Studio.",
       fr:"Un studio privé pour votre promotion. Saisissez le code d'accès partagé par votre école pour voir votre pièce, choisir votre taille et commander — conçu et développé par Endless Studio."},
    "A few we've made for": {de:"Einige, für die wir gemacht haben", es:"Algunos para los que hemos hecho", fr:"Quelques-uns pour qui nous avons créé"},
    "Enter your access code": {de:"Gib deinen Zugangscode ein", es:"Introduce tu código de acceso", fr:"Saisissez votre code d'accès"},
    "End-to-End": {de:"Rundum", es:"De principio a fin", fr:"De bout en bout"},
    "Design & Delivery": {de:"Design & Lieferung", es:"Diseño y Entrega", fr:"Design & Livraison"},
    "One Class": {de:"Eine Klasse", es:"Una clase", fr:"Une classe"},
    "One Collection": {de:"Eine Kollektion", es:"Una colección", fr:"Une collection"},
    "Secure": {de:"Sicher", es:"Seguro", fr:"Sécurisé"},
    "Checkout by Mollie": {de:"Bezahlung mit Mollie", es:"Pago con Mollie", fr:"Paiement via Mollie"},
    // ── contact form ──
    "Name": {de:"Name", es:"Nombre", fr:"Nom"},
    "Date": {de:"Datum", es:"Fecha", fr:"Date"},
    "Email": {de:"E-Mail", es:"Correo electrónico", fr:"E-mail"},
    "Approx. Pieces": {de:"Ungefähre Stückzahl", es:"Cantidad aprox.", fr:"Quantité approx."},
    "Organisation / School": {de:"Organisation / Schule", es:"Organización / Escuela", fr:"Organisation / École"},
    "Timeline": {de:"Zeitrahmen", es:"Plazo", fr:"Échéance"},
    "Enquiry Type": {de:"Art der Anfrage", es:"Tipo de consulta", fr:"Type de demande"},
    "Special Instructions": {de:"Besondere Hinweise", es:"Instrucciones especiales", fr:"Instructions particulières"},
    "Send Enquiry →": {de:"Anfrage senden →", es:"Enviar consulta →", fr:"Envoyer la demande →"}
  };
  // placeholder translations (attribute)
  var PH = {
    "e.g. Sara Klein": {de:"z. B. Sara Klein", es:"p. ej. Sara Klein", fr:"p. ex. Sara Klein"},
    "you@organisation.com": {de:"du@organisation.com", es:"tu@organizacion.com", fr:"vous@organisation.com"},
    "e.g. 120": {de:"z. B. 120", es:"p. ej. 120", fr:"p. ex. 120"},
    "International School Eindhoven": {de:"International School Eindhoven", es:"International School Eindhoven", fr:"International School Eindhoven"},
    "e.g. June 2026": {de:"z. B. Juni 2026", es:"p. ej. junio 2026", fr:"p. ex. juin 2026"},
    "Tell us what you'd like to make — pieces, quantities, colours, embroidery, deadlines...":
      {de:"Sag uns, was du machen möchtest — Teile, Mengen, Farben, Stickerei, Fristen …",
       es:"Cuéntanos qué te gustaría crear — prendas, cantidades, colores, bordados, fechas límite…",
       fr:"Dites-nous ce que vous souhaitez créer — pièces, quantités, couleurs, broderie, délais…"},
    "Anything else we should know": {de:"Sonst noch etwas, das wir wissen sollten", es:"Cualquier otra cosa que debamos saber", fr:"Autre chose à nous signaler"}
  };

  function norm(s){return s.replace(/\u00A0/g,' ').replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();}
  function currentLang(){try{return localStorage.getItem('es_lang')||'en';}catch(e){return 'en';}}

  var nodes=null, phEls=null;
  function collect(){
    if(nodes) return;
    nodes=[]; phEls=[];
    var skip={SCRIPT:1,STYLE:1,NOSCRIPT:1};
    var w=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {acceptNode:function(n){
      if(!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      var p=n.parentNode;
      while(p){ if(skip[p.nodeName]) return NodeFilter.FILTER_REJECT;
        if(p.classList && (p.classList.contains('lang-menu')||p.classList.contains('lang-code'))) return NodeFilter.FILTER_REJECT;
        p=p.parentNode; }
      return NodeFilter.FILTER_ACCEPT;
    }});
    var n; while((n=w.nextNode())) nodes.push({node:n, en:n.nodeValue});
    Array.prototype.forEach.call(document.querySelectorAll('[placeholder]'), function(el){
      phEls.push({el:el, en:el.getAttribute('placeholder')});
    });
  }
  function apply(lang){
    collect();
    nodes.forEach(function(e){
      var raw=e.en;
      if(lang==='en'){ e.node.nodeValue=raw; return; }
      var t=T[norm(raw)];
      if(t && t[lang]){
        var lead=(raw.match(/^\s*/)||[''])[0], tail=(raw.match(/\s*$/)||[''])[0];
        e.node.nodeValue=lead+t[lang]+tail;
      } else { e.node.nodeValue=raw; }
    });
    phEls.forEach(function(e){
      if(lang==='en'){ e.el.setAttribute('placeholder', e.en); return; }
      var t=PH[norm(e.en)];
      e.el.setAttribute('placeholder', (t&&t[lang])?t[lang]:e.en);
    });
    document.documentElement.lang=lang;
    var label=document.querySelector('.lang-code'); if(label) label.textContent=lang.toUpperCase();
    document.querySelectorAll('.lang-menu a[data-code]').forEach(function(a){
      a.classList.toggle('active', a.getAttribute('data-code').toLowerCase()===lang);
    });
  }
  function setLang(code){
    code=(code||'en').toLowerCase();
    try{localStorage.setItem('es_lang',code);}catch(e){}
    apply(code);
  }
  function init(){
    document.querySelectorAll('.lang-menu a[data-code]').forEach(function(a){
      a.addEventListener('click',function(e){e.preventDefault(); setLang(a.getAttribute('data-code')); var d=a.closest('details'); if(d) d.removeAttribute('open');});
    });
    apply(currentLang());
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
