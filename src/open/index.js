import OpenInstall from '../share/openInstall';
import './style.css';
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

const data = OpenInstall.parseUrlParams();
new OpenInstall({
  appKey : "gucizy",
  apkFileName : 'com.colgate-zhong.apk',
  onready : function() {
    var m = this, button = document.getElementById("btn");
    button.style.visibility = "visible";
    m.schemeWakeup();
    button.onclick = function() {
      m.wakeupOrInstall();
      return false;
    }
  }
}, data);
