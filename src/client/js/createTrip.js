// global (for now) UI elements and variables
const tripFormEl = document.querySelector('.trip__form');

let cardId = 0;

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);

    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

// refactor: trip class to be imported from another file
class Trip extends Component {
  constructor(renderHookId, name, date) {
    super(renderHookId);
    this.name = name;
    this.date = date;
    this.id = this.name + this.date;
    this.cards = [];
  }

  addCardHandler(event) {
    event.preventDefault();

    let cardNameFormInput = document.getElementById(`card__name--form-input${this.id}`);

    const newCard = new Card(
      'https://cdn.pixabay.com/photo/2017/04/05/01/16/tropical-2203737_1280.jpg',
      cardNameFormInput.value
    );
    newCard.id = cardId;
    cardId += 1;

    const newCardEntry = new CardEntry(this.id, newCard);
    newCardEntry.render();

    cardNameFormInput.value = '';

    // test log
    console.log('Newly created card', newCard);
    console.log('Newly created card entry', newCardEntry);
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
class CardEntry extends Component {
  constructor(renderHookId, card) {
    super(renderHookId);
    this.card = card;
  }

  deleteCard() {
    console.log('Deleting card');
    console.log(this.card);
  }

  render() {
    const cardEl = this.createRootElement('article', 'card');

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
        <button class="delete-btn">Delete card</button>
    `;

    const deleteCardBtn = cardEl.querySelector('.delete-btn');
    // without bind(this) JS binds this to the source of the event – i.e. the button
    deleteCardBtn.addEventListener('click', this.deleteCard.bind(this));
  }
}

// class App {}

// ==>> form submit handlers

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

// class CreateTripForm {}

// class TripsContainer {}

// class Trip extends Component {}

// class AddCardForm {}

// class TripMetaData {}

// class CardsContainer {}

// class CardEntry extends Component {}

// class Card {}

// class App {}
