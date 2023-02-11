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
    ghost.onload = () => {
      document.body.appendChild(wrap);
      setTimeout(() => {
        wrap.remove();
      }, 6 * 1000);
    };
  }
}

const insertStylesAndAnimation = (daysLeft, infoSpans) => {
  if (daysLeft >= 0 && daysLeft < 8) {
    infoSpans[1].classList.add('theday-color');
  }
  if (!daysLeft) {
    // select p element
    const { parentElement } = infoSpans[0];
    ['top', 'bottom', 'left', 'right'].forEach(part => {
      const snakie = document.createElement('span');
      snakie.classList.add(`theday-snake-${part}`);
      parentElement.appendChild(snakie);
    });

    parentElement.classList.add('theday-cursor', 'theday-snake');
    parentElement.addEventListener('click', spawnGhostAnimation);
  }
};

const allSigns = [
  "Овен",
  "Телец",
  "Близнецы",
  "Рак",
  "Лев",
  "Дева",
  "Весы",
  "Скорпион",
  "Стрелец",
  "Козерог",
  "Водолей",
  "Рыбы",
];

const getZodiacSign = (date) => {
  const sign =
    Number(
      new Intl.DateTimeFormat("fr-TN-u-ca-persian", {
        month: "numeric",
      }).format(date)
    ) - 1;

  return allSigns[sign];
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
      const date = getFormatedBirthDate(birth);
      const birthTime = date.toLocaleDateString('en-GB').substr(0, 5);
      const daysLeft = getDaysLeft(birth);
      const birthPhrase = getPhrase(daysLeft);
      const zodiac = getZodiacSign(date);
      const infoSpans = liArray[currentLi].querySelectorAll("span");

      insertStylesAndAnimation(daysLeft, infoSpans);
      infoSpans[0].textContent = `${nickname} (${name}). ${zodiac}. Днюха ${birthTime}`;
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