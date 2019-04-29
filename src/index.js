const results = document.querySelector('#results');

// Get Username from Search page

const form = document.querySelector('#search-users');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  results.innerHTML = '';
  const input = document.querySelector('#search-input');
  fetchUser(input.value);
  fetchRepo(input.value);
});

// User's Profile Information

const insertUser = (data) => {
  if (data.message === "Not Found") {
    const noUser = `
    <div class="error-message">
    <p>Does not exist</p>
    </div>`
    results.insertAdjacentHTML('beforeend', noUser);
  } else {
    const userInfo = `
      <div id="profile">
        <div id="user-avatar" style="background-image: url(${data.avatar_url})";>
        </div>
        <div id="user-info">
          <p><em>@${data.login}</em></p>
          <h1>${data.name}</h1>
          <p>${data.bio == null ? '' : data.bio }</p>
        </div>
      </div>
      <h2>Repositories</h2>
      `;
    results.insertAdjacentHTML('afterbegin', userInfo);
  }
};

const fetchUser = (query) => {
  fetch(`https://api.github.com/users/${query}`)
    .then(response => response.json())
    .then(insertUser);
};

// User's Repositories

const fetchRepo = (query) => {
  fetch(`https://api.github.com/users/${query}/repos`)
  .then(response => response.json())
  .then(insertRepos);
};

const insertRepos = (data) => {
  if (data.length == 0 || data === undefined) {
    const noRepos = '<p>User has no repositories yet</p>'
    results.insertAdjacentHTML('beforeend', noRepos);
  } else {
      data.forEach((repo) => {
        const userRepos = `<li>
          <span><h3>${repo.name}</h3></span>
          <span>
            <img class="icon" src="./images/github_star.jpg"> ${repo.stargazers_count}
            <img class="icon" src="./images/github_fork.jpg"> ${repo.forks_count}
          </span>
        </li>`;
      results.insertAdjacentHTML('beforeend', userRepos);
    });
  }
};
