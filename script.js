// Creating the schedule from 8AM-4PM and appending to the schedule container. You can adjust the start and 
// end hours to set the schedule to your business hours.
var startHour = 8, endHour = 4 + 12;
for (let i=startHour; i <= endHour; i++) {
  var hour =i; 
  var ampm ="AM";
  if (hour >11) {ampm = "PM"}
  if (hour >12) { hour = hour -12; }
  $('#schedulecontainer').append(`<div id="hour-${i}" class="row time-block">
  <div class="col-2 col-md-1 hour text-center py-3">${hour}${ampm}</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
  <i class="fas fa-save" aria-hidden="true"></i>
  </button>
  </div>`);
}
// Run this function once the document is ready.
$(function () {
  // The save button allows you to get the text and save to local storage.
  $('.saveBtn').on('click', function () {
    var elem = $(this).prev();
    var scheduleText = elem.val()
    var id = elem.parent().attr("id");
    localStorage.setItem(id, scheduleText);
  });
  // The hourUpdater function sets each time block to past, present and future.
  function hourUpdater() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
     $(this).removeClass("past").removeClass("present").removeClass("future");
      var id=$(this).attr("id");
      id = id.substring(5);
      id = Number(id);
      
     if (currentHour === id) {
      $(this).addClass("present")
     }
     if (currentHour < id) {
      $(this).addClass("future")
     }
     if (currentHour > id) {
      $(this).addClass("past")
     }
    });
  }
  // Setting the past, present and future when the page is loaded.
  hourUpdater();
  // Keep schedule time block colors updated. Gray for past, red for present, and green for future.
  setInterval(hourUpdater, 15000);
  // Load any saved data from localStorage.
  for (let i=startHour; i <= endHour; i++) {
    $('#hour-'+i+' .description').val(localStorage.getItem('hour-'+i));
  }
  // Display current day on page.
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});