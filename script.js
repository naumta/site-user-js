const API_URL = "https://jsonplaceholder.typicode.com";
let usersContainer = document.querySelector(".container_users-list");
let btn = document.querySelector("button");
let userPost = document.querySelector(".container_user-post");

getUsersList();

function getUsersList() {
    fetch(`${API_URL}/users`)
    .then((response) => response.json())
    .then((users) => {
        showUsers(users);
      //console.log(users);
    });
}

function getUserById(id) {
  fetch(`${API_URL}/users/${id}`)
    .then((response) => response.json())
    .then((user) => {
      //console.log(user);
      showUserInfo(user);
      return fetch(`${API_URL}/users/${id}/posts`);
    })
    .then((response) => response.json())
    .then((posts) => {
      //console.log(posts);
      getUserComment(posts);
    });
}

function showUsers(users) {
  for (let user of users) {
    let div = document.createElement("div");
    div.innerHTML = user.name;
    div.classList.add("container_users-elem");

    div.addEventListener("click", function () {
      getUserById(user.id);
      btn.classList.remove(`btn-click`);
    });

    usersContainer.append(div);
  }
}

function showUserInfo(user) {
  let tableContainer = document.querySelector(".container_user-info");
  tableContainer.innerHTML = "";

  let table = document.createElement("table");
  table.classList.add("table");

  let userView = {
    Name: user.name,
    Username: user.username,
    Address: `${user.address.street} ${user.address.suite} ${user.address.city}`,
    Email: user.email,
    Phone: user.phone,
    Website: user.website,
  };

  for (let key in userView) {
    let tr = document.createElement("tr");
    tr.classList.add("table_td");

    let tdKey = document.createElement("td");
    let tdValue = document.createElement("td");
    tdKey.classList.add("table_td");
    tdValue.classList.add("table_td");

    tdKey.innerHTML = key;
    tdValue.innerHTML = userView[key];

    tr.append(tdKey, tdValue);

    table.append(tr);

    let container = document.querySelector(".container_user-info");
    container.append(table);
  }
  btn.classList.remove("hide");
}

function getUserComment(posts) {
  for (let post of posts) {
    let div = document.createElement("div");
    div.classList.add("container_user-postTitle");

    let paragTitle = document.createElement("p");
    paragTitle.classList.add("container_user-post-paragTitle");
    paragTitle.innerHTML = post.title;

    let paragComment = document.createElement("p");
    paragComment.classList.add("container_user-post-paragComment");
    paragComment.innerHTML = post.body;

    btn.addEventListener("click", function () {
        btn.classList.add(`btn-click`);

      btn.after(div);
      userPost.classList.add("container_user-post");
      userPost.append(div);
      div.append(paragTitle);
      div.append(paragComment);
    });
  }
}
