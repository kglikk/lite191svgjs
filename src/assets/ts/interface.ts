interface IPoint { 
    x: number; 
    y: number; 
} 
interface IShape { 
} 
interface IRectangle extends IShape { 
    height: number; 
    width: number; 
    resize(height: number, width: number); 
} 

interface ICircle extends IShape { 
    radius: number; 
    resize(radius: number); 
    area(): number; 
} 
interface ILine extends IShape { 
    p1: IPoint; 
    p2: IPoint; 
    length(): number; 
} 