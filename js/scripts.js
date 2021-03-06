///BACK END

var count = 1;

var contacts = [];
var numbers = [];

//intializes google maps
var marker;
function initMap() {
  var meadows = {lat: 45.333067, lng: -121.655631};

  var map = new google.maps.Map(document.getElementById('map'), {
   zoom: 10,
   center: meadows
  });
  var image = 'http://images.goodsam.com/goodsam.com/icon/campground/icon-big-rigs.png';
    marker = new google.maps.Marker({
    position: meadows,
    map: map,
    animation: google.maps.Animation.BOUNCE,
    icon: image,
  });
}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
// contact object paramaters
function Contact(first, last, weekend, number, carrier, activity, gender){
  this.firstName = first;
  this.lastName = last;
  this.weekend = weekend;
  this.number = number;
  this.carrier = carrier;
  this.activity = activity;
  this.gender = gender;
  this.sendText = number + carrier;

}

Contact.prototype.firstAndLast = function () {
  return this.firstName + " "+this.lastName;
};

Contact.prototype.guestPrint = function () {
var emoji;
var activity;

  console.log(this.gender)
  switch(this.gender) {
    case "male":
      emoji = '<img class="emoji" src="images/manpage.png" alt="person emji"><br>'
      break;
    case "female":
      emoji = '<img class="emoji" src="images/womanpage.png" alt="person emji"><br>'
      break;
    case "undefined":
      emoji = '<img class="emoji" src="images/unisex.png" alt="person emji"><br>'
      break;
  }
  switch(this.activity) {
    case "ski":
      activity = '<img class="tiny" src="images/ski.png" alt="person emji"><br>'
      break;
    case "snowboard":
      activity = '<img class="tiny" src="images/snowboard.png" alt="person emji"><br>'
      break;
  }
  return emoji + this.firstName + " "+this.lastName + "<br><p>" + this.weekend + activity + "</p>";
}
Contact.prototype.sendMail = function () {
  if(count < 12){

    window.location.href = 'mailto:' + this.sendText + '?subject=Ski Confirmation' + '&body=' + message;
    numbers.push(this.sendText);
    console.log(numbers);

  }else if(count === 12) {
    console.log(numbers)
    numbers = numbers.join();
    console.log(numbers)
    alert()
    window.location.href = 'mailto:' + numbers + '?subject=Ski Confirmation' + '&body= The Bus is full! Get Ready!' ;
  }
}



function resetFields(){
  $("input#firstName").val("");
  $("input#lastName").val("");
  $("input#phoneNumber").val("");
  $("input#street").val("");
  $("input#city").val("");
  $("input#state").val("");
}
function progressBar(){
  var progress = count * (100/12);
  $("#busMeter").show();
  $(".updatedBar").html('<div class="progress">' +

  '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ' + progress + '%; height: 30px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>' +
  '</div>');
  if (count > 11){

    $("#fire2").html('<img src="images/fire.png" alt=""><img src="images/fire.png" alt=""><img src="images/fire.png" alt=""><img src="images/fire.png" alt="">')
    $(".updatedBar").html('<div class="progress">' +
    '<div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: 100%; height: 30px;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">FULL BUSS. LESSSSS GOOOOOO</div>' +
    '</div>')
    $("#fire").html('<img src="images/fire.png" alt=""><img src="images/fire.png" alt=""><img src="images/fire.png" alt=""><img src="images/fire.png" alt="">')
  }
  count ++;
}
// var phoneNumber;
// var carrier;
// var message;
//
// var email = phoneNumber + carrier;
//
//
// function sendMail() {
//   window.location.href = 'mailto:' + email + '?subject=Ski Confirmation' + '&body=' + message;
// }
function weekendDisplay(weekendInputted){
  if (weekendInputted === "11/22") {
    $("#trip-info h3").text("Mt Hood - November 22 - November 24");
    $("#trip-info p").text("We are hitting Mt Hood on November 22nd. Tag along for a great time.");
    $("#trip-info").show();
  } else if (weekendInputted === "12/12") {
    $("#trip-info h3").text("Mt Hood - December 12 - December 14");
    $("#trip-info p").text("We are hitting Mt Hood on November 22nd. Tag along for a great time.");
    $("#trip-info").show();
  } else if (weekendInputted === "1/4") {
    $("#trip-info h3").text("Mt Hood - January 1 - January 3");
    $("#trip-info p").text("We are hitting Mt Hood on November 22nd. Tag along for a great time.");
    $("#trip-info").show();
  } else if (weekendInputted === "1/22") {
    $("#trip-info h3").text("Mt Hood - January 22 - January 24");
    $("#trip-info p").text("We are hitting Mt Hood on November 22nd. Tag along for a great time.");
    $("#trip-info").show();
  } return;
}

/////FRONT END
$(document).ready(function() {
  $('.carousel').carousel({
      interval: 2500
    });

  $("#signUpForm").submit(function(event) {
    event.preventDefault();
    if(count <= 12){
      var firstNameInputted = $("#firstName").val();
      var lastNameInputted = $("#lastName").val();
      var weekendInputted = $("#weekendInput").val();
      var phoneNumber = parseInt($("#phoneNumber").val());
      var carrier = $("#carrier").val();
      var activityInputted = $("#activityInput").val();
      var gender = $("input:radio[name=gender]:checked").val();

      var newContact = new Contact(firstNameInputted, lastNameInputted, weekendInputted, phoneNumber, carrier, activityInputted, gender);


      contacts.push(newContact);

      message = firstNameInputted + " your Ski Trip Has Been Confirmed";

      email = phoneNumber + carrier;
      $("#guest" + count).append("<div class='well'>"+ newContact.guestPrint() + "</div>")

      progressBar();
      resetFields();
      // sendMail();
      newContact.sendMail();


      }else if(count > 12){
      alert("Bus Is Full!");

    }
  });
  $("#weekendInput").change(function(){

    var weekendInputted = $("#weekendInput").val();
    weekendDisplay(weekendInputted);
  });

});
