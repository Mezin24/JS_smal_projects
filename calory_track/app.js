//  Storage Controller
const StorageCtrl = (function () {
  // Public Methods
  return {
    storeItem(item) {
      let items;
      // Check if any items in LS
      if (localStorage.getItem('items') === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage(item) {
      const items = JSON.parse(localStorage.getItem('items'));
      const index = items.findIndex((el) => el.id === item.id);
      items.splice(index, 1, item);

      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage(id) {
      const items = JSON.parse(localStorage.getItem('items'));
      const index = items.findIndex((el) => el.id === id);
      items.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage() {
      localStorage.removeItem('items');
    },
  };
})();

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
    // items: [
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
    // ],
    items: StorageCtrl.getItemsFromStorage(),
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
    getItemById(id) {
      return data.items.find((item) => item.id === id);
    },
    setCurrentItem(item) {
      data.currentItem = item;
    },
    getCurrentItem() {
      return data.currentItem;
    },
    updateItem(name, calories) {
      // Calories to  number
      calories = +calories;

      let found = null;

      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem(id) {
      // Get id
      const itemIndex = data.items.findIndex((item) => item.id === id);
      //   Delete item
      data.items.splice(itemIndex, 1);
    },
    clearAllItems() {
      data.items = [];
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    clearBtn: '.clear-btn',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
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
                    <i class="edit-item fa fa-pencil"></i>
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
                <i class="edit-item fa fa-pencil"></i>
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
    clearEditState() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState() {
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    addItemToForm() {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    updateListItem(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn nodelist into array
      listItems = [...listItems];

      listItems.forEach((listItem) => {
        const itemId = listItem.getAttribute('id');

        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                `;
        }
      });
    },
    deleteListItem(id) {
      const itemID = `#item-${id}`;
      document.querySelector(itemID).remove();
    },
    removeItems() {
      document.querySelector(UISelectors.itemList).innerHTML = '';
    },
  };
})();

// App Controller
const App = (function (StorageCtrl, ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();
    //   Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    //   Disable submit on enter
    document.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });

    //   Add item event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemEditClick);

    // Update Item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);

    // Delete Item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);

    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener('click', UICtrl.clearEditState);

    // Clear button event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener('click', clearAllItemsClick);
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
      //   Add total calories to UI
      UICtrl.displayTotalCalories(totalCalories);
      //   Store in localstorage
      StorageCtrl.storeItem(newItem);
      //   Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  //    Click edit item
  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id(item-0)
      const listId = e.target.closest('li').id;
      //    Get an id
      const [_, id] = listId.split('-');
      //   Get item
      const itemToEdit = ItemCtrl.getItemById(+id);
      //   Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      //   Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  //   Ubdate item submit
  const itemUpdateSubmit = function (e) {
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update  LS
    StorageCtrl.updateItemStorage(updatedItem);
    // Update UI
    UICtrl.updateListItem(updatedItem);
    //   Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //   Add total calories to UI
    UICtrl.displayTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  //   Delete button event
  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();
    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);
    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);
    // Delete from LC
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //   Add total calories to UI
    UICtrl.displayTotalCalories(totalCalories);
    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = function (e) {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //   Add total calories to UI
    UICtrl.displayTotalCalories(totalCalories);
    // Remove from UI
    UICtrl.removeItems();
    // Remove from LC
    StorageCtrl.clearItemsFromStorage();
    // Remove list
    UICtrl.hideList();

    e.preventDefault();
  };

  // Public Methods
  return {
    init() {
      // Clear edit state / set initial set
      UICtrl.clearEditState();
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
})(StorageCtrl, ItemCtrl, UICtrl);

App.init();
