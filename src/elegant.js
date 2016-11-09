/* global docuemnt, TweenLite */

(function () {

  window.elegant = {
    init: function (element) {
      element = element || document.getElementsByTagName('body')[0];

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {


          if (mutation.addedNodes.length) {
            var aniamtion = mutation.addedNodes[0].getAttribute('elegant');

            if (aniamtion) {
              var animationConfig = elegant.animations.registered[aniamtion];
              if (animationConfig) {
                console.log(animationConfig.enter, mutation);
                var enterAnimation = animationConfig.enter;
                var parsed = JSON.stringify(enterAnimation);

                mutation.addedNodes[0].animate(JSON.parse(parsed), {
                  direction: 'alternate',
                  duration: 500,
                  iterations: 1
                });

              }
            } else if (mutation.addedNodes[0].hasAttribute('elegant')) {

              elegant.enter(mutation.addedNodes[0]);
            }
          }
        });
      });

      var alreadyInDom = Array.prototype.slice.call(document.querySelectorAll('[elegant]'));
      alreadyInDom.forEach(function (node) {
        node.classList.add('enter');
      });



      observer.observe(element, {
        attributes: true,
        childList: true,
        characterData: false,
        subtree: true
      });
    },
    enter: function (nodes) {

    },
    animations: {
      registered: {},
      add: function (animation, config) {
        var index = this.registered[animation] = config;
      }
    }
  };

})();