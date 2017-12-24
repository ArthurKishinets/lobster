import fetch from 'isomorphic-fetch';

export const getSelf = async () => {
  let res = await fetch('/self', {
    method: 'GET',
    credentials: 'include',
  });
  res = await res.json();
  return res;
};