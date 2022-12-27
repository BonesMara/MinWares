class NavUpdater {
  constructor(){
    const loginState = localStorage.getItem('logState');
    setInterval(() => {
      this.validate(loginState);
    }, 1000);
  }
  
  validate(loginState){
    const iCounter = document.querySelector('.cart-item-count');
    const cItems = localStorage.getItem('cItems');
    const navBar = document.querySelector('.login-status');

    if(cItems != 0){
      iCounter.innerText = cItems;
    }
    if(loginState != 1){
      navBar.innerText = 'Login/Signup';
      navBar.classList.remove('logout-btn');
    }
    else{
      navBar.innerText = 'Logout';
      navBar.classList.add('logout-btn');
    }
  }
  logOut(){
    localStorage.removeItem('logState');
    localStorage.removeItem('user');
    window.location.reload();
  }
}
const Updater = new NavUpdater();
document.querySelector('.login-status').addEventListener('click', (e) => {
  Updater.logOut();
});