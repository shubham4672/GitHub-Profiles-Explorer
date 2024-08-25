"use strict";

const input = document.querySelector(".input");
const form = document.querySelector(".form");
const main = document.querySelector(".main");
const error = document.querySelector(".error");
const button = document.querySelector(".button");
const bg = document.querySelector(".bg");

button.addEventListener("click", () => {
  bg.classList.toggle("light");
  bg.classList.toggle("dark");
});

// API base URL
const apiUrl = "https://api.github.com/users/";

function displayDetails(user) {
  const cardHTML = `
  <div class="card">
        <div class="img" style="background-color: black;border-radius: 23">
          <img src=${user.avatar_url} alt="${user.name}" style="border-radius: 253px;" />
        </div>
        <div class="info">
          <h1>${user.name}</h1>
          <p>
            ${user.bio}
          </p>
          <ul>
            <li><strong>${user.followers} Followers</strong></li>
            <li><strong>${user.following} Following</strong></li>
            <li><strong>${user.public_repos} Repositories</strong></li>
          </ul>
          <div class="repo"></div>
        </div>
      </div>
    `;
  main.innerHTML = cardHTML;
}

async function getUser(username) {
  try {
    const { data } = await axios(apiUrl + username);
    error.style.display = "none";
    main.style.display = "block";
    console.log(data);
    displayDetails(data);
  } catch (err) {
    main.style.display = "none";
    error.style.display = "block";
    error.innerHTML = "User name not found";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = input.value;
  if (user) {
    getUser(input.value);
    input.value = "";
  }
});
