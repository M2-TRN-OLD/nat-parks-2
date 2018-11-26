'use strict';

const natParksUrl = 'https://api.nps.gov/api/v1/parks';
const apiKey = 'TdqzbQg49evPRDmxgIMNPHDg2bQtOLvudFSyx4QV';

function displayParks(responseJson) {
    console.log('display parks fired');
    console.log(`${responseJson.data[1].states}`);
    console.log(`${responseJson.data.length}`);
    
    
    $('#js-parks-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#js-parks-list').append(`<li><h3>${responseJson.data[i].fullName}</h3>
          <p>${responseJson.data[i].url}</p>
          <p>${responseJson.data[i].states}</p>
          </li>`);
        console.log(`${responseJson.data[i].name}`);
    }
    $('.js-results-section').removeClass('hidden');

}

function formatQueryParams(params) {
    console.log('formatQueryParams fired');
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
      console.log(queryItems.join('&'));
      return queryItems.join('&');
}

function getNatParksData(states, maxStates) {
    console.log('getNatParksData fired');

    const params = {
        stateCode: states,
        limit: maxStates,
        api_key: apiKey
    }

    const options = {
        headers: new Headers({
            api_key:apiKey
        })
    }

    const queryParams = formatQueryParams(params);
    const url = natParksUrl + '?' + queryParams;

    fetch(url)
      .then (response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error(response.statusText);
      })
      .then (responseJson => {
          console.log(responseJson);
          displayParks(responseJson);
      })
      .catch (err => {
          $('#js-error-msg').text(`Something went wrong!' ${err.message}`);
      })

}

function watchForm() {
    $('#js-search-form').on('submit', function(event) {
        console.log('event listener is working.');
        event.preventDefault();
        const searchStates = $('#js-park-search').val();
        const searchNum = $('#js-max-parks').val();
        console.log(searchStates + ' ' + searchNum);
        getNatParksData(searchStates, searchNum);
    });
}

$(function() {
    console.log('doc loaded, waiting for user input');
    watchForm();
})