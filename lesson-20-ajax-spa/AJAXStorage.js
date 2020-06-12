function TAjaxStorage(name) {
  var self = this;
  self.storage = {};
}

var ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;

TAjaxStorage.prototype.sendRequest = function () {
  $.ajax(
    {
      url: ajaxHandlerScript,
      type: 'POST',
      data: {
        f: 'LOCKGET', n: 'GASPODARIK_DRINK_STORAGE',
        p: updatePassword
      },
      cache: false,
      success: getReady,
      error: errorHandler
    }
  );
};

TAjaxStorage.prototype.updateStorage = function () {
  $.ajax(
    {
      url: ajaxHandlerScript,
      type: 'POST',
      data: {
        f: 'UPDATE', n: 'GASPODARIK_DRINK_STORAGE',
        v: JSON.stringify(this.storage), p: updatePassword
      },
      cache: false,
      success: updateReady,
      error: errorHandler
    }
  );

  function updateReady(result) {
    if (result.error !== undefined) {
      alert(result.error);
    }
  }
};

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + ' ' + errorStr);
}

function getReady(result) {
  if (result.error !== undefined) {
    alert(result.error);
  } else {
    if (result.result != '') {
      this.storage = JSON.parse(result.result);
    } else {
      this.storage = {};
    }
  }
}

TAjaxStorage.prototype.addValue = function (key, value) {
  updatePassword = Math.random();
  this.sendRequest();
  this.storage[key] = value;
  this.updateStorage();
};
TAjaxStorage.prototype.readStorage = function () {
  $.ajax(
    {
      url: ajaxHandlerScript,
      type: 'POST',
      data: {
        f: 'READ', n: 'GASPODARIK_DRINK_STORAGE'
      },
      cache: false,
      success: getReady,
      error: errorHandler
    }
  );
};
TAjaxStorage.prototype.getValue = function (key) {
  this.readStorage();
  return this.storage[key];
};

TAjaxStorage.prototype.deleteValue = function (key) {
  updatePassword = Math.random();
  this.sendRequest();
  if (this.storage[key]) {
    delete this.storage[key];
    this.updateStorage();
    return true;
  } else {
    return false;
  }
};

TAjaxStorage.prototype.getKeys = function () {
  this.readStorage();
  return Object.keys(this.storage);
};