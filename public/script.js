const busUrl = 'http://localhost:5000/api/buses/1'

const otherParam = {
  headers:{
    'Content-type':'application/json; charset=UTF-8'
  },
  method: 'GET'
}
// getting the bus info

window.fetch(busUrl, otherParam)
  .then(data => {return data.json()})
  .then(res => {
    let data = res.busObject[0]
    let speed = 0
    let busState = 'rest'
    let passengerNum = 0
    let totalSeats = 00
    console.log(data)
  })
  .catch(err => console.log(err))






$('#passenger').html(passengerNum)
$('#seats').html(totalSeats)

const logSection = $('#log')

$('#start').click(() => {
  if (busState === 'rest' || busState === 'stop') {
    startBus()
    busState = 'moving'
    logging('The Bus is moving')
  }
  console.log(busState)
})

$('#stop').click(() => {
  clearTimeout(timex)
  logging('Stopping The Bus!')
  busState = 'stop'
  console.log(busState)
})

$('#reset').click(() => {
  speed = 0
  $('#speed').html('000')
  busState = 'rest'
})

$('#speedUp').hover(() => {
  speed = speed + 10
  logging('Speeding Up The Bus!')
})

$('#slowDown').hover(() => {
  if (speed > 10) {
    speed = speed - 10
    logging('Slowing Down The bus!')
  }
})

// adding passengers
$('#addP').click(() => {
  if (busState !== 'moving' && totalSeats > 0) {
    passengerNum++
    totalSeats--
    $('#passenger').html(passengerNum)
    $('#seats').html(totalSeats)
  } else if (totalSeats === 0) {
    logging(' All Seats are taken! ')
  } else logging('stop the car to add or remove passengers')
})

// removing passengers
$('#removeP').click(() => {
  if (busState !== 'moving' && passengerNum > 0) {
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
