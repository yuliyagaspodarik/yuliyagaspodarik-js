function TStorageControllerButtons() {
  var usedStorage = null;
  var usedContainer = null;

  this.start = function (storage, container) {
    usedStorage = storage;
    usedContainer = container;

    var addButton = usedContainer.querySelector('.add-v');
    addButton.addEventListener('click', this.addV);
    var showButton = usedContainer.querySelector('.show-v');
    showButton.addEventListener('click', this.showV);
    var delButton = usedContainer.querySelector('.del-v');
    delButton.addEventListener('click', this.delV);
    var listButton = usedContainer.querySelector('.list-v');
    listButton.addEventListener('click', this.listV);
  };

  this.addV = function () {
    usedStorage.add();
  };

  this.showV = function () {
    usedStorage.show();
  };

  this.delV = function () {
    usedStorage.del();
  };

  this.listV = function () {
    usedStorage.list();
  }
}