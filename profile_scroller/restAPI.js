// 'https://randomuser.me/api/?results=100';

let profile;

async function getProfiles(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data.results;
}

getProfiles('https://randomuser.me/api/?results=100').then((data) => {
  profile = profileIterator(data);
  showProfile();
});

function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next() {
      return nextIndex < profiles.length
        ? { done: false, value: profiles[nextIndex++] }
        : { done: true };
    },
  };
}

function showProfile() {
  let person = profile.next().value;

  if (person) {
    document.getElementById(
      'imageDisplay'
    ).innerHTML = `<img class="rounded-circle border border-white" src="${person.picture.large}" />`;

    document.getElementById('profileDisplay').innerHTML = `
      <ul class="list-group text-dark">
          <li class="list-group-item">Name: ${person.name.first} ${person.name.last}</li>
          <li class="list-group-item">Gender: ${person.gender}</li>
          <li class="list-group-item">Location: ${person.location.city}, ${person.location.country}</li>
          <li class="list-group-item">Email: ${person.email}</li>
      </ul>
      `;
  } else {
    window.location.reload();
  }
}

document.getElementById('next').addEventListener('click', showProfile);
