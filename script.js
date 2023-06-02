document.addEventListener('DOMContentLoaded', function() {
  var calculateButton = document.getElementById('calculateButton');
  var birthYearInput = document.getElementById('birthYear');
  var log = document.getElementById('log');

  function createDiv() {
    var birthYear = sanitizeInput(birthYearInput.value);
    if (!birthYear) {
      alert('Please enter a valid birth year.');
      return;
    }

    var newDiv = document.createElement('div');
    var ageData = calculateAge(birthYear);
    if (ageData.age < 0) {
      alert('Invalid birth year. Please enter a birth year in the past.');
      return;
    }
    var primeYearData = getPrimeYear(ageData.age, birthYear);
    var primeYear = primeYearData.year;
    var ageInPrimeYear = primeYearData.ageInPrimeYear;
    var timestamp = getTimestamp();
    newDiv.innerHTML = 'Birth Year: ' + birthYear + ' | Age: ' + ageData.age + ' | Prime Year: <strong>' + primeYear + '</strong> | Age in Prime Year: ' + ageInPrimeYear + ' | Created at: ' + timestamp;
    log.appendChild(newDiv);

    // Clear the input field after creating the div
    birthYearInput.value = '';
  }

  calculateButton.addEventListener('click', createDiv);
  birthYearInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      createDiv();
    }
  });

  function sanitizeInput(input) {
    // Remove any non-digit characters from the input
    var sanitizedInput = input.replace(/\D/g, '');
    return sanitizedInput;
  }

  function calculateAge(birthYear) {
    var currentYear = new Date().getFullYear();
    var age = currentYear - birthYear;
    return { age: age };
  }

  function isPrimeNumber(num) {
    if (num <= 1) {
      return false;
    }
    for (var i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  function getPrimeYear(age, birthYear) {
    var currentYear = new Date().getFullYear();
    var primeYear = currentYear + (age - (currentYear - birthYear));
    var ageInPrimeYear = age;
    while (!isPrimeNumber(ageInPrimeYear)) {
      primeYear++;
      ageInPrimeYear++;
    }
    return { year: primeYear, ageInPrimeYear: ageInPrimeYear };
  }

  function getTimestamp() {
    var date = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = date.toLocaleDateString(undefined, options);
    var time = date.toLocaleTimeString();
    return formattedDate + ', ' + time;
  }
});
