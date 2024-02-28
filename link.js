class Link{
    constructor(bodyA, bodyB){
        this.link = Constraint.create({
            bodyA: bodyA,
            pointA: { x: 0, y: 0},
            bodyB: bodyB,
            pointB: { x: 0, y: 0 },
            length: 30,
            stiffness: 0.5
        });
        World.add(world, this.link);
    }
    broke(){
        World.remove(world, this.link);
    }
}