import $ from 'jquery';
import { createStore } from 'redux';

const personList = $('.person');


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

async function getProfile() {
  try {
    const requestProfile = $.getJSON('https://api.github.com/users/mojombo');
    const profile = await requestProfile;
    console.log('inside', profile);
    return profile;
  } catch (err) {
    return console.log('request text failed', err);
  }
}
console.log('outside', getProfile());

function changeState(st) {
  let changedState = st;
  changedState = changedState.map(() => ({
    login: 'mojombo',
    id: 1,
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/mojombo',
    html_url: 'https://github.com/mojombo',
    followers_url: 'https://api.github.com/users/mojombo/followers',
    following_url: 'https://api.github.com/users/mojombo/following{/other_user}',
    gists_url: 'https://api.github.com/users/mojombo/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/mojombo/subscriptions',
    organizations_url: 'https://api.github.com/users/mojombo/orgs',
    repos_url: 'https://api.github.com/users/mojombo/repos',
    events_url: 'https://api.github.com/users/mojombo/events{/privacy}',
    received_events_url: 'https://api.github.com/users/mojombo/received_events',
    type: 'User',
    site_admin: false,
    name: 'Tom Preston-Werner',
    company: null,
    blog: 'http://tom.preston-werner.com',
    location: 'San Francisco',
    email: null,
    hireable: null,
    bio: null,
    public_repos: 60,
    public_gists: 62,
    followers: 20965,
    following: 11,
    created_at: '2007-10-20T05:24:19Z',
    updated_at: '2018-05-07T17:19:34Z',
  }));
  return changedState;
}

function generateProfiles(state, action) {
  switch (action.type) {
    case 'INIT':
      return state;
    case 'REFRESH': {
      const newState = changeState(state);
      console.log('newState ', newState);
      return newState;
    }
    default:
      return state;
  }
}

const storeProfiles = createStore(generateProfiles, initialState);

storeProfiles.subscribe(() => storeProfiles.getState().forEach((person, i) => {
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
}));

storeProfiles.dispatch({ type: 'INIT' });
refreshButton.click(() => storeProfiles.dispatch({ type: 'REFRESH' }));
