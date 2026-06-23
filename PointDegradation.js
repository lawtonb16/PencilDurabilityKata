function reducePointDurability(pencil, text) {
  if (!pencil || typeof pencil.pointDurability !== 'number' || typeof text !== 'string') {
    return pencil;
  }

  for (const char of text) {
    if (pencil.pointDurability <= 0) {
      break;
    }

    if (char === ' ' || char === '\t' || char === '\n') {
      continue;
    }

    const isUppercaseLetter = char.toUpperCase() === char && char.toLowerCase() !== char;
    pencil.pointDurability -= isUppercaseLetter ? 2 : 1;

    if (pencil.pointDurability < 0) {
      pencil.pointDurability = 0;
    }
  }

  return pencil;
}

module.exports = reducePointDurability;
