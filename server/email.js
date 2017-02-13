Meteor.methods({
  'email': function(name,email,telefon,adet,message) {
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
      throw new Meteor.Error(
        'zorunlu-alan',
        'Lütfen tüm bilgileri eksiksiz doldurun.');
    }

    this.unblock();

    Email.send({
      to: 'murat@dragoman-turkey.com',
      from: 'admin@dragoman-turkey.com',
      subject: '[SİPARİŞ VAR] Kaş Diving Guide',
      text: 'isim: ' + name + '\n\n' +
            'email: ' + email + '\n\n' +
            'telefon: ' + telefon + '\n\n' +
            'adet: ' + adet + '\n\n' +
            'adres: ' + message
    });

    return true;

  }
})
