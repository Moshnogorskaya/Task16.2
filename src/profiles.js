import $ from 'jquery';
import { createStore } from 'redux';

const personList = $('.person');
const refreshButton = $('.widget__refresh');

function getProfilesList() {
  const randomOffset = Math.floor(Math.random() * 500);
  const request = $.getJSON(`https://api.github.com/users?since=${randomOffset}`);
  // console.log(request);
  return request;
}

function getProfile(list) {
  const person = list[Math.floor(Math.random() * list.length)];
  const request = $.getJSON(`https://api.github.com/users/${person.login}`);
  // console.log(request);
  return request;
}

const users = [];
const profiles = getProfilesList();
// console.log(profiles);
const getUse = profiles.done((data) => {
  for (let i = 0; i < 3; i += 1) {
    const profile = getProfile(data);
    profile.done((data1) => {
      users.push(data1);
      // console.log(users);
      return users;
    });
  }
  return users;
}).done(() => users);

function generateProfiles(state, action) {
  switch (action.type) {
    case 'REFRESH':
      console.log(getUse);
      return getUse;
    default:
      return state;
  }
}

const storeProfiles = createStore(generateProfiles);

storeProfiles.subscribe(() => {
  storeProfiles.getState().forEach((person, i) => {
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
