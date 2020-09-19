import { Component, ElementAttribute } from './Component.js';
import { Card, CardEntry } from './Card.js';

export class Trip extends Component {
  cards = [];
  constructor(renderHookId, name, { startDate, endDate }) {
    super(renderHookId);
    this.name = name;
    this.dates = { startDate, endDate };
    this.id =
      this.name.split(' ').join('') + this.dates.startDate + this.dates.endDate;
    this.cardIdCounter = 0;
    this.tripHtml = `
    <div class="trip-meta-data__container">
      <h2 class="trip__name">${this.name}</h2>
      <p class="trip__date">${
        this.dates.endDate
          ? `${this.dates.startDate} - ${this.dates.endDate}`
          : `${this.dates.startDate}`
      }</p>
    </div>
    <form class="card__form" action="/">
      <label for="card__name">A card is a building-block of your trip. It could be a place, or a
        bucket where you save some links. It's really up to you.</label>
      <input id="card__name--form-input${
        this.id
      }" type="text" name="card__name" />
      <button class="card__form__submit-btn">Add card</button>
    </form>
  `;
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

    // set id for new card and increment id counter
    newCard.id = this.id + '-' + this.cardIdCounter;
    this.cardIdCounter += 1;

    this.cards.push(newCard);

    const newCardEntry = new CardEntry(this.id, newCard);
    newCardEntry.render(newCard.id);

    cardNameFormInput.value = '';

    console.log('Trip cards array', this);
  }

  render() {
    const tripEl = this.createRootElement('section', 'trip', [
      new ElementAttribute('id', this.id),
    ]);
    tripEl.innerHTML = this.tripHtml;

    const addCardForm = tripEl.querySelector('.card__form');

    // without bind(this) JS binds this to the source of the event – i.e. the form
    addCardForm.addEventListener('submit', this.addCardHandler.bind(this));
  }
}
