import Async from 'async';
import detect from 'detect-port';

const MIN_PORT = 0;
const MAX_PORT = 65535;

function getUndetectedPorts({
  min,
  max,
  num,
}) {
  const ports = [];
  const portNum = Math.max(num, 0);
  const minPort = Math.max(min, MIN_PORT);
  const maxPort = Math.min((minPort + portNum) - 1, max, MAX_PORT);

  for (let i = min; i <= maxPort; i += 1) {
    ports.push(i);
  }
  return ports;
}

function getPorts({
  min = 8000,
  max = 65535,
  num = 1,
}, callback) {
  if (min > max) {
    callback(null, []);
  } else {
    const undetectedPorts = getUndetectedPorts({
      min,
      max,
      num,
    });
    let availablePorts = [];
    let lastEndPort;

    const detectPort = (ports) => {
      lastEndPort = ports[ports.length - 1];

      Async.filter(ports, (port, cb) => {
        detect(port, (err, p) => {
          if (err) {
            cb(err);
          } else {
            cb(null, port === p);
          }
        });
      }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          availablePorts = [...availablePorts, ...result];

          const diff = num - availablePorts.length;

          if (diff > 0 && lastEndPort < max) {
            const newPorts = getUndetectedPorts({
              min: lastEndPort,
              max,
              num: diff,
            });
            detectPort(newPorts);
          } else {
            callback(null, availablePorts);
          }
        }
      });
    };

    detectPort(undetectedPorts);
  }
}

export default getPorts;

