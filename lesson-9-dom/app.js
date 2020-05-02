'use strict';

function HashStorage() {
  var self = this;
}

HashStorage.prototype.AddValue = function (key, value) {
  this[key] = value;
};

HashStorage.prototype.GetValue = function (key) {
  return this[key];
};

HashStorage.prototype.DeleteValue = function (key) {
  if (key in this) {
    delete this[key];
  } else {
    return key in this;
  }
};

HashStorage.prototype.GetKeys = function () {
  return Object.keys(this);
};