export const getParams = () => {
  const url = window.location.search;
  const search = url.substr(1);
  const arr = search.split('&');
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split('=');
    obj[temp[0]] = temp[1];
  }
  return obj;
};
