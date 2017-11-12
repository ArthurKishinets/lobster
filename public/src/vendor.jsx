import 'isomorphic-fetch';
import "babel-polyfill";

const fetch = function(url, options) {
  console.log('custom fetch');
  return fetch(url, Object.assign({}, options, { credentials: 'include' }));
};

export default fetch;