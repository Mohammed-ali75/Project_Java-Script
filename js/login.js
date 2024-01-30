let email = document.getElementById("email");
let password = document.getElementById("password");
let signIn = document.getElementById("sign-in");

let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

signIn.addEventListener("click", function (go) {

  go.preventDefault();

  if (email.value === "" || password.value === "") {
    alert("Please enter the complete information");
  } else {
    if (getEmail && getEmail.trim() === email.value.trim() && getPassword && getPassword.trim() === password.value) {
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    }else{
        alert("The data is wrong");
    }
  }
});
