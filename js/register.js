let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let signup = document.getElementById("sign-up");

signup.addEventListener("click", function (go) {
  go.preventDefault();

  if (username.value === "" || email.value === "" || password.value === "") {
    alert("Please enter the complete information");
  } else {
    localStorage.setItem("username", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    setTimeout(() => {
      window.location = "login.html";
    }, 1500);
  }
});
