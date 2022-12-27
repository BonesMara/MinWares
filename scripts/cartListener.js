let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cItems;
const allCartBtnSel = document.querySelectorAll('[data-action="addToCart"]');

if (cart.length > 0) {
  cart.forEach(cartItem => {
    const product = cartItem;
    countCartTotal();

    allCartBtnSel.forEach(cartBtn => {
      const proClassSel = cartBtn.parentNode.parentNode;

      if (proClassSel.querySelector('.product-brand').innerText === product.name) {
        handleActionButtons(cartBtn, product);
      }
    });
  });
}

allCartBtnSel.forEach(cartBtn => {
  cartBtn.addEventListener('click', () => {
    const proClassSel = cartBtn.parentNode.parentNode;
    const product = {
      image: proClassSel.querySelector('.product-thumb').getAttribute('src'),
      name: proClassSel.querySelector('.product-brand').innerText,
      price: proClassSel.querySelector('.price').innerText,
      quantity: 1
    };

    const isInCart = cart.filter(cartItem => cartItem.name === product.name).length > 0;

    if (!isInCart) {
      cart.push(product);
      saveCart();
      storeTotal();
      handleActionButtons(cartBtn, product);
    }
  });
});

function handleActionButtons(cartBtn, product) {
  cartBtn.innerText = 'In Cart';
  cartBtn.disabled = true;
}

function countCartTotal() {
  let cartTotal = 0;
  cart.forEach(cartItem => (cartTotal += cartItem.quantity * cartItem.price));
}

function storeTotal() {
  cItems = 0;
  cart.forEach(cartItem => (cItems += cartItem.quantity));
  localStorage.setItem('cItems', cItems);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  countCartTotal();
}

