AFRAME.registerComponent('planet-selector', {
  init: function () {
    var el = this.el;

    el.addEventListener('click', function (event) {
      event.stopPropagation();
      setTimeout(function() {

        var clickedElementId = el.getAttribute('id');
        if (clickedElementId === 'Sun') {
          return;
        }
        hideElementExcept(clickedElementId);
      }, 500); ///////
    });

    function hideElementExcept(elementId) {
      var elements = el.sceneEl.querySelectorAll('.clickable');
      elements.forEach(function (element) {
        if (element.id !== elementId && element.id !== 'spaceship') {
          element.setAttribute('visible', false);
        }
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var planets = document.querySelectorAll('.clickable');
  planets.forEach(function (planet) {
    planet.setAttribute('planet-selector', '');
  });
});


/////////////////////////////////////////////////////////
//SCALE

document.addEventListener('DOMContentLoaded', function () {
  // Get all planet entities
  var planets = document.querySelectorAll('.clickable');

  planets.forEach(function (planet) {
      planet.addEventListener('click', function () {
          // Check if the clicked planet is the Sun
          if (planet.id === 'Sun') {
             //nothing happens
          } else {
              scalePlanet(planet, 5, 3);
          }
      });
  });

  // Function to scale a planet gradually
  function scalePlanet(planet, scaleFactor, duration) {
      var startScale = planet.object3D.scale.clone(); 
      var targetScale = startScale.clone().multiplyScalar(scaleFactor); 

      var startTime = null;

      function animateScale(time) {
          if (!startTime) startTime = time;
          var progress = (time - startTime) / (duration * 1000); 

          if (progress < 1) {
              var currentScale = startScale.clone().lerp(targetScale, progress);
              planet.object3D.scale.copy(currentScale);

              requestAnimationFrame(animateScale);
          } else {
              
              planet.object3D.scale.copy(targetScale);
          }
      }

      requestAnimationFrame(animateScale);
  }
});

//////////////////////////////////////////////////////////
// Function to reset the scene to its initial state
function resetScene() {

  var planets = document.querySelectorAll('.clickable');
  planets.forEach(function (planet) {
    planet.setAttribute('visible', true);

    if (planet.id === 'Sun') {
      planet.object3D.scale.set(0.2, 0.2, 0.2); // Reset scale for the Sun
    } else {
      planet.object3D.scale.set(0.015, 0.015, 0.015); // Reset scale for other planets
    }
  });
  var textEntities = document.querySelectorAll('[id^="textEntity"]');
  textEntities.forEach(function (textEntity) {
    textEntity.setAttribute('visible', false);
  });
}
document.addEventListener('DOMContentLoaded', function () {
  resetScene();
});

var resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', function () {
  resetScene();
});