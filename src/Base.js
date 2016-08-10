let instance = null;

export default class Base {
  constructor(opts) {
    if (!instance) {
      instance = this;
    }

    this.opts = opts || {};

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
    return '/' + parts.join();
  }

  /**
   *  Prefix relative URI with api host
   *
   *  @method          makeAbsoluteURI
   *  @param           {String}                 relativeURI
   *  @return          {String}
   */
  makeAbsoluteURI(relativeURI) {
    return this.apiURI + relativeURI;
  }

  /**
   *  [makeHeaders description]
   *
   *  @method          makeHeaders
   *  @param           {[type]}             additional          [description]
   *  @return          {[type]}             [description]
   */
  makeHeaders(additional) {
    return Object.assign({
      'User-Agent': 'wavecrest-node-client',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      DeveloperId: this.opts.developerId,
      AuthenticationToken: this.opts.authToken,
      'X-Method-Override': 'login',
    }, additional);
  }
}
