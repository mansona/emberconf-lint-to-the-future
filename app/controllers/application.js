/* global Reveal, confetti*/
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  constructor() {
    super(...arguments);

    console.error('please get in here');
    setTimeout(() => {
      Reveal.addEventListener('slidechanged', function (event) {
        if (event.indexh !== 15 && event.indexh !== 30) {
          return;
        }

        var count = 200;
        var defaults = {
          origin: { y: 0.7 },
        };

        function fire(particleRatio, opts) {
          confetti(
            Object.assign({}, defaults, opts, {
              particleCount: Math.floor(count * particleRatio),
            })
          );
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      });
    }, 2000);
  }
}
