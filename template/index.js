import './style.css';
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

window.onload = function () {
  console.log('js begin');
};
