import { apiUrl } from 'config';
import jira from '../jiraClient';
import { getHeaders } from './helper';


function clearHost(host) {
  let formatHost = host.startsWith('https://') ? host.slice(8) : host;
  formatHost = formatHost.startsWith('http://') ? formatHost.slice(7) : formatHost;
  return formatHost;
}

export function jiraProfile() {
  return jira.client.myself.getMyself();
}

export function jiraAuth({ host, username, password }) {
  const formatHost = `${clearHost(host)}.atlassian.net`;
  jira.auth(formatHost, username, password);
  return jiraProfile();
}

export function chronosBackendAuth({ host, username, password }) {
  return fetch(`${apiUrl}/desktop-tracker/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      baseUrl: `${clearHost(host)}.atlassian.net`,
      username,
      password,
    }),
  }).then(res => res.json());
}

export function chronosBackendGetJiraCredentials() {
  const url = `${apiUrl}/desktop-tracker/authenticate`;
  return fetch(url, { headers: getHeaders() }).then(res => res.json());
}
