function TModelStorage(name) {
  this.storage = name;

  var viewStorage = null;

  this.start = function (view, name) {
    viewStorage = view;
    this.storage = this.reset(name);
  };

  this.updateView = function () {
    if (viewStorage)
      viewStorage.update();
  };

  this.add = function () {
    var valueName = prompt('Введите название', 'Test name').toLowerCase().trim();
    var fHash = {};

    if (valueName) {
      fHash.recipe = prompt('Введите рецепт приготовления', 'Test Recipe');
      return this.addValue(valueName, fHash);
    } else {
      alert('Ввод отменен!')
    }
  };

  this.show = function () {
    var valueName = prompt('Введите название: ', '').toLowerCase().trim();
    var getValueInfo = (valueName) ? this.storage.getValue(valueName) : 0;
    var resultHTML = '';

    if (getValueInfo) {
      var print1 = 'Название: ' + valueName + '<br>';
      var print2 = 'Рецепт: ' + getValueInfo.recipe + '<br>';

      resultHTML = print1 + print2;
    } else {
      resultHTML = 'Ошибка! По вашему запросу ничего не найдено';
    }
    this.updateView(resultHTML);
  };

  this.del = function () {
    var valueName = prompt('Что удалить?').toLowerCase().trim();
    var delValueInfo = this.storage.deleteValue(valueName);
    var resultHTML = '';

    if (delValueInfo) {
      resultHTML = 'Информация о ' + valueName + ' удалена';
    } else {
      resultHTML = 'Ошибка! По вашему запросу ничего не найдено';
    }
    this.updateView(resultHTML);
  };

  this.list = function () {
    var showMenuInfo = this.storage.getKeys();
    var resultHTML = '';

    if (showMenuInfo.length) {
      for (var i = 0; i < showMenuInfo.length; i++) {
        resultHTML += (i + 1) + '. ' + showMenuInfo[i] + '<br>';
      }
    } else {
      resultHTML = 'Меню пустое.';
    }
    this.updateView(resultHTML);
  }
}

TModelStorage.prototype = Object.create(TLocalStorage);
TModelStorage.prototype.constructor = TModelStorage;
