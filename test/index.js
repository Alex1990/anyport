import { assert } from 'chai';
import getPorts from '../src';

describe('anyport', () => {
  it('should return an available port (>= 8000) if no options', (done) => {
    getPorts({}, (err, ports) => {
      assert.strictEqual(ports.length, 1);
      assert.isAtLeast(ports[0], 8000);
      done();
    });
  });

  it('should return the specified number of ports if pass with `num = 10`', (done) => {
    getPorts({ num: 10 }, (err, ports) => {
      assert.strictEqual(ports.length, 10);
      done();
    });
  });

  it('should return an available port greater or equal to 9000 if pass with `min = 9000`', (done) => {
    getPorts({ min: 9000 }, (err, ports) => {
      assert.isAtLeast(ports[0], 9000);
      done();
    });
  });

  it('should return six available ports less or equal to 8005 if pass with `num = 10, max = 8005`', (done) => {
    getPorts({ num: 10, max: 8005 }, (err, ports) => {
      assert.strictEqual(ports.length, 6);
      ports.forEach(port => assert.isAtMost(port, 8005));
      done();
    });
  });
});
