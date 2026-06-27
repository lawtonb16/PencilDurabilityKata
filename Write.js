const { createPencil } = require('./PencilCreation');
const { reduceDurability } = require('./Durability');

function ensurePencil(pencilOrOptions) {
  if (pencilOrOptions && typeof pencilOrOptions.pointDurability === 'number') {
    return pencilOrOptions;
  }
  return createPencil(pencilOrOptions);
}

function write(pencilOrExisting, text, page = '') {
  const pencil = ensurePencil(pencilOrExisting);

  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  if (typeof page !== 'string') {
    throw new TypeError('page must be a string');
  }

  let remainingDurability = pencil.pointDurability;
  const written = [];

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (remainingDurability <= 0) {
      written.push(' ');
      continue;
    }

    written.push(char);
    reduceDurability(pencil, char, 'write');
    remainingDurability = pencil.pointDurability;
  }

  pencil.pointDurability = remainingDurability;
  return page + written.join('');
}

module.exports = { write };
