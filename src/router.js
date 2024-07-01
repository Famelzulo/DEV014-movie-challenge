

import { routes } from './routes.js';

export function router() {
  const path = window.location.pathname;
  const routeHandler = matchRoute(path);
  
  if (routeHandler) {
    routeHandler();
  } else {
    routes['/error']();
  }
}

function matchRoute(path) {
  for (let route in routes) {
    const regex = new RegExp(`^${route.replace(/:\w+/g, '(\\w+)')}$`);
    const match = path.match(regex);
    if (match) {
      const [, ...values] = match;
      return () => routes[route](...values);
    }
  }
  return null;
}

window.addEventListener('popstate', router);

export function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

