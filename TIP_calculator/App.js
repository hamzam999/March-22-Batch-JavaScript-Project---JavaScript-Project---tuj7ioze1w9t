function custom_input() {
  if (document.getElementById('tip_radio').checked == true) {
    document.getElementById('custom_percent').setAttribute('required', '')
    // console.log('custom clicked')
  }
}

function calculateTip() {
  var bill = document.querySelector('#billamt').value
  var tipPercentage = 0
  if (document.querySelector('input[name = "tip_percent"]:checked') != null) {
    tipPercentage = document.querySelector(
      'input[name="tip_percent"]:checked'
    ).value
  }
  //   if (document.getElementById('tip_radio').checked == true) {
  //     document.getElementById('custom_percent').setAttribute('required', '')
  //     console.log('custom clicked')
  //   }
  if (tipPercentage === 'custom') {
    tipPercentage = document.getElementById('custom_percent').value
    tipPercentage = tipPercentage / 100
  }
  //   console.log(tipPercentage)
  var persons = document.querySelector('#peopleamt').value

  if (persons === '1') {
    document.querySelector('#each').style.display = 'none'
  } else {
    document.querySelector('#each').style.display = 'block'
  }
  var tip = (bill * tipPercentage) / persons
  tip = tip.toFixed(2)
  document.getElementById('total').innerHTML = tip
}
