// Create a collection so we can store the tokens we get and not have to
// re-authenticate all the time.
// @todo: Use application-configuration or whatever (the thing accounts-google uses) to store this instead of our own table.
TodoistData = new Meteor.Collection("wizonesolutionsTodoistData");

var base = 'https://todoist.com/API/';

Todoist = function (email, pass, cb) {
  var _self = this;

  if (!email || !pass ) {
    throw 'Must instantiate Todoist with an email and password';
  }
  this.user = TodoistData.findOne({ email: email }) || {};

  if (_.isEmpty(this.user)) {
    var result;
    try {
      result = Async.runSync(function (done) {
        var miniData;
        _self._getIt('login', {email: email, password: pass}, true,
        function (err, resp, data) {
          if (err) {
            done(err);
            return;
          }
          if (data == 'LOGIN_ERROR') {
            done(resp);
            return;
          }

          done(null, data);
        }.bind(_self));
      });

      data = result.result;

      this.user = data;

      // Refresh user data.
      TodoistData.remove({ id: data.id, email: data.email });
      TodoistData.insert(data);
      cb(null, resp, this.user);
      return;
    }
    catch (err) {
      throw err;
    }
  }

  return this;
};

// Todoist.VERSION = version;

Todoist.prototype.request = function (ep, params, cb) {
  ep = ep.toLowerCase();
  var JSONresponse = true;

  switch (ep) {
    case 'ping':
    case 'deleteUser':
    case 'updateprojectorders':
    case 'deleteproject':
    case 'deletelabel':
    case 'updateorders':
    case 'deleteitems':
    case 'completeitems':
    case 'uncompleteitems':
    case 'updatenote':
    case 'deletenote':
      JSONresponse = false;
      break;
    case 'query':
      break;
    case 'uploadfile':
      break;
  }
  if (!params.hasOwnProperty('token')) {
    params.token = this.user.token;
  }
  // console.log(ep + ' params'); console.log(params);
  this._getIt(ep, params, JSONresponse, cb);
  return;
};

Todoist.prototype._getIt = function (endpoint, params, json, cb) {
  var path = base + endpoint;

  try {
    var resp = HTTP.get(path, { params: params });
    // send it back as object so that way caller always gets objects
    cb(null, resp, resp.data);
  }
  catch (err) {
    cb(err);
  }
};
