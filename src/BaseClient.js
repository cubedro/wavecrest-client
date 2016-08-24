import request from 'superagent';
import { API_PATH, API_SANDBOX_PATH, API_AUTH_PATH, API_VERSION } from './wavecrest/config';

const API_TOKEN_LIFETIME = 1000 * 60 * 60 * 8;
let instance = null;

export default class BaseClient {

  /**
   *  Class constructor
   *
   *  @method          constructor
   *  @param           {String}             developerId              developerID
   *  @param           {String}             developerPassword        developerPassword
   *  @param           {Object}             options                  { apiPath, authPath }
   *  @return          {Object}             BaseClient class instance
   */
  constructor(developerId, developerPassword, options) {
    if (!developerId || !developerPassword) {
      throw new Error('You have to provide the developerID and developerPassword');
    }

    if (!instance) {
      this.authToken = '';
      this.authTokenIssuedAt = 0;
      instance = this;
    }

    Object.assign(instance, {
      developerId,
      developerPassword,
      apiPath: API_PATH,
      authPath: API_AUTH_PATH,
    }, options);

    return instance;
  }

  /**
   *  Concatenate array into a single string relative path
   *
   *  @method          makeRelativeURI
   *  @param           {Array}                  parts
   *  @return          {String}
   */
  makeRelativeURI(parts = []) {
    return '/' + parts.join('/');
  }

  /**
   *  Prefix relative URI with api host
   *
   *  @method          makeAbsoluteURI
   *  @param           {String}                 relativeURI
   *  @return          {String}
   */
  makeAbsoluteURI(relativeURI) {
    return this.apiPath + relativeURI;
  }

  /**
   *  Returns object with headers for request
   *
   *  @method          makeHeaders
   *  @param           {Object}             additional          Pass additional headers
   *  @return          {Object}             Headers object
   */
  makeHeaders(additional, auth = false) {
    let authHeaders = {
      DeveloperPassword: this.developerPassword,
      'X-Method-Override': 'login',
    };

    let apiHeaders = (this.authToken ? {
      AuthenticationToken: this.authToken,
    } : {});

    return Object.assign({
      'User-Agent': 'wavecrest-node-client',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      DeveloperId: this.developerId,
    }, (auth ? authHeaders : apiHeaders), additional);
  }

  /**
   *  Makes a GET request
   *
   *  @method          get
   *  @param           {String}          path            API method relative path
   *  @param           {Array}           params          Parameters passed in path
   *  @return          {Object}          Request object
   */
  get(path, params, headers = {}) {
    const url = this.makeAbsoluteURI(this.makeRelativeURI([ ...params, path ]));

    return request.get(url)
      .set(this.makeHeaders(headers));
  }

  /**
   *  Makes a POST request
   *
   *  @method          post
   *  @param           {String}          path            API method relative path
   *  @param           {Array}           params          Parameters passed in path
   *  @param           {Object}          payload         Payload to be passed in request
   *  @return          {Object}          Request object
   */
  post(path, params, body, headers = {}) {
    const url = this.makeAbsoluteURI(this.makeRelativeURI([ ...params, path ]));

    return request.post(url)
      .set(this.makeHeaders(headers))
      .send(body);
  }

  /**
   *  Check if authToken exists and is still valid
   *
   *  @method          isAuthTokenValid
   *  @return          {Boolean}
   */
  isAuthTokenValid() {
    let authTokenExpiration = this.authTokenIssuedAt + API_TOKEN_LIFETIME;
    return Boolean(this.authToken.length && authTokenExpiration > (new Date()).getTime());
  }

  /**
   *  Get the auth token
   *
   *  @method          getAuthToken
   *  @return          {Promise}
   */
  getAuthToken() {
    const url = this.makeAbsoluteURI('/' + this.authPath);

    return request.post(url)
      .set(this.makeHeaders({}, true))
      .then(response => {
        if (response.status !== 200) {
          throw (new Error('Auth failed. No token received.'));
        }

        this.authToken = response.body.token;
        this.authTokenIssuedAt = (new Date()).getTime();

        return response.body;
      });
  }

  /**
   *  Returns the API production URL
   *
   *  @method          apiBaseUrl
   *  @return          {String}
   */
  static apiBaseUrl() {
    return API_PATH;
  }

  /**
   *  Returns the API sandbox URL
   *
   *  @method          apiSandboxUrl
   *  @return          {String}
   */
  static apiSandboxUrl() {
    return API_SANDBOX_PATH;
  }

  /**
   *  Returns the API version
   *
   *  @method          apiVersion
   *  @return          {String}
   */
  static apiVersion() {
    return API_VERSION;
  }
}
