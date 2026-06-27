function createPencil({ pointDurability = 40000, eraser = 40000, length = 10 } = {}) {
  return {
    pointDurability,
    maxPointDurability: pointDurability,
    eraserDurability: eraser,
    eraser,
    maxEraser: eraser,
    length,
    maxLength: length
  };
}

module.exports = {
  createPencil
};
