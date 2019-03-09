// TODO: refactor sortByDaysLeft in ./utils
import {
  createLi,
  loadDates,
  filterBuddies
} from './utils';

const loadBuddies = () => {
  const liNodes = createLi();
  loadDates(liNodes);
  document.querySelector('.input-field').addEventListener("keyup", filterBuddies(liNodes));
};


export default loadBuddies;