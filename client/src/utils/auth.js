import decode from 'jwt-decode';

class AuthService {

  // Retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is still logged in
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Check if the token has expired
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  // Get token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Set token to local storage and reload page to homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Clear token from local storage and force logout with reload
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
