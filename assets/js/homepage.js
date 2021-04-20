//Global Variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//pull data from github's API
var getUserRepos = function (username) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + username + "/repos";

  // make a request to the API url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayRepos(data, username);
    });
  });
};

//capture form submission
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var username = nameInputEl.value.trim();
  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
  console.log(event);
};

//add event listener to userFormEL
userFormEl.addEventListener("submit", formSubmitHandler);

//display Repos on page
var displayRepos = function (repos, searchTerm) {
  // clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  console.log(repos);
  console.log(searchTerm);

  //take each returned repository (repos[i]) and write to page
  for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    //create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append to container
    repoEl.appendChild(titleEl);

    //add status icon.  create status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};
