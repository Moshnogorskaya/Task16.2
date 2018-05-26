import $ from 'jquery';
import { createStore } from 'redux';

const selector = '.suggestion-1';
const profile = $(selector);
const arrow = $(`${selector} .person__options-arrow`);
// const deleteButton = $(`${selector} .person__delete`);

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

const store = createStore(options);

store.subscribe(() => {
  profile.css('margin-left', store.getState());
});

arrow.click(() => store.dispatch({ type: 'SHOW' }));
// arrow.addEventListener('mouseleave', store.dispatch({ type: 'HIDE' }));
//   const profile = $(selector);
//   const arrow = $(`${selector} .person__options-arrow`);
//   const deleteButton = $(`${selector} .person__delete`);

//   const showOptions$ = Observable.fromEvent(arrow, 'mouseenter');
//   const navigateOptions$ = Observable.fromEvent(deleteButton, 'mouseenter');
//   const hideOptionsWhenLeaveDelete$ = Observable.fromEvent(deleteButton, 'mouseleave');
//   const hideOptionsWhenLeaveArrow$ = Observable.fromEvent(arrow, 'mouseleave');

//   const showOptions = () => profile.css('margin-left', '-28.912466843%');
//   const hideOptions = () => profile.css('margin-left', '0');

//   showOptions$.subscribe(() => showOptions());
//   navigateOptions$.subscribe(() => showOptions());
//   hideOptionsWhenLeaveDelete$.subscribe(() => hideOptions());
//   hideOptionsWhenLeaveArrow$.subscribe(() => hideOptions());
// }

// options('.suggestion-1');
// options('.suggestion-2');
// options('.suggestion-3');
