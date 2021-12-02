//  Search input
const github = new GitHub();
const ui = new UI();
const searchUser = document.getElementById('search-input');

searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value;

  if (userText !== '') {
    //   MAKE HTTp call
    github.getUser(userText).then((data) => {
      if (data.profile.message === 'Not Found') {
        //   Show alert

        ui.showAlert('User not found', 'alert alert-danger');
      } else {
        //   Show profile
        ui.showProfile(data.profile);
      }
    });
  } else {
    // Clear Profile

    ui.clearProfile();
  }
});
