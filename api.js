const got = require('got');
const { getEnvVar } = require('./env.js');

const fetchEvents = () =>
    got(getEnvVar('ST_URL','http://localhost:8384/rest/events?events=RemoteChangeDetected,LocalChangeDetected'), {
    headers: {
      'X-API-Key': getEnvVar('API_KEY','invalid')
    },
  }).json();

const fetchNewEvents = async seenIds => {
  const events = await fetchEvents();
  const newEvents = events.filter(event => seenIds && !seenIds.has(event.id));
  return {
    events: newEvents,
    seenIds: new Set(events.map(x => x.id)),
  };
};

module.exports = {
  fetchNewEvents,
};
