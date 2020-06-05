function TLocalStorage(name) {
  var self = this;
  var pHash = {};

  self.reset = function (name) {
    if (localStorage.getItem(name)) {
      pHash = JSON.parse(localStorage.getItem(name));
    }
    //hashForRec = {};
    return pHash;
  };

  self.addValue = function (key, value) {
    pHash[key] = value;
    localStorage.setItem(name, JSON.stringify(pHash));
  };

  self.getValue = function (key) {
    return pHash[key];
  };

  self.deleteValue = function (key) {
    delete pHash[key];
    localStorage.setItem(name, JSON.stringify(pHash));
  };

  self.getKeys = function () {
    return (Object.keys(pHash));
  };
}