Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'home',
  action: function() {
    Router.go('language',{language: 'tr'});
  }
});

Router.route('/:language', {
  name: 'language',
  action: function() {
    var languages=['tr','en','fr','de'];
    if (_.contains(languages,this.params.language)) {
      this.render(this.params.language);
    } else {
      this.render('notFound');
    }
  }
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Iron.Router.hooks.requireModernBrowser = function () {
  var browser = BrowserDetect.browser.toLowerCase(),
      version  = parseInt(BrowserDetect.version)
    ;
  if (browser === 'explorer' && version < 10) {
    window.location.replace('http://outdatedbrowser.com/en');
    this.next();
  } else {
    this.next();
  }
};

Router.onBeforeAction('requireModernBrowser');

Iron.Router.hooks.setUpPageLayout = function() {
  var setUpPageLayout = function() {
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        settings = {
          parallax: true,
          parallaxFactor: 20
        };

    $body.attr('id', 'top');

    skel.init({
      reset: 'full',
      containers: '100%',
      breakpoints: {
        global: { href: '/css/style.css', grid: { gutters: ['2.5em', 0] } },
        xlarge: { media: '(max-width: 1800px)', href: '/css/style-xlarge.css' },
        large: { media: '(max-width: 1280px)', href: '/css/style-large.css', grid: { gutters: ['2em', 0] } },
        medium: { media: '(max-width: 980px)', href: '/css/style-medium.css'},
        small: { media: '(max-width: 736px)', href: '/css/style-small.css', grid: { gutters: ['1.5em', 0] }, viewport: { scalable: false } },
        xsmall: { media: '(max-width: 480px)', href: '/css/style-xsmall.css' }
      }
    });

    if (skel.vars.isMobile) {
      $body.addClass('is-touch');
      window.setTimeout(function() {
        $window.scrollTop($window.scrollTop() + 1);
      }, 0);
    }

    if (skel.vars.IEVersion < 10) {
      var $form = $('form');
      if ($form.length > 0) {
        $.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
        $form.n33_formerize();
      }
    }

    if (skel.vars.browser == 'ie' ||	skel.vars.isMobile) settings.parallax = false;

    if (settings.parallax) {
      skel.change(function() {
        if (skel.isActive('medium')) {
          $window.off('scroll.strata_parallax');
          $header.css('background-position', 'top left, center center');
        }
        else {
          $header.css('background-position', 'left 0px');
          $window.on('scroll.strata_parallax', function() {
            $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
          });
        }
      });
    }

    $('#two').poptrox({
      caption: function($a) { return $a.next('h3').text(); },
      overlayColor: '#2c2c2c',
      overlayOpacity: 0.85,
      popupCloserText: '',
      popupLoaderText: '',
      selector: '.work-item a',
      usePopupCaption: true,
      usePopupDefaultStyling: false,
      usePopupEasyClose: false,
      usePopupNav: true,
      windowMargin: (skel.isActive('small') ? 0 : 50)
    });

    $body.addClass('firstLoaded');

    Tracker.afterFlush(function() {
      Meteor.setTimeout(function () {
        $('.overlay').fadeOut('slow');
      }, 1000)
    })

  }


  _.each(['tr','en','fr','de'], function(language) {
    var seo = [
      {
        language: 'tr',
        title: 'The Diving Guide Kaş | Kaş Dalış Rehberi',
        description: 'Kaş\'taki 21 dalış noktasının haritaları, 200 tanımlanmış sualtı fauna/flora türü ve sualtı fotoğraflarının bulunduğu en kapsamlı Kaş sualtı rehberidir.'
      },

      {
        language: 'en',
        title: 'The Diving Guide Kaş',
        description: 'The most comprehensive directory about diving in Kaş with the underwater maps of 21 diving points in Kaş, 200 defined underwater fauna and flora species and underwater photos.'
      },
      {
        language: 'fr',
        title: 'The Diving Guide Kaş | Le Guide de Plongée: Kas',
        description: 'Avec 21 Cartes des sites de plongée à Kas, 200 espèces de faune et flore sous-marines identifiées et photos, c\' est le guide le plus complet de Kas sous-marine.'
      },
      {
        language: 'de',
        title: 'The Diving Guide Kaş | Kaş Tauchführer',
        description: 'Das umfangreichste Verzeichnis über das Tauchen in Kaş mit den Unterwasserkarten der 21 Tauchstellen in Kaş, 200 identifizierte Unterwasser-Fauna und -Flora und Unterwasserfotos.'
      }
    ];

    Template[language].rendered = function(){
      document.title = _.where(seo, {language: language})[0].title;
      $('meta[name=description]').remove();
      $('head').append( '<meta name="description" content="'+ _.where(seo, {language: language})[0].description +'">' );
      setUpPageLayout();
    }
  })

};

Router.onAfterAction('setUpPageLayout');



