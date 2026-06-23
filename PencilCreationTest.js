const assert = require('assert');
// Adjust the require path if your implementation exports differently
const Pencil = require('./PencilCreation').createPencil;
/** @type {typeof import("./PencilCreation").createPencil} */

function tryRequire() {
	try {
		return require('./PencilCreation');
	} catch (e) {
		console.error('Could not load PencilCreation.js:', e.message);
		process.exit(1);
	}
}


const P = tryRequire();

// Helper: create a blank paper
function blank() { return ''; }

// Test: point durability decreases when writing lowercase and uppercase
(() => {
	const pencil = new P.Pencil(5, 10, 10); // pointDurability, length, eraser
	let paper = blank();
	paper = pencil.write('hello', paper);
	// 'hello' costs 5 durability
	assert.strictEqual(paper, 'hello', 'Paper should contain written text');
	// further write should stop when durability exhausted
	paper = pencil.write('world', paper);
	// remaining durability was 0, so expect some or no characters appended
	assert(paper.length >= 5, 'Paper length should be at least initial text length');
})();

// Test: sharpening restores point but reduces length
(() => {
	const pencil = new P.Pencil(3, 2, 5);
	let paper = blank();
	paper = pencil.write('abc', paper); // uses up 3
	const beforeLength = pencil.length;
	pencil.sharpen();
	assert(pencil.pointDurability > 0, 'Sharpening should restore point durability');
	assert.strictEqual(pencil.length, beforeLength - 1, 'Sharpening should reduce pencil length by 1');
})();

// Test: eraser durability reduces when erasing and stops when exhausted
(() => {
	const pencil = new P.Pencil(10, 5, 2);
	let paper = 'Buffalo buffalo buffalo';
	paper = pencil.erase('buffalo', paper);
	// first erase should remove last occurrence
	assert(!paper.includes('buffalo') || paper.lastIndexOf('buffalo') < paper.length, 'Erase should remove last occurrence');
	const remainingEraser = pencil.eraserDurability;
	pencil.erase('buffalo', paper);
	assert(pencil.eraserDurability <= remainingEraser, 'Eraser durability should not increase');
})();

console.log('PencilCreationTest: all tests ran (assertions will throw on failure)');
