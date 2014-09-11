Package.describe({
  name: 'wizonesolutions:todoist',
  summary: "Wrapper for the Todoist API.",
  version: "1.0.1",
  git: "https://github.com/wizonesolutions/meteor-todoist"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0.1');

  var where = ['server'];

  api.use('mongo', where);
  api.use('underscore', where);
  api.use('meteorhacks:async', where);

  api.addFiles('todoist.js', where);

  api.export('Todoist', where);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('wizonesolutions:todoist');
  api.addFiles('todoist-tests.js');
});
