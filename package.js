Package.describe({
  name: 'wizonesolutions:todoist',
  summary: "Wrapper for the Todoist API.",
  version: "1.0.1",
  git: "https://github.com/wizonesolutions/meteor-todoist.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0.0');

  var where = ['server'];

  // Used instead of mongo since it implies mongo in later versions.
  api.use('mongo-livedata', where);
  api.use('underscore', where);
  api.use('http', where)

  api.use('meteorhacks:async@1.0.0', where);

  api.addFiles('todoist.js', where);

  api.export('Todoist', where);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('wizonesolutions:todoist');
  api.addFiles('todoist-tests.js');
});
