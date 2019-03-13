import ghostImg from '../images/death.png';
import dates from '../birthday.json';

const createLi = () => {
  const ul = document.querySelector('.pals');
  const newLiNodes = dates.map(() => {
    const newLi = document.createElement('li');
    newLi.classList.add('pals__li');
    const wrapper = document.createElement('p');
    wrapper.classList.add('pals__li-wrapper');
    const responsiveSpan = document.createElement('span');
    responsiveSpan.classList.add('width-100');
    wrapper.appendChild(responsiveSpan);
    wrapper.appendChild(document.createElement('span'));
    newLi.appendChild(wrapper);
    ul.appendChild(newLi);
    return newLi;
  });
  return newLiNodes;
};

const filterBuddies = (liNodes) => {
  return function (e) {
    e.preventDefault();
    const inputValue = this.value.toUpperCase();
    liNodes.forEach(li => {
      const buddyName = li.querySelector('span').textContent.toUpperCase();
      if (buddyName.includes(inputValue)) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    })
  };
};

const sortByDaysLeft = ({ birth }, { birth: birth2 }) => {
  return getDaysLeft(birth) - getDaysLeft(birth2);
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

const insertStylesAndAnimation = (daysLeft, infoSpans) => {
  if (daysLeft >= 0 && daysLeft < 8) {
    infoSpans[1].classList.add('theday-color');
  }
  if (!daysLeft) {
    // select li
    const { parentElement } = infoSpans[0];
    parentElement.addEventListener('click', spawnGhostAnimation);
    parentElement.classList.add('theday-cursor');
  }
};

const getFormatedBirthDate = (birthDate) => {
  return new Date(`${birthDate}, ${new Date().getFullYear()} 00:00:00`);
}

const getDaysLeft = (birthDate) => {
  const birthTime = getFormatedBirthDate(birthDate).getTime();
  const currentTime = new Date().getTime();
  const difference = birthTime - currentTime;
  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
};

const insertDatesInLi = (births, liArray, currentLi) => {
  births.sort(sortByDaysLeft)
    .map(({ nickname, name, birth }) => {
      const birthTime = getFormatedBirthDate(birth).toLocaleDateString('en-GB').substr(0, 5);
      const daysLeft = getDaysLeft(birth);
      const birthPhrase = getPhrase(daysLeft);
      const infoSpans = liArray[currentLi].querySelectorAll("span");

      insertStylesAndAnimation(daysLeft, infoSpans);
      infoSpans[0].textContent = `${nickname} (${name}). Днюха ${birthTime}`;
      infoSpans[1].textContent = `${birthPhrase}`;
      currentLi++;
    })
}

const loadDates = (li) => {
  const birthWill = dates.filter(({ birth }) => getDaysLeft(birth) >= 0)
  const birthWas = dates.filter(({ birth }) => getDaysLeft(birth) < 0)
  insertDatesInLi(birthWill, li, 0);
  insertDatesInLi(birthWas, li, birthWill.length);
};

export { createLi, loadDates, filterBuddies }