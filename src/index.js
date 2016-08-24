import BaseClient from './BaseClient';

let instance = null;

export default class WavecrestClient extends BaseClient {

  /**
   *  Class constructor
   *
   *  @method          constructor
   *  @param           {String}             developerId              developerID
   *  @param           {String}             developerPassword        developerPassword
   *  @param           {Object}             options                  { apiPath, authPath }
   *  @return          {Object}             WavecrestClient class instance
   */
  constructor(developerId, developerPassword, options) {
    super(developerId, developerPassword, options);

    if (!instance) {
      instance = this;
    }

    return instance;
  }

  createCard(payload) {
    return this.post('cards', [], payload);
  }

  getCardDetails(userId, proxy) {
    return this.get('carddetails', [ 'users', userId, 'cards', proxy ]);
  }

  getCardholderInfo(userId, proxy) {
    return this.get('cardholderinfo', [ 'users', userId, 'cards', proxy ]);
  }

  getCardStatus(userId, proxy) {
    return this.get('status', [ 'users', userId, 'cards', proxy ]);
  }

  statusChange(userId, proxy, payload) {
    return this.post('status', [ 'users', userId, 'cards', proxy ], payload);
  }

  activateCard(userId, proxy, payload) {
    return this.post('activate', [ 'users', userId, 'cards', proxy ], payload);
  }

  replaceCard(userId, proxy, payload) {
    return this.post('replace', [ 'users', userId, 'cards', proxy ], payload);
  }

  cardHolderUpdate(userId, proxy, payload) {
    return this.post('', [ 'users', userId, 'cards', proxy ], payload);
  }

  updateUserKYC(userId, identityProof, addressProof) {
    return this.post('kyc', [ 'users', userId ], { identityProof, addressProof });
  }
}
