var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;

function initApplication() {
    console.log('Mustang Lite - Starting!'); 
}

function loadIndex() {
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        contactURLArray.length = 0;
        for (i=0; i<contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
    }
    indexRequest.send();
}

function loadContacts() {
    contactArray.length = 0;
    loadingContact = 0;
    console.log("Contacts Loading");

    if (contactURLArray.length > loadingContact) {
       loadNextContact(contactURLArray[loadingContact]);
    }
}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Contact: " + contact.firstName + " " + contact.lastName);
        contactArray.push(contact);
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

        loadingContact++;
        if (contactURLArray.length > loadingContact) {
            console.log("loading info");
            setTimeout(() => {loadNextContact(contactURLArray[loadingContact])}, 1000);
        }
    }

    contactRequest.send();
}

function logContacts() {
    console.log("Contacts Loading");
    setTimeout(() => {console.log("done in 3 seconds")}, 1000);
    setTimeout(() => {console.log("done in 2 seconds")}, 2000);
    setTimeout(() => {console.log("done in 1 second")}, 3000);
    setTimeout(() => {console.log(contactArray)}, 4000);
}