const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const buyButton = document.querySelector(".buy-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

let items = [
  {
    id: 1,
    name: "Apple",
    price: 0.99,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/1200px-Red_Apple.jpg",
  },
  {
    id: 2,
    name: "Banana",
    price: 10,
    src: "https://i5.walmartimages.com/seo/Fresh-Banana-Fruit-Each_5939a6fa-a0d6-431c-88c6-b4f21608e4be.f7cd0cc487761d74c69b7731493c1581.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  },
  {
    id: 3,
    name: "Mango",
    price: 20,
    src: "https://i5.walmartimages.com/seo/Fresh-Mangoes-Each-Sweet_cc54242f-cb87-4a25-9baa-fccaa20f5443.64fa79325ad44a7352dcd3c2a8b477be.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  },
  {
    id: 4,
    name: "Watermelon",
    price: 12,
    src: "https://exoticfruits.co.uk/cdn/shop/products/melon-watermelon-exoticfruitscouk-695603.jpg?v=1645488667",
  },
  {
    id: 5,
    name: "Kiwi",
    price: 15,
    src: "https://healthjade.com/wp-content/uploads/2017/09/kiwi-fruit.jpg",
  },
];

let cart = [];

let valetValue = 100;

// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="${item.src}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}" onclick="addToCart(${item.id})">Add to cart</button>
        `;
    itemsGrid.appendChild(itemElement);
  }
}

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle("show-modal");
}

function addToCart(itemId) {
  const itemToAdd = items.find((item) => item.id === itemId);

  const existingCartItem = cart.find((item) => item.id === itemId);
  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cart.push({ ...itemToAdd, quantity: 1 });
  }

  cartBadge.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartItemsList.innerHTML = "";

  cart.forEach((cartItem) => {
    const cartItemElement = document.createElement("li");
    cartItemElement.innerHTML = `
            <img src="${cartItem.src}" width="50" height="50" alt="${cartItem.name}" class="cart-item-img">
            <span>${cartItem.name} - $${cartItem.price} - <span class="items-badge">${cartItem.quantity}</span></span>
            <button class="add-to-cart-btn-cart" data-id="${cartItem.id}" onclick="addToCart(${cartItem.id})">Add</button>
            <button class="remove-from-cart-btn" data-id="${cartItem.id}" onclick="removeFromCart(${cartItem.id})">Remove</button>
        `;
    cartItemsList.appendChild(cartItemElement);
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(itemId) {
  const index = cart.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }

    cartBadge.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    cartItemsList.innerHTML = "";
    cart.forEach((cartItem) => {
      const cartItemElement = document.createElement("li");
      cartItemElement.innerHTML = `
            <img src="${cartItem.src}" width="50" height="50" alt="${cartItem.name}" class="cart-item-img">
            <span>${cartItem.name} - $${cartItem.price} - <span class="items-badge">${cartItem.quantity}</span></span>
            <button class="add-to-cart-btn-cart" data-id="${cartItem.id}" onclick="addToCart(${cartItem.id})">Add</button>
            <button class="remove-from-cart-btn" data-id="${cartItem.id}" onclick="removeFromCart(${cartItem.id})">Remove</button>
            `;
      cartItemsList.appendChild(cartItemElement);
    });

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
}

function buyItems() {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  if (totalPrice == 0) {
    alert("The cart is empty. Please select items.");
    return;
  }
  if (totalPrice <= valetValue) {
    const confirmation = confirm("Are you sure you want to finish shopping?");
    if (confirmation) {
      alert("Thank you for your purchase!");
      cart = [];
      cartBadge.textContent = 0;
      cartItemsList.innerHTML = "";
      cartTotal.textContent = "$0.00";
    }
  } else {
    alert(
      "Insufficient funds! Please remove some items or add more funds to your valet."
    );
  }
}

function sortItems(sortBy) {
  const itemsGrid = document.querySelector(".items-grid");

  let items = Array.from(itemsGrid.children);

  switch (sortBy) {
    case "nameAZ":
      items.sort((a, b) =>
        a
          .querySelector("h2")
          .textContent.localeCompare(b.querySelector("h2").textContent)
      );
      break;
    case "nameZA":
      items.sort((a, b) =>
        b
          .querySelector("h2")
          .textContent.localeCompare(a.querySelector("h2").textContent)
      );
      break;
    case "price":
      items.sort((a, b) => {
        const priceA = parseFloat(
          a.querySelector("p").textContent.replace("$", "")
        );
        const priceB = parseFloat(
          b.querySelector("p").textContent.replace("$", "")
        );
        return priceA - priceB;
      });
      break;
    default:
      break;
  }

  itemsGrid.innerHTML = "";

  items.forEach((item) => itemsGrid.appendChild(item));
}

const sortSelect = document.querySelector(".sort-select");
sortSelect.addEventListener("change", () => {
  const sortBy = sortSelect.value;
  sortItems(sortBy);
});

fillItemsGrid();
sortItems(sortSelect.value);

cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
buyButton.addEventListener("click", buyItems);
