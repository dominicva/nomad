import { Component, ElementAttribute } from './Component.js';
import { Trip } from './Trip.js';

export class TripsContainer extends Component {
  constructor(renderHookId) {
    super(renderHookId);
  }

  createTripHandler(event) {
    event.preventDefault();

    let tripNameFormInput = document.getElementById('trip__name--form-input');
    let tripStartDateFormInput = document.getElementById(
      'trip__start-date--form-input'
    );
    let tripEndDateFormInput = document.getElementById(
      'trip__end-date--form-input'
    );

    const newTrip = new Trip('trips__container', tripNameFormInput.value, {
      startDate: tripStartDateFormInput.value,
      endDate: tripEndDateFormInput.value,
    });

    newTrip.render();

    tripNameFormInput.value = '';
    tripStartDateFormInput.value = '';
    tripEndDateFormInput.value = '';

    console.log('Newly created trip', newTrip);
  }

  render() {
    console.log([new ElementAttribute('id', 'trips__container')]);
    const mainEl = this.createRootElement('main', false, [
      new ElementAttribute('id', 'trips__container'),
    ]);

    const createTripForm = document.querySelector('.trip__form');

    createTripForm.addEventListener(
      'submit',
      this.createTripHandler.bind(this)
    );
  }
}
