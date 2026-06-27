function sharpen(pencil) {
  if (!pencil || typeof pencil !== 'object') return pencil;
  if (typeof pencil.length !== 'number' || pencil.length <= 0) return pencil;

  pencil.length -= 1;
  pencil.pointDurability = 40000;
  return pencil;
}

export default sharpen;
