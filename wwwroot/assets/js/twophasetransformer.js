SVG.TwoPhaseTransformer = SVG.invent({
  // Define the type of element that should be created
  create: function () {
    SVG.Nested.call(this) // call super constructor 

    temp = this.attr('id')
    this.attr({
      'id': 'twophasetransformer' + temp,
      'attr': 'unselected', // element moze by zaznaczany
      'class': 'noshift' // nie jest wcisniety shift na poczatku      
    })   

   this.svg('<path style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.97050416;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;marker:none;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" d="m 20.018331,-0.55216884 c -4.482749,0 -8.138347,3.74280394 -8.138347,8.36183934 0,4.6190325 3.655598,8.3618375 8.138347,8.3618375 4.482753,0 8.138236,-3.742805 8.138236,-8.3618375 0,-4.6190354 -3.655483,-8.36183934 -8.138236,-8.36183934 z m 0,0.9954285 c 3.984014,0 7.192092,3.29897044 7.192092,7.36641084 0,4.0674385 -3.208078,7.3664095 -7.192092,7.3664095 -3.984012,0 -7.192205,-3.298971 -7.192205,-7.3664095 0,-4.0674404 3.208193,-7.36641084 7.192205,-7.36641084 z" /><path style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.76422524;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" d="m 20.665892,23.715008 -1.305022,0.0057 0.0017,1.192536 0.0071,5.455949 0.0017,1.192547 1.30502,-0.0057 -0.0017,-1.192543 -0.0071,-5.45595 z"/><path style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.97050416;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;marker:none;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" d="m 20.018569,7.3084439 c -4.482749,0 -8.138348,3.7428071 -8.138348,8.3618381 0,4.619034 3.655599,8.361839 8.138348,8.361839 4.482753,0 8.138356,-3.742805 8.138356,-8.361839 0,-4.619031 -3.655603,-8.3618381 -8.138356,-8.3618381 z m 0,0.9954301 c 3.984018,0 7.19209,3.298969 7.19209,7.366408 0,4.067441 -3.208072,7.366411 -7.19209,7.366411 -3.984013,0 -7.192087,-3.29897 -7.192087,-7.366411 0,-4.067439 3.208074,-7.366408 7.192087,-7.366408 z" /><path style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.73709571;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" d="m 20.672782,-7.7993421 -1.30502,0.00509 0.0018,1.1561436 0.0071,5.2891657 0.0017,1.15614727 1.305019,-0.005091 -0.0017,-1.15614357 -0.0071,-5.2891696 -0.0017,-1.1561398 z"/><path style="fill:#ffffff;stroke-width:0.09675148" d="M 13.325965,10.367088 C 12.73957,8.8299012 12.736721,6.9409021 13.318265,5.3028369 13.70183,4.2225492 14.140912,3.5381474 15.025076,2.6424183 c 1.223052,-1.2390536 2.478018,-1.86747694 4.18355,-2.09491424 1.406579,-0.1875703 3.10059,0.164855 4.377252,0.91069274 0.712898,0.416472 2.105361,1.8078317 2.528342,2.5263358 1.113816,1.892014 1.349665,4.4049132 0.597739,6.3687724 L 26.609557,10.620929 25.905724,9.8824514 C 25.075686,9.011554 24.257209,8.4075693 23.353853,7.999337 20.987192,6.9298237 18.337824,7.0490254 16.042736,8.3282815 15.558331,8.5982808 14.998557,9.0440702 14.364585,9.6647154 13.453238,10.556905 13.409626,10.586397 13.325965,10.367088 Z" /><path style="fill:#ffffff;stroke-width:0.09675148" d="m 18.804757,15.018428 c -1.796143,-0.353817 -3.431769,-1.366121 -4.457505,-2.758788 -0.405663,-0.550778 -0.406282,-0.548107 0.331875,-1.432135 0.892794,-1.0692166 2.292588,-1.9312441 3.695712,-2.2758945 0.801008,-0.1967536 2.450278,-0.2024309 3.263908,-0.01123 1.543597,0.3627379 2.972903,1.2939967 3.971812,2.5878185 0.414575,0.536969 0.431029,0.581466 0.305081,0.825021 -0.07321,0.141571 -0.503925,0.63053 -0.957134,1.08653 -0.689015,0.693264 -0.974803,0.902843 -1.74444,1.279249 -0.506235,0.247584 -1.182094,0.516466 -1.501907,0.597519 -0.846353,0.214494 -2.110881,0.258818 -2.907402,0.101908 z"/><path style="fill:#ffffff;stroke-width:0.09675148" d="m 18.763586,22.875404 c -1.489767,-0.291313 -2.532879,-0.860527 -3.695501,-2.016596 -0.791207,-0.786748 -0.992112,-1.054694 -1.378557,-1.838569 -0.248804,-0.504681 -0.525753,-1.221861 -0.615441,-1.593732 -0.299099,-1.240145 -0.187182,-3.18864 0.248714,-4.330169 l 0.104399,-0.273392 0.483473,0.576677 c 1.40518,1.676067 3.877974,2.816972 6.105505,2.816972 2.237133,0 4.694258,-1.133677 6.105498,-2.816972 0.481972,-0.574882 0.483768,-0.575909 0.577755,-0.329528 0.458325,1.20146 0.57259,3.095153 0.262242,4.346021 -0.809689,3.263454 -3.759793,5.599332 -7.014097,5.553722 -0.41534,-0.0059 -0.948136,-0.04832 -1.183988,-0.09444 z"/>')
   this.circle(4).attr({
    'side': 'HV',
    'cx': 20.008873,
    'cy': -5.8,
    'stroke-width': 0.5,
    'class': 'free'
  })

  this.circle(4).attr({
    'side': 'LV',
    'cx': 20.010738,
    'cy': 30.2,
    'stroke-width': 0.5,
    'class': 'free'
  })
  

  
  this.width(20)

    //przypisanie elementowi odpowiedniej metody
    this.on('dblclick', doubleClickTwoPhaseTransformer)
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
    twophasetransformer: function () {
      return this.put(new SVG.TwoPhaseTransformer)
    }
  }
})
