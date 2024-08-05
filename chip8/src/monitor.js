const COLS = 64;
const ROWS = 32;
const SCALE = 15
class Monitor{
    constructor(canvas){
        this.cols = COLS
        this.rows = ROWS

        this.display = new Array(this.cols * this.rows)
        this.scale = SCALE;

        this.canvas = canvas

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        this.canvasCtx = this.canvas.getContext('2d');
    }

    setPixel(x,y){
        if(x > COLS)
            x -= COLS
        else if(x < 0)
            x += COLS

        if(y > ROWS)
            y -= ROWS
        else if(y<0)
            y += ROWS

        this.display[x+(y*COLS)]^= 1;
        return this.display[x+(y*COLS)]!= 1
    }

    clear(){
        this.display = new Array(COLS*ROWS)
        for(let i=0; i < this.cols*this.rows; i++)
            this.display[i] = 0;
    }

    paint(){
        this.canvasCtx.fillStyle = '#000';
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for(let i=0; i < this.cols*this.rows; i++) {
            let x = (i % this.cols) * this.scale;
            let y = Math.floor(i / this.cols) * this.scale;

            if(this.display[i] == 1) {
                this.canvasCtx.fillStyle = '#FFF';
                this.canvasCtx.fillRect(x, y, this.scale, this.scale);
            }
        }
    }

    testRender() {
        this.setPixel(0, 0);
        this.setPixel(63,31);
        this.paint();
    }
}
export default Monitor