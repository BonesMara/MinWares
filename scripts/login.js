let users = JSON.parse(localStorage.getItem('users'));

class Login{
  constructor(loginForm){
    this.loginForm = loginForm;
    this.validateonSubmit();
    this.initUsers();
  }

  validateonSubmit(){
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkUserDetails();
      this.checkUserDetails();
    });
  }

  checkUserDetails(){
    const user = {
      email: this.loginForm.querySelector('.login-email').value,
      password: this.loginForm.querySelector('.login-password').value
    };

    let isEmail = false;
    let currentPassword;
    let label;
    let ldName;

    label = document.getElementById('login-email-span');
    label.classList.remove('error-indicator');
    label.innerText = 'Email';

    users = this.initUsers();
    users.forEach(cUser => {
      if(cUser.email == user.email){
        isEmail = true;
        currentPassword = cUser.password;
        ldName = JSON.stringify(cUser);
      }
    });
    if (isEmail) {
      if(currentPassword == user.password){
        localStorage.setItem("logState",1);
        localStorage.setItem("user",ldName);
        window.location.replace('index.html');
      }
      else{
        label = document.getElementById('login-password-span');
        label.classList.add('error-indicator');
        label.innerText =  'Incorrect password';
      }
    }
    else{
      label = document.getElementById('login-email-span');
      label.classList.add('error-indicator');
      label.innerText =  'Sorry, ' + user.email + ' is not registered.';
    }
  }
  initUsers(){
    users = JSON.parse(localStorage.getItem('users'));
    if(users == undefined || users == null || users.length < 0 || users == ""){
      const admin = {
        name: 'Web',
        surname: 'Admin',
        email: 'admin@minwares.com',
        birthdate: "2001-01-01",
        password: 'admin'
      }
      users = [];
      users.push(admin);
      localStorage.setItem('users', JSON.stringify(users));
    }
    return users;
  }
}
const loginForm = document.querySelector('.login-form');
const loginValidator = new Login(loginForm);
const sForm = document.querySelector('.signup-form');
const sectionlogin = document.querySelector('.box');

function showSignupForm(){
  loginForm.classList.add('hide-form');
  sectionlogin.classList.add('signup-form-section');
  sForm.classList.remove('hide-form');
  sectionlogin.classList.remove('login-form-section');
}