const busUrl = 'http://localhost:5000/api/buses/1'

let speed = 0
let passengerNum = 0

const otherParam = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  },
  method: 'GET'
}

/* =====================
  //* GETTING BUS INFO 
  ===================== */
window.fetch(busUrl, otherParam)
  .then(data => { return data.json() })
  .then(res => {
    const data = res.busObject[0]

    let plate = data.plate

    $('#status').html(data.bus_status)
    let totalSeats = data.seat
    let source = data.Route.source
    let destination = data.Route.destination

    $('#plate').html(plate)
    $('#passenger').html(passengerNum)
    $('#seats').html(totalSeats)
    $('#source').html(source)
    $('#dest').html(destination)


  }).catch(err => console.log(err))

const logSection = $('#log')

$('#start').click(() => {
  let busStatus = $('#status').html()
  if (busStatus === 'rest' || busStatus === 'stop') {
    startBus()
    $('#status').html('move')
    logging('The Bus is moving')

    let busStatus = $('#status').html()
    let plateNumber = $('#plate').html()
    let seats = $('#seats').html()

    updateBus(plateNumber, seats, busStatus)
  }
})

/* =====================
  //* STOPING BUS 
  ===================== */

$('#stop').click(() => {
  clearTimeout(timex)
  logging('Stopping The Bus!')
  $('#status').html('rest')
  let busStatus = $('#status').html()
  let plateNumber = $('#plate').html()
  let seats = $('#seats').html()

  updateBus(plateNumber, seats, busStatus)
})

/* =====================
  //* SPEEDING BUS 
  ===================== */
$('#speedUp').hover(() => {
  speed = speed + 10
  logging('Speeding Up The Bus!')
})

/* =====================
  //* SLOWING BUS 
  ===================== */

$('#slowDown').hover(() => {
  if (speed > 10) {
    speed = speed - 10
    logging('Slowing Down The bus!')
  }
})

/* =====================
  //* ADDING A PASSENGER 
  ===================== */

$('#addP').click(() => {
  let busStatus = $('#status').html()
  let totalSeats = $('#seats').html()

  if (busStatus !== 'move' && totalSeats > 0) {
    passengerNum++
    totalSeats--
    $('#passenger').html(passengerNum)
    $('#seats').html(totalSeats)
  } else if (totalSeats === 0) {
    logging(' All Seats are taken! ')
  } else logging('stop the car to add or remove passengers')
})

  /* =====================
  //* REMOVING A PASSENGER 
  ===================== */

$('#removeP').click(() => {
  let busStatus = $('#status').html()
  let totalSeats = $('#seats').html()

  if (busStatus !== 'move' && passengerNum > 0) {
    passengerNum--
    totalSeats++
    $('#passenger').html(passengerNum)
    $('#seats').html(totalSeats)
  } else if (passengerNum === 0) {
    logging(' All Passangers are Out! ')
  } else logging('stop the car to add or remove passengers')
})

// starting bus
const startBus = () => {
  timex = setTimeout(function () {
    speed++
    $('#speed').text(speed)
    startBus()
  }, 1000)
}

// logging
const logging = (message) => {
  logSection.html(`${message} !!`).fadeIn(2000)
}

const updateBus = (plateNumber, seats, busStatus) => {

  fetch(busUrl, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      "plate": `${plateNumber}`,
      "category": "yutong",
      "seat": `${seats}`,
      "bus_status": `${busStatus}`
    })
  })
    .then(response => response.json())
    .then(res => {
      console.log(res);
    })
}
