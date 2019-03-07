import 'normalize.css';
import '../styles/all.scss';
import { countDown, filterPals, createLi } from './utils';

createLi();
const li = document.querySelectorAll('li');
countDown(li);

const input = document.querySelector('.input-field'); 
input.addEventListener("keyup", ()=>filterPals(input, li));