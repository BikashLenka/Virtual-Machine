import chip8 from "./chip8.js";
import Keyboard from "./keyboard.js";
import Monitor from "./monitor.js";


// const monitor = new Monitor(document.getElementById('screen'))
// const keyboard = new Keyboard()
// const Chip8 = new chip8(monitor,keyboard)

const FPS = 60
let loop, fpsInterval,startTime,now,then,elasped

const romSelector = document.getElementById('roms');
romSelector.addEventListener('change', () => {
    const rom = romSelector.options[romSelector.selectedIndex].value;
    console.log(rom);
    loadrom(rom);
});

const reloadButton = document.getElementById('reload');
reloadButton.addEventListener('click', () => {
    console.log("click")
    const rom = romSelector.options[romSelector.selectedIndex].value;
    console.log(rom);
    loadrom(rom);
});

const loadingText = document.getElementById('loading-text');

function loadrom(romName){
    const monitor = new Monitor(document.getElementById('screen'), 20);
    const keyboard = new Keyboard();
    const Chip8 = new chip8(monitor, keyboard);
    window.cancelAnimationFrame(loop);

    const url = `/rom/${romName}`;

    function step(){
        now = Date.now()
        elasped = now-then

        if(elasped > fpsInterval){
            Chip8.cycle();
        }

        loop = requestAnimationFrame(step)
    }

    reloadButton.disabled = true;
    loadingText.innerHTML = 'Loading ' + romName + ' ... ';

    fetch(url).then(res => res.arrayBuffer())
    .then(buffer => {
        const program = new Uint8Array(buffer)
        fpsInterval = 1000/FPS
        then = Date.now()
        startTime = then
        reloadButton.disabled = false;
        Chip8.loadSpritsIntoMemory();
        Chip8.loadProgramIntoMemory(program)
        console.log(program);
        loop  = requestAnimationFrame(step)
        loadingText.innerHTML = 'Playing ' + romName + ' ';
    })

}

loadrom('BLITZ');