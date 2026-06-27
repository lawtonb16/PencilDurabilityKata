const { createPencil } = require('./PencilCreation');
const { reduceDurability } = require('./Durability');

function ensurePencil(pencilOrOptions) {
  if (pencilOrOptions && typeof pencilOrOptions.eraserDurability === 'number') {
    return pencilOrOptions;
  }
  return createPencil(pencilOrOptions);
}

function erase(pencilOrExisting, text, page = '') {
  const pencil = ensurePencil(pencilOrExisting);

  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  if (typeof page !== 'string') {
    throw new TypeError('page must be a string');
  }

  const lastIndex = page.lastIndexOf(text);
  if (lastIndex === -1) {
    return page;
  }

  const remainingText = text.slice(0, Math.min(text.length, pencil.eraserDurability || 0));
  reduceDurability(pencil, remainingText, 'erase');

  return page.slice(0, lastIndex) + page.slice(lastIndex + remainingText.length);
}

module.exports = { erase };
