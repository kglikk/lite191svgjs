SVG.extend(SVG.Polyline, {

  // funkcja okreslajaca prawy przycisk
  contextMenu: function () {
    this.on('contextmenu', function (event) {
      event.preventDefault()
      showCustomMenuPolyline(this, event.offsetX, event.offsetY)
    })
  },
  stylePolyline: function () {
    this.attr('attr', 'unselected') // element moze by zaznaczany
    this.attr('class', 'noshift') // nie jest wcisniety shift na poczatku
    this.style('cursor:pointer; pointer-events=none')
 
   // mutationObserver(this) //obserwuj zmiany selected <-> unselected
   // polylineAnimate(this)  
  }
})

function showCustomMenuPolyline(object, offsetX, offsetY) {

  $('.custom-menu-polyline').hide();
  $('.custom-menu-polyline').show();

  //ustawiam abym wiedzial ktory element mam wykorzystywac w funkcjach rotate, delete itd.
  $('.custom-menu-polyline').attr('data', object);

  $('.custom-menu-polyline').css({
    left: offsetX, //SVG.get(object).attr('x') + object.bbox().width - $('.draggableDIV').parent().width(),    
    top: offsetY //SVG.get(object).attr('y') - $('.draggableDIV').parent().height(),
  })

}