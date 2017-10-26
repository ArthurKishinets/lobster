import fetch from 'isomorphic-fetch';

export getSelf = async () => {
  let res = await fetch('/self', {
    method: 'GET',
    credentials: 'include',
  });
  res = await res.json();
  console.log('self ', res);
  return res;
};