class GitHub {
  constructor() {
    this.client_id = '20ec80ee4528c175518d';
    this.client_secret = 'f5a12d0a0e2f0d4ab58200cab5521f99a319d8fa';

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
