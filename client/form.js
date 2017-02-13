var submitEmail = function(l){
  var name    = $("[name='name']").val(),
      email   = $("[name='email']").val(),
      telefon = $("[name='telefon']").val(),
      adet    = $("[name='adet']").val(),
      message = $("[name='message']").val(),
      m = '';

  check(name, String);
  check(email, String);
  check(telefon, String);
  check(adet, String);
  check(message, String);

  name    = TagStripper.strip( name, false, '', '' );
  email   = TagStripper.strip( email, false, '', '' );
  telefon = TagStripper.strip( telefon, false, '', '' );
  adet    = TagStripper.strip( adet, false, '', '' );
  message = TagStripper.strip( message, false, '', '' );

  name    = name.substr(0,250);
  email   = email.substr(0,250);
  telefon = telefon.substr(0,250);
  adet    = adet.substr(0,250);
  message = message.substr(0,1000);

  if ( !name.length || !email.length || !telefon.length || !adet.length || !message.length) {
    if (l === 'tr') { m = 'Lütfen tüm bilgileri eksiksiz doldurun.'; }
    if (l === 'en') { m = 'Please fill all the form inputs.'; }
    if (l === 'fr') { m = 'Se il vous plaît remplir tous les données du formulaire.'; }
    if (l === 'de') { m = 'Bitte füllen Sie alle Formulareingaben.'; }
    alert(m);
    return false;
  }

  Meteor.call('email', name,email,telefon,adet,message, function(e,r) {
    if (e) {
      if (l === 'tr') { m = 'Bir hata oluştu, lütfen tekrar deneyin.'; }
      if (l === 'en') { m = 'There is an error, please try again.'; }
      if (l === 'fr') { m = 'Il ya une erreur, se il vous plaît essayer à nouveau.'; }
      if (l === 'de') { m = 'Es ist ein Fehler, versuchen Sie es erneut.'; }
      alert(m);
    } else if (r) {
      if (l === 'tr') { m = 'Siparişiniz alındı. Teşekkür ederiz.'; }
      if (l === 'en') { m = 'We have received your order. Thank you.'; }
      if (l === 'fr') { m = 'Nous avons bien reçu votre commande. Merci.'; }
      if (l === 'de') { m = 'Wir haben Ihre Bestellung erhalten. Danke.'; }
      alert(m);

      $('form')[0].reset();
    }

  });

};

_.each(['tr','en','de','fr'], function(language){
  Template[language].events({
    'click [type="submit"]': function(e,t){
      e.preventDefault();
      submitEmail(language);
    }
  });
});

