import dates from '../birthday.json';
import ghostImg from '../images/death.png';

const createLi = () => {
  const ul = document.querySelector('.pals');
  Object.keys(dates).map(() => {
    const li = document.createElement('li');
    li.classList.add('pals__li');
    const wrapper = document.createElement('p');
    wrapper.classList.add('pals__li-wrapper');
    const responsiveSpan = document.createElement('span');
    responsiveSpan.classList.add('width-100');
    wrapper.appendChild(responsiveSpan);
    wrapper.appendChild(document.createElement('span'));
    li.appendChild(wrapper);
    ul.appendChild(li);
  });
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

const getPhrase = (days) => {
  if (!days) {
    return "Днюха уже сегодня!!!";
  } else if (days === 1) {
    return "Днюха уже завтра!";
  } else if (days < 0) {
    return "Днюха уже была в этом году.";
  }
  return `${days} days left`;
};

const spawnGhostAnimation = e => {
  const ghostWrap = document.querySelector('.ghost-wrap');
  if (!ghostWrap) {
    const wrap = document.createElement('div');
    wrap.classList.add('ghost-wrap');
    const ghost = document.createElement('img');
    ghost.src = ghostImg;
    ghost.classList.add('ghost');
    wrap.appendChild(ghost);
    document.body.appendChild(wrap);

    const animationPeriod = 6 * 1000;
    setTimeout(() => {
      wrap.remove();
    }, animationPeriod);
  }
}

const insertStylesAndAnimation = (days, birthPlaceholders) => {
  if (days >= 0 && days <= 8) {
    birthPlaceholders[1].classList.add('theday-color');
  }
  if (!days) {
    // select li
    const { parentElement } = birthPlaceholders[0];
    parentElement.addEventListener('click', spawnGhostAnimation);
    parentElement.classList.add('theday-cursor');
  }
};

const showBirthdays = (li) => {
  Object.entries(dates)
    .sort(xx)
    .map(([nickname, nameBirth], i) => {
      const birthTime = new Date(`${nameBirth.birth}, ${new Date().getFullYear()} 00:00:00`);
      const currentTime = new Date();
      const difference = birthTime.getTime() - currentTime.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
      const birthPhrase = getPhrase(days);
      const birthPlaceholders = li[i].querySelectorAll("span");

      insertStylesAndAnimation(days, birthPlaceholders);
      birthPlaceholders[0].textContent =
        `${nickname} (${nameBirth.name}). Днюха ${birthTime.toLocaleDateString('en-GB').substr(0, 5)}`;
      birthPlaceholders[1].textContent =
        `${birthPhrase}`;
    });
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

export { showBirthdays, filterPals, createLi };