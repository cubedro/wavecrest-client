import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import WavecrestClient from '../';
import { API_PATH, API_SANDBOX_PATH, API_VERSION } from '../wavecrest/config';
import { DEVELOPER_ID, DEVELOPER_PASSWORD, HEADERS_LOGIN, HEADERS_DEFAULT } from './fixtures';

chai.use(dirtyChai);

const { describe, it } = global;

describe('WavecrestClient class extend', () => {
  it('should be instance of WavecrestClient', async () => {
    const result = new WavecrestClient(DEVELOPER_ID, DEVELOPER_PASSWORD, {});
    expect(result).to.be.an.instanceof(WavecrestClient);
  });

  it('should throw error if devId not provided', async () => {
    expect(function () {
      const result = new WavecrestClient('', DEVELOPER_PASSWORD, {});
      return result;
    })
      .to.throw(Error, 'You have to provide the developerID and developerPassword');
  });

  it('should throw error if devPass not provided', async () => {
    expect(function () {
      const result = new WavecrestClient(DEVELOPER_ID, '', {});
      return result;
    })
      .to.throw(Error, 'You have to provide the developerID and developerPassword');
  });

  it('should make relative path', async () => {
    const client = new WavecrestClient(DEVELOPER_ID, DEVELOPER_PASSWORD, {});
    const result = client.makeRelativeURI([ 'test', 'path' ]);
    expect(result).to.be.equal('/test/path');
  });

  it('should make absolute path', async () => {
    const client = new WavecrestClient(DEVELOPER_ID, DEVELOPER_PASSWORD, {});
    const result = client.makeAbsoluteURI('/test');
    expect(result).to.be.equal(API_PATH + '/test');
  });

  it('should make login headers', async () => {
    const client = new WavecrestClient(DEVELOPER_ID, DEVELOPER_PASSWORD, {});
    const result = client.makeHeaders({}, true);
    expect(result).to.deep.equal(HEADERS_LOGIN);
  });

  it('should make default headers', async () => {
    const client = new WavecrestClient(DEVELOPER_ID, DEVELOPER_PASSWORD, {});
    const result = client.makeHeaders({}, false);
    expect(result).to.deep.equal(HEADERS_DEFAULT);
  });

  describe('WavecrestClient.get()', () => {
    const client = new WavecrestClient(DEVELOPER_ID, DEVELOPER_PASSWORD);
    const result = client.get('test', [ 'get', 'method' ]);
    const expectedURL = API_PATH + '/get/method/test';

    it('should have request method GET', async () => {
      expect(result.method).to.equal('GET');
    });

    it('should have URL ' + expectedURL, async () => {
      expect(result.url).to.equal(expectedURL);
    });

    it('should have default headers', async () => {
      expect(result.header).to.deep.equal(HEADERS_DEFAULT);
    });
  });

  describe('WavecrestClient.post()', () => {
    const client = new WavecrestClient(DEVELOPER_ID, DEVELOPER_PASSWORD);
    const payload = {test: 10};
    const result = client.post('test', [ 'post', 'method' ], payload);
    const expectedURL = API_PATH + '/post/method/test';

    it('should have request method POST', async () => {
      expect(result.method).to.equal('POST');
    });

    it('should have URL ' + expectedURL, async () => {
      expect(result.url).to.equal(expectedURL);
    });

    it('should have default headers', async () => {
      expect(result.header).to.deep.equal(HEADERS_DEFAULT);
    });

    it('should have payload', async () => {
      expect(result._data).to.deep.equal(payload);
    });
  });

  describe('WavecrestClient authentication', () => {
    const client = new WavecrestClient(DEVELOPER_ID, DEVELOPER_PASSWORD);

    it('should have authToken invalid', async () => {
      const result = client.isAuthTokenValid();
      expect(result).to.equal(false);
    });

    it('should get authToken', async () => {
      const result = await client.getAuthToken();
      const token = result.token;

      if (DEVELOPER_ID !== 'devId') {
        expect(token).to.not.be.null();
      } else {
        expect(token).to.be.null();
      }
    });

    it('should have authToken ' + (DEVELOPER_ID !== 'devId' ? 'valid' : 'invalid'), async () => {
      const result = client.isAuthTokenValid();
      expect(result).to.equal(Boolean(DEVELOPER_ID !== 'devId'));
    });
  });

  describe('WavecrestClient static methods', () => {
    it('should return api path', async () => {
      const result = await WavecrestClient.apiBaseUrl();
      expect(result).to.be.equal(API_PATH);
    });

    it('should return api sandbox path', async () => {
      const result = await WavecrestClient.apiSandboxUrl();
      expect(result).to.be.equal(API_SANDBOX_PATH);
    });

    it('should return version', async () => {
      const result = await WavecrestClient.apiVersion();
      expect(result).to.be.equal(API_VERSION);
    });
  });
});
