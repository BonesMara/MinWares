let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartDOM = document.querySelector('.in-cart-items');
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
  //     <th>Image</th>
  //     <th>Item</th>
  //     <th>Price</th>
  //     <th>Reduce</th>
  //     <th>Count</th>
  //     <th>Increase</th>
  //     <th>Remove</th>
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
    <div class="co-product">
      <td><h3 class="co-product-name">${product.name}</h3></td>
      <td><h3 class="co-product-price">${product.price}</h3></td>
      <td><button class="pos-btn ${product.quantity === 1 ? ' neg-btn' : ''}" data-action="DECREASE_ITEM">&minus;</button></td>
      <td><h3 class="co-product-quantity">${product.quantity}</h3></td>
      <td><button class="pos-btn" data-action="INCREASE_ITEM">&plus;</button></td>
      <td><button class="neg-btn" data-action="REMOVE_ITEM">&times;</button></td>
    </div>
  `
  );
}

function handleActionButtons(product) {

  const cartItemsDOM = cartDOM.querySelectorAll('.co-product');
  cartItemsDOM.forEach(cartItemDOM => {
    if (cartItemDOM.querySelector('.co-product-name').innerText === product.name) {
      cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(product, cartItemDOM));
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => decreaseItem(product, cartItemDOM));
      cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDOM));
    }
  });
}

function increaseItem(product, cartItemDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      cartItemDOM.querySelector('.co-product-quantity').innerText = ++cartItem.quantity;
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
        cartItemDOM.querySelector('.c0-product-quantity').innerText = --cartItem.quantity;
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
  cartItemDOM.classList.add('co-product--removed');
  setTimeout(() => cartItemDOM.remove(), 150);
  cart = cart.filter(cartItem => cartItem.name !== product.name);
  saveCart();
  storeTotal();

  if (cart.length < 1) {
    noItemAlert()
  }
}

function clearCart() {
  cartDOM.querySelectorAll('.co-product').forEach(cartItemDOM => {
    cartItemDOM.classList.add('co-product--removed');
    setTimeout(() => cartItemDOM.remove(), 150);
  });

  cart = [];
  localStorage.removeItem('cart');
  storeTotal();
  setTimeout(() => noItemAlert(), 300);
}

function checkout() {
  if(loginState == 1){
    window.location.replace('checkout.html');
  }
  else{
    window.location.replace('login.html');
  }
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
