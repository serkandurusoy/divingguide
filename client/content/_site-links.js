Template.siteLinks.events({
  'click a': function() {
    Tracker.afterFlush(function() {
      window.scrollTo(0,0);
    })
  }
});
