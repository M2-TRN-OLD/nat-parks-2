'use strict';

const natParksUrl = 'https://api.nps.gov/api/v1/parks';
const apiKey = 'TdqzbQg49evPRDmxgIMNPHDg2bQtOLvudFSyx4QV';


function getNatParksData(states, maxStates) {
    console.log('getNatParksData fired');

    const params = {
        stateCode: states,
        limit: maxStates,
        api_key: apiKey
    }

    const options = {
        headers: new Headers {
            api_key:apiKey
        }
    }

    //const queryParams = formatQueryParams(params);
    //const url = natParksUrl + '?' + queryParams;

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