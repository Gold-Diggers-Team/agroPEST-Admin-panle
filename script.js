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
      var listItemContainer = document.createElement("div");
      listItemContainer.className = "list-item-container";

      var listItem = document.createElement("div");
      listItem.className = "list-item";

      var itemName = document.createElement("h3");
      itemName.textContent = item.name;

      var itemPrice = document.createElement("p");
      itemPrice.textContent = "Price: " + item.price;

      var itemImage = document.createElement("img");
      itemImage.src = item.image; // Assuming 'image' is the URL stored in the database
      itemImage.alt = "Product Image";

      // Create delete button
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      // Use an IIFE (Immediately Invoked Function Expression) to capture the correct value of 'key'
      (function (itemKey) {
        deleteButton.addEventListener("click", function () {
          // Call a function to handle deletion
          deleteItem(itemKey, section);
        });
      })(key);

      // Append elements to the list item
      listItem.appendChild(itemName);
      listItem.appendChild(itemPrice);
      listItem.appendChild(itemImage);
      listItem.appendChild(deleteButton);
      // ... append other elements

      // Append the list item to the container
      scrollViewContainer.appendChild(listItem);
    }
  }
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

      var depName = document.createElement("h3");
      depName.textContent = item.depName;

      var tel = document.createElement("p");
      tel.textContent = "Contact number : " + item.tel;

      var location = document.createElement("p");
      location.textContent = "Location : " + item.location;

      // ... create other elements for other properties

      // Append elements to the list item
      listItem.appendChild(depName);
      listItem.appendChild(tel);
      listItem.appendChild(location);
      // ... append other elements

      // Append the list item to the container
      scrollViewContainer.appendChild(listItem);
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

      var question = document.createElement("h3");
      question.textContent = item.question;

      var answer = document.createElement("p");
      answer.textContent = "Answer: " + item.Answer;

      // Append elements to the list item
      listItem.appendChild(question);
      listItem.appendChild(answer);
      // ... append other elements

      // Append the list item to the container
      scrollViewContainer.appendChild(listItem);
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

function toggleForm() {
  if (form.style.display === "none") {
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

function toggleForm2() {
  if (form2.style.display === "none") {
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

function toggleForm3() {
  if (form3.style.display === "none") {
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

function toggleForm4() {
  if (form4.style.display === "none") {
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
    toggleForm();
  });
}

if (fertilizerButtons.length > 0) {
  fertilizerButtons[0].addEventListener("click", function () {
    toggleForm2();
  });
}

if (informationButtons.length > 0) {
  informationButtons[0].addEventListener("click", function () {
    toggleForm3();
  });
}

if (faqButtons.length > 0) {
  faqButtons[0].addEventListener("click", function () {
    toggleForm4();
  });
}
