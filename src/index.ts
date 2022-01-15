const canvas = document.createElement('canvas');
const ctx = canvas.getContext('webgl2')!;
const root = document.querySelector('#root')!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.clearColor(0, 0, 0, 1);
ctx.clear(ctx.COLOR_BUFFER_BIT);

root.append(canvas);
