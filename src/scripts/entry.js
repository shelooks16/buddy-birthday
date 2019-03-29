import 'normalize.css';
import '../styles/all.scss';
import loadBuddies from './loadBuddies';

if ('serviceWorker' in navigator) {
  const swName = "/service-worker.js";
  navigator.serviceWorker.register(swName).catch(function(ex) {
    console.warn(ex);
  });
}

document.addEventListener("DOMContentLoaded", loadBuddies);
