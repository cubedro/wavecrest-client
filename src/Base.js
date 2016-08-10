import request from 'superagent';
import { API_PATH, API_SANDBOX_PATH, API_AUTH_PATH, API_VERSION } from './wavecrest/config';

let instance = null;

export default class Base {

  /**
   *  Class constructor
   *
   *  @method          constructor
   *  @param           {Object}             options          {devId, devPassword, apiPath, authPath}
   *  @return          {Object}             Base class instance
   */
  constructor(options) {
    if (!instance) {
      instance = this;
    }

    Object.assign(this, {
      apiPath: API_PATH,
      authPath: API_AUTH_PATH,
    }, options);

    return instance;
  }

  /**
   *  Concatenate array into a single string relative path
   *
   *  @method          _makeRelativeURI
   *  @param           {Array}                  parts
   *  @return          {String}
   */
  _makeRelativeURI(parts = []) {
    return '/' + parts.join();
  }

  /**
   *  Prefix relative URI with api host
   *
   *  @method          _makeAbsoluteURI
   *  @param           {String}                 relativeURI
   *  @return          {String}
   */
  _makeAbsoluteURI(relativeURI) {
    return this.apiPath + relativeURI;
  }

  /**
   *  Returns object with headers for request
   *
   *  @method          _makeHeaders
   *  @param           {Object}             additional          Pass additional headers
   *  @return          {Object}             Headers object
   */
  _makeHeaders(additional) {
    return Object.assign({
      'User-Agent': 'wavecrest-node-client',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      DeveloperId: this.developerId,
      AuthenticationToken: this.authToken,
      // 'X-Method-Override': 'login',
    }, additional);
  }

  /**
   *  Makes a GET request
   *
   *  @method          _get
   *  @param           {String}          path            API method relative path
   *  @param           {Array}           params          Parameters passed in path
   *  @return          {Object}          Request object
   */
  _get(path, params, headers = {}) {
    const url = this.makeAbsoluteURI(this.makeRelativeURI([ path, ...params ]));

    return request.get(url)
      .set(this.makeHeaders(headers));
  }

  /**
   *  Makes a POST request
   *
   *  @method          _post
   *  @param           {String}          path            API method relative path
   *  @param           {Array}           params          Parameters passed in path
   *  @param           {Object}          payload         Payload to be passed in request
   *  @return          {Object}          Request object
   */
  _post(path, params, body, headers = {}) {
    const url = this.makeAbsoluteURI(this.makeRelativeURI([ path, ...params ]));

    return request.post(url)
      .set(this.makeHeaders(headers))
      .send(body);
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
