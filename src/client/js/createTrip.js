// global (for now) UI elements and variables
const tripFormEl = document.querySelector('.trip__form');
const cardFormEl = document.querySelector('.card__form');

let tripNameFormInput = document.getElementById('trip__name--form-input');
let tripDateFormInput = document.getElementById('trip__date--form-input');
let cardNameFormInput = document.getElementById('card__name--form-input');

let cardId = 0;

// refactor: trip class to be imported from another file
class Trip {
  constructor(name, date) {
    this.name = name;
    this.date = date;
    this.cards = [];
  }

  render() {
    const renderHook = document.getElementById('trip');

    const tripMetaDataEl = document.createElement('div');
    tripMetaDataEl.className = 'trip__meta-data';

    tripMetaDataEl.innerHTML = `
    <h2 class="trip__name">${this.name}</h2>
        <p class="trip__date">${this.date}</p>
    `;

    renderHook.append(tripMetaDataEl);
  }
}

// refactor: import class from another file
class Card {
  constructor(imageUrl, name, location, weather) {
    this.id;
    this.imageUrl = imageUrl;
    this.name = name;
    this.location = location;
    this.weather = weather;
  }
}

// refactor: import class from another file
class CardEntry {
  constructor(card) {
    this.card = card;
  }

  render() {
    const renderHook = document.getElementById('trip');

    const cardEl = document.createElement('article');
    cardEl.className = 'card';

    cardEl.innerHTML = `
    <div class="card__image" style="background-image: url(${this.card.imageUrl});"></div>
        <h3 class="card__name">${this.card.name}</h3>
        <div>
          Location:
          <a
            class="card__location"
            href="https://www.google.com/maps/place/Venice,+Los+Angeles,+CA,+USA/data=!4m2!3m1!1s0x80c2bac03052685d:0x8f1101b40d5c8d3c?sa=X&ved=2ahUKEwijy7O58ujrAhWAQRUIHSAPBzUQ8gEwKHoECCIQBA"
            target="_blank"
            >Venice, California</a
          >
        </div>
        <div class="card__weather-report">
          <table>
            <tr>
              <td>Avg temp</td>
              <td>Max temp</td>
              <td>Min temp</td>
            </tr>
            <tr>
              <td>23</td>
              <td>14</td>
              <td>27</td>
            </tr>
          </table>
        </div>
    `;

    cardNameFormInput.value = '';

    renderHook.append(cardEl);
  }
}

// ==>> form submit handlers

// => create trip submit event callback
const createTripHandler = (event) => {
  event.preventDefault();

  // access relevant UI elements
  tripFormEl.classList.toggle('active-form');
  cardFormEl.classList.toggle('active-form');

  const newTrip = new Trip(tripNameFormInput.value, tripDateFormInput.value);
  newTrip.render();

  // test log
  console.log('Newly created trip', newTrip);
};

// => add card submit event callback
const addCardHandler = (event) => {
  event.preventDefault();

  const newCard = new Card(
    'https://cdn.pixabay.com/photo/2017/04/05/01/16/tropical-2203737_1280.jpg',
    cardNameFormInput.value
  );
  newCard.id = cardId;
  cardId += 1;

  const newCardEntry = new CardEntry(newCard);
  newCardEntry.render();

  // test log
  console.log('Newly created card', newCard);
  console.log('Newly created card entry', newCardEntry);
};

// submit button event listeners
tripFormEl.addEventListener('submit', createTripHandler);
cardFormEl.addEventListener('submit', addCardHandler);
