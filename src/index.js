import Base from './Base';

export default class WavecrestClient extends Base {
  createCard(body) {
    return this._post('cards', [], body);
  }
}
