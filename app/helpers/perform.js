import Ember from 'ember';

import { taskHelperClosure } from 'ember-concurrency/-helpers';

export function performHelper(args) {
  return taskHelperClosure('perform', 'perform', args);
}

export default Ember.Helper.helper(performHelper);


