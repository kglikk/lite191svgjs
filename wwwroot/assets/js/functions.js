/**
 * określenie granic przenoszenia elementu w obszarze modelowania - svgArea
 * @param  {} element
 * @param  {} lx - położenie elementu w poziomie obszaru modelowania
 * @param  {} ly - położenie elementu w pionie obszaru modelowania
 */
function insideContainer(element, lx, ly) {
  var thisGroup = element.bbox()

  if (lx < 0) {
    lx = 0
  }
  if (ly < 0) {
    ly = 0
  }
  if (lx > ($('#svgArea').width() - thisGroup.width)) {
    lx = ($('#svgArea').width() - thisGroup.width)
  }
  if (ly > ($('#svgArea').height() - thisGroup.height)) {
    ly = ($('#svgArea').height() - thisGroup.height)
  }

  return {
    x: lx,
    y: ly
  }
}

/**
 * określenie granic przenoszenia kołka w obszarze modelowania - svgArea
 * @param  {} circle - przenoszone koło
 * @param  {} lx - położenie względem poziomej osi x
 * @param  {} ly - położenie względem pionowej osi y
 */
function circleInsideContainer(circle, lx, ly) {
  //  var thisGroup = element.bbox()

  if (lx < 0) {
    lx = 0
  }
  if (ly < 0) {
    ly = 0
  }
  if (lx > ($('#svgArea').width() - 2 * circle.attr('r'))) {
    lx = ($('#svgArea').width() - 2 * circle.attr('r'))
  }
  if (ly > ($('#svgArea').height() - 2 * circle.attr('r'))) {
    ly = ($('#svgArea').height() - 2 * circle.attr('r'))
  }

  return {
    x: lx,
    y: ly
  }
}

// zmiana węzła  przy najechaniu myszką
function nodeAnimate(input) {

  // powiększanie przy najechaniu myszką
  var radius = input.attr('r')
  input.mouseover(function () {
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
    } else {
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
  }).mouseout(function () {
    this.animate({
      duration: '0.1s',
      ease: '>',
      delay: '0.1s'
    }).attr({
      fill: 'black',
      stroke: 'black',
      r: radius
    })
  })
}

// ustalenie położenia węzła względem svgArea
function nodePosition(node) {
  var nestedParent = node.parent() // rodzicem jest obiekt nested

  var zz1 = node.bbox(); // zz1.cx = 10; zz1.cy = 20,

  var rotation = Math.round(nestedParent.transform('rotation'))

  // console.log('matrixSplit.dx' + matrixSplit.dx + 'matrixSplit.dy' + matrixSplit.dy + 'zz1.x' + zz1.cx + 'zz1.y' + zz1.cy)
  if (rotation == 90) {
    centerX = nestedParent.attr('x')
    centerY = nestedParent.attr('y') + zz1.cy / 2 + node.attr('r') / 2
  }
  if (rotation == -180) {
    console.log('radius: ' + node.attr('r'))
    centerX = nestedParent.attr('x') + zz1.cx + node.attr('r') / 2
    centerY = nestedParent.attr('y') // + zz1.cy//nestedParent.bbox().height/2
  }
  if (rotation == -90) {
    console.log('obrot do -90')

    centerX = nestedParent.attr('x') + zz1.cx + node.attr('r') / 2 + nestedParent.bbox().width / 2
    centerY = nestedParent.attr('y') + zz1.cy
  }
  if (rotation == 0) {
    centerX = nestedParent.attr('x') + zz1.cx // add the new change in x to the drag origin
    centerY = nestedParent.attr('y') + zz1.cy + node.attr('r') // add the new change in y to the drag origin
  }

  return {
    x: centerX,
    y: centerY
  }
}

// ustalenie położenia węzła względem svgArea
function nodePositionInGroup(node) {
  var gParent = node.parent() // rodzicem jest grupa exGrid

  var zz1 = node.bbox(); // zz1.cx = 16; zz1.cy = 30,

  var matrixSplit = gParent.transform()
  // console.log('matrixSplit.dx' + matrixSplit.dx + 'matrixSplit.dy' + matrixSplit.dy + 'zz1.x' + zz1.cx + 'zz1.y' + zz1.cy)
  if (matrixSplit.rotation == 0) {
    centerX = matrixSplit.x + zz1.cx // add the new change in x to the drag origin
    centerY = matrixSplit.y + zz1.cy // add the new change in y to the drag origin
  }
  if (matrixSplit.rotation == 90) {
    centerX = matrixSplit.x - zz1.cy
    centerY = matrixSplit.y + zz1.cx
  }
  if (matrixSplit.rotation == 180) {
    centerX = matrixSplit.x - zz1.cx
    centerY = matrixSplit.y - zz1.cy
  }
  if (matrixSplit.rotation == -90) {
    centerX = matrixSplit.x + zz1.cy
    centerY = matrixSplit.y - zz1.cx
  }

  return {
    x: centerX,
    y: centerY
  }
}

// rysowanie prostopadlej linii
function drawOrthoLine(lastPositionX, lastPositionY, startX, startY, endX, endY) {
  //   console.log('startX: ' + startX + 'startY: ' + startY + 'endX: ' + endX + 'endY: ' + endY )
  var gridSize = 10
  var start = {
    x: startX - startX % gridSize,
    y: startY - startY % gridSize
  }
  var end = {
    x: endX - endX % gridSize,
    y: endY - endY % gridSize
  }

  var getLine = function () {
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y
    }
  }

  var redraw = function () {
    lineNode.attr(getLine())
  }
  var paper = SVG.get('svgArea')
  // var lineNode = paper.line([getLine().x1, getLine().y1], [getLine().x2, getLine().y2])
  var lineNode = paper.line([
    [getLine().x1, getLine().y1],
    [getLine().x2, getLine().y2]
  ]).attr({
    stroke: 'blue'
  }).back() // dzieki funkcji back lepiej sie klika w wezel

  return {
    updateStart: function (x, y) {
      start.x = x
      start.y = y
      redraw()
      return this
    },
    updateEnd: function (lastX, lastY, x, y) {
      if (typeof (lastX) != 'undefined') {
        // get the change from last position to this position
        var deltaX = lastX - x,
          deltaY = lastY - y

        // check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
          // left
          console.log('lewo')

          end.x = x - x % gridSize
          end.y = lastY - lastY % gridSize // - lastY % gridSize
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
          // right
          console.log('prawo')

          end.x = x - x % gridSize
          end.y = lastY - lastY % gridSize // - lastY % gridSize
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
          // up
          console.log('gora')
          end.x = lastX - lastX % gridSize // - lastX % gridSize
          end.y = y - y % gridSize
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
          // down
          console.log('dol')

          end.x = lastX - lastX % gridSize // - lastX % gridSize
          end.y = y - y % gridSize
        }
      }

      redraw()
      return this
    },

    returnLine: function () {
      return lineNode
    }

  }
}



// rysowanie linii
function drawLine(startX, startY, endX, endY) {
  var start = {
    x: startX,
    y: startY
  }
  var end = {
    x: endX,
    y: endY
  }
  var getLine = function () {
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y

    }
  }

  var redraw = function () {
    lineNode.attr(getLine())
  }
  var paper = SVG.get('svgArea')
  // var lineNode = paper.line([getLine().x1, getLine().y1], [getLine().x2, getLine().y2])

  var lineNode = paper.line([
    [getLine().x1, getLine().y1],
    [getLine().x2, getLine().y2]
  ]).attr({
    stroke: 'red'
  }).back() // dzieki funkcji back lepiej sie klika w wezel

  return {
    updateStart: function (x, y) {
      start.x = x
      start.y = y
      redraw()
      return this
    },
    updateEnd: function (x, y) {
      end.x = x
      end.y = y
      redraw()
      return this
    },

    returnLine: function () {
      return lineNode
    }

  }
}


// obserwuj zmiane elementu selected <-> unselected
function mutationObserver(object) {

  // Options for the observer (which mutations to observe)
  var config = {
    attributes: true
  }

  // Callback function to execute when mutations are observed    
  var callback = function (mutationsList) {
    for (var mutation of mutationsList) {

      if (mutation.attributeName == 'attr') {
        var draggableNested = SVG.get('draggableNested')

        // jesli po zmianie attr obiekt jest wybrany...
        if (object.attr('attr') == 'selected') {

          /* ODZNACZYŁEM ŻEBY MI ZNIEKIŁA POLILINIA - NIE WIEM DLACZEGO
          //...oraz jesli grupa przenoszonych elementow miała co najmniej jeden element
          if (draggableNested.children().length >= 1) {
            draggableNested.each(function () {

              // jesli to nie jest zmieniony element
              if (this.attr('id') != object.attr('id')) {

                // przesun ten element aby dostosowal sie do nowych wspolrzednych  
                this.dmove(draggableNested.attr('x'), draggableNested.attr('y'))
              }
            })
          } */

          draggableNested.attr('x', 0)
          draggableNested.attr('y', 0)


          //dodaj mozliwosc usuwania elementow 
          object.on('contextmenu', function (e) {
            // e.preventDefault()
            $('.custom-menu-draggablenested').hide();
            $('.custom-menu-draggablenested').show();
            $('.custom-menu-draggablenested').css({
              left: e.offsetX, //SVG.get(object).attr('x') + object.bbox().width - $('.draggableDIV').parent().width(),    
              top: e.offsetY //SVG.get(object).attr('y') - $('.draggableDIV').parent().height(),
            })
          })

          // dodaj element do grupowego przenoszenia
          draggableNested.add(object)

          // pozbaw dany element pierwotnego przenoszenia
          object.draggable(false)

          draggableNested.draggable(false)

          // przenos dany element w okreslonym obszarze
          /*
          draggableNested.draggable({
            minX: -draggableNested.bbox().x,
            minY: -draggableNested.bbox().y,
            maxX: $('#svgArea').width() - draggableNested.bbox().x, //- draggableNested.bbox().width
            maxY: $('#svgArea').height() - draggableNested.bbox().y //- draggableNested.bbox().height
            , snapToGrid: 50 
          }) */

          var gridSize = 10
          //specyficzne działanie jeśli jest zaznaczony externalgrid oraz polilinia, która jest połączona z busbar
          //localName określa typ obiektu (svg czy polyline)
          if(draggableNested.node.childElementCount == 3 && draggableNested.node.childNodes[0].localName == 'svg' &&  draggableNested.node.childNodes[1].localName == 'polyline'){ // &&draggableNested.node.childNodes[0].includes(this.type == 'svg') ){
                       
            //przesuwaj węzeł który znajduje się na polilinii
            poliliniaPolaczonaId = SVG.get(draggableNested.node.childNodes[1].id)
            circlePoliliniiId = poliliniaPolaczonaId.attr('nodeId')
            circlePolilinii = SVG.get(circlePoliliniiId)
            console.log(circlePolilinii)
            busbar = SVG.get(circlePolilinii.node.parentNode.id)
          // draggableNested.add(SVG.get(circleIdPolilinii))
          console.log(busbar)

          wartoscPoczatkowaCircleX =  circlePolilinii.attr('cx')
          lewyKraniecBusbarX = busbar.node.attributes.x.value
          lewyKraniecPrzenoszeniaX = -(wartoscPoczatkowaCircleX - lewyKraniecBusbarX)

          //określ szerokość busbar z obiektu path, który jest dzieckiem busbar
          //console.log(busbar.first())

          busbarPath = busbar.first()
          
          prawyKraniecPrzenoszeniaX = (busbarPath.width() + parseInt(lewyKraniecBusbarX)) - wartoscPoczatkowaCircleX 
          console.log('busbarPath.width(): ' + busbarPath.width())
          console.log('parseInt(lewyKraniecBusbarX): '+ parseInt(lewyKraniecBusbarX))
          console.log('wartoscPoczatkowaCircleX: '+ wartoscPoczatkowaCircleX)

          console.log(prawyKraniecPrzenoszeniaX)
           // granicaBusbarPrawa =  
            //przesuwanie tylko w osi x, wzdłuż polilinii
            draggableNested.draggable(function (x, y) {
              
              //x = początkowe_położenie - przesunięcie_w_osi_x
              //początkowe położenie = 0 px
              //przesunięcie_w_osi_x jest dodatnie przy przesuwaniu w prawo oraz ujemne w lewo
              
              if( x > 0 ) 
              {
                ustawioneCx =  (x + busbar.attr('x') + wartoscPoczatkowaCircleX + circlePolilinii.transform('e')) - (x + busbar.attr('x') + wartoscPoczatkowaCircleX + circlePolilinii.transform('e')) % gridSize
                circlePolilinii.attr('cx', ustawioneCx) 
              }
           
              if(x <= 0 )//&&  x > lewyKraniecPrzenoszeniaX)
              {                
                ustawioneCx =  (x + busbar.attr('x') + wartoscPoczatkowaCircleX + circlePolilinii.transform('e')) + 10 - (x + busbar.attr('x') + wartoscPoczatkowaCircleX + circlePolilinii.transform('e')) % gridSize
                circlePolilinii.attr('cx', ustawioneCx)
              }
              if(x <= lewyKraniecPrzenoszeniaX )
              {                
                x = lewyKraniecPrzenoszeniaX
                circlePolilinii.attr('cx', lewyKraniecPrzenoszeniaX)
              }

              if(x >= prawyKraniecPrzenoszeniaX )
              {                
                
                x = prawyKraniecPrzenoszeniaX - prawyKraniecPrzenoszeniaX % gridSize 
        
                
                
                console.log(x)
                circlePolilinii.attr('cx', prawyKraniecPrzenoszeniaX - prawyKraniecPrzenoszeniaX % gridSize  + wartoscPoczatkowaCircleX)
              }

        
              
           
          
              return {
                x: nestedInsideContainer(this, x, y).x - x % gridSize
                //y: y
              }
            })

          } 
          else{           
            //ogólne działanie
            draggableNested.draggable(function (x, y) {
              return {
                x: nestedInsideContainer(this, x, y).x - x % gridSize,
                y: nestedInsideContainer(this, x, y).y - y % gridSize
              }
            })

          }

          

          // przy przenoszeniu aktualizuj polilinie 
          updatePolylinePoints(draggableNested)


        }

        // //jesli po zmianie attr obiekt jest niewybrany
        if (object.attr('attr') == 'unselected') {

          // usun z grupowego przenoszenia poprzez dodanie elementu do svgArea
          SVG.get('svgArea').add(object)
          // draggableNested.remove(object)

          // dany element musi miec wylaczone wlasne przenoszenie
          object.draggable(false)

          //przypisz ponownie działanie przy nacisnieciu prawego przycisku
          if (object.type == 'svg') {
            object.off('contextmenu')
            object.on('contextmenu', rightClick)
            // object.contextMenu()
          }
          if (object.type == 'polyline') {
            object.off('contextmenu')
            object.contextMenu()
          }

          // polilinia nie moze byc przenoszona przy zmianie danego obiektu
          if (object.type == 'polyline') {
            points.length = 0

            // aktualizuj polilinie
            points = object.attr('points')

            // utworz macierz z punktow
            pointArray = points.split(' ')

            var array = []
            array.length = 0
            var punkt = {}
            punkt.length = 0

            for (i = 0; i < pointArray.length; i++) {
              punkt = pointArray[i].split(',')
              array[i] = punkt
            }


            for (p = 0; p < array.length; p++) {
              // przesun dany punkt
              // x              
              array[p][0] = parseInt(array[p][0]) + parseInt(draggableNested.attr('x'))
              // y
              array[p][1] = parseInt(array[p][1]) + parseInt(draggableNested.attr('y'))
            }
            object.plot(array)

            // object.dmove(draggableNested.attr('x'), draggableNested.attr('y'))
            // object.translate(draggableNested.attr('x'), draggableNested.attr('y'))
          }

          if (object.type == 'svg') {
            // przenos pojedynczy element wewnatrz okreslonego obszaru
            object.dmove(draggableNested.attr('x'), draggableNested.attr('y'))
            var gridSize = 10
            object.draggable(function (x, y) {
              return {
                x: insideContainer(this, x, y).x - x % gridSize,
                y: insideContainer(this, x, y).y - y % gridSize
              }
            })

            // object.dragInsideContainer()
          }
        }
      }
    }
  }
  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback)

  // Start observing the target node for configured mutations
  observer.observe(document.getElementById(object.attr('id')), config)

  /*
  //obserwuj polilinie takze
  var polylines = SVG.get('svgArea').select('polyline')
  polylines.each(function () {
    observer.observe(document.getElementById(this.attr('id')), config)
  })
  */

}

// aktualizuj krancowe wspolrzedne polilinii polaczone z obiektami przy przenoszeniu grupy
function updatePolylinePoints(draggableNested) {

  // kolumna odpowiada obiektom a druga kolumna zmienianemu punktowi polilinii
  var arrayObject = [],
    arrayPolyline = [],
    arrayString = []

  // przy rozpoczeciu przenoszenia okresl jakie elementy sa w grupie przenoszonych
  draggableNested.on('dragstart', function (e) {
    arrayObject.length = 0
    arrayPolyline.length = 0
    arrayString.length = 0

    // wszyskie elementy w draggableNested
    var childrenSet = SVG.get('draggableNested').select('svg')

    // określ aktualizowany kraniec polilinii
    var polylineSet = SVG.get('svgArea').select('polyline')

    // dla kazdego elementu w draggableNested
    childrenSet.each(function () {
      var object = this

      // sprawdz czy jakas polilinia laczy sie z danym elementem
      polylineSet.each(function () {

        // jesli polilinia jest polaczona z danym elementem i nie jest zaznaczona
        if (this.attr('id').includes(object.attr('id')) == true && this.attr('attr') != 'selected') {
          // zmieniaj wspolrzedne polilinii
          var polyline = this

          // wpisz do macierzy gdzie kolumna odpowiada obiektow a druga kolumna zmienianemu punktowi polilinii
          // sprawdz ktore wspolrzedne zmieniac
          if (polyline.attr('id').endsWith(object.attr('id'))) {
            // second object

            arrayObject.push(object)
            arrayPolyline.push(polyline)
            arrayString.push('second')
          } else {
            // first object
            arrayObject.push(object)
            arrayPolyline.push(polyline)
            arrayString.push('first')
          }
        }
      })
    })
  })

  draggableNested.on('dragmove', function (e) {
    var rotationCorrectionX = 0,
      rotationCorrectionY = 0,
      nodeX = 0,
      nodeY = 0,
      nodeR = 0

    // aktualizuj dane polilinii kazdego elementu w macierzy
    for (var i = 0; i < arrayObject.length; i++) {

      // wez aktualne koordynaty polilinii
      var points = arrayPolyline[i].attr('points')

      // utworz macierz z punktow
      var pointArray = points.split(' ')

      var polylineArray = []
      var punkt = {}

      for (var z = 0; z < pointArray.length; z++) {
        punkt = pointArray[z].split(',')
        polylineArray[z] = punkt
      }

      // okresl pozycje wezla wewnatrz grupy
      arrayObject[i].each(function () {
        if (this.type == 'circle') {
          nodeX = this.attr('cx')
          nodeY = this.attr('cy')
          nodeR = this.attr('r')
        }
      })

      if (Math.round(arrayObject[i].transform('rotation')) == 90) {
        rotationCorrectionX = nodeR - arrayObject[i].bbox().width / 2
        rotationCorrectionY = -arrayObject[i].bbox().height / 2
      }
      if (Math.round(arrayObject[i].transform('rotation')) == -180) {
        rotationCorrectionX = 0
        rotationCorrectionY = -arrayObject[i].bbox().height + nodeR
      }
      if (Math.round(arrayObject[i].transform('rotation')) == -90) {
        rotationCorrectionX = arrayObject[i].bbox().width / 2 - nodeR
        rotationCorrectionY = arrayObject[i].nodeR / 2 - arrayObject[i].bbox().height / 2
      }
      if (Math.round(arrayObject[i].transform('rotation')) == 0) {
        rotationCorrectionX = 0
        rotationCorrectionY = 0
      }

      if (arrayString[i] == 'first') {
        // zmien wspolrzedna x z pierwszego punktu polilinii
        // dla grupy: array[0][0] = matrix.extract().x + nodeX
        polylineArray[0][0] = arrayObject[i].attr('x') + nodeX + rotationCorrectionX + draggableNested.attr('x') // + this.nodeX + 

        // zmien wspolrzedna y z pierwszego punktu polilinii
        // dla grupy: array[0][0] = matrix.extract().y + nodeY
        polylineArray[0][1] = arrayObject[i].attr('y') + nodeY + rotationCorrectionY + draggableNested.attr('y') // + this.nodeY 
      } else {
        // zmien wspolrzedna x z pierwszego punktu polilinii
        // dla grupy: array[0][0] = matrix.extract().x + nodeX
        polylineArray[polylineArray.length - 1][0] = arrayObject[i].attr('x') + nodeX + rotationCorrectionX + draggableNested.attr('x') // + this.nodeX + 

        // zmien wspolrzedna y z pierwszego punktu polilinii
        // dla grupy: array[0][0] = matrix.extract().y + nodeY
        polylineArray[polylineArray.length - 1][1] = arrayObject[i].attr('y') + nodeY + rotationCorrectionY + draggableNested.attr('y') // + this.nodeY + 
      }

      // aktualizuj polilinie
      arrayPolyline[i].plot(polylineArray)
    }
  })
}

// przenoszenie obiektu nested w obszarze modelowania
function nestedInsideContainer(element, lx, ly) {
  var thisNested = element.bbox()

  if (lx < -thisNested.x) {
    lx = -thisNested.x
  }
  if (ly < -thisNested.y) {
    ly = -thisNested.y
  }
  if (lx > ($('#svgArea').width() - thisNested.width - thisNested.x)) {
    lx = $('#svgArea').width() - thisNested.width - thisNested.x
  }
  if (ly > ($('#svgArea').height() - thisNested.height - thisNested.y)) {
    ly = $('#svgArea').height() - thisNested.height - thisNested.y
  }

  return {
    x: lx,
    y: ly
  }
}


//przenoś kółko w obszarze modelowania 
function dragCircleInsideContainer(circle) {
  var gridSize = 10
  circle.draggable(function (x, y) {
    return {
      x: circleInsideContainer(this, x, y).x - x % gridSize - this.attr('r'),
      y: circleInsideContainer(this, x, y).y - y % gridSize - this.attr('r')
    }
  })
}

//usun wezly do przenoszenia polilinii
function removePolylineDragCircles() {

  SVG.get('svgArea').select('circle').each(function () {
    if (this.attr('class') == 'draggable') {
      this.remove()
    }
  })
}


//****** Z EXTERNAL GRID ***** */
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
  } else {
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

// wraz z przenoszeniem elementu przenos polilinie
function makeDraggableConnection(firstObject, secondObject, polyline, polylineBackground) {

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

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
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

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
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

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
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

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })
}

// utworz JSONA do wyswietlania w konsoli. Zapobieganie bledowi 'Converting circular structure to JSON at JSON.stringify (<anonymous>)'
function simpleStringify(object) {
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

function showCustomMenuExtGrid(object, offsetX, offsetY) {

  //schowaj poprzednio używane menu
  $('.custom-menu').hide()

  //jesli element jest w grupie przenoszonych 
  if (object.parent().attr('id') == 'draggableNested') {

    // nic nie rob

  } else {
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

drawAction = false
var clickNodeInExternalGrid = function (ev) {
  var gridSize = 10

  thisNode = this


  // nacisnelismy pierwszy wezel i rysujemy
  if (this.attr('class') == 'free' && drawAction == false) {

    firstObject = this.parent()

    //ustawienie parametru aby konczyć przy drugim nacisnieciu
    drawAction = true

    // ustaw wezel jako zajety
    this.attr('class', 'busy')

    // rozpocznij polilinie          
    polyline = SVG.get('svgArea').polyline([nodePosition(this).x - nodePosition(this).x % gridSize, nodePosition(this).y - nodePosition(this).y % gridSize]).fill('none').stroke({
      width: 1,
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
      x: nodePosition(this).x, // ev.offsetX - ev.offsetX % gridSize,
      y: nodePosition(this).y // ev.offsetY - ev.offsetY % gridSize
    }

    // okresl poczatkowy punkt
    line = drawOrthoLine((last_position.x - last_position.x % gridSize), (last_position.y - last_position.y % gridSize), nodePosition(this).x, nodePosition(this).y, nodePosition(this).x, nodePosition(this).y)

    $('#svgArea').on('mousemove', function (e) {
      line.updateEnd(last_position.x, last_position.y, e.offsetX, e.offsetY)
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
      line = drawOrthoLine((last_position.x - last_position.x % gridSize), (last_position.y - last_position.y % gridSize), endX, endY, endX, endY)

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
          thisNode.attr('class', 'free') //było thisNode
          drawAction = false
        }
      }
    })
  }

  // nacisnelismy drugi raz - na węzeł
  if (this.attr('class') == 'free' && drawAction == true) {
    console.log('nacisnelismy drugi wezel')
    secondObject = this.parent()
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
    points += ' ' + nodePosition(this).x + ',' + nodePosition(this).y
    polyline.attr('points', points)

    // utworz tło polilinii żeby łatwo sie klikalo
    var polylineBackground = polyline.clone()

    polyline.attr({
      //'pointer-events': 'none'
    })



    polylineBackground.attr({
      'id': polyline.attr('id') + '_background',
      'data': 'background',
      'background': 'background',
      // 'pointer-events': 'all', 
      // 'stroke': 'yellow',
      'stroke-width': 8,
      // 'fill': 'red',
      'opacity': 0
      //'visibility': 'hidden'
    })


    // przypisz do tła polilinii prawy przycisk          
    polylineBackground.contextMenu()

    //polylineBackground.off('click')
    polylineBackground.on('click', clickPolylineBackground)


    /*
    polylineBackground.click(function () {
      alert('kliknalem')
      
      //okresl polilinie zgodnie z id 
      SVG.get(polyline.attr('id')).stylePolyline()
       
    }) */


    // wykasuj wszystkie pomocnicze linie ktore zostaly narysowane
    lineSet = SVG.get('svgArea').select('line')
    lineSet.each(function () {
      this.remove()
    })

    // przestajemy rysować polilinię
    $('#svgArea').off('mousemove')
    $('#svgArea').off('mousedown')

    mutationObserver(polyline)
    mutationObserver(polylineBackground)

    // przy przenoszeniu polaczonych elementow polilinia powinna sie zmieniac
    makeDraggableConnection(firstObject, secondObject, polyline, polylineBackground)
  }


}

var rightClick = function (ev) {
  ev.preventDefault()
  showCustomMenuExtGrid(this, ev.offsetX, ev.offsetY)
}

//kliknięcie tła polilinii
var clickPolylineBackground = function (ev) {
  ev.preventDefault()

  removePolylineDragCircles()

  //jesli linia jest odznaczona wtedy mozesz umiescic punkty
  if (this.attr('attr') == 'unselected') {
    //przy kliknięciu w tło polilinii umieszczaj kółka do zmieniania polilinii  
    var pointArray
    var polylineBackgroundId = this.attr('id')
    var regex = /\d+_\d+/g //wychwytuj Id o budowie liczba_liczba
    var polylineId = polylineBackgroundId.match(regex)

    polylineBackground = this
    polyline = SVG.get(polylineId)

    points = this.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    var paper = SVG.get('svgArea')
    var kolkoSet = paper.set()

    var kolko
    // umiesc kolka w punktach polilinii oprocz  pierwszego i ostatniego punktu
    for (z = 1; z < (array.length - 1); z++) {
      // kolko = 
      console.log('x: ' + array[z][0] + 'y: ' + array[z][1])
      kolko = paper.circle().attr({
        class: 'draggable',
        data: z,
        r: 2,
        cx: array[z][0],
        cy: array[z][1],
        fill: 'black',
        stroke: 'black',
        'stroke-width': 1
      })

      // przenos element wewnatrz obszaru
      dragCircleInsideContainer(kolko)

      kolkoSet.add(kolko)
    }

    // przy zmianie polozenia kolka zmieniaj polilinie oraz jej tło

    kolkoSet.each(function () {
      //if (this.attr('class') == 'draggable') {
      //okresl najpierw ktory punkt polilinii powinien byc zmieniany

      this.on('dragstart', function (e) {

        //okresl poczatkowe punkty polilinii
        polyline = SVG.get(polyline.attr('id'))
        points = polyline.attr('points')

        pointArray = points.split(' ')
        for (i = 0; i < pointArray.length; i++) {
          punkt = pointArray[i].split(',')
          array[i] = punkt
        }
        //polyline.plot(array)
      })

      this.on('dragmove', function (e) {

        array[this.attr('data')][0] = this.attr('cx')
        array[this.attr('data')][1] = this.attr('cy')

        //aktualizuj przesuwany punkt
        polyline.plot(array)
        polylineBackground.plot(array)
      })
    })
  }
}

// funkcja okreslajaca prawy przycisk
var contextMenuExternalGrid = function (ev) {
  //ev.preventDefault()
  console.log('jestem w contextMenuExternalGrid ')
  showCustomMenuExtGrid(this, ev.offsetX, ev.offsetY)

}

//****** KONIEC - Z EXTERNAL GRID ***** */

var clickBusbar = function (ev) {
  var gridSize = 10  

  //rodzic w postaci svg
  busbarParentId = this.attr('id')
  busbarParent = SVG.get(busbarParentId)
  busbarPaths = SVG.get(busbarParentId).select('path')

  busbarPaths.each(function () {
    if (this.attr('data') != 'background') {
      pathId = this.attr('id')
    }
    if (this.attr('data') == 'background') {
      pathBackgroundId = this.attr('id')
    }
  })

  busbarPath = SVG.get(pathId)
  busbarPathBackground = SVG.get(pathBackgroundId)

  busbarPathArray = busbarPath.array()

  //nacisnelismy szynę, ale nie rysowaliśmy
  if (drawAction == false) {

    
    //zmieniamy kolor szyny
    $('#' + pathId).css({
      stroke: 'green'
    })

    busbarElements = this.children()
  
    //jeśli busbar nie ma żadnego prostokąta to dodaj prostokąt
    jestRect = false
    circleCx = 0
    
    
    //sprawdź czy busbar zawiera jakiś prostokąt i kółko
    busbarElements.forEach(element => {
      if (element.type == 'rect') {
        
        jestRect = true
      }
      if (element.type == 'circle') {

        //położenie kółka na osi x
        circleCx =  element.attr('cx') - this.attr('x') 
        
      }
    });

    //jeśli nie ma prostokąta   
    if (!jestRect) {

      //określ położenie w osi x prostokąta na busbarze
      //borderXforRect = this.attr('x') - circleCx  
    
      //ustaw dwa prostokąty na krańcach linii
      rightRect = this.rect(4, 4).fill('green').move(busbarPathArray.value[1][1], 18)
      //leftRect = this.rect(4, 4).fill('green').move(busbarPathArray.value[0][1], 18)
     
      rightRect.attr('id', 'rightBusbarRect')
      //leftRect.attr('id', 'leftBusbarRect')
      //ustaw prostokąt przed busbarpath
      rightRect.before(busbarPath)
      //leftRect.after(busbarPath)

      //przesuń do przodu
      rightRect.front()
      //leftRect.front() 

      //prostokąty będą mogły być przenoszone (ruch jedynie w osi x)
      rightRect.draggable(function (x, y) {

        //busbar nie przejdzie przez kółko
        if(x < circleCx) {
           x = circleCx          
        }
           
        return {
          x: x - x % gridSize, //insideContainer(this, x, y).x, - x % gridSize,
          y: 18// insideContainer(this, x, y).y // - y % gridSize
        }
      })

      /*
      leftRect.draggable(function (x, y) {
        return {
          x: x,//insideContainer(this, x, y).x - x % gridSize,
          y: 18//insideContainer(this, x, y).y - y % gridSize
        }
      })*/

      //dodaj mozliwosc usuwania elementow 
      rightRect.on('dragmove', function (e) {

        //array pokazuje to co jest w 'd' ["M", 0, 20] ["L", 22, 20]
        busbarPathArray = busbarPath.array()
        
        // busbarPathArray.value[1][1] jest to wartość x prawej krawędzi polilinii
        busbarPathArray.value[1][1] = e.detail.event.offsetX - busbarParent.attr('x')
        busbarPathArray.value[1][1] = busbarPathArray.value[1][1] - busbarPathArray.value[1][1] % gridSize
        if(busbarPathArray.value[1][1] < circleCx) {
          console.log('circleCx: '+circleCx)
          busbarPathArray.value[1][1] = circleCx          
        }

        //aktualizuj polilinie
        busbarPath.plot(busbarPathArray)

        //aktualizuj także tło
        busbarPathBackground.plot(busbarPathArray)
      })
    }
  }

  //przy rysowaniu linii nacisnelismy drugi raz - na szynę
  if (drawAction == true) {

    busbar = this

    //utworz wezel aby był wycentrowany w szynie
    var node = SVG.get('svgArea').circle(6).attr({
      // 'stroke-width': 0.5,
      'class': 'free'
    }).center(ev.offsetX, busbar.attr('y') + busbarPathArray.value[0][2]) //busbarPathArray.value[0][2] to jest wspolrzedna y
      

    nodeCx = node.attr('cx')
    nodeCy = node.attr('cy')   
    node.attr('cx', nodeCx - nodeCx % gridSize)
   
    //Moves an element to a different parent (similar to addTo), but without changing its visual representation. All transformations are merged and applied to the element.
    node.toParent(this)

    // w nazwie polilinii bedzie znajdowac sie nazwa elementu
    firstObjectId = polyline.attr('id')
    busbarId = busbar.attr('id')
    polylineId = firstObjectId + '_' + busbarId
    polyline.attr('id', polylineId)

    //przypisz do polilinii numer węzła aby mógł być usunięty przy usunięciu linii
    polyline.attr('nodeId', node.attr('id'))


    // skoncz rysowanie
    drawAction = false

    // aktualizuj polilinie
    points = polyline.attr('points')

    //points += ' ' + nodePosition(node).x + ',' + nodePosition(node).y
      // points += ' ' + ev.offsetX + ',' + ev.offsetY

      //zmiana formuły aby polilinia kończyła się tam gdzie węzeł na osi Y
      offsetY = busbar.attr('y') + busbarPathArray.value[0][2]
      points += ' ' + node.attr('cx') + ',' + offsetY


    polyline.attr('points', points)

    // utworz tło polilinii żeby łatwo sie klikalo
    var polylineBackground = polyline.clone()

    polylineBackground.attr({
      'id': polyline.attr('id') + '_background',
      'data': 'background',
      'background': 'background',
      'stroke-width': 8,
      'opacity': 0
    })


    // przypisz do tła polilinii prawy przycisk          
    polylineBackground.contextMenu()

    //polylineBackground.off('click')
    polylineBackground.on('click', clickPolylineBackground)


    // wykasuj wszystkie pomocnicze linie ktore zostaly narysowane
    lineSet = SVG.get('svgArea').select('line')
    lineSet.each(function () {
      this.remove()
    })

    // przestajemy rysować polilinię
    $('#svgArea').off('mousemove')
    $('#svgArea').off('mousedown')

    mutationObserver(polyline)
    mutationObserver(polylineBackground)

    //określ początkowe miejsce zaczepienia polilinii
    busbarNodeX = node.attr('cx') - busbar.attr('x')
    busbarNodeY = node.attr('cy') - busbar.attr('y')

    console.log('busbarNodeX' + busbarNodeX)
    console.log('busbarNodeY' + busbarNodeY)

    // przy przenoszeniu polaczonych elementow polilinia powinna sie zmieniac
    makeDraggableConnectionWithBusbar(firstObject, busbar, busbarNodeX, busbarNodeY, polyline, polylineBackground)
  }
}

// wraz z przenoszeniem elementu przenos polilinie
function makeDraggableConnectionWithBusbar(firstObject, busbar, busbarNodeX, busbarNodeY, polyline, polylineBackground) {
  var gridSize = 10
  console.info('makeDraggableConnectionWithBusbar')
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

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })

  // w przypadku rotacji zmieniaj polozenie polilinii
  busbar.on('rotated', function () {
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

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
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

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })

  // przenos drugi element z polilinia
  busbar.on('dragmove', function (e) {

    var gridSize = 10

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

    //ustal pozycję węzła bazując na ostatnim punkcie polilinii
    /*
    nodePosX = array[array.length - 1][0] 
    nodePosY = array[array.length - 1][1] 
    console.log('nodePosX' + nodePosX )
    console.log('movementX' + (event.detail.event.movementX % gridSize))
    */

    //console.log(e.detail.p.x)

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {


        /*
        console.log('bbox')
        console.log(this.bbox())

        console.log('rbox')
        console.log(this.rbox()) */
        nodeX = -this.transform('x') //this.attr('cx')
        nodeY = -this.transform('y')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }
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

    // zmien wspolrzedna x z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX
    //array[array.length - 1][0] =  Number(array[array.length - 1][0]) + (event.detail.event.movementX % gridSize)  // Number(nodePosX) this.attr('x')// + nodeX + rotationCorrectionX
    //array[array.length - 1][0] = this.attr('x')
    // zmien wspolrzedna y z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX

    /*
    console.log('attrX' + this.attr('x'))
    console.log('numberX'  + Number(array[array.length - 1][0]))*/


    array[array.length - 1][0] = this.attr('x') + busbarNodeX
    array[array.length - 1][1] = this.attr('y') + busbarNodeY

    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })
}


function showCustomMenuBusbar(object, offsetX, offsetY) {

  $('.custom-menu-busbar').hide();
  $('.custom-menu-busbar').show();

  //ustawiam abym wiedzial ktory element mam wykorzystywac w funkcjach rotate, delete itd.
  $('.custom-menu-busbar').attr('data', object);

  $('.custom-menu-busbar').css({
    left: offsetX, //SVG.get(object).attr('x') + object.bbox().width - $('.draggableDIV').parent().width(),    
    top: offsetY //SVG.get(object).attr('y') - $('.draggableDIV').parent().height(),
  })

}