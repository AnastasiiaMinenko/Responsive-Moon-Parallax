const stars = document.querySelector(".stars");
const moon = document.querySelector(".moon");
const mountains_behind = document.querySelector(".mountains_behind");
const text = document.querySelector(".text");
const btn = document.querySelector(".btn");
const mountains_front = document.querySelector(".mountains_front");
const scrollUp = document.querySelector('.scroll-up');
const menuButtons = document.querySelectorAll('.btn-menu');

const toggleMenu = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const section = document.querySelector('.main');
const homeMenu = document.querySelector('.home');

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  stars.style.left = value * 0.25 + "px";
  moon.style.top = value * 1.05 + "px";
  mountains_behind.style.top = value * 0.5 + "px";
  mountains_front.style.top = value * 0 + "px";
  text.style.marginRight = value * 4 + "px";
  text.style.marginTop = value * 1.5 + "px";
  btn.style.marginTop = value * 1.5 + "px";
});

toggleMenu.addEventListener('click', () => {
  toggleMenu.classList.toggle('active');
  navigation.classList.toggle('active');
  activeMenu();
});

const activeMenu = () => {
  if (toggleMenu.classList.contains('active')) {
    section.style.visibility = 'hidden';
  } else section.style.visibility = 'visible';
};

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    scrollUp.classList.add('scroll-active');
  } else {
    scrollUp.classList.remove('scroll-active');
  }
});

const resetMenu = () => {
  navigation.classList.remove('active');
  section.style.visibility = 'visible';
  toggleMenu.classList.remove('active');
};

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    homeMenu.classList.remove('active');
    btn.classList.add('active');
    resetMenu();
  });
  scrollUp.addEventListener('click', () => {
    btn.classList.remove('active');
    homeMenu.classList.add('active');
  });
});

function sendMail() {
  let params = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_9l4epa5";
  const templateID = "template_yiua4ko";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));
}

/*__________________________________________________________________*/

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');

// show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// show success message
function showSuccess(input) {
  formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Enail is not valid');
  }
}

//check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check input lenght
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email]);
  checkLength(username, 3, 15);
  checkEmail(email);
});