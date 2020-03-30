'use strict';

const apiKey = "Fosr0YROthENCYceTyAlrIwNc9TCKJfqnPncDOld";


const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].name}</h3>
            <p>${responseJson.data[i].description}</p>
            <p>${responseJson.data[i].url}</p>
            <img src='${responseJson.data[i].images[0].url}'>
            </li>`
        )};
    $('#results').removeClass('hidden');
}

function getNationParks(state, limit=10) {
    const params = {
        api_key: apiKey,
        stateCode: state,
        limit
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + "?" + queryString;


    console.log(url)
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchState = $("#js-search-state").val();
        const limit = $("#js-max-results").val();
        getNationParks(searchState, limit);
    });
}

$(watchForm);