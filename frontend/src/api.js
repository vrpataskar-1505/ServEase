import axios from 'axios';

const API = axios.create({
  baseURL: 'https://servease-backend-lqpn.onrender.com/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use(async (config) => {
  // Get CSRF token from Django before every POST
  if (['post', 'put', 'delete', 'patch'].includes(config.method)) {
    try {
      await axios.get('https://servease-backend-lqpn.onrender.com/api/users/me/', { withCredentials: true });
    } catch {}
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default API;