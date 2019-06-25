class Point implements IPoint { 
    constructor(public x: number, public y: number) { 
    } 
} 
class Rectangle implements IRectangle { 
    constructor(public height: number, public width: number) { 
    } 
    public resize(height: number, width: number) { 
        this.height = height; 
        this.width = width; 
    } 
} 
class Circle implements ICircle { 
    constructor(public radius: number) { 
    } 
    public resize(radius: number) { 
        this.radius = radius; 
    } 
    public area(): number { 
        return Math.PI * this.radius * this.radius; 
    } 
} 
class Line implements ILine { 
    constructor(public p1: IPoint, public p2: IPoint) { 
    } 
    public length(): number { 
        var a2 = Math.pow(this.p2.x - this.p1.x, 2); 
        var b2 = Math.pow(this.p2.y - this.p1.y, 2); 
        return Math.sqrt(a2 + b2); 
    } 
} 