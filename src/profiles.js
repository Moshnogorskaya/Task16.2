import $ from 'jquery';
import { createStore } from 'redux';


const refreshButton = $('.widget__refresh');

const initialState = [{
  login: '',
  id: 1,
  avatar_url: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
  gravatar_id: '',
  url: '#',
  html_url: '',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: 'User',
  site_admin: false,
  name: 'Please, wait...',
  company: null,
  blog: '',
  location: 'Unknown',
  email: null,
  hireable: null,
  bio: null,
  public_repos: 60,
  public_gists: 62,
  followers: 20965,
  following: 11,
  created_at: '',
  updated_at: '',
}, {
  login: '',
  id: 1,
  avatar_url: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
  gravatar_id: '',
  url: '#',
  html_url: '',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: 'User',
  site_admin: false,
  name: 'Please, wait...',
  company: null,
  blog: '',
  location: 'Unknown',
  email: null,
  hireable: null,
  bio: null,
  public_repos: 60,
  public_gists: 62,
  followers: 20965,
  following: 11,
  created_at: '',
  updated_at: '',
}, {
  login: '',
  id: 1,
  avatar_url: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
  gravatar_id: '',
  url: '#',
  html_url: '',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: 'User',
  site_admin: false,
  name: 'Please, wait...',
  company: null,
  blog: '',
  location: 'Unknown',
  email: null,
  hireable: null,
  bio: null,
  public_repos: 60,
  public_gists: 62,
  followers: 20965,
  following: 11,
  created_at: '',
  updated_at: '',
}];

// function getProfilesList() {
//   const randomOffset = Math.floor(Math.random() * 500);
//   return $.getJSON(`https://api.github.com/users?since=${randomOffset}`);
// }

// async function getProfile(list) {
//   try {
//     const person = list[Math.floor(Math.random() * list.length)];
//     const profile = await $.getJSON(`https://api.github.com/users/${person.login}`);
//     return profile;
//   } catch (err) {
//     return console.log('request failed', err);
//   }
// }

function changeState(st, array) {
  let changedState = st;
  changedState = changedState.map((person, i) => array[i]);
  return changedState;
}

function generateProfiles(state, action) {
  switch (action.type) {
    case 'INIT':
      return state;
    case 'REFRESH': {
      console.log('content', action.content);
      const newState = changeState(state, action.content);
      console.log('newState ', newState);
      return newState;
    }
    default:
      return state;
  }
}

function renderView(profiles) {
  const personList = $('.person');
  profiles.forEach((person, i) => {
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
}

const storeProfiles = createStore(generateProfiles, initialState);

storeProfiles.subscribe(() => renderView(storeProfiles.getState()));

storeProfiles.dispatch({ type: 'INIT' });

refreshButton.click(() => {
  const profilesRequest = $.getJSON('https://api.github.com/users');
  profilesRequest.done((profilesResponse) => {
    const profileURL1 = profilesResponse[3].url;
    const profileURL2 = profilesResponse[5].url;
    const profileURL3 = profilesResponse[7].url;
    const profileRequest1 = $.getJSON(profileURL1);
    const profileRequest2 = $.getJSON(profileURL2);
    const profileRequest3 = $.getJSON(profileURL3);

    Promise.all([profileRequest1, profileRequest2, profileRequest3]).then((profile) => {
      console.log('profiles', profile);
      storeProfiles.dispatch({ type: 'REFRESH', content: profile });
    });
  });
});

