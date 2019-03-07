import dates from './birthday';

const ul = document.querySelector('.pals');


const createLi = () => {
  for (const keys in dates) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const responsiveSpan = document.createElement('span');
    p.appendChild( responsiveSpan );
    responsiveSpan.classList.add('width-100');
    p.appendChild(document.createElement('span'));
    li.appendChild(p);
    ul.appendChild(li);
  }
}

const xx = ([nickname, nameBirth], [second, bir]) => {
  const birthTime = new Date(`${nameBirth.birth}, ${new Date().getFullYear()} 00:00:00`);
  const currentTime = new Date();
  const difference = birthTime.getTime() - currentTime.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const birthTime2 = new Date(`${bir.birth}, ${new Date().getFullYear()} 00:00:00`);
  const difference2 = birthTime2.getTime() - currentTime.getTime();
  const days2 = Math.floor(difference2 / (1000 * 60 * 60 * 24));

  return days - days2;
};

const countDown = (li) => {
  return setInterval(() => {
    Object.entries(dates)
      .sort(xx)
      .forEach(([nickname, nameBirth], i) => {
        const birthTime = new Date(`${nameBirth.birth}, ${new Date().getFullYear()} 00:00:00`);
        const currentTime = new Date();
        const difference = birthTime.getTime() - currentTime.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const daysUntilBirth = difference < 0 ? "Уже была в этом году." : `${days} days left`;

        li[i].getElementsByTagName("span")[0].textContent =
          `${nickname} (${nameBirth.name}). Днюха ${birthTime.toLocaleDateString('en-GB').substr(0, 5)}`;

        li[i].getElementsByTagName("span")[1].textContent =
          `${daysUntilBirth}`;
      });
  }, 1000);
};

const filterPals = (input, li) => {
  const inputValue = input.value.toUpperCase();

  li.forEach(el => {
    const birthTime = el.querySelector('span').textContent;
    if (birthTime.toUpperCase().includes(inputValue)) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }

  })
};

export { countDown, filterPals, createLi };