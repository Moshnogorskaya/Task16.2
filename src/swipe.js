import $ from 'jquery';
import { createStore } from 'redux';

function swipeOptions(selector) {
  const profile = $(selector);
  const arrow = $(`${selector} .person__options-arrow`);
  const deleteButton = $(`${selector} .person__delete`);

  function options(state, action) {
    switch (action.type) {
      case 'SHOW':
        return '-28.912466843%';
      case 'HIDE':
        return '0';
      default:
        return '0';
    }
  }

  const storeSwipe = createStore(options);

  storeSwipe.subscribe(() => {
    profile.css('margin-left', storeSwipe.getState());
  });

  arrow.mouseenter(() => storeSwipe.dispatch({ type: 'SHOW' }));
  arrow.mouseleave(() => storeSwipe.dispatch({ type: 'HIDE' }));
  deleteButton.mouseenter(() => storeSwipe.dispatch({ type: 'SHOW' }));
  deleteButton.mouseleave(() => storeSwipe.dispatch({ type: 'HIDE' }));
}

swipeOptions('.suggestion-1');
swipeOptions('.suggestion-2');
swipeOptions('.suggestion-3');
