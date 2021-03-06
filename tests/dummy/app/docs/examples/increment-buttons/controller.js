import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET increment-button-task
export default Ember.Controller.extend({
  count: 0,
  incrementBy: task(function * (inc) {
    if (!inc) { return; }

    let speed = 400;
    while (true) {
      this.incrementProperty('count', inc);
      yield timeout(speed);
      speed = Math.max(50, speed * 0.8);
    }
  }).restartable(),
});
// END-SNIPPET

