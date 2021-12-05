//  Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State

  const data = {
    items: [
      //   {
      //     id: 0,
      //     name: 'Steak Dinner',
      //     calories: 1200,
      //   },
      //   {
      //     id: 1,
      //     name: 'Cookie',
      //     calories: 400,
      //   },
      //   {
      //     id: 2,
      //     name: 'Eggs',
      //     calories: 300,
      //   },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public Methods
  return {
    logData() {
      return data;
    },
    getItems() {
      return data.items;
    },
    addItem(name, calories) {
      let id;
      //   Create id

      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      // Calories to number
      calories = +calories;

      // Create new item
      const newItem = new Item(id, name, calories);
      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories() {
      let total = 0;

      data.items.forEach((item) => {
        total += item.calories;
      });
      //   Set total cal in data structure
      data.totalCalories = total;
      return data.totalCalories;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
  };
  // Public Methods
  return {
    populateItemList(items) {
      let html = '';

      items.forEach((item) => {
        html += `
              <li id="item-${item.id}" class="collection-item">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil"></i>
                </a>
              </li>`;
      });

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors() {
      return UISelectors;
    },
    getItemInput() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      const html = `
        <li id="item-${item.id}" class="collection-item">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="fa fa-pencil"></i>
            </a>
        </li>
        `;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentHTML('beforeend', html);
    },
    clearInput() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemNameInput).focus();
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    displayTotalCalories(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
    },
  };
})();

// App Controller
const AppCtrl = (function () {
  // Load event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();
    //   Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };
  // Add item submit
  function itemAddSubmit(e) {
    //   Get form input from UICtrl
    const input = UICtrl.getItemInput();

    // Check for name and calories input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //   Add Item to UI list
      UICtrl.addListItem(newItem);
      //   Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.displayTotalCalories(totalCalories);
      //   Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Public Methods
  return {
    init() {
      // Fetch Items data structure
      const items = ItemCtrl.getItems();

      //   Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //    Populate list with items
        UICtrl.populateItemList(items);
      }

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.displayTotalCalories(totalCalories);
      //   Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

AppCtrl.init();
