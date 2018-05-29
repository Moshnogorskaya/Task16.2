import $ from 'jquery';
import { createStore } from 'redux';

const personList = $('.person');
// const personList = []; // optional $ to Dom
// $.each($personList, (i, person) => personList.push(person));


const refreshButton = $('.widget__refresh');

const initialState = [{
  name: 'Please, wait', location: 'Unknown', login: '', html_url: '#', avatar_url: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
}, {
  name: 'Please, wait', location: 'Unknown', login: '', html_url: '#', avatar_url: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
}, {
  name: 'Please, wait', location: 'Unknown', login: '', html_url: '#', avatar_url: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
}];


function generateProfiles(state, action) {
  switch (action.type) {
    case 'REFRESH':
      console.log('state ', state);
      return state;
    default:
      return state;
  }
}

const storeProfiles = createStore(generateProfiles, initialState);

storeProfiles.subscribe(() => {
  return storeProfiles.getState().forEach((person, i) => {
    const name = $(personList[i]).find('.person__name');
    const avatar = $(personList[i]).find('.avatar__image');
    const location = $(personList[i]).find('.location__text');
    const link = $(personList[i]).find('.person__link');
    name.html(person.name);
    location.html(person.location);
    link.html(`@${person.login}`);
    link.attr('href', person.html_url);
    avatar.css({
      background: `url(${person.avatar_url}) no-repeat`,
      'background-size': 'contain',
    });
  });
});

refreshButton.click(() => storeProfiles.dispatch({ type: 'REFRESH' }));
