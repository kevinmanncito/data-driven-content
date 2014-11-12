window.onload = function() {

  var animation = {
  
    canvas: document.getElementById('canvas'),
  
    context: canvas.getContext("2d"),

    letters: [],

    drawingStatus: false,

    xPos: 25,

    yPos: 100,

    interval: 200,

    intervalMeasure: 0,

    prevTime: 0,

    initialize: function() {
      animation.drawingStatus = true;
      // animation.prevTime = performance.now();
      animation.prevTime = Date.now();
      requestAnimationFrame(animation.loop);
    },

    clear: function() {
      animation.context.clearRect(0, 0, animation.canvas.width, animation.canvas.height);
      animation.xPos = 25;
      animation.canvas.style.backgroundImage = "none";
    },

    loop: function(time) {
      if (animation.drawingStatus) {
        // var now = performance.now();
        var now = Date.now();
        var timeElapsed = now - animation.prevTime;
        animation.prevTime = now;
        animation.update(timeElapsed);
        requestAnimationFrame(animation.loop);
      }
    },

    update: function(time) {
      if (animation.letters.length > 0) {
        animation.intervalMeasure += time;
        if (animation.intervalMeasure > animation.interval) {

          animation.context.fillStyle = "blue";
          animation.context.font = "bold 16px Arial";
          animation.context.fillText(animation.letters[0], 
                                     animation.xPos, 
                                     animation.yPos);
          animation.xPos += 25;
          animation.letters.shift();
          animation.intervalMeasure = 0;
        }
      } else {
        animation.drawingStatus = false;
      }
    }

  };

  var animationWrapper = document.getElementById('animation-wrapper');
  animationWrapper.addEventListener("click", function() {
    var letters = document.getElementById('name').value;
    for (var i = 0; i < letters.length; i++) {
      animation.letters.push(letters[i]);
    }
    animation.clear();
    animation.initialize();
    document.getElementById("video").play();
  });

  var video = document.getElementById('video');
  video.addEventListener("ended", function() {
    console.log('ended');
    var canvas = document.getElementById('canvas');
    canvas.style.backgroundImage = "url('play.png')";
  });

}

