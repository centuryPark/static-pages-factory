// import React from 'react';
// import { render } from 'react-dom';
// import LoginPage from './page';
import './style.css';

window.onload = function () {
  function getParams() {
    var url = window.location.search;
    var search = url.substr(1);
    var arr = search.split('&');
    var obj = {};
    for (let i = 0; i < arr.length; i++) {
      var temp = arr[i].split('=');
      obj[temp[0]] = temp[1];
    }
    return obj;
  }

  document.getElementById('btn').addEventListener('click', function () {
    var params = getParams();
    if (params.channel === 'sem') {
      window.location = 'https://at.umeng.com/onelink/ziOXbq';
      return false;
    }
    window.location = 'https://at.umeng.com/onelink/5bGzei';
  });
};
/*render(
  <LoginPage />,
  document.getElementById('app')
);*/
