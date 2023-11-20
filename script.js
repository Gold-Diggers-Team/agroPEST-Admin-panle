var form = document.getElementById("content-one");
var form2 = document.getElementById("content-two");
var form3 = document.getElementById("content-three");
var form4 = document.getElementById("content-four");

const firebaseConfig = {
  apiKey: "AIzaSyDG32cdGdQUzLHSiy_zno2svW1ShhFW4cs",
  authDomain: "admin-panle-e914a.firebaseapp.com",
  databaseURL: "https://admin-panle-e914a-default-rtdb.firebaseio.com",
  projectId: "admin-panle-e914a",
  storageBucket: "admin-panle-e914a.appspot.com",
  messagingSenderId: "460247425901",
  appId: "1:460247425901:web:3f41a470421868280bf064",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const details = firebase.database().ref("form1");
const detailsFertilizer = firebase.database().ref("form2");
const detailsAgriService = firebase.database().ref("form");
const questionAndAnswer = firebase.database().ref("FAQ");

var submitPesticides = document.getElementById("submitPesticides");
var submitFertilizer = document.getElementById("submitFertilizer");
var submitInformation = document.getElementById("submitInformation");
var submitFAQ = document.getElementById("submitFAQ");

var resetPesticides = document.getElementById("resetPesticides");
var resetFertilizer = document.getElementById("resetFertilizer");
var resetInformation = document.getElementById("resetInformation");
var resetFAQ = document.getElementById("resetFAQ");

function GetDetails() {
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var description = document.getElementById("description").value;

  var image = document.getElementById("imageUpload");
  var imageFile = image.files[0];

  var isAvilable = document.getElementById("isAvilable").value;

  if (!name) {
    alert("Pesticide name is required");
  } else if (!price) {
    alert("Price is required");
  } else if (!description) {
    alert("Description is required");
  } else if (!image) {
    alert("Image is required");
  } else if (!isAvilable) {
    alert("IsAvilable is required");
  } else {
    alert("Data added successfully");
    // Convert the image to Base64
    var reader = new FileReader();
    reader.onloadend = function () {
      saveDetails(name, "Rs." + price, description, reader.result, isAvilable);
    };
    reader.readAsDataURL(imageFile);
  }
}

function GetFertlizerDetails() {
  var name = document.getElementById("nameFertilizer").value;
  var price = document.getElementById("priceFertilizer").value;
  var description = document.getElementById("descriptionFertilizer").value;

  var image = document.getElementById("imageUploadFertilizer");
  var imageFile = image.files[0];

  var isAvilableFertlizer = document.getElementById(
    "isAvilableFertlizer"
  ).value;

  if (!name) {
    alert("Fertlizer name is required");
  } else if (!price) {
    alert("Price is required");
  } else if (!description) {
    alert("Description is required");
  } else if (!imageFile) {
    alert("Image is required");
  } else if (!isAvilableFertlizer) {
    alert("IsAvilable is required");
  } else {
    alert("Data added successfully");
    // Convert the image to Base64
    var reader = new FileReader();
    reader.onloadend = function () {
      saveFertlizerDetails(
        name,
        price,
        description,
        reader.result,
        isAvilableFertlizer
      );
    };
    reader.readAsDataURL(imageFile);
  }
}

function GetInformation() {
  var depName = document.getElementById("depName").value;
  var tel = document.getElementById("tel").value;
  var location = document.getElementById("location").value;

  if (!depName) {
    alert("Department name is required");
  } else if (!tel) {
    alert("Telephon number is required");
  } else if (!location) {
    alert("Location is required");
  } else {
    saveInformation(depName, tel, location);
    alert("Data added successfully");
  }
}

function GetFAQ() {
  var question = document.getElementById("question").value;
  var Answer = document.getElementById("Answer").value;

  if (!question) {
    alert("Question is required");
  } else if (!Answer) {
    alert("Answer is required");
  } else {
    saveFAQ(question, Answer);
    alert("Data added successfully");
  }
}

const saveDetails = (name, price, description, image, isAvilable) => {
  var storageRef = firebase.storage().ref();
  var imagesRef = storageRef.child("images/" + name + ".jpg"); // Adjust the path and file name as needed

  // Convert Base64 to Blob
  var byteCharacters = atob(image.split(",")[1]);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], { type: "image/jpeg" });

  // Upload the image to Firebase Storage
  imagesRef.put(blob).then(function (snapshot) {
    // Get the download URL and save it in the Realtime Database
    snapshot.ref.getDownloadURL().then(function (downloadURL) {
      var newDetails = details.push();
      newDetails.set({
        name: name,
        price: price,
        description: description,
        image: downloadURL, // Store the download URL
        isAvilable: isAvilable,
      });
    });
  });
};

const saveFertlizerDetails = (
  name,
  price,
  description,
  image,
  isAvilableFertlizer
) => {
  var storageRef = firebase.storage().ref();
  var imagesRef = storageRef.child("images/" + name + ".jpg"); // Adjust the path and file name as needed

  // Convert Base64 to Blob
  var byteCharacters = atob(image.split(",")[1]);
  var byteNumbers = new Array(byteCharacters.length);

  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], { type: "image/jpeg" });

  // Upload the image to Firebase Storage
  imagesRef.put(blob).then(function (snapshot) {
    // Get the download URL and save it in the Realtime Database
    snapshot.ref.getDownloadURL().then(function (downloadURL) {
      var newDetails = detailsFertilizer.push();
      newDetails.set({
        name: name,
        price: price,
        description: description,
        image: downloadURL, // Store the download URL
        isAvilableFertlizer: isAvilableFertlizer,
      });
    });
  });
};

const saveInformation = (depName, tel, location) => {
  var newDetails = detailsAgriService.push();
  newDetails.set({
    depName: depName,
    tel: tel,
    location: location,
  });
};

const saveFAQ = (question, Answer) => {
  var newDetails = questionAndAnswer.push();
  newDetails.set({
    question: question,
    Answer: Answer,
  });
};

function deleteItem(key, section) {
  // Ask for confirmation
  var confirmDelete = confirm("Are you sure you want to delete this item?");

  if (confirmDelete) {
    // Reference to the item in the database
    var itemRef;

    // Determine the appropriate reference based on the section
    switch (section) {
      case "details":
        itemRef = details.child(key);
        break;
      case "detailsFertilizer":
        itemRef = detailsFertilizer.child(key);
        break;
      case "detailsAgriService":
        itemRef = detailsAgriService.child(key);
        break;
      case "questionAndAnswer":
        itemRef = questionAndAnswer.child(key);
        break;

      default:
        console.error("Invalid section:", section);
        return;
    }

    // Remove the item from the database
    itemRef
      .remove()
      .then(function () {
        console.log(
          `Item with key ${key} deleted successfully from section ${section}`
        );
      })
      .catch(function (error) {
        console.error("Error deleting item:", error);
      });
  }
}

//Display pesticides and fertlizer
function displayDataInScrollView(data, section) {
  var scrollViewContainer = document.getElementById("scrollViewContainer");

  // Clear previous content
  scrollViewContainer.innerHTML = "";

  // Iterate over the data and create elements for each item
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var item = data[key];

      // Create elements
      var listItem = document.createElement("div");
      listItem.className = "list-item";

      var buttonSectiion = document.createElement("div");
      buttonSectiion.className = "delete-update-button";

      var itemName = document.createElement("h3");
      itemName.textContent = item.name;

      var isAvilable = document.createElement("p");
      isAvilable.textContent = item.isAvilable;

      var isAvilableFertlizer = document.createElement("p");
      isAvilableFertlizer.textContent = item.isAvilableFertlizer;

      var itemPrice = document.createElement("p");
      itemPrice.textContent = "Price: " + item.price;

      var itemImage = document.createElement("img");
      itemImage.src = item.image; // Assuming 'image' is the URL stored in the database
      itemImage.alt = "Product Image";

      // Create delete button
      var deleteButton = document.createElement("button");
      deleteButton.className = "botton-delete";
      deleteButton.textContent = "Delete";
      // Use the let keyword to capture the correct value of 'key'
      let currentKey = key;
      deleteButton.addEventListener("click", function () {
        // Call a function to handle deletion
        deleteItem(currentKey, section);
      });

      // Create update button
      var updateButton = document.createElement("button");
      updateButton.className = "botton-update";
      updateButton.textContent = "Update";
      // Use the let keyword to capture the correct value of 'key'
      let updateKey = key;
      updateButton.addEventListener("click", function () {
        // Call a function to handle update
        updateItem(updateKey, section, item);
      });

      // Append elements to the list item
      listItem.appendChild(itemName);
      listItem.appendChild(itemPrice);
      listItem.appendChild(isAvilable);
      listItem.appendChild(isAvilableFertlizer);
      listItem.appendChild(itemImage);
      listItem.append(buttonSectiion);
      buttonSectiion.appendChild(deleteButton);
      buttonSectiion.appendChild(updateButton);
      // ... append other elements

      // Append the list item to the container
      scrollViewContainer.prepend(listItem);
    }
  }
}

function updateItem(key, section) {
  // Fetch the latest details from Firebase using the key
  var itemRef;

  // Determine the appropriate reference based on the section
  switch (section) {
    case "details":
      itemRef = details.child(key);
      break;
    case "detailsFertilizer":
      itemRef = detailsFertilizer.child(key);
      break;
    case "detailsAgriService":
      itemRef = detailsAgriService.child(key);
      break;
    // Add other cases for different sections as needed
    case "questionAndAnswer":
      itemRef = questionAndAnswer.child(key);
      break;
    default:
      console.error("Invalid section:", section);
      return;
  }

  // Fetch the updated details
  itemRef.once("value").then(function (snapshot) {
    var updatedItem = snapshot.val();

    // Now you have the updated details, you can perform the update logic
    console.log("Update item with key:", key);
    console.log("Item details:", updatedItem);

    // Populate the form fields with the existing data
    switch (section) {
      case "details":
        document.getElementById("name").value = updatedItem.name;
        document.getElementById("price").value = updatedItem.price;
        document.getElementById("description").value = updatedItem.description;
        document.getElementById("isAvilable").value = updatedItem.isAvilable;
        toggleForm("details");
        break;
      case "detailsFertilizer":
        document.getElementById("nameFertilizer").value = updatedItem.name;
        document.getElementById("priceFertilizer").value = updatedItem.price;
        document.getElementById("descriptionFertilizer").value =
          updatedItem.description;
        document.getElementById("isAvilableFertlizer").value =
          updatedItem.isAvilableFertlizer;
        toggleForm2("detailsFertilizer");
        break;
      case "detailsAgriService":
        document.getElementById("depName").value = updatedItem.depName;
        document.getElementById("tel").value = updatedItem.tel;
        document.getElementById("location").value = updatedItem.location;
        toggleForm3("detailsAgriService");
        break;
      case "questionAndAnswer":
        document.getElementById("question").value = updatedItem.question;
        document.getElementById("Answer").value = updatedItem.Answer;
        toggleForm4("questionAndAnswer");
        break;
      default:
        console.error("Invalid section:", section);
        return;
    }

    // Remove existing event listeners to avoid multiple executions
    if (section === "details") {
      submitPesticides.removeEventListener("click", handleUpdate);
      submitPesticides.addEventListener("click", function () {
        // Call a function to handle the update
        handleUpdate(key, section);
      });
    } else if (section === "detailsFertilizer") {
      submitFertilizer.removeEventListener("click", handleUpdate);
      submitFertilizer.addEventListener("click", function () {
        // Call a function to handle the update
        handleUpdate(key, section);
      });
    } else if (section === "detailsAgriService") {
      submitInformation.removeEventListener("click", handleUpdate);
      submitInformation.addEventListener("click", function () {
        // Call a function to handle the update
        handleUpdate(key, section);
      });
    } else if (section === "questionAndAnswer") {
      submitFAQ.removeEventListener("click", handleUpdate);
      submitFAQ.addEventListener("click", function () {
        // Call a function to handle the update
        handleUpdate(key, section);
      });
    }

    // You can update the UI or perform other actions here
  });
}

// Function to handle the update after modifying the data in the form
function handleUpdate(key, section) {
  // Retrieve the modified data from the form
  var updatedName,
    updatedPrice,
    updatedDescription,
    updatedIsAvailable,
    updatedDepName,
    updatedLocation,
    updatedTel,
    updatedQuestion,
    updatedAnswer;

  // Determine the appropriate form elements based on the section
  switch (section) {
    case "details":
      updatedName = document.getElementById("name").value;
      updatedPrice = document.getElementById("price").value;
      updatedDescription = document.getElementById("description").value;
      updatedIsAvailable = document.getElementById("isAvilable").value;
      break;
    case "detailsFertilizer":
      updatedName = document.getElementById("nameFertilizer").value;
      updatedPrice = document.getElementById("priceFertilizer").value;
      updatedDescription = document.getElementById(
        "descriptionFertilizer"
      ).value;
      updatedIsAvailable = document.getElementById("isAvilableFertlizer").value;
      break;
    case "detailsAgriService ":
      updatedDepName = document.getElementById("depName").value;
      updatedLocation = document.getElementById("location").value;
      updatedTel = document.getElementById("tel").value;
      break;
    case "questionAndAnswer":
      updatedQuestion = document.getElementById("question").value;
      updatedAnswer = document.getElementById("Answer").value;
      break;
    default:
      console.error("Invalid section:", section);
      return;
  }

  // Update the data in the database
  var itemRef;

  // Determine the appropriate reference based on the section
  switch (section) {
    case "details":
      itemRef = details.child(key);
      break;
    case "detailsFertilizer":
      itemRef = detailsFertilizer.child(key);
      break;
    case "detailsAgriService ":
      itemRef = detailsAgriService.child(key);
      break;
    case "questionAndAnswer ":
      itemRef = questionAndAnswer.child(key);
      break;
    default:
      console.error("Invalid section:", section);
      return;
  }

  // Update the data in the database
  itemRef.update({
    name: updatedName,
    price: updatedPrice,
    description: updatedDescription,
    isAvilable: updatedIsAvailable,
    depName: updatedDepName,
    tel: updatedTel,
    location: updatedLocation,
    question: updatedQuestion,
    tel: updatedTel,
    // Update other fields as needed
  });

  // Hide the form after updating
  switch (section) {
    case "details":
      form.style.display = "none";
      break;
    case "detailsFertilizer":
      form2.style.display = "none";
      break;
    case "detailsAgriService":
      form3.style.display = "none";
      break;
    case "questionAndAnswer ":
      form4.style.display = "none;";
      break;
    default:
      console.error("Invalid section:", section);
      return;
  }

  // Clear the form fields
  ClearDetails();

  // Reattach the original event listener for adding new items
  switch (section) {
    case "details":
      submitPesticides.removeEventListener("click", handleUpdate);
      submitPesticides.addEventListener("click", GetDetails);
      break;
    case "detailsFertilizer":
      submitFertilizer.removeEventListener("click", handleUpdate);
      submitFertilizer.addEventListener("click", GetFertlizerDetails);
      break;
    case "detailsAgriService":
      submitInformation.removeEventListener("click", handleUpdate);
      submitInformation.addEventListener("click", GetInformation);
    case "questionAndAnswer ":
      submitFAQ.removeEventListener("click", handleUpdate);
      submitFAQ.addEventListener("click", GetFAQ);
    default:
      console.error("Invalid section:", section);
      return;
  }

  // You can update the UI or perform other actions here
}

//Dsplay agriculure information
function displayAgriInfoInScrollView(data, section) {
  var scrollViewContainer = document.getElementById("scrollViewContainer");

  // Clear previous content
  scrollViewContainer.innerHTML = "";

  // Iterate over the data and create elements for each item
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var item = data[key];

      // Create elements
      var listItem = document.createElement("div");
      listItem.className = "list-item-two";

      var buttonSectiion = document.createElement("div");
      buttonSectiion.className = "delete-update-button";

      var depName = document.createElement("h3");
      depName.textContent = item.depName;

      var tel = document.createElement("p");
      tel.textContent = "Contact number : " + item.tel;

      var location = document.createElement("p");
      location.textContent = "Location : " + item.location;

      // Create delete button
      var deleteButton = document.createElement("button");
      deleteButton.className = "botton-delete";
      deleteButton.textContent = "Delete";
      // Use an IIFE (Immediately Invoked Function Expression) to capture the correct value of 'key'
      (function (itemKey) {
        deleteButton.addEventListener("click", function () {
          // Call a function to handle deletion
          deleteItem(itemKey, section);
        });
      })(key);

      // Create update button
      var updateButton = document.createElement("button");
      updateButton.className = "botton-update";
      updateButton.textContent = "Update";
      // Use the let keyword to capture the correct value of 'key'
      let updateKey = key;
      updateButton.addEventListener("click", function () {
        // Call a function to handle update
        updateItem(updateKey, section, item);
      });

      // Append elements to the list item
      listItem.appendChild(depName);
      listItem.appendChild(tel);
      listItem.appendChild(location);
      listItem.append(buttonSectiion);
      buttonSectiion.appendChild(deleteButton);
      buttonSectiion.appendChild(updateButton);
      // ... append other elements

      // Append the list item to the container
      scrollViewContainer.prepend(listItem);
    }
  }
}
//Display FAQuestion
function displayFAQuestionInScrollView(data, section) {
  var scrollViewContainer = document.getElementById("scrollViewContainer");

  // Clear previous content
  scrollViewContainer.innerHTML = "";

  // Iterate over the data and create elements for each item
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var item = data[key];

      // Create elements
      var listItem = document.createElement("div");
      listItem.className = "list-item-two";

      var buttonSectiion = document.createElement("div");
      buttonSectiion.className = "delete-update-button";

      var question = document.createElement("h3");
      question.textContent = item.question;

      var answer = document.createElement("p");
      answer.textContent = "Answer: " + item.Answer;

      // Create delete button
      var deleteButton = document.createElement("button");
      deleteButton.className = "botton-delete";
      deleteButton.textContent = "Delete";
      // Use an IIFE (Immediately Invoked Function Expression) to capture the correct value of 'key'
      (function (itemKey) {
        deleteButton.addEventListener("click", function () {
          // Call a function to handle deletion
          deleteItem(itemKey, section);
        });
      })(key);

      // Create update button
      var updateButton = document.createElement("button");
      updateButton.className = "botton-update";
      updateButton.textContent = "Update";
      // Use the let keyword to capture the correct value of 'key'
      let updateKey = key;
      updateButton.addEventListener("click", function () {
        // Call a function to handle update
        updateItem(updateKey, section, item);
      });

      // Append elements to the list item

      listItem.appendChild(question);
      listItem.appendChild(answer);
      listItem.append(buttonSectiion);
      buttonSectiion.append(deleteButton);
      buttonSectiion.appendChild(updateButton);
      // ... append other elements

      // Append the list item to the container
      scrollViewContainer.prepend(listItem);
    }
  }
}

function ClearDetails() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
  document.getElementById("imageUpload").value = "";
  document.getElementById("isAvilable").value = "";

  document.getElementById("nameFertilizer").value = "";
  document.getElementById("priceFertilizer").value = "";
  document.getElementById("descriptionFertilizer").value = "";
  document.getElementById("imageUploadFertilizer").value = "";
  document.getElementById("isAvilableFertlizer").value = "";

  document.getElementById("location").value = "";
  document.getElementById("tel").value = "";
  document.getElementById("depName").value = "";
  document.getElementById("descriptionInfo").value = "";

  document.getElementById("question").value = "";
  document.getElementById("Answer").value = "";
}

submitPesticides.addEventListener("click", function () {
  GetDetails();
});

submitFertilizer.addEventListener("click", function () {
  GetFertlizerDetails();
});

submitInformation.addEventListener("click", function () {
  GetInformation();
});

submitFAQ.addEventListener("click", function () {
  GetFAQ();
});

resetPesticides.addEventListener("click", function () {
  ClearDetails();
});
resetFertilizer.addEventListener("click", function () {
  ClearDetails();
});
resetInformation.addEventListener("click", function () {
  ClearDetails();
});
resetFAQ.addEventListener("click", function () {
  ClearDetails();
});

function toggleForm(formToShow) {
  if (formToShow === "details") {
    details.once("value").then(function (snapshot) {
      var data = snapshot.val();
      displayDataInScrollView(data, "details");
    });

    form.style.display = "block";
    form2.style.display = "none";
    form3.style.display = "none";
    form4.style.display = "none";
  } else {
    form.style.display = "none";
  }
}

function toggleForm2(formToShow) {
  if (formToShow === "detailsFertilizer") {
    detailsFertilizer.once("value").then(function (snapshot) {
      var data = snapshot.val();
      displayDataInScrollView(data, "detailsFertilizer");
    });

    form2.style.display = "block";
    form.style.display = "none";
    form3.style.display = "none";
    form4.style.display = "none";
  } else {
    form2.style.display = "none";
  }
}

function toggleForm3(formToShow) {
  if (formToShow === "detailsAgriService") {
    detailsAgriService.once("value").then(function (snapshot) {
      var data = snapshot.val();
      displayAgriInfoInScrollView(data, "detailsAgriService");
    });

    form3.style.display = "block";
    form.style.display = "none";
    form2.style.display = "none";
    form4.style.display = "none";
  } else {
    form3.style.display = "none";
  }
}

function toggleForm4(formToShow) {
  if (formToShow === "questionAndAnswer") {
    questionAndAnswer.once("value").then(function (snapshot) {
      var data = snapshot.val();
      displayFAQuestionInScrollView(data, "questionAndAnswer");
    });
    form4.style.display = "block";
    form3.style.display = "none";
    form.style.display = "none";
    form2.style.display = "none";
  } else {
    form4.style.display = "none";
  }
}

var pesticidesButtons = document.getElementsByClassName("pesticides");
var fertilizerButtons = document.getElementsByClassName("fertilizer");
var informationButtons = document.getElementsByClassName("information");
var faqButtons = document.getElementsByClassName("faq");

if (pesticidesButtons.length > 0) {
  pesticidesButtons[0].addEventListener("click", function () {
    toggleForm("details");
  });
}

if (fertilizerButtons.length > 0) {
  fertilizerButtons[0].addEventListener("click", function () {
    toggleForm2("detailsFertilizer");
  });
}

if (informationButtons.length > 0) {
  informationButtons[0].addEventListener("click", function () {
    toggleForm3("detailsAgriService");
  });
}

if (faqButtons.length > 0) {
  faqButtons[0].addEventListener("click", function () {
    toggleForm4("questionAndAnswer");
  });
}
