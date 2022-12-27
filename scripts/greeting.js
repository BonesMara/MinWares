//
class homeGreet{
  constructor(){
    const loginState = localStorage.getItem('logState');
    setInterval(() => {
      this.validate(loginState);
    }, 1000);
  }
  validate(loginState){
    const timeArea = document.querySelector('.time-display');
    const greetingArea = document.querySelector('.greeting-text');
    const logger = JSON.parse(localStorage.getItem('user'));
    
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var greeting;
    var fTime = currentDate.toLocaleTimeString();

    if(loginState == 1 && logger != ""){
      //Greeting control
      if(currentHour >= 0 && currentHour < 12){
        greeting = 'Good Morning, ';
        greetingArea.innerText = greeting;
        greetingArea.insertAdjacentHTML('beforeend', 
        '<span class="fetched-user-name">' + logger.surname + '</span>');
        timeArea.innerText = fTime;
      }
      else if(currentHour >= 12 && currentHour < 18){
        greeting = 'Good Afternoon, ';
        greetingArea.innerText = greeting;
        greetingArea.insertAdjacentHTML('beforeend', 
        '<span class="fetched-user-name">' + logger.surname + '</span>');
        timeArea.innerText = fTime;
      }
      else if(currentHour >= 18 && currentHour < 24){
        greeting = 'Good Evening, ';
        greetingArea.innerText = greeting;
        greetingArea.insertAdjacentHTML('beforeend', 
        '<span class="fetched-user-name">' + logger.surname + '</span>');
        timeArea.innerText = fTime;
      }
      else{
        greeting = 'Welcome, ';
        greetingArea.innerText = greeting;
        greetingArea.insertAdjacentHTML('beforeend', 
        '<span class="fetched-user-name">' + logger.surname + '</span>');
        timeArea.innerText = fTime;
      }
    }
    else{
      //Greeting control
      if(currentHour >= 0 && currentHour < 12){
        greeting = 'Good Morning';
        greetingArea.innerText = greeting;
        timeArea.innerText = fTime;
      }
      else if(currentHour >= 12 && currentHour < 18){
        greeting = 'Good Afternoon';
        greetingArea.innerText = greeting;
        timeArea.innerText = fTime;
      }
      else if(currentHour >= 18 && currentHour < 24){
        greeting = 'Good Evening';
        greetingArea.innerText = greeting;
        timeArea.innerText = fTime;
      }
      else{
        greeting = 'Welcome';
        greetingArea.innerText = greeting;
        timeArea.innerText = fTime;
      }
    }
  }
}

const g = new homeGreet();