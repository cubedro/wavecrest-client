import { expect } from 'chai';
import WavecrestClient from '../';
import { API_PATH, API_SANDBOX_PATH, API_VERSION } from '../wavecrest/config';

const { describe, it } = global;
const loginHeaders = {
  'User-Agent': 'wavecrest-node-client',
  'Content-Type': 'application/json',
  Accept: 'application/json',
  DeveloperId: 'devId',
  DeveloperPassword: 'devPass',
  'X-Method-Override': 'login'
};
const defaultHeaders = {
  'User-Agent': 'wavecrest-node-client',
  'Content-Type': 'application/json',
  Accept: 'application/json',
  DeveloperId: 'devId',
};

describe('WavecrestClient class extend', () => {
  it('should be instance of WavecrestClient', async () => {
    const result = new WavecrestClient('devId', 'devPass', {});
    expect(result).to.be.an.instanceof(WavecrestClient);
  });

  it('should throw error if devId not provided', async () => {
    expect(function () {
      const result = new WavecrestClient('', 'devPass', {});
      return result;
    })
      .to.throw(Error, 'You have to provide the developerID and developerPassword');
  });

  it('should throw error if devPass not provided', async () => {
    expect(function () {
      const result = new WavecrestClient('devId', '', {});
      return result;
    })
      .to.throw(Error, 'You have to provide the developerID and developerPassword');
  });

  it('should make relative path', async () => {
    const client = new WavecrestClient('devId', 'devPass', {});
    const result = client.makeRelativeURI([ 'test', 'path' ]);
    expect(result).to.be.equal('/test/path');
  });

  it('should make absolute path', async () => {
    const client = new WavecrestClient('devId', 'devPass', {});
    const result = client.makeAbsoluteURI('/test');
    expect(result).to.be.equal(API_PATH + '/test');
  });

  it('should make login headers', async () => {
    const client = new WavecrestClient('devId', 'devPass', {});
    const result = await client.makeHeaders({}, true);
    expect(result).to.deep.equal(loginHeaders);
  });

  it('should make default headers', async () => {
    const client = new WavecrestClient('devId', 'devPass', {});
    const result = await client.makeHeaders({}, false);
    expect(result).to.deep.equal(defaultHeaders);
  });

  it('should get http://google.com and return status 200', async () => {
    const client = new WavecrestClient('devId', 'devPass', {apiPath: 'http://google.com'});
    const result = await client.get('', '');
    expect(result.status).to.equal(200);
  });

  it('should post http://google.com and return status 405', async () => {
    const client = new WavecrestClient('devId', 'devPass', {apiPath: 'http://google.com'});
    let status;

    try {
      await client.post('', '', {});
    } catch (err) {
      status = err.status;
    }

    expect(status).to.equal(405);
  });

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
