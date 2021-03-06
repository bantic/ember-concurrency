import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET debounced-search-with-cancelation
const DEBOUNCE_MS = 250;
export default Ember.Controller.extend({
  searchRepo: task(function * (term) {
    if (Ember.isBlank(term)) { return []; }

    // Pause here for DEBOUNCE_MS milliseconds. Because this
    // task is `.restartable()`, if the user starts typing again,
    // the current search will be canceled at this point and
    // start over from the beginning. This is the
    // ember-concurrency way of debouncing a task.
    yield timeout(DEBOUNCE_MS);

    let url = `https://api.github.com/search/repositories?q=${term}`;

    // We yield an AJAX request and wait for it to complete. If the task
    // is restarted before this request completes, the XHR request
    // is aborted (open the inspector and see for yourself :)
    let json = yield this.get('getJSON').perform(url);
    return json.items;
  }).restartable(),

  getJSON: task(function * (url) {
    let xhr;
    try {
      xhr = Ember.$.getJSON(url);
      yield xhr.promise();
    } finally {
      xhr.abort();
    }
  }),
});
// END-SNIPPET

