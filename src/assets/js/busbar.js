
SVG.Busbar = SVG.invent({
  // Define the type of element that should be created
  create: function () {
    SVG.Nested.call(this) // call super constructor

    busbar = this
    temp = this.attr('id')
    
    this.attr({
      'id': 'busbar' + temp,
      'attr': 'unselected', // element moze by zaznaczany
      'class': 'noshift', // nie jest wcisniety shift na poczatku
      'data' : 'busbar'      
    })   

    // this.path('M2,16,30,16').style('stroke-width: 1;cursor:pointer;fill: #ffffff; stroke:#000000')
    this.path('M0,20,20,20').style('stroke-width: 2;cursor:pointer;fill: #ffffff; stroke:#000000')
        
    //utworz wezły
    /*    
    var node = this.circle(4).attr({
      'cx': 0,
      'cy': 20,
      'stroke-width': 0.5,
      'class': 'free'
    })
    var node1 = this.circle(4).attr({
      'cx': 10,
      'cy': 20,
      'stroke-width': 0.5,
      'class': 'free'
    })
    var node2 = this.circle(4).attr({
      'cx': 20,
      'cy': 20,
      'stroke-width': 0.5,
      'class': 'free'
    })*/


    //tworzymy tło szyny
    //clonedBusbar = this.path('M2,16,30,16').back()
    clonedBusbar = this.path('M0,20,20,20')
    clonedBusbar.attr({      
      'id': busbar.attr('id') + 'background',
      'data': 'background',     
      'stroke-width': 8,
      'cursor': 'pointer',     
      'opacity': 0

    })

    //przypisanie wezlom odpowiedniej metody  
    //this.select('circle').on('mouseover', mouseoverNode)
    //this.select('circle').on('mouseout', mouseoutNode)  
    //this.select('circle').on('click', clickNodeInExternalGrid)
   
    //DOBRZE DZIAŁA
    /*
    this.on('contextmenu', function (event) {  
      showCustomMenuBusbar(this, event.offsetX, event.offsetY)
    }) 
    */

    //przypisanie elementowi odpowiednich metod
    //this.on('dblclick', doubleClickBusbar)
    this.on('click', clickBusbar)

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
  extend: {
    //zaznacz element

    /*
    selectBusbar: function () {

      //ostatni element w svg busbar  
      this.last()
      pathId = this.last().attr('id')
      busbarPath = SVG.get(pathId)
            
      $('#'+ pathId).css({
        stroke: 'green',
        opacity: 0.5
      })

      rightRect = this.rect(4,4).fill('green').move(18, 18)
      rightRect.front()
      busbarPath.before(rightRect)
      leftRect = this.rect(4,4).fill('green').move(0, 18)
      leftRect.front()
      busbarPath.before(leftRect)

      rightRect.draggable()
      leftRect.draggable()

      //dodaj mozliwosc usuwania elementow 
      rightRect.on('dragmove', function (e) {
        busbarPathArray = busbarPath.array()         
        
        //wychwyć współrzędną x ostatniego elementu ścieżki
        busbarPathArray.value[1][1] += e.detail.event.movementX
        
        busbarPath.plot(busbarPathArray)
        
     //   var regex = /\d+_\d+/g //wychwytuj Id o budowie liczba_liczba
     //   var polylineId = busbarPathPoints.match(regex)
      })
    }, */

    selectParameters: {      
        points: ['lt', 'rt', 'rb', 'lb', 't', 'r', 'b', 'l'],    // which points to draw, default all
        pointsExclude: [],                       // easier option if to exclude few than rewrite all
        classRect: 'svg_select_boundingRect',    // Css-class added to the rect
        classPoints: 'svg_select_points',        // Css-class added to the points
        pointSize: 7,                            // size of point
        rotationPoint: true,                     // If true, rotation point is drawn. Needed for rotation!
        deepSelect: false,                       // If true, moving of single points is possible (only line, polyline, polyon)
        pointType: 'circle'                    // Point type: circle or rect, default circle
      
    }
  },
  construct: {
    // Create a rounded element   
    busbar: function () {
      return this.put(new SVG.Busbar)
    }

  }
})




