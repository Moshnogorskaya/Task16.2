import $ from 'jquery';
import { createStore } from 'redux';

const rand = function getRandomNumberFromAmount(amount) {
  return Math.floor(Math.random() * amount);
};

const refreshButton = $('.widget__refresh');
const deleteButton = $('.person__delete');

const initialState = [
  {
    login: '',
    id: 1,
    avatar_url:
      'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
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
  },
  {
    login: '',
    id: 1,
    avatar_url:
      'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
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
  },
  {
    login: '',
    id: 1,
    avatar_url:
      'https://cdn.iconscout.com/public/images/icon/premium/png-512/round-circle-loader-process-loading-load-397c0a2c94fc37c5-512x512.png',
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
  },
];

function generateProfiles(state, action) {
  switch (action.type) {
    case 'INIT':
      return state;
    case 'REFRESH': {
      return state.map((person, i) => action.content[i]);
    }
    case 'DELETE': {
      const newState = state;
      newState[action.content_index] = action.content;
      return newState;
    }
    default:
      return state;
  }
}

const storeProfiles = createStore(generateProfiles, initialState);

function renderViewAll(profiles) {
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

function refresh() {
  const profilesRequest = $.getJSON(`https://api.github.com/users?since=${rand(500)}`);
  profilesRequest.done((profilesResponse) => {
    const promises = [];
    for (let i = 0; i < 3; i += 1) {
      const profileURL = profilesResponse[rand(profilesResponse.length)].url;
      const profileRequest = $.getJSON(profileURL);
      promises.push(profileRequest);
    }
    Promise.all(promises).then((profile) => {
      storeProfiles.dispatch({ type: 'REFRESH', content: profile });
    });
  });
}

function deletePerson(index) {
  const profilesRequest = $.getJSON(`https://api.github.com/users?since=${rand(500)}`);
  profilesRequest.done((profilesResponse) => {
    const profileURL = profilesResponse[rand(profilesResponse.length)].url;
    const profileRequest = $.getJSON(profileURL);
    profileRequest.done((profile) => {
      storeProfiles.dispatch({
        type: 'DELETE',
        content: profile,
        content_index: index,
      });
    });
  });

  storeProfiles.dispatch({ type: 'DELETE' });
}

storeProfiles.subscribe(() => renderViewAll(storeProfiles.getState()));

// Page loaded
storeProfiles.dispatch({ type: 'INIT' });
refreshButton.click(() => refresh());

deleteButton.each((i, button) => {
  $(button).click(() => deletePerson(i));
});
