import settings from '../config/settings'
import queryString from 'query-string'

function request(type, route, successFunc, errorFunc, params=null) {
  return fetch(`${settings.URL}${route}`, {
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)})
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData) {
      return successFunc(responseData);
    }.bind(this))
    .catch(function(error) {
      return errorFunc(error);
    });
}

// GET request has URL params instead of body params
function getRequest(route, successFunc, errorFunc, params=null) {
  const url = params ? `${settings.URL}${route}/?${queryString.stringify(params)}` : `${settings.URL}${route}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }})
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData) {
      return successFunc(responseData);
    }.bind(this))
    .catch(function(error) {
      return errorFunc(error);
    });
}

function postRequest(route, successFunc, errorFunc, params='{}') {
  return request('POST', route, successFunc, errorFunc, params);
}

function putRequest(route, successFunc, errorFunc, params='{}') {
  return request('PUT', route, successFunc, errorFunc, params);
}

function deleteRequest(route, successFunc, errorFunc, params='{}') {
  return request('DELETE', route, successFunc, errorFunc, params);
}

export { getRequest, postRequest, putRequest, deleteRequest }
