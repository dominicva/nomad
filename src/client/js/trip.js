import { Component } from './Component.js';
import { Card, CardEntry } from './Card.js';

// could use globalThis as a last resort
// globalThis replaces window as pointer to window when using modules
const tripFormEl = document.querySelector('.trip__form');

export class Trip extends Component {
  cards = [];
  constructor(renderHookId, name, date) {
    super(renderHookId);
    this.name = name;
    this.date = date;
    // split / join to remove whitespaces from ids
    this.id = this.name.split(' ').join('') + this.date;
    this.cardIdCounter = 0;
  }

  addCardHandler(event) {
    event.preventDefault();

    let cardNameFormInput = document.getElementById(
      `card__name--form-input${this.id}`
    );

    const newCard = new Card(
      'https://cdn.pixabay.com/photo/2017/04/05/01/16/tropical-2203737_1280.jpg',
      cardNameFormInput.value
    );
    newCard.id = this.id + this.cardIdCounter;
    this.cardIdCounter += 1;
    this.cards.push(newCard);

    const newCardEntry = new CardEntry(this.id, newCard);
    newCardEntry.render();

    cardNameFormInput.value = '';

    // test log
    console.log('Trip cards array', this);
  }

  render() {
    // for now setting trip ID to its name concat. with its date
    const tripEl = this.createRootElement('section', 'trip', [
      { name: 'id', value: this.id },
    ]);

    tripEl.innerHTML = `
      <div class="trip-meta-data__container">
        <h2 class="trip__name">${this.name}</h2>
        <p class="trip__date">${this.date}</p>
      </div>
      <form class="card__form" action="/">
        <label for="card__name">A card is a building-block of your trip. It could be a place, or a
          bucket where you save some links. It's really up to you.</label>
        <input id="card__name--form-input${this.id}" type="text" name="card__name" />
        <button class="card__form__submit-btn">Add card</button>
      </form>
    `;

    const addCardForm = tripEl.querySelector('.card__form');
    // without bind(this) JS binds this to the source of the event – i.e. the form
    addCardForm.addEventListener('submit', this.addCardHandler.bind(this));
  }
}

// => create trip submit event callback
const createTripHandler = (event) => {
  event.preventDefault();

  let tripNameFormInput = document.getElementById('trip__name--form-input');
  let tripDateFormInput = document.getElementById('trip__date--form-input');

  const newTrip = new Trip(
    'trips__container',
    tripNameFormInput.value,
    tripDateFormInput.value
  );
  newTrip.render();

  tripNameFormInput.value = '';
  tripDateFormInput.value = '';

  // test log
  console.log('Newly created trip', newTrip);
};

// submit button event listeners
tripFormEl.addEventListener('submit', createTripHandler);
