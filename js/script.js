var itemLink = document.querySelectorAll('.item-menu-link');
var itemMenu = document.querySelector('.item-menu-wrapper');
var itemMenuFocus = function() {
  itemMenu.classList.add('focus');
}
var itemMenuOutFocus = function() {
  itemMenu.classList.remove('focus');
}

for(i=0; i<itemLink.length; i++) {
  itemLink[i].addEventListener('focus', itemMenuFocus);
  itemLink[i].addEventListener('blur', itemMenuOutFocus);
}

/*Modal-Feedback*/
var feedback = document.querySelector('.write-link');
var feedbackModal = document.querySelector('.feedback-modal');
var feedbackClose = document.querySelector('.feedback-modal .modal-close');
var modalForm = document.querySelector('.feedback-form');

if (feedback) {
  feedback.onclick = function(evt) {
    evt.preventDefault();
	  feedbackModal.classList.add('active');
    modalLogin.focus();
  }
  feedbackClose.onclick = function(evt) {
    evt.preventDefault();
    feedbackModal.classList.remove('active');
  }
}
if (modalForm) {
  var modalLogin = modalForm.querySelector('[name = feedback-name]');
  var modalPassword = modalForm.querySelector('[name = feedback-email]');
  var modalText = modalForm.querySelector('[name = feedback-text]');
  modalForm.addEventListener("submit", function (evt) {
    if (!modalLogin.value || !modalPassword.value || !modalText.value) {
      evt.preventDefault();
      modalForm.classList.remove("modal-error");
      modalForm.offsetWidth = modalForm.offsetWidth;
      modalForm.classList.add("modal-error");
    }
  })
}
/*Big map*/
var minMap = document.querySelector('.map-link');
var bigMap = document.querySelector('.big-map');
var bigMapClose = document.querySelector('.big-map .modal-close');

if (minMap) {
  function initMap(active) {
    if(active) {
      var uluru = {lat: 55.68702072, lng: 37.52995982};
      var map = new google.maps.Map(document.getElementById('big-map'), {
        zoom: 17,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }
    else {
      var uluru = {lat: 55.68702072, lng: 37.52995982};
      var map = new google.maps.Map(document.getElementById('small-map'), {
        zoom: 15,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }
  }
  minMap.onclick = function(evt) {
    evt.preventDefault();
    bigMap.classList.add('active');
    modalLogin.focus();
    var bigMapActive = document.querySelector('.big-map.active');
    initMap(bigMapActive);
  }
  bigMapClose.onclick = function(evt) {
    evt.preventDefault();
    bigMap.classList.remove('active');
  }
}
/*Slider*/
function sliderFunction(place, button, slide) {
  var number = place.split("-");
  for (var q=0; q < button.length; q++) {
    if(q==number[1]) {
      button[q].classList.add('active');
    }
    else {
      button[q].classList.remove('active');
    }
  }
  for (var j=0; j < slide.length; j++) {
    if(j==number[1]) {
      slide[j].classList.add('active');
    }
    else {
      slide[j].classList.remove('active');
    }
  }
}
/*Top*/
var topSliderButton = document.querySelectorAll('.slider-button');
var topSlide = document.querySelectorAll('.promo-slider');

if(topSliderButton) {
  for(var i=0; i < topSliderButton.length; i++) {
    topSliderButton[i].id = "t-" + i;
  }
  for(a=0; a < topSliderButton.length; a++) {
    topSliderButton[a].onclick = function(e) {
      var position = e.target.id;
      sliderFunction(position, topSliderButton, topSlide);
    }
  }
}
/* Bottom*/
var bottomSliderButton = document.querySelectorAll('.services-link');
var bottomSlide = document.querySelectorAll('.services-slide');
if(bottomSliderButton) {
  for(var b=0; b < bottomSliderButton.length; b++) {
    bottomSliderButton[b].id = "b-" + b
  }
  for(c=0; c < topSliderButton.length; c++) {
    bottomSliderButton[c].onclick = function(e) {
      e.preventDefault();
      var positionBottom = e.target.id;
      sliderFunction(positionBottom, bottomSliderButton, bottomSlide);
    }
  }
}
/*Переполнение*/
var table = document.querySelector('.promo-table');
var buttons = document.querySelector('.button-wrapper')
if(table) {
  var tableHeight = table.offsetHeight;
  var bottomPosition = tableHeight + 167;
  buttons.style.bottom = bottomPosition + 'px';
}

 /*Range*/
var price = document.querySelector('.price');
if(price) {
  var priceRange = document.querySelector('.price-range');
  var thumbElemLeft = document.querySelector('.min-price-button');
  var thumbElemRight = document.querySelector('.max-price-button');
  var priceFatLine = document.querySelector('.price-range-fat');
  var priceFatLineWidth = priceFatLine.offsetWidth;
  var rangeCoords = getCoords(priceRange);
  var minPrice = document.getElementById('min-price');
  var maxPrice = document.getElementById('max-price');
  maxPrice.value = "5000";

  function roundTo500(num) {
    return Math.round(num/500)*500;
  }

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  function getCoordsRight(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      right: box.right + pageXOffset
    };
  }

  function minValue(position) {
    var minPriceValue = position*45;
    minPrice.value = roundTo500(minPriceValue);
  }

  function maxValue(position) {
    var maxValue = position*45;
    maxPrice.value = roundTo500(maxValue);
  }

  function priceFatLinePosition (position) {
    priceFatLineWidth = thumbElemRight.offsetLeft-thumbElemLeft.offsetLeft;
    priceFatLine.style.left = position + 'px';
    priceFatLine.style.width = priceFatLineWidth + 'px';
  }

  /*Range-key-press*/
  thumbElemLeft.onkeypress = function(event) {
    var target = event.keyCode;
    var leftPosition = thumbElemLeft.offsetLeft;
    var rightPosition = thumbElemRight.offsetLeft;

    if(target =='37') {
      leftPosition = leftPosition - 7;
      if (leftPosition < 0) {leftPosition = 0}
    }

    if(target =='39') {
      leftPosition = leftPosition + 7;
      if (leftPosition >= (rightPosition-thumbElemLeft.offsetWidth-2)) {
        leftPosition = rightPosition-thumbElemLeft.offsetWidth-2;
      }
    }

    thumbElemLeft.style.left = leftPosition + 'px';
    minValue(leftPosition);
    priceFatLinePosition(leftPosition);
  }

  thumbElemRight.onkeypress = function(event) {
    var targetRight = event.keyCode;
    var leftPosition = thumbElemLeft.offsetLeft;
    var rightPosition = thumbElemRight.offsetLeft;

    if(targetRight =='37') {
      rightPosition = rightPosition - 7;
      if (rightPosition < (leftPosition+thumbElemRight.offsetWidth+2)) {
        rightPosition = leftPosition+thumbElemRight.offsetWidth+2
      }
    }

    if(targetRight =='39') {
      rightPosition = rightPosition + 7;
      if (rightPosition >= (priceRange.offsetWidth-thumbElemLeft.offsetWidth)) {
        rightPosition = priceRange.offsetWidth-thumbElemLeft.offsetWidth;
      }
    }

    thumbElemRight.style.left = rightPosition + 'px';
    maxValue(rightPosition);
    priceFatLinePosition();
  }

  /*Range-left*/
  thumbElemLeft.onmousedown = function(e) {
    var thumbCoords = getCoords(thumbElemLeft);
    var thumbCoordsRight = getCoords(thumbElemRight);
    var shiftX = e.pageX - thumbCoords.left;

    document.onmousemove = function(e) {
      var newLeft = e.pageX - shiftX - rangeCoords.left;
      if (newLeft < 0) {
        newLeft = 0;
      }

      var rightEdge = thumbCoordsRight.left - rangeCoords.left-thumbElemRight.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumbElemLeft.style.left = newLeft + 'px';
      var leftCorner = thumbElemLeft.offsetLeft;
      minValue (leftCorner);
      priceFatLinePosition(leftCorner);
    }

    document.onmouseup = function() {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  thumbElemLeft.ondragstart = function() {
    return false;
  };

  /*Range-right */
  thumbElemRight.onmousedown = function(e) {
    var thumbCoords = getCoordsRight(thumbElemLeft);
    var thumbCoordsRight = getCoords(thumbElemRight);
    var rangeCoordsRight = getCoordsRight(priceRange);
    var shiftX = e.pageX - thumbCoordsRight.left;
    var leftLimt = thumbCoords.right - rangeCoords.left;

    document.onmousemove = function(e) {
      var leftCord = e.pageX - shiftX - rangeCoords.left;
      if (leftCord < leftLimt) {
        leftCord = leftLimt;
      }

      var rightCord = rangeCoordsRight.right - rangeCoords.left-thumbElemRight.offsetWidth;
      if (leftCord > rightCord) {
        leftCord = rightCord;
      }

      thumbElemRight.style.left = leftCord + 'px';
      maxValue(leftCord);
      priceFatLinePosition();
    }

    document.onmouseup = function() {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  thumbElemRight.ondragstart = function() {
    return false;
  };
}

/*работа Svg библиотеки в IE*/
!function(root, factory) {
  "function" == typeof define && define.amd ?
  define([], function() {
    return root.svg4everybody = factory();
  }) :
  "object" == typeof module && module.exports ?
  module.exports = factory() : root.svg4everybody = factory();
}

(this, function() {
  function embed(parent, svg, target) {
    if (target) {
      var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
      viewBox && svg.setAttribute("viewBox", viewBox);

      for (var clone = target.cloneNode(!0); clone.childNodes.length; ) {
        fragment.appendChild(clone.firstChild);
      }
      parent.appendChild(fragment);
    }
  }

  function loadreadystatechange(xhr) {
    xhr.onreadystatechange = function() {
      if (4 === xhr.readyState) {
        var cachedDocument = xhr._cachedDocument;
        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""),
        cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}),
        xhr._embeds.splice(0).map(function(item) {
          var target = xhr._cachedTarget[item.id];
          target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
          embed(item.parent, item.svg, target);
        });
      }
    },
    xhr.onreadystatechange();
  }

  function svg4everybody(rawopts) {
    function oninterval() {
      for (var index = 0; index < uses.length; ) {
        var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
        if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)),
              svg && src) {
          if (polyfill) {
            if (!opts.validate || opts.validate(src, svg, use)) {
              parent.removeChild(use);
              var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
              if (url.length) {
                var xhr = requests[url];
                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(),
                xhr._embeds = []),
                xhr._embeds.push({
                  parent: parent,
                  svg: svg,
                  id: id
                }),
                loadreadystatechange(xhr);
              }
              else {embed(parent, svg, document.getElementById(id));}
            }
            else {++index, ++numberOfSvgUseElementsToBypass;}
          }
        }
        else {++index;}
      }
      (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
    }
    var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;

    polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;

    var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;

    polyfill && oninterval();
  }

  function getSVGAncestor(node) {
    for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
    return svg;
  }

  return svg4everybody;
});

svg4everybody();
