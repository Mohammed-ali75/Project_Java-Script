let all = document.querySelector(".here");

let products = [
  {
    id: 1,
    title: "iphone 15",
    price: 100000,
    imageUrl: "img/iphone_15.jpg",
    quantity: 1,
  },
  {
    id: 2,
    title: "iphone 14",
    price: 75000,
    imageUrl: "img/iphone_14.jpg",
    quantity: 1,
  },
  {
    id: 3,
    title: "iphone 13",
    price: 50000,
    imageUrl: "img/iphone_13.jpg",
    quantity: 1,
  },
  {
    id: 4,
    title: "MacBook laptop",
    price: 5000,
    imageUrl: "img/MacBook_laptop.jpg",
    quantity: 1,
  },
  {
    id: 5,
    title: "Apple MacBook 12",
    price: 125000,
    imageUrl: "img/Apple_MacBook_12.jpg",
    quantity: 1,
  },
  {
    id: 6,
    title: "Apple MacBook Pro",
    price: 110000,
    imageUrl: "img/Apple_MacBook_Pro.jpg",
    quantity: 1,
  },
  {
    id: 7,
    title: "10.2-inch iPad",
    price: 55000,
    imageUrl: "img/10.2-inch-iPad.jpg",
    quantity: 1,
  },
  {
    id: 8,
    title: "Apple 2022 iPad Air",
    price: 85000,
    imageUrl: "img/Apple-2022-iPad-Air.jpg",
    quantity: 1,
  },
  {
    id: 9,
    title: "Apple 2022 iPad Pro",
    price: 60000,
    imageUrl: "img/Apple-2022-iPad-Pro.jpg",
    quantity: 1,
  },
  {
    id: 10,
    title: "Apple Watch Series 7",
    price: 150,
    imageUrl: "img/Apple-Watch-Series 7.jpg",
    quantity: 1,
  },
  {
    id: 11,
    title: "Apple Watch Series 8",
    price: 250,
    imageUrl: "img/Apple-Watch-Series-8.jpg",
    quantity: 1,
  },
  {
    id: 12,
    title: "Apple Watch Series 9",
    price: 300,
    imageUrl: "img/Apple-Watch-Series-9.jpg",
    quantity: 1,
  },
];

let choices = [
  { id: 1, name: "iPhone" },
  { id: 2, name: "MacBook" },
  { id: 3, name: "iPad" },
  { id: 4, name: "Apple Watch" },
];

function drawItem() {
  let selectedChoice = "";

  let choiceButtons = choices.map((choice) => {
    return `<button onclick="filterItems('${choice.name}')">${choice.name}</button>`;
  });

  let visibleItems = products.filter((item) => {
    return item.isVisible === true;
  });

  let hiddenItems = products.filter((item) => {
    return item.isVisible === false;
  });

  let visibleItemsHTML = visibleItems.map((item) => {
    let isAdded = addedItem.some((added) => added.id === item.id);
    let buttonColor = isAdded ? "black" : "";

    return `
    <div class="my-3 col col-4">
      <div class="card border border-secondary m-auto">
        <img src="${item.imageUrl}"/>
        <div class="card-body">
          <h5 class="card-title test">${item.title}</h5>
          <p>${item.price} EGP</p>
          <button class="btn btn-secondary" onclick="addToCart(${
            item.id
          })" style="background-color: ${buttonColor}">${
      isAdded ? "Added" : "Add to Cart"
    }</button>
          <button class="buttonHeart" onclick="toggleLike(this)" data-item-id="${
            item.id
          }">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart like" style="display: none"></i>
          </button>
        </div>
      </div>
    </div>
    `;
  });

  let hiddenItemsHTML = hiddenItems.map((item) => {
    let isAdded = addedItem.some((added) => added.id === item.id);
    let buttonColor = isAdded ? "black" : "";

    return `
    <div class="my-3 col col-4" style="display: none;">
      <div class="card border border-secondary m-auto">
        <img src="${item.imageUrl}"/>
        <div class="card-body">
          <h5 class="card-title test">${item.title}</h5>
          <p>${item.price} EGP</p>
          <button class="btn btn-secondary" onclick="addToCart(${
            item.id
          })" style="background-color: ${buttonColor}">${
      isAdded ? "Added" : "Add to Cart"
    }</button>
          <button class="buttonHeart" onclick="toggleLike(this)" data-item-id="${
            item.id
          }">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart like" style="display: none"></i>
          </button>
        </div>
      </div>
    </div>
    `;
  });

  let allItems = `
    <div class="choices">
      <button onclick="filterItems('all')">All</button>
      ${choiceButtons.join("")}
    </div>
    <div class="items">
      ${visibleItemsHTML.join("")}
      ${hiddenItemsHTML.join("")}
    </div>
  `;

  all.innerHTML = allItems;
}

function filterItems(choice) {
  drawItem();

  let items = document.querySelectorAll(".card");

  let visibleItems = document.querySelectorAll(".col-4");

  visibleItems.forEach((item) => {
    if (choice === "all") {
      item.style.order = "1";
    } else if (
      item
        .querySelector(".card-title")
        .textContent.toLowerCase()
        .includes(choice.toLowerCase())
    ) {
      item.style.order = "-1";
    } else {
      item.style.display = "none";
    }
  });

  items.forEach((item) => {
    if (choice === "all") {
      item.style.display = "block";
      item.querySelector("img").style.marginLeft = "64px";
    } else if (
      item
        .querySelector(".card-title")
        .textContent.toLowerCase()
        .includes(choice.toLowerCase())
    ) {
      item.style.display = "block";
      item.querySelector("img").style.marginLeft = "64px";
    } else {
      item.style.display = "none";
    }
  });
}

drawItem();

let cartsProductDiv = document.querySelector(".carts_products div");
let num = document.querySelector(".num");

function addToCart(id) {
  if (localStorage.getItem("email")) {
    let chooseItem = products.find((item) => item.id === id);
    let existingItem = document.querySelector(
      `.carts_products div p[data-id="${id}"]`
    );

    let itemExists = Boolean(existingItem);

    if (!itemExists || !chooseItem.isAdded) {
      if (!itemExists) {
        cartsProductDiv.innerHTML += createCartItem(chooseItem);
      } else {
        let itemCount = existingItem.querySelector(".item-count");
        let count = parseInt(itemCount.innerHTML);
        itemCount.innerHTML = count + 1;
      }

      chooseItem.isAdded = true;
      addedItem = [...addedItem, chooseItem];
      updateLocalStorageAndTotalCount();

      event.target.style.backgroundColor = "black";
      event.target.innerHTML = "Added";
    }
  } else {
    window.location = "login.html";
  }
}

function increaseItemCount(id) {
  let existingItem = document.querySelector(
    `.carts_products div p[data-id="${id}"]`
  );
  let itemCount = existingItem.querySelector(".item-count");
  let count = parseInt(itemCount.innerHTML);
  itemCount.innerHTML = count + 1;

  let chooseItem = addedItem.find((item) => item.id === id);
  chooseItem.quantity += 1;
  addedItem = [...addedItem];
  updateLocalStorageAndTotalCount();
}

function lossItemCount(id) {
  let existingItem = document.querySelector(
    `.carts_products div p[data-id="${id}"]`
  );
  let itemCount = existingItem.querySelector(".item-count");
  let count = parseInt(itemCount.innerHTML);
  itemCount.innerHTML = count - 1;

  if (count === 1) {
    existingItem.remove();
  }

  let ProductJson = JSON.parse(localStorage.getItem("ProductInCart"));
  let chooseItem = ProductJson.find((item) => item.id === id);
  chooseItem.quantity -= 1;
  if (chooseItem.quantity === 0) {
    let removeIndex = ProductJson.findIndex((item) => item.id === id);
    if (removeIndex !== -1) {
      ProductJson.splice(removeIndex, 1);
    }
  }
  localStorage.setItem("ProductInCart", JSON.stringify(ProductJson));

  addedItem = ProductJson;
  updateLocalStorageAndTotalCount();

  let addButton = document.querySelector(`button[onclick="addToCart(${id})"]`);
  addButton.style.backgroundColor = "";
  addButton.innerHTML = "Add to Cart";
}

function createCartItem(item) {
  return `<p class="nav-link active p-0 m-auto mb-1 d-inline-block" data-id="${item.id}">${item.title}
      <button class="increase-btn" onclick="lossItemCount(${item.id})">-</button>
      <span class="item-count">${item.quantity}</span>
      <button class="increase-btn" onclick="increaseItemCount(${item.id})">+</button>
    </p>`;
}

function updateLocalStorageAndTotalCount() {
  localStorage.setItem("ProductInCart", JSON.stringify(addedItem));
  let totalCount = addedItem.length;
  num.innerHTML = totalCount;
}

let cartsProducts = document.querySelector(".carts_products");
let carts = document.querySelector(".carts");

carts.addEventListener("click", openCart);
function openCart() {
  if (cartsProductDiv.innerHTML != "") {
    if (cartsProducts.style.display == "block") {
      cartsProducts.style.display = "none";
    } else {
      cartsProducts.style.display = "block";
    }
  }
}

let addedItem = localStorage.getItem("ProductInCart")
  ? JSON.parse(localStorage.getItem("ProductInCart"))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartsProductDiv.innerHTML += `<p class="nav-link active p-0 m-auto mb-1 d-inline-block" data-id="${item.id}">${item.title}
      <button class="increase-btn" onclick="lossItemCount(${item.id})">-</button>
      <span class="item-count">${item.quantity}</span>
      <button class="increase-btn" onclick="increaseItemCount(${item.id})">+</button>
    </p>`;
  });
  num.innerHTML = addedItem.length;
}

if (num.textContent == 0) {
  num.textContent = "";
}

let go = document.querySelector(".go");

go.addEventListener("click", function () {
  if (cartsProductDiv.innerHTML == "") {
    go.href = "";
  } else {
    go.href = "cartsproducts.html";
  }
});

let css = document.querySelector("style");
let on = document.querySelector("#on");
let off = document.querySelector("#off");

function styleOn() {
  let n = products.map((item) => {
    return `
    .card {
      width: 60rem;
      flex-direction: row;
      display: block;
    }
    .card button:not(.buttonHeart){
      position: absolute;
      right: 10px;
      top: 16px;
    }
    .my-3 {
      width: 100%;
    }
    p {
      display: inline;
    }
    .card img {
      margin-left: 64px;
    }
        `;
  });
  on.style.backgroundColor = "#cbcbcb";
  off.style.backgroundColor = "#fff";
  css.innerHTML = n;
}

function styleOff() {
  let f = products.map((item) => {
    return ``;
  });
  off.style.backgroundColor = "#cbcbcb";
  on.style.backgroundColor = "#fff";
  css.innerHTML = f;
}

on.addEventListener("click", styleOn);
off.addEventListener("click", styleOff);

let searchInput = document.querySelector("#search");
let searchBtn = document.querySelector("#searchBtn");
let XSearchBtn = document.querySelector("#XSearchBtn");

searchBtn.addEventListener("click", searchProducts);
XSearchBtn.addEventListener("click", XSearchProducts);

function searchProducts() {
  let searchTerm = searchInput.value.toLowerCase();
  let filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );
  searchInput.style.display = "inline-block";
  XSearchBtn.style.display = "inline-block";
  drawItem(filteredProducts);
}
function XSearchProducts() {
  searchInput.value = "";
  searchInput.style.display = "none";
  XSearchBtn.style.display = "none";
  drawItem();
}

function drawItem(filtered = products) {
  let y = filtered.map((item) => {
    return `
    <div class="my-3 col col-4">
      <div class="card border border-secondary m-auto">
        <img src="${item.imageUrl}"/>
        <div class="card-body">
          <h5 class="card-title test">${item.title}</h5>
          <p>${item.price} EGP</p>
          <button class="btn btn-secondary" onclick="addToCart(${item.id})">Add to Cart</button>
          <button class="buttonHeart">
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-heart like" style="display: none;"></i>
          </button>
        </div>
      </div>
    </div>
        `;
  });
  all.innerHTML = y.join("");
}

drawItem();

let sortByPriceAsc = document.querySelector("#sortByPriceAsc");
let sortByPriceDesc = document.querySelector("#sortByPriceDesc");

sortByPriceAsc.addEventListener("click", sortProductsByPriceAsc);
sortByPriceDesc.addEventListener("click", sortProductsByPriceDesc);

function sortProductsByPriceAsc() {
  let sortedProducts = products.slice().sort((a, b) => a.price - b.price);
  drawItem(sortedProducts);
}

function sortProductsByPriceDesc() {
  let sortedProducts = products.slice().sort((a, b) => b.price - a.price);
  drawItem(sortedProducts);
}

function addToLike(id) {
  if (localStorage.getItem("email")) {
    let chooseItem = products.find((item) => item.id === id);

    let likeItem = JSON.parse(localStorage.getItem("likes")) || [];

    let index = likeItem.findIndex((item) => item.id === id);
    if (index !== -1) {
      likeItem.splice(index, 1);
    } else {
      likeItem.push(chooseItem);
    }

    localStorage.setItem("likes", JSON.stringify(likeItem));

    let likeButton = document.querySelector(
      `.buttonHeart[data-item-id="${id}"]`
    );

    if (likeButton) {
      let likeIcon = likeButton.querySelector(".fa-solid.fa-heart");
      if (index !== -1) {
        likeIcon.style.display = "none";
      } else {
        likeIcon.style.display = "block";
      }
    }
  } else {
    window.location = "login.html";
  }
}

function drawItem(filtered = products) {
  let likeItem = JSON.parse(localStorage.getItem("likes")) || [];

  let y = filtered.map((item) => {
    let isLiked = likeItem.some((likedItem) => likedItem.id === item.id);
    return `
    <div class="my-3 col col-4">
      <div class="card border border-secondary m-auto">
        <img src="${item.imageUrl}"/>
        <div class="card-body">
          <h5 class="card-title test">${item.title}</h5>
          <p>${item.price} EGP</p>
          <button class="btn btn-secondary" onclick="addToCart(${
            item.id
          })">Add to Cart</button>
          <button class="buttonHeart" onclick="addToLike(${
            item.id
          })" data-item-id="${item.id}">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart like" style="display: ${
              isLiked ? "block" : "none"
            };"></i>
          </button>
        </div>
      </div>
    </div>
    `;
  });

  all.innerHTML = y.join("");
}

drawItem();
