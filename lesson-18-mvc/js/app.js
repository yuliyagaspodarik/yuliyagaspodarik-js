'use strict';

function init() {
  var drinkStorage = new TModelStorage('DRINKS');
  var view1 = new TViewStorage();
  var controller1 = new TStorageControllerButtons();

  var container1 = document.getElementById('drinks');
  drinkStorage.start(view1, 'DRINKS');
  view1.start(drinkStorage, container1);
  controller1.start(drinkStorage, container1);

  drinkStorage.updateView();

  var foodStorage = new TModelStorage('FOOD');
  var view2 = new TViewStorage();
  var controller2 = new TStorageControllerButtons();

  var container2 = document.getElementById('food');
  foodStorage.start(view2, 'FOOD');
  view2.start(foodStorage, container2);
  controller2.start(foodStorage, container2);

  foodStorage.updateView();
}

document.addEventListener('DOMContentLoaded', init, false);
