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
   *
   *  @return          {Object}             WavecrestClient class instance
   */
  constructor(developerId, developerPassword, options) {
    super(developerId, developerPassword, options);

    if (!instance) {
      instance = this;
    }

    return instance;
  }

  /**
   *  Creates a user and a card
   *
   *  @method          createCard
   *  @param           {Object}             payload          Cardholder details
   *
   *  @return          {Request}            Superagent request instance
   */
  createCard(payload) {
    return this.post('cards', [], payload);
  }

  /**
   *  Retrieve the details of a personalized card (cardStatus, KYC Level)
   *
   *  @method          getCardDetails
   *  @param           {String}             userId           WaveCrest user id
   *  @param           {String}             proxy            WaveCrest card proxy
   *
   *  @return          {Request}            Superagent request instance
   */
  getCardDetails(userId, proxy) {
    return this.get('carddetails', ['users', userId, 'cards', proxy]);
  }

  /**
   *  Fetch the Card Holder Info for a Card
   *
   *  @method          getCardholderInfo
   *  @param           {String}             userId           WaveCrest user id
   *  @param           {String}             proxy            WaveCrest card proxy
   *
   *  @return          {Request}            Superagent request instance
   */
  getCardholderInfo(userId, proxy) {
    return this.get('cardholderinfo', ['users', userId, 'cards', proxy]);
  }

  /**
   *  Get the card status
   *
   *  @method          getCardStatus
   *  @param           {String}             userId           WaveCrest user id
   *  @param           {String}             proxy            WaveCrest card proxy
   *
   *  @return          {Request}            Superagent request instance
   */
  getCardStatus(userId, proxy) {
    return this.get('status', ['users', userId, 'cards', proxy]);
  }

  /**
   *  Update the status of card
   *
   *  @method          statusChange
   *  @param           {String}              userId           WaveCrest user id
   *  @param           {String}              proxy            WaveCrest card proxy
   *  @param           {Object}              payload          Status change object
   *
   *  @return          {Request}             Superagent request instance
   */
  statusChange(userId, proxy, payload) {
    return this.post('status', ['users', userId, 'cards', proxy], payload);
  }

  /**
   *  Avtivate a READY_TO_ACTIVE card so that it can be used by the cardholder
   *
   *  @method          activateCard
   *  @param           {String}              userId           WaveCrest user id
   *  @param           {String}              proxy            WaveCrest card proxy
   *  @param           {Object}              payload          Active state change object
   *
   *  @return          {Request}             Superagent request instance
   */
  activateCard(userId, proxy, payload) {
    return this.post('activate', ['users', userId, 'cards', proxy], payload);
  }

  /**
   *  replace a damaged card
   *
   *  @method          replaceCard
   *  @param           {String}             userId           WaveCrest user id
   *  @param           {String}             proxy            WaveCrest card proxy
   *  @param           {Object}             payload          Card replace object
   *
   *  @return          {Request}            Superagent request instance
   */
  replaceCard(userId, proxy, payload) {
    return this.post('replace', ['users', userId, 'cards', proxy], payload);
  }

  /**
   *  Update cardholder details
   *
   *  @method          cardHolderUpdate
   *  @param           {String}                  userId           WaveCrest user id
   *  @param           {String}                  proxy            WaveCrest card proxy
   *  @param           {Object}                  payload          User details object
   *
   *  @return          {Request}                 Superagent request instance
   */
  cardHolderUpdate(userId, proxy, payload) {
    return this.post('', ['users', userId, 'cards', proxy], payload);
  }

  /**
   *  Update KYC documents
   *
   *  @method          updateUserKYC
   *  @param           {String}               userId                 WaveCrest user id
   *  @param           {Base64}               identityProof          PDF, Jpeg or png
   *  @param           {Base64}               addressProof           PDF, Jpeg or png
   *
   *  @return          {Request}              Superagent request instance
   */
  updateUserKYC(userId, identityProof, addressProof) {
    return this.post('kyc', ['users', userId], { identityProof, addressProof });
  }
}
