import { showBirthdays, filterPals, createLi } from './utils';

const load = () => {
  createLi();
  const li = document.querySelectorAll('li');
  showBirthdays(li);
  const input = document.querySelector('.input-field'); 
  input.addEventListener("keyup", ()=>filterPals(input, li));
};


export default load;