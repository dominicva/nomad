// access DOM elements
const tripForm = document.querySelector('.trip__form');
const cardForm = document.querySelector('.card__form');
const tripName = document.querySelector('.trip__name');

const createTripHandler = () => {
  event.preventDefault();

  tripForm.classList.toggle('active-form');
  cardForm.classList.toggle('active-form');

  const tripNameFormInput = document.getElementById('trip__name--form-input').value;
  console.log(tripNameFormInput);
  tripName.textContent = tripNameFormInput;
};

tripForm.addEventListener('submit', createTripHandler);
