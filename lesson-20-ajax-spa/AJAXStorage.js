'use strict';

var ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var backdrop = document.querySelector('.backdrop');
var modal = document.querySelector('.modal');

function TAjaxStorage(nameStorage) {
  /*var self = this;
  self.storage = {};*/
  this.name = 'GASPODARIK_' + nameStorage + '_STORAGE';
  this.storage = {};
  this.readStorage();
}

TAjaxStorage.prototype.addValue = function (key, value) {
  updatePassword = Math.random();
  this.sendRequest();
  this.storage[key] = value;
  this.updateStorage();
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

TAjaxStorage.prototype.readStorage = function () {
  $.ajax(
    {
      url: ajaxHandlerScript,
      type: 'POST',
      data: {
        f: 'READ', n: this.name
      },
      cache: false,
      success: getReady,
      complete: Complete,
      error: errorHandler,
      xhrFields: {onprogress: Progress}
    }
  );
};

TAjaxStorage.prototype.sendRequest = function () {
  $.ajax(
    {
      url: ajaxHandlerScript,
      type: 'POST',
      data: {
        f: 'LOCKGET', n: this.name,
        p: updatePassword
      },
      cache: false,
      success: getReady,
      complete: Complete,
      error: errorHandler,
      xhrFields: {onprogress: Progress}
    }
  );
};

TAjaxStorage.prototype.updateStorage = function () {
  $.ajax(
    {
      url: ajaxHandlerScript,
      type: 'POST',
      data: {
        f: 'UPDATE', n: this.name,
        v: JSON.stringify(this.storage), p: updatePassword
      },
      cache: false,
      success: updateReady,
      complete: Complete,
      error: errorHandler,
      xhrFields: {onprogress: Progress}
    }
  );

  function updateReady(result) {
    if (result.error !== undefined) {
      alert(result.error);
    }
  }
};

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

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + ' ' + errorStr);
}

function Progress(EO) {
  backdrop.style.display = 'block';
  modal.style.display = 'block';
  if (EO.lengthComputable) {
    var Perc = Math.round(EO.loaded / EO.total * 100);
    document.getElementById('IProgressPerc').style.width = Perc + '%';
  }
}

function Complete() {
  document.getElementById('IProgress').style.display = 'none';
  backdrop.style.display = 'none';
  modal.style.display = 'none';
}