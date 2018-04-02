import settings from '../config/settings'
import queryString from 'query-string'
import { AsyncStorage } from 'react-native'

const SIGN_IN_ROUTE = '/auth/sign_in'

/**
 * Request function for POST, PUT, DELETE requests. (doesn't catch error. used for batch)
 * @param type - request type
 * @param route - request route
 * @param successFunc - success handler
 * @param errorFunc - error handler
 * @param params - body params
 */
function requestNoCatch(type, route, successFunc, errorFunc, params=null) {
  return appendAuthHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }).then(function(headers){
      console.log("My headers are:" + JSON.stringify(headers));
      return fetch(`${settings.URL}${route}`, {
        method: type,
        headers: headers,
        body: JSON.stringify(params)
      }).then(function(response) {
        if (response.ok) {
          console.log(type);
          // if sign in route, takes in access token + client to set up authheaders 
          if (route == SIGN_IN_ROUTE) {
            access_token = response.headers.map['access-token'][0];
            client = response.headers.map['client'][0];
            setupAuthHeaders({'access-token': access_token, 'client': client});
          }
          return response.json().then(function(object) {
            return successFunc(object);
          })
        } else {
          return response.json().then(function(error) {
            return errorFunc(error);
          })
        }
      })  
    });
}

/**
 * Request function for POST, PUT, DELETE requests.
 * @param type - request type
 * @param route - request route
 * @param successFunc - success handler
 * @param errorFunc - error handler
 * @param params - body params
 */
function request(type, route, successFunc, errorFunc, params=null) {
  return requestNoCatch(type, route, successFunc, errorFunc, params)
    .catch(function(error) {
      console.log(error);
    });
}

/**
 * Request function for GET requests. Same params as request except doesn't take in type and:
 * @param params - URL query params
 */
 function getRequest(route, successFunc, errorFunc, params=null) {
  const url = params ? `${settings.URL}${route}/?${queryString.stringify(params)}` : `${settings.URL}${route}`;
  //append auth headers to original headers, and then headers go into fetch function
  return appendAuthHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }).then(function(headers){
      console.log("My headers are:" + JSON.stringify(headers));
      return fetch(url, {
        method: 'GET',
        headers: headers})
        .then(function(response) {
          if (response.ok) {
            // console.log('GET');
            // console.log(response.headers);
            return response.json().then(function(object) {
              return successFunc(object);
            })
          } else {
            return response.json().then(function(error) {
              return errorFunc(error);
            })
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      });
}

/**
* Auth Functions
*/ 
const AUTH_NAMESPACE = 'auth'

// takes the auth headers given in headers and stores them locally
// using localStore
function setupAuthHeaders(headers){
  console.log("Setting up auth headers");
  for (var header in headers) {
    key = [AUTH_NAMESPACE, header].join('-');
    value = headers[header];
    localStore(key, value);
  }
}

// takes the original headers, and appends the corresponding
// auth headers by grabbing them from local storage using 
// localGet
async function appendAuthHeaders(headers){
  console.log("Appending auth headers");
  auth_headers = ['client', 'access-token'];
  for (var i = 0; i < auth_headers.length; ++i) {
    auth_header = auth_headers[i];
    key = [AUTH_NAMESPACE, auth_header].join('-');
    value = await localGet(key);
    if (value != null) headers[auth_header] = value; 
  }
  headers['token-type'] = 'Bearer';
  console.log("Result: " + JSON.stringify(headers));
  return headers;
}

/**
* Helper Functions
*/

function localStore(key, value) {
  console.log("Storing " + key + ": " + JSON.stringify(value));
  // May need to fix this according to best practices.

  AsyncStorage.setItem(key, JSON.stringify(value));
}

async function localGet(key) {
  console.log("Getting " + key);
  // Same goes for this mechanism
  
  // This function is blocking (await)
  // returns null if error (key not exists)
  var value = await AsyncStorage.getItem(key);
  console.log("Return value is " + value)
  if (value == null) return null;
  return JSON.parse(value);
}

/**
 * Wrapper method for POST request.
 */
function postRequest(route, successFunc, errorFunc, params='{}') {
  return request('POST', route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for POST request with no catch.
 */
function postRequestNoCatch(route, successFunc, errorFunc, params='{}') {
  return request('POST', route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for PUT request.
 */
function putRequest(route, successFunc, errorFunc, params='{}') {
  return request('PUT', route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for PUT request with no catch.
 */
function putRequestNoCatch(route, successFunc, errorFunc, params='{}') {
  return requestNoCatch('PUT', route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for DELETE request.
 */
function deleteRequest(route, successFunc, errorFunc, params='{}') {
  return request('DELETE', route, successFunc, errorFunc, params);
}

export { getRequest, postRequest, putRequest, deleteRequest, postRequestNoCatch, putRequestNoCatch }
