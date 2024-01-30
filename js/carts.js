let likes = localStorage.getItem("likes");
let likesAll = document.querySelector(".here");

if (likes) {
  let item = JSON.parse(likes);
  drawLikes(item);
}

function drawLikes(products) {
  let y = products.map((item) => {
    return `
    <div class="swiper-slide">
      <div class="my-3 col">
        <div class="card border border-secondary m-auto">
          <img src="${item.imageUrl}"/>
          <div class="card-body" style="padding-top: 17px">
            <h5 class="card-title test">${item.title}</h5>
            <p>${item.price} EGP</p>
            <button class="buttonHeart" onclick="removeFromLikes(${item.id})" data-item-id="${item.id}">
              <i class="fa-solid fa-heart like"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
        `;
  });
  likesAll.innerHTML = y;
}

function removeFromLikes(id) {
  let likes = JSON.parse(localStorage.getItem("likes"));
  let removeIndex = likes.findIndex((item) => item.id === id);
  if (removeIndex !== -1) {
    likes.splice(removeIndex, 1);
    localStorage.setItem("likes", JSON.stringify(likes));
  }
  location.reload();
}

var swiper = new Swiper(".swiper", {
  slidesPerView: 4.7,
  direction: getDirection(),
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    resize: function () {
      swiper.changeDirection(getDirection());
    },
  },
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? "vertical" : "horizontal";

  return direction;
}

let ProductInCart = localStorage.getItem("ProductInCart");
let all = document.querySelector(".row");
let totalPrice = 0;
let addedItem = [];

if (ProductInCart) {
  let item = JSON.parse(ProductInCart);
  drawCartProducts(item);
  calculateTotalPrice(item);
  addedItem = item;
  totalAll(item);
}

function calculateTotalPrice(products) {
  totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.textContent = `Total Price: ${totalPrice} EGP`;
}

function drawCartProducts(products) {
  let y = products.map((item) => {
    return `
      <div class="my-3 col">
        <div class="card border border-secondary m-auto border-0 border-bottom flex-row rounded-0 pb-3" data-id="${item.id}">
          <img src="${item.imageUrl}"/>
          <div class="card-body">
            <h5 class="card-title test">${item.title}</h5>
            <p>${item.price} EGP</p>
            <button class="btn btn-secondary" onclick="removeFromCart(${item.id})">Remove From Cart</button>
            <div class="card-num test">
              <button class="increase-btn xx" onclick="decreaseItemCount(${item.id})">-</button>
              <span class="item-count">${item.quantity}</span>
              <button class="increase-btn xx" onclick="increaseItemCount(${item.id})">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  all.innerHTML = y.join("");
}

function removeFromCart(id) {
  let ProductJson = JSON.parse(localStorage.getItem("ProductInCart"));
  let removeIndex = ProductJson.findIndex((item) => item.id === id);
  if (removeIndex !== -1) {
    ProductJson.splice(removeIndex, 1);
    localStorage.setItem("ProductInCart", JSON.stringify(ProductJson));
  }
  location.reload();
  if (ProductJson.length === 0) {
    window.location = "index.html";
  }
}

function decreaseItemCount(id) {
  let ProductJson = JSON.parse(localStorage.getItem("ProductInCart"));
  let item = ProductJson.find((item) => item.id === id);

  if (item) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      let removeIndex = ProductJson.findIndex((item) => item.id === id);
      if (removeIndex !== -1) {
        ProductJson.splice(removeIndex, 1);
      }
    }

    localStorage.setItem("ProductInCart", JSON.stringify(ProductJson));
    location.reload();
  }
  if (ProductJson.length === 0) {
    window.location = "index.html";
  }
}

function increaseItemCount(id) {
  let ProductJson = JSON.parse(localStorage.getItem("ProductInCart"));
  let item = ProductJson.find((item) => item.id === id);

  if (item) {
    item.quantity += 1;
    localStorage.setItem("ProductInCart", JSON.stringify(ProductJson));
    location.reload();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (!ProductInCart) {
    localStorage.setItem("ProductInCart", "[]");
  }
  let itemCounts = JSON.parse(ProductInCart).length;
  let itemCountSpan = document.querySelector(".item-count");
  itemCountSpan.textContent = itemCounts;
});

function clearCart() {
  localStorage.removeItem("ProductInCart");
  alert( `تم إرسال طلبك، اجمالي الحساب: ${totalPrice} EGP`);
  window.location = "index.html";
}
