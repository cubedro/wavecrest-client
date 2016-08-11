import BaseClient from './BaseClient';

let instance = null;

export default class WavecrestClient extends BaseClient {
  constructor(apiKey, apiSecret, options) {
    super(apiKey, apiSecret, options);

    if (!instance) {
      instance = this;
    }

    return instance;
  }

  createCard(body) {
    return this._post('cards', [], body);
  }

  getCardDetails(userId, proxy) {
    return this._get('carddetails', [ 'users', userId, 'cards', proxy ]);
  }

  updateUserKYC(userId, identityProof, addressProof) {
    return this._post('kyc', [ 'users', userId ], { identityProof, addressProof });
  }
}
