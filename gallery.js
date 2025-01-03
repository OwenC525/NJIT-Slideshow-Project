let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer();
  // Select the moreIndicator button and add a click event to:
    $('.moreIndicator').on('click', function () {

  // - toggle the rotation classes (rot90 and rot270)
      $('.moreIndicator').toggleClass('rot90');

  // - slideToggle the visibility of the .details section
      $('.details').slideToggle();

    })

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').on('click', showNextPhoto);

  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').on('click', showPrevPhoto);

  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  // Use $.ajax here to request the JSON data from mUrl
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images
      const image = mImages[mCurrentIndex];
      $('#photo').attr('src', image.imgPath);
      $('.location').text(`${image.imgLocation}`);
      $('.description').text(`${image.description}`);
      $('.country').text(`${image.country}`);

      console.log("Test if the JSON file is loaded")
    },
    error: function() {
      console.log("error!")
    }
  // On success, parse the JSON and push each image object into mImages array
  // After JSON is loaded, call swapPhoto() to display the first image
})
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  
  const image = mImages[mCurrentIndex];            // Access mImages[mCurrentIndex] to update the image source and details
  console.log(image.imgPath);    // Update the #photo element's src attribute with the current image's path
    $('#photo').attr('src', image.imgPath);   // Update the .location, .description, and .date elements with the current image's details
    $('.location').text(image.imgLocation);
    $('.description').text(image.description);
    $('.country').text(image.country);
  
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  // Increment mCurrentIndex and call swapPhoto()
  mCurrentIndex++;
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
  if (mCurrentIndex == mImages.length) {
    mCurrentIndex = 0; 
  }
  swapPhoto()
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  // Decrement mCurrentIndex and call swapPhoto()
  mCurrentIndex--;
  // Ensure it loops to the end if mCurrentIndex is less than 0
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1;  // Set to last image
  }
  
  swapPhoto();

}

// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
  setInterval(showNextPhoto, mWaitTime);

}
