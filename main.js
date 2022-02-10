// Get location form
var locationForm = document.querySelector('#location-form');

// Listen for submit
locationForm.addEventListener('submit', geocode);


function geocode(e) {
    // Prevent actual submittion
    e.preventDefault();

    var location = document.querySelector('#location-input').value;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key:'AIzaSyDRxiutiQiTCdnZQdtdgEVuN2QArCtZlAg'
        }
    })
    .then(function(response) {
        // Log full response
        console.log(response);

        // Formatted Address
        var formattedAddress = (response.data.results[0].formatted_address);
        var formattedAddressOutput = `
            <ul class="list-group">
                <li class="list-group-item">${formattedAddress}</li>
            </ul>
        `;

        // Address Components
        var addressComponents = response.data.results[0].address_components;
        var addressComponentsOutput = '<ul class="list-group">';
        // Loop through
        for(var i = 0; i < addressComponents.length; i++) {

            // Append content on page
            addressComponentsOutput += `
                <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
            `;

            addressComponentsOutput += '</ul>';

            // Geometry
            var lat = (response.data.results[0].geometry.location.lat);
            var lng = (response.data.results[0].geometry.location.lng);
            var geometryOutput = `
                <ul class="list-group">
                    <li class="list-group-item"><strong>Latitude:</strong> ${lat}</li>
                    <li class="list-group-item"><strong>Longitude:</strong> ${lng}</li>
                </ul>
            `;
            

            // Output  to page addressComponents
            document.querySelector('#address-components').innerHTML = addressComponentsOutput;
            // Output  to page formattedAddress        
            document.querySelector('#formatted-address').innerHTML = formattedAddressOutput;
            // Output  to page geometry
            document.querySelector('#geometry').innerHTML = geometryOutput;
        }
    })

    .catch(function(error){
        console.log(error)
    })
}