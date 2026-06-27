const assert = require('assert');
const { reduceDurability } = require('./Durability');

const pencil = {
  pointDurability: 5,
  eraserDurability: 5
};

reduceDurability(pencil, 'ABC', 'write');
assert.strictEqual(pencil.pointDurability, 2, 'writing should reduce point durability');

reduceDurability(pencil, 'ABC', 'erase');
assert.strictEqual(pencil.eraserDurability, 2, 'erasing should reduce eraser durability');

console.log('DurabilityTest: all assertions passed');
