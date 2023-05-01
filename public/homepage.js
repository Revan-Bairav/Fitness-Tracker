// Initialize the Firebase app
const firebaseConfig = {
    // Your Firebase configuration goes here
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  const database = firebase.database();
  
  // Get a reference to the current user
  const user = firebase.auth().currentUser;
  
  // Get a reference to the "workouts" node in the database
  const workoutsRef = database.ref("workouts");
  
  // Get a reference to the HTML elements we'll be updating
  const workoutsList = document.querySelector("#workouts-list");
  
  // Listen for changes to the "workouts" node in the database
  workoutsRef.on("value", (snapshot) => {
    // Clear the list of workouts
    workoutsList.innerHTML = "";
  
    // Loop through each workout in the snapshot
    snapshot.forEach((childSnapshot) => {
      // Get the workout data
      const workout = childSnapshot.val();
  
      // Create a new list item element
      const li = document.createElement("li");
  
      // Set the text of the list item to the workout name
      li.textContent = workout.name;
  
      // Add the list item to the list of workouts
      workoutsList.appendChild(li);
    });
  });
  
  // Listen for clicks on the "Add Workout" button
  const addWorkoutButton = document.querySelector("#add-workout-button");
  addWorkoutButton.addEventListener("click", () => {
    // Get the name of the new workout from the input field
    const name = document.querySelector("#new-workout-name").value;
  
    // Create a new workout object
    const workout = {
      name: name,
    };
  
    // Push the new workout to the database
    workoutsRef.push(workout);
  
    // Clear the input field
    document.querySelector("#new-workout-name").value = "";
  });
// Get the navigation links and header content elements
const navLinks = document.querySelectorAll("nav ul li a");
const headerContent = document.querySelector(".header-content");

// Add a class of "active" to the current navigation link
navLinks.forEach(link => {
  link.addEventListener("click", function() {
    navLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");
  });
});

// Scroll to the main content when the "Get Started" button is clicked
headerContent.querySelector(".btn").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector("main").scrollIntoView({ behavior: "smooth" });
});
  