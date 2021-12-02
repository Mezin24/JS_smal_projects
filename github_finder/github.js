class GitHub {
  constructor() {
    this.client_id = '20ec80ee4528c175518d';
    this.client_secret = '4b929ff2f4439420b513c9312248f76a799dad69';

    // It's neccessary if we make more then 100 requests in an hour
    //  We got this key and secret from github register API
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();
    return {
      profile,
    };
  }
}
