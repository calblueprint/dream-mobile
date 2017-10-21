import settings from '../config/settings'

request(type, route, successFunc, errorFunc, params={}) {
  fetch(settings.URL + route, {
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
      successFunc(responseData);
    }.bind(this))
    .catch(function(error) {
      errorFunc(error);
    });
}

// GET request has URL params instead of body params
get(route, successFunc, errorFunc, params={}) {
  fetch(settings.URL + route, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }})
    .then(function(response) {
      return response.json();
    })
    .then(function(responseData) {
      successFunc(responseData);
      // this.setState({ courses: responseData, isLoading: false });
    }.bind(this))
    .catch(function(error) {
      errorFunc(error);
      // // TODO (caseytaka): Display correct toastr error msg
      // console.error(error);
    });
}

post(route, successFunc, errorFunc, params={}) {
  request('POST', route, successFunc, errorFunc, params)
}

put(route, successFunc, errorFunc, params={}) {
  request('PUT', route, successFunc, errorFunc, params)
}

delete(route, successFunc, errorFunc, params={}) {
  request('DELETE', route, successFunc, errorFunc, params)
}
