import $ from 'jquery';
import { createStore } from 'redux';

function swipeOptions(element) {
  const arrow = $(element).find('.person__options-arrow');
  const deleteButton = $(element).find('.person__delete');

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
    $(element).css('margin-left', storeSwipe.getState());
  });

  arrow.mouseenter(() => storeSwipe.dispatch({ type: 'SHOW' }));
  arrow.mouseleave(() => storeSwipe.dispatch({ type: 'HIDE' }));
  deleteButton.mouseenter(() => storeSwipe.dispatch({ type: 'SHOW' }));
  deleteButton.mouseleave(() => storeSwipe.dispatch({ type: 'HIDE' }));
}

const profiles = $('.person');
profiles.each((i, profile) => swipeOptions(profile));
