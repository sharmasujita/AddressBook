const mongoose = require("mongoose"),
    q = require('q'),
    addressBook = require('../models/addressbook.model'),
    config = require('../config.json'),
    uri = config.env.local.contacts;

// mongo connection
mongoose.connect(uri, function(err, res) {
  if (err) {
      console.log("ERROR connecting to: " + uri + ". " + err);
  } else {
      console.log("Succeeded connected to: " + uri);
  }
});

module.exports = {
    AddContact : AddContact,
    GetAllContacts : GetAllContacts,
    GetContactByName: GetContactByName,
    UpdateContact: UpdateContact,
    DeleteContact: DeleteContact
};

//Add AddContact
function AddContact(name, address, phone , email) {
    let deferred = q.defer();
   
    let newContact = new addressBook({
            Name: name,
            Address: address,
            PhoneNumber: phone,
            Email: email
        });

    newContact.save(function(err, result) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else if (result) {
            console.log(result);
            deferred.resolve(result);
        }
    });

    return deferred.promise;
};

//getAllContacts
function GetAllContacts() {
    let deferred = q.defer();

    addressBook.find({}, (err, contacts) => {
        if(err) {
            console.error(err);
            deferred.reject(err);
        }
        if(contacts) {
            console.log(contacts);
            deferred.resolve(contacts);
        }
    });

    return deferred.promise;
};

//GetContactByName
function GetContactByName(name) {

    let deferred = q.defer();
    addressBook.find({'name' : name}, (err, contact) =>{
        if(err) {
            console.error(err);
            deferred.reject(err);
        }
        if(contact) {
            console.log(contact);
            deferred.resolve(contact);
        }
    });
    return deferred.promise;
};

//UpdateContact
function UpdateContact(name, address, phone, email) {

    let deferred = q.defer();

    let params = {}

    if (name) {
        params = Object.assign(params, { "name" : name});
    }

    if (address) {
        params = Object.assign(params, { "address" : address});
    }

    if (phone) {
        params = Object.assign(params, { "phone" : phone});
    }

    if (email) {
        params = Object.assign(params, { "email" : email});
    }

    addressBook.findOneAndUpdate({'name' : name} , params, { upsert: true}, (err, contact) =>{
        if(err) {
            console.error(err);
            deferred.reject(err);
        }
        if(contact) {
            console.log(contact);
            deferred.resolve(contact);
        }
    });

    return deferred.promise;
};

//Delete Contact
function DeleteContact() {
    let deferred = q.defer();

    addressBook.remove((err, contact) => {
        if(err) {
            console.error(err);
            deferred.reject(err);
        }
        if(contact) {
            console.log(contact);
            deferred.resolve(contact);
        }
    });

    return deferred.promise;
};

