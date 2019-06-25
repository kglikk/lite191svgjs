// import { first } from "rxjs/operators"

/*
SVG.ExternalGrid = SVG.invent({
  // Define the type of element that should be created
  create: function () {
    SVG.Nested.call(this) // call super constructor

    temp = this.attr('id')
    this.attr('id', 'extgrid' + temp)
    this.attr('attr', 'unselected') // element moze by zaznaczany
    this.attr('class', 'noshift') // nie jest wcisniety shift na poczatku

    this.path('M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0').style('stroke-width: 0.5;cursor:pointer;fill: #ffffff; stroke:#000000')
    var node = this.circle(4).attr({
      'cx': 10,
      'cy': 18,
      'stroke-width': 0.5,
      'class': 'free'
    })

    // nodeAnimate(node) 

    this.select('circle').on('mouseover', mouseoverNode)
    this.select('circle').on('mouseout', mouseoutNode)
    this.select('circle').on('click', clickNodeInExternalGrid)
    this.on('dblclick', doubleClickExternalGrid)
  }, // Specify from which existing class this shape inherits
  inherit: SVG.Nested, // Add custom methods to invented shape
  extend: {
    // przenos element wewnatrz obszaru
    dragInsideContainer: function () {
      var gridSize = 10
      this.draggable(function (x, y) {
        return {
          x: insideContainer(this, x, y).x - x % gridSize,
          y: insideContainer(this, x, y).y - y % gridSize

        }
      })
    },
    // funkcja okreslajaca prawy przycisk
    contextMenu: function () {
      this.on('contextmenu', function (e) {
        event.preventDefault()
        showCustomMenuExtGrid(this, e.offsetX, e.offsetY)
      })
    }

  }, // Add method to parent elements
  construct: {
    // Create a rounded element   
    externalgrid: function () {
      return this.put(new SVG.ExternalGrid)
    }

  }
})

// wraz z przenoszeniem elementu przenos polilinie
function makeDraggableConnection (firstObject, secondObject, polyline) {

  // w przypadku rotacji zmieniaj polozenie polilinii
  firstObject.on('rotated', function () {
    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx') // nodeX = 10
        nodeY = this.attr('cy') // nodeY = 18
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR / 2 - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[0][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[0][1] = this.attr('y') + nodeY + rotationCorrectionY


    // aktualizuj polilinie
    polyline.plot(array)
  })

  // w przypadku rotacji zmieniaj polozenie polilinii
  secondObject.on('rotated', function () {
    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + 2 * nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[array.length - 1][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[array.length - 1][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)
  })

  // przenos pierwszy element z polilinia
  firstObject.on('dragmove', function (e) {

    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = -this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR / 2 - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[0][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[0][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)
  })

  // przenos drugi element z polilinia
  secondObject.on('dragmove', function (e) {

    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY
    console.log('nodeR: ' + nodeR)

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + 2 * nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX
    array[array.length - 1][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX
    array[array.length - 1][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)
  })
}

// utworz JSONA do wyswietlania w konsoli
function simpleStringify (object) {
  var simpleObject = {}
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue
    }
    if (typeof (object[prop]) == 'object') {
      continue
    }
    if (typeof (object[prop]) == 'function') {
      continue
    }
    simpleObject[prop] = object[prop]
  }
  return JSON.stringify(simpleObject) // returns cleaned up JSON
}

function showCustomMenuExtGrid (object, offsetX, offsetY) {
  $('.custom-menu').hide()

  // jesli element jest w grupie przenoszonych 
  if (object.parent().attr('id') == 'draggableNested') {

    // nic nie rob

  }else {
    $('.custom-menu').show().css({
      left: offsetX,
      top: offsetY
    })

    // ustawiam abym wiedzial ktory element mam wykorzystywac w funkcjach rotate, delete itd.
    $('.custom-menu').attr('data', object)
  }
}

var doubleClickExternalGrid = function (ev) {

  // formularz do wpisywania danych
  element = document.getElementById('externalgridform')
  element.style.display = 'block' // show
  element.style.left = ev.offsetX + 'px'
  element.style.top = ev.offsetY + 'px'

  // ustawiam abym wiedzial ktory element mam wykorzystywac w zapisywaniu danych formularza
  $('#externalgridform').attr('data', SVG.get(ev.target.id).parent().attr('id'))

  // jesli nie jest nacisniety shift
  if (this.attr('class') == 'noshift') {
    var elements = SVG.get('svgArea').select('svg')
    // wszystkie inne elementy odznacz jesli sa zaznaczone
    elements.each(function () {
      if (this.attr('attr') == 'selected') {
        console.log('zmiana na unselected')
        this.attr({
          attr: 'unselected',
          opacity: 1
        })
      }
    })
  }

  console.log('zmiana na selected')
  // zaznacz klikniety element 
  this.attr({
    attr: 'selected',
    opacity: 0.5
  })
}

var mouseoverNode = function (ev) {
  if (this.attr('class') == 'free') {
    this.animate({
      duration: '0.1s',
      ease: '>',
      delay: '0.1s'
    }).attr({
      fill: 'green',
      stroke: 'green',
    //  r: radius * 2
    })
  }else {
    this.animate({
      duration: '0.1s',
      ease: '>',
      delay: '0.1s'
    }

    ).attr({
      fill: 'red',
      stroke: 'red',
    // r: radius * 2     
    })
  }
}

var mouseoutNode = function (ev) {
  this.animate({
    duration: '0.1s',
    ease: '>',
    delay: '0.1s'
  }).attr({
    fill: 'black',
    stroke: 'black',
  // r: radius 
  })
}

drawAction = false
var clickNodeInExternalGrid = function (ev) {
  var gridSize = 10


  // console.log('ev.target.parent():')
  // console.log(ev.target.parent())


  // console.log(ev.target)
  var thisNode = this // bylo this

  // nacisnelismy pierwszy wezel i rysujemy
  if (this.attr('class') == 'free' && drawAction == false) {
    firstObject = thisNode.parent()

    drawAction = true

    // ustaw wezel jako zajety
    this.attr('class', 'busy')

    // rozpocznij polilinie          
    polyline = SVG.get('svgArea').polyline([nodePosition(thisNode).x - nodePosition(thisNode).x % gridSize , nodePosition(thisNode).y - nodePosition(thisNode).y % gridSize]).fill('none').stroke({
      width: 1,
    // fill: 'red'
    })

    // w nazwie polilinii bedzie znajdowac sie nazwa elementu
    polyline.attr('id', firstObject.attr('id'))

    polylineId = polyline.attr('id')

 
    polyline.stylePolyline()

    // setup a variable to store our last position
    var last_position = {}
    console.log('ev.offsetX' + ev.offsetX)
    // set the new last position to the current for next time        
    last_position = {
      x: nodePosition(thisNode).x, // ev.offsetX - ev.offsetX % gridSize,
      y: nodePosition(thisNode).y // ev.offsetY - ev.offsetY % gridSize
    }

    // okresl poczatkowy punk

    line = drawOrthoLine((last_position.x - last_position.x % gridSize) , (last_position.y - last_position.y % gridSize) , nodePosition(thisNode).x , nodePosition(thisNode).y, nodePosition(thisNode).x , nodePosition(thisNode).y)

    $('#svgArea').on('mousemove', function (e) {
      line.updateEnd(last_position.x , last_position.y, e.offsetX, e.offsetY)
    })

    $('#svgArea').on('mousedown', function (e) {


      // aktualizuj polilinie
      points = polyline.attr('points')



      if (typeof (last_position.x) != 'undefined') {
        // get the change from last position to this position
        var deltaX = last_position.x - e.offsetX,
          deltaY = last_position.y - e.offsetY

        // check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
          // left              
          endX = e.offsetX - e.offsetX % gridSize
          endY = last_position.y - last_position.y % gridSize // - last_position.y % gridSize 
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
          // right              
          endX = e.offsetX - e.offsetX % gridSize
          endY = last_position.y - last_position.y % gridSize // - last_position.y % gridSize 
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
          // up              
          endX = last_position.x - last_position.x % gridSize // - last_position.x  % gridSize 
          endY = e.offsetY - e.offsetY % gridSize
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
          // down          
          endX = last_position.x - last_position.x % gridSize // - last_position.x  % gridSize 
          endY = e.offsetY - e.offsetY % gridSize
        }
      }

      // points += ' ' + e.offsetX + ',' + e.offsetY
      points += ' ' + endX + ',' + endY
      polyline.attr('points', points)

      // aktualizuj linie
      line = drawOrthoLine((last_position.x - last_position.x % gridSize)  , (last_position.y - last_position.y % gridSize), endX, endY, endX, endY)

      last_position = {
        x: endX,
        y: endY
      }
    })

    document.addEventListener('keydown', function (e) {

      // jesli jestesmy podczas rysowania
      if (drawAction == true) {


        // ESCAPE key pressed
        if (e.keyCode == 27) {
          $('#svgArea').off('mousemove')
          $('#svgArea').off('mousedown')

          // SVG.get(polylineID).remove()            

          // okresl jako usuniety zeby nie reagowal w mutationObserver
          polyline.attr('attr', 'removed')

          // usun rysowana polilinie
          polyline.remove()

          // usun linie
          lineSet = SVG.get('svgArea').select('line')
          // usun wszystkie linie
          lineSet.each(function (i, children) {
            this.remove()
          })

          // zmien klase wezla
          thisNode.attr('class', 'free')
          drawAction = false
        }
      }
    })
  }

  // nacisnelismy drugi wezel
  if (this.attr('class') == 'free' && drawAction == true) {
    secondObject = thisNode.parent()
    // do wezla dochodzi linia ustaw wezel jako zajety
    this.attr('class', 'busy')

    // w nazwie polilinii bedzie znajdowac sie nazwa elementu
    firstObjectId = polyline.attr('id')
    secondObjectId = secondObject.attr('id')
    polylineId = firstObjectId + '_' + secondObjectId
    polyline.attr('id', polylineId)


    // skoncz rysowanie
    drawAction = false

    // aktualizuj polilinie
    points = polyline.attr('points')
    points += ' ' + nodePosition(thisNode).x + ',' + nodePosition(thisNode).y
    polyline.attr('points', points)

    // utworz tło polilinii żeby łatwo sie klikalo
    var clonedPolyline = polyline.clone()

    // przypisz do tła polilinii prawy przycisk          
    clonedPolyline.contextMenu()

    clonedPolyline.attr({
      'id': polyline.attr('id'),
     // 'pointer-events': 'all',
     // 'stroke': 'yellow',
      'stroke-width': 8,
     // 'fill': 'black',
      'opacity': 0

    })

    
    clonedPolyline.click(function () {
      alert('kliknalem')
    }) 

    // wykasuj wszystkie pomocnicze linie ktore zostaly narysowane
    lineSet = SVG.get('svgArea').select('line')
    lineSet.each(function () {
      this.remove()
    })

    // przestajemy rysować polilinię
    $('#svgArea').off('mousemove')
    $('#svgArea').off('mousedown')




    // przy przenoszeniu polaczonych elementow polilinia powinna sie zmieniac
    makeDraggableConnection(firstObject, secondObject, polyline)
  }
}

var rightClick = function (ev) {
  ev.preventDefault()
  showCustomMenuExtGrid(this, ev.offsetX, ev.offsetY)
}

*/