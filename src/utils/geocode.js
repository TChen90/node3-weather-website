const request = require("request")

// Geocoding
// Address -> Lat/Long -> Weather
// Build a fuction to communicate with MapBox API
// callback: Function to call once we hace latitude and longitude 
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGNoZW45MCIsImEiOiJja201NnhzdzMwYXBzMm93MDF4d2ltYjRnIn0.LpjSL0MPHPNZkgtuMsnS5g&limit=1'

    request({url: url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please trey another search!.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode