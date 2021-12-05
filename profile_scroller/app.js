const data = [
  {
    name: 'Pavel Mezencev',
    age: 34,
    gender: 'male',
    loofingfor: 'female',
    location: 'Obninsk rus',
    image: 'https://randomuser.me/api/portraits/men/82.jpg',
  },
  {
    name: 'Jen Smith',
    age: 26,
    gender: 'female',
    loofingfor: 'male',
    location: 'Miami',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    name: 'Ivan Petenko',
    age: 32,
    gender: 'male',
    loofingfor: 'female',
    location: 'Obninsk rus',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    name: 'Alena Ivanova',
    age: 40,
    gender: 'female',
    loofingfor: 'male',
    location: 'Moscow',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    name: 'Andrei Petrov',
    age: 19,
    gender: 'male',
    loofingfor: 'female',
    location: 'Boston',
    image: 'https://randomuser.me/api/portraits/men/24.jpg',
  },
];
let profile = profileIterator(data);
showProfile();

// Profile Iterator

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
    ).innerHTML = `<img class="rounded-circle border border-white" src="${person.image}" />`;

    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group text-dark">
        <li class="list-group-item">Name: ${person.name}</li>
        <li class="list-group-item">Age: ${person.age}</li>
        <li class="list-group-item">${person.gender} is looking for ${person.loofingfor}</li>
        <li class="list-group-item">Location: ${person.location}</li>
    </ul>
    `;
  } else {
    window.location.reload();
  }
}

document.getElementById('next').addEventListener('click', showProfile);
