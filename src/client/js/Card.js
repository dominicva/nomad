import { Component } from './Component.js';

export class Card {
  constructor(imageUrl, name, location, weather) {
    this.id;
    this.imageUrl = imageUrl;
    this.name = name;
    this.location = location;
    this.weather = weather;
  }
}

// refactor: import class from another file
export class CardEntry extends Component {
  constructor(renderHookId, card) {
    super(renderHookId);
    this.card = card;
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
  }
}
