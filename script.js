var form = document.getElementById("content-one");
var form2 = document.getElementById("content-two");
var form3 = document.getElementById("content-three");
var form4 = document.getElementById("content-four");

function toggleForm() {
  if (form.style.display === "none") {
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
  var description = document.getElementById("descriptionInfo").value;

  if (!depName) {
    alert("Department name is required");
  } else if (!tel) {
    alert("Telephon number is required");
  } else if (!location) {
    alert("Location is required");
  } else if (!description) {
    alert("Description is required");
  } else {
    saveInformation(depName, tel, description, location);
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

const saveInformation = (depName, tel, description, location) => {
  var newDetails = detailsAgriService.push();
  newDetails.set({
    depName: depName,
    tel: tel,
    description: description,
    location: location,
  });
};

const saveFAQ = (question, Answer) => {
  var newDetails = detailsAgriService.push();
  newDetails.set({
    question: question,
    Answer: Answer,
  });
};

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
