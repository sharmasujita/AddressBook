"use strict";

process.env.DEBUG = 'actions-on-google:*';
const express = require("express"),
    bodyParser = require("body-parser"),
    Assistant = require('actions-on-google').ApiAiAssistant,
    addressBookService = require('./services/addressbook.service')

let app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ type: 'application/json'}));

app.post('/', function(req, res) {
    const assistant = new Assistant({request: req, response: res});

    function responseHandler(assistant){

        let intent = req.body.result.metadata.intentName;
        let parameter = req.body.result.parameters;
        let name = req.body.result.parameters.Name;
        let address = req.body.result.parameters.Address;
        let phone = req.body.result.parameters.PhoneNumber;
        let email = req.body.result.parameters.Email;

//switch cases for Api.ai Intents
        switch(intent){
            case 'Add Contact':
                addressBookService.AddContact(name, address, phone , email)
                    .then((res) => {
                        assistant.tell('I have added ' + name + ' to your contact list');
                    });
            case 'Update Contact':
                console.log(".......UPDATE CONTACT.....");
                addressBookService.UpdateContact(name, address, phone, email)
                    .then((res) => {
                        assistant.tell('I have Updated information for  ' + name + ' in your contact list');
                    });
            case 'Delete Contact':
                console.log(".......DELETE CONTACT.....");
                addressBookService.DeleteContact()
                    .then((res) => {
                        assistant.tell(name + ' is removed from your contact list');
                    });
            case 'Get All Contacts':
                console.log('Get All Contacts')
                addressBookService.GetAllContacts()
                    .then((res) => {
                        assistant.tell("Here is the list of all of your contacts");
                    });
            case 'Get Contact By Name':
                console.log("GET CONTACT BY NAME");
                addressBookService.GetContactByName(name)
                    .then((res) => {
                        assistant.tell("Here is the contact information of" + name);
                    })
                
        }
    
};

    assistant.handleRequest(responseHandler);

});

let server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;
    console.log('Magic Happens on port %s', port);
});

module.exports = app;

    

