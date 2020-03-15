SVG.Load = SVG.invent({
  // Define the type of element that should be created
  create: function () {
    SVG.Nested.call(this) // call super constructor 

    temp = this.attr('id')
    this.attr({
      'id': 'load' + temp,
      'attr': 'unselected', // element moze by zaznaczany
      'class': 'noshift' // nie jest wcisniety shift na poczatku      
    })   

  //this.svg('')
  this.path('M20,0, 20,10, 30,10, 20,30, 10,10, 20,10').style('stroke-width: 0.5;cursor:pointer;fill: #ffffff; stroke:#000000')
  this.circle(4).attr({
    'cx': 20,
    'cy': 2,
    'stroke-width': 0.5,
    'class': 'free'
  })
  
  
    //przypisanie elementowi odpowiedniej metody
    this.on('dblclick', doubleClickLoad)
    this.on('contextmenu', contextMenu)

    //przypisanie wezlom odpowiednich metod  
    this.select('circle').on('mouseover', mouseoverNode)
    this.select('circle').on('mouseout', mouseoutNode)
    this.select('circle').on('click', clickNode)

    // przenos element w obszarze modelowania - svgArea
    var gridSize = 10
    this.draggable(function (x, y) {
      return {
        x: insideContainer(this, x, y).x - x % gridSize,
        y: insideContainer(this, x, y).y - y % gridSize
      }
    })
  }, // Specify from which existing class this shape inherits
  inherit: SVG.Nested, // Add custom methods to invented shape
  construct: {
    // Create an element   
    load: function () {
      return this.put(new SVG.Load)
    }
  }
})
