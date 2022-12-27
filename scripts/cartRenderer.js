let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartDOM = document.querySelector('.cart');
const loginState = localStorage.getItem('logState');
let cItems;

if (cart.length > 0) {
  cart.forEach(cartItem => {
    const product = cartItem;
    insertItemToDOM(product);
    countCartTotal();
    handleActionButtons(product);
  });
  // cartDOM.insertAdjacentHTML(
  //   'afterbegin',
  //   `
  //   <tr class="cartTableHeaders">
  //     <th></th>
  //     <th>ITEM NAME</th>
  //     <th>PRICE (P)</th>
  //     <th></th>
  //     <th></th>
  //     <th></th>
  //     <th></th>
  //   </tr>
  // `
  // );
}
else{noItemAlert()}

function noItemAlert(){
  if (cart.length <= 0){
    cartDOM.insertAdjacentHTML('beforeend',
    `
      <div class="no-items-alert">
        <h1>No items in cart right now, If you want to get something <a class="alertLink" href="shop.html">Shop</a></h1>
      </div>
    `
    );
  }
}

function insertItemToDOM(product) {
  cartDOM.insertAdjacentHTML(
    'beforeend',
    `
    <tr class="cart-product">
      <td class="cart-image-container"><img class="cart-product-image" src="${product.image}" alt="${product.name}"></td>
      <td><h3 class="cart-product-name">${product.name}</h3></td>
      <td class="cart-text-container"><h3 class="cart-product-price">${product.price}</h3></td>
      <td class="cart-btn-container"><button class="pos-btn ${product.quantity === 1 ? ' neg-btn' : ''}" data-action="DECREASE_ITEM">&minus;</button></td>
      <td class="cart-text-container"><h3 class="cart-product-quantity">${product.quantity}</h3></td>
      <td class="cart-btn-container"><button class="pos-btn" data-action="INCREASE_ITEM">&plus;</button></td>
      <td class="cart-btn-container"><button class="neg-btn" data-action="REMOVE_ITEM">&times;</button></td>
    </tr>
  `
  );

  addCartFooter();
}

function handleActionButtons(product) {

  const cartItemsDOM = cartDOM.querySelectorAll('.cart-product');
  cartItemsDOM.forEach(cartItemDOM => {
    if (cartItemDOM.querySelector('.cart-product-name').innerText === product.name) {
      cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(product, cartItemDOM));
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => decreaseItem(product, cartItemDOM));
      cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDOM));
    }
  });
}

function increaseItem(product, cartItemDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      cartItemDOM.querySelector('.cart-product-quantity').innerText = ++cartItem.quantity;
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('neg-btn');
      saveCart();
      storeTotal();
    }
  });
}

function decreaseItem(product, cartItemDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      if (cartItem.quantity > 1) {
        cartItemDOM.querySelector('.cart-product-quantity').innerText = --cartItem.quantity;
        saveCart();
        storeTotal();
      } else {
        removeItem(product, cartItemDOM);
      }

      if (cartItem.quantity === 1) {
        cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('neg-btn');
      }
    }
  });
}

function removeItem(product, cartItemDOM) {
  cartItemDOM.classList.add('cart-product--removed');
  setTimeout(() => cartItemDOM.remove(), 150);
  cart = cart.filter(cartItem => cartItem.name !== product.name);
  saveCart();
  storeTotal();

  if (cart.length < 1) {
    document.querySelector('.cart-footer-buttons').remove();
    noItemAlert()
  }
}

function addCartFooter() {
  const classX = document.querySelector('x');
  if (document.querySelector('.cart-footer-buttons') === null) {
    cartDOM.insertAdjacentHTML(
      'afterend',
      `
        <div class="cart-footer-buttons">
          <button class="neg-btn" data-action="CLEAR_CART">Remove All</button>
          <button class="pos-btn" data-action="CHECKOUT">Pay</button>
        </div>
      `
    );
  
      document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', () => clearCart());
      document.querySelector('[data-action="CHECKOUT"]').addEventListener('click', () => checkout());
  }
}

function clearCart() {
  cartDOM.querySelectorAll('.cart-product').forEach(cartItemDOM => {
    cartItemDOM.classList.add('cart-product--removed');
    setTimeout(() => cartItemDOM.remove(), 150);
  });

  cart = [];
  localStorage.removeItem('cart');
  storeTotal();
  document.querySelector('.cart-footer-buttons').remove();
  setTimeout(() => noItemAlert(), 300);
}

function checkout() {
  //if(loginState == 1){
    window.location.replace('checkout.html');
  //}
  //else{
    //alert('YOU NEED TO LOG IN FIRST!!');
    //window.location.replace('login.html');
  //}
}

function countCartTotal() {
  let cartTotal = 0;
  cart.forEach(cartItem => (cartTotal += cartItem.quantity * cartItem.price));
  var rounded = parseFloat(cartTotal).toFixed(2);
  document.querySelector('[data-action="CHECKOUT"]').innerText = `Pay P${rounded}`;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  countCartTotal();
}

function storeTotal() {
  cItems = 0;
  cart.forEach(cartItem => (cItems += cartItem.quantity));
  localStorage.setItem('cItems', cItems);
}
