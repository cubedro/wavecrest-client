import { expect } from 'chai';
import { test } from '../';

const { describe, it } = global;

describe('test', () => {
  it('should return true', async () => {
    const result = await test();
    expect(result).to.be.equal(true);
  });
});
