function TViewStorage() {
  var usedStorage = null;
  var usedContainer = null;

  this.start = function (storage, container) {
    usedStorage = storage;
    usedContainer = container;
    usedContainer.querySelector('.info').innerHTML = '';
  };

  this.update = function (result) {
    usedContainer.querySelector('.info').innerHTML = result;
  }
}