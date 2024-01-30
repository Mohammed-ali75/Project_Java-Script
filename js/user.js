let userinfo = document.getElementById("user-info");
let user = document.getElementById("user");
let sign = document.getElementById("sign");

if (localStorage.getItem("email")) {
  sign.remove();
  userinfo.style.display = "block";
  user.innerHTML = localStorage.getItem("username");
}

let logOutBtn = document.querySelector("#logout");
logOutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
});
