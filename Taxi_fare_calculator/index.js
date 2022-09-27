let km = 0

function taxifare() {
  km = km.toFixed(1)
  let fare = 0

  if (km <= 10) {
    fare += 5 * km
    console.log('upto 10=', fare)
  } else if (km > 10 && km <= 30) {
    fare += 5 * 10 + 2 * Math.abs(10 - km)
    console.log('upto 30', fare)
  } else {
    fare += 5 * 10 + 2 * 20 + Math.abs(30 - km)
    console.log('greater than 30', fare)
  }
  document.getElementById('total_fare').innerHTML = Math.round(fare)
}

const resetfare = () => {
  document.getElementById('dist').innerHTML = 0
  document.getElementById('total_fare').innerHTML = 0
}

// API-HERO
$(function () {
  // add input listeners
  google.maps.event.addDomListener(window, 'load', function () {
    var from_places = new google.maps.places.Autocomplete(
      document.getElementById('from_places')
    )
    var to_places = new google.maps.places.Autocomplete(
      document.getElementById('to_places')
    )

    google.maps.event.addListener(from_places, 'place_changed', function () {
      var from_place = from_places.getPlace()
      var from_address = from_place.formatted_address
      $('#origin').val(from_address)
    })

    google.maps.event.addListener(to_places, 'place_changed', function () {
      var to_place = to_places.getPlace()
      var to_address = to_place.formatted_address
      $('#destination').val(to_address)
    })
  })
  // calculate distance
  function calculateDistance() {
    var origin = $('#origin').val()
    var destination = $('#destination').val()
    var service = new google.maps.DistanceMatrixService()
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
        avoidHighways: false,
        avoidTolls: false,
      },
      callback
    )
  }
  // get distance results
  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      $('#result').html(err)
    } else {
      var origin = response.originAddresses[0]
      console.log(origin)
      var destination = response.destinationAddresses[0]
      console.log(destination)
      if (response.rows[0].elements[0].status === 'ZERO_RESULTS') {
        $('#dist').html('Get Flight')
      } else {
        var distance = response.rows[0].elements[0].distance
        console.log(distance)
        var duration = response.rows[0].elements[0].duration
        km = distance.value / 1000 // km
        $('#dist').html(`${km.toFixed(1)}`)
        console.log('total distance is', km.toFixed(1))
      }
    }
  }

  // print results on submit the form
  $('#form_fare').submit(function (e) {
    e.preventDefault()
    calculateDistance()
    taxifare()
  })
})
