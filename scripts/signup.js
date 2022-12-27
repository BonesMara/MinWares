let signupusers = JSON.parse(localStorage.getItem('users'));

class Signup{
  constructor(signupForm){
    this.signupForm = signupForm;
    this.validateonSubmit();
    this.initUsers();
  }

  validateonSubmit(){
    this.signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addUserToList();
      this.addUserToList();
    });
  }

  addUserToList(){
    const user = {
      name: this.signupForm.querySelector('.signup-name').value,
      surname: this.signupForm.querySelector('.signup-surname').value,
      email: this.signupForm.querySelector('.signup-email').value,
      birthdate: this.signupForm.querySelector('.signup-birthdate').value,
      password: this.signupForm.querySelector('.signup-password').value
    };
    let con_password = this.signupForm.querySelector('.signup-password-confirm').value;
    
    let isName = false;
    let isSurname = false;
    let isEmail = false;
    let isPassword = false;
    let isDate = false;
    let label;

    //Additional Checks
    let DateString = new Date();
    let validYear = DateString.getFullYear() - 18;
    let userYear = user.birthdate.substring(0 , 4);

    if(user.password != con_password){
      isPassword = true;
    }
    if(userYear > validYear){
      isDate = true;
    }

    signupusers = this.initUsers();
    signupusers.forEach(cUser => {
      if(
          (cUser.name == user.name) || (cUser.surname == user.surname) || 
          (cUser.email == user.email) || (user.password != con_password)
        ){
        if(cUser.name == user.name){
          isName = true;
        }
        if(cUser.surname == user.surname){
          isSurname = true;
        }
        if(cUser.email == user.email){
          isEmail = true;
        }
      }
      });

      label = document.getElementById('signup-name-span');
      label.classList.remove('error-indicator');
      label.innerText = 'Name';
      label = document.getElementById('signup-surname-span');
      label.classList.remove('error-indicator');
      label.innerText = 'Surname';
      label = document.getElementById('signup-birthdate-span');
      label.classList.remove('error-indicator');
      label.innerText = 'Birth Date';
      label = document.getElementById('signup-email-span');
      label.classList.remove('error-indicator');
      label.innerText = 'Email';
      label = document.getElementById('signup-con-password-span');
      label.classList.remove('error-indicator');
      label.innerText = 'Confirm Password';

      if (isName || isSurname || isEmail || isPassword || isDate) {
        if(isName){
          label = document.getElementById('signup-name-span');
          label.classList.add('error-indicator');
          label.innerText = 'Sorry, ' + user.name + ' is taken.';
        }
        if(isSurname){
          label = document.getElementById('signup-surname-span');
          label.classList.add('error-indicator');
          label.innerText = 'Sorry, ' + user.surname + ' is taken.';
        }
        if(isDate){
          label = document.getElementById('signup-birthdate-span');
          label.classList.add('error-indicator');
          label.innerText = 'You need to be 18+ years.';
        }
        if(isEmail){
          label = document.getElementById('signup-email-span');
          label.classList.add('error-indicator');
          label.innerText = 'Sorry, ' + user.email + ' is taken.';
        }
        if(isPassword){
          label = document.getElementById('signup-con-password-span');
          label.classList.add('error-indicator');
          label.innerText = 'Error: password mismatch.';
        }
      }
      else{
        signupusers.push(user);
        this.saveList();
        localStorage.setItem("logState",1);
        localStorage.setItem("user",JSON.stringify(user));
        window.location.replace('index.html');
      }
  }
  initUsers(){
    signupusers = JSON.parse(localStorage.getItem('users'));
    if(signupusers == undefined || signupusers == null || signupusers.length < 0 || signupusers == ""){
      const admin = {
        name: 'Web',
        surname: 'Admin',
        email: 'admin@minwares.com',
        birthdate: "2001-01-01",
        password: 'admin'
      }
      signupusers = [];
      signupusers.push(admin);
      localStorage.setItem('users', JSON.stringify(signupusers));
    }
    return signupusers;
  }
  saveList(){
    localStorage.setItem('users', JSON.stringify(signupusers));
  }
}

const signupForm = document.querySelector('.signup-form');
const signupValidator = new Signup(signupForm);
const lForm = document.querySelector('.login-form');
const sectionSignup = document.querySelector('.box');

function showLoginForm(){
  signupForm.classList.add('hide-form');
  sectionSignup.classList.add('login-form-section');
  lForm.classList.remove('hide-form');
  sectionSignup.classList.remove('signup-form-section');
}