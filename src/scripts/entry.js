import 'normalize.css';
import '../styles/all.scss';
import loadBuddies from './loadBuddies';

const isLocalHost =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";

if ('serviceWorker' in navigator && !isLocalHost) {
  const swName = "/service-worker.js";
  navigator.serviceWorker.register(swName).catch(function(ex) {
    console.warn(ex);
  });
}

document.addEventListener("DOMContentLoaded", loadBuddies);
