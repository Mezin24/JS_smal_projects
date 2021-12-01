//  Chuck Norris Jokes API http://www.icndb.com/api/

document.querySelector('.button').addEventListener('click', showJokes);

function showJokes(e) {
  document.querySelector('.jokes').innerHTML = '';
  const numberOfJokes = document.querySelector('input[type="number"]').value;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      let output = '';

      if (response.type === 'success') {
        response.value.forEach((joke) => {
          output += `
                <li>${joke.joke}</li>
            `;
        });
      } else {
        output += 'Sorry, something went wrong :-(';
      }

      document.querySelector('.jokes').insertAdjacentHTML('beforeend', output);
    }
  };
  xhr.send();

  e.preventDefault();
}
