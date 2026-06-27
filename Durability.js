function reduceDurability(pencil, text, mode = 'write') {
  if (!pencil || typeof text !== 'string') {
    return pencil;
  }

  const durabilityKey = mode === 'erase' ? 'eraserDurability' : 'pointDurability';

  if (typeof pencil[durabilityKey] !== 'number') {
    return pencil;
  }

  for (const char of text) {
    if (pencil[durabilityKey] <= 0) {
      break;
    }

    if (char === ' ' || char === '\t' || char === '\n') {
      continue;
    }

    const cost = mode === 'erase' ? 1 : (char.toUpperCase() === char && char.toLowerCase() !== char ? 2 : 1);
    pencil[durabilityKey] = Math.max(0, pencil[durabilityKey] - cost);
  }

  return pencil;
}

module.exports = { reduceDurability };
