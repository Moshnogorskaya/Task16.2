import $ from 'jquery';
import { createStore } from 'redux';

const personList = $('.person');
const refreshButton = $('.widget__refresh');

function getProfilesList() {
  const randomOffset = Math.floor(Math.random() * 500);
  return $.getJSON(`https://api.github.com/users?since=${randomOffset}`);
}

async function getProfile(list) {
  try {
    const person = list[Math.floor(Math.random() * list.length)];
    const profile = await $.getJSON(`https://api.github.com/users/${person.login}`);
    return profile;
  } catch (err) {
    return console.log('request failed', err);
  }
}

async function getUsers() {
  try {
    const promisesUsers = [];
    const users = [];
    const profiles = await getProfilesList();
    for (let i = 0; i < 3; i += 1) {
      const profile = getProfile(profiles);
      promisesUsers.push(profile);
    }
    promisesUsers.map(promise => promise.then(result => users.push(result)));
    return users;
  } catch (err) {
    return console.log('request failed', err);
  }
}
console.log(getUsers());

const initialState = [{'name': 'Please, wait', 'location': 'Unknown', 'login': '','html_url': '', 'avatar_url': ''}, {}, {}];

function generateProfiles(state = initialState, action) {
  switch (action.type) {
    case 'REFRESH':
      return getUsers();
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
