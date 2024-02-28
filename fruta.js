class Fruit{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        let options = {
            density:0.001
           };
        this.body=Bodies.circle(this.x, this.y, this.r, options);
        World.add(world, this.body);
    }
    show(){
        let pos = this.body.position;
        push();
        ellipse(pos.x,pos.y,this.r,this.r);
        imageMode(CENTER);
        image(fruitIMG, pos.x, pos.y, this.r*2, this.r*2);
        pop();
    }
}