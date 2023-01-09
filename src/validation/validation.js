const mongoose = require('mongoose');

//______________________Name Validation____________

const isValid = function (name) {
  const nameRegex = /^[a-zA-Z ]+$/;
  return nameRegex.test(name);
};

//____________________Email Validation_________________

const isValidEmail = function (email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

//_____________________mobile number validation_____________________
  const isValidMobile = function (mobile){
    const mobailRegex = /^([+]\d{2})?\d{10}$/;
    return mobailRegex.test(mobile);

  };

  //____________________validate url_______________________
  const isValidUrl=function(logoLink){
    const urlPattern = /https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;
    return urlPattern.test(logoLink)
  }

//____________________validate fullName___________________________
  const isValidfullName = function (fullName) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(fullName);
  };

//____________________export_______________________________

  module.exports = {
    isValid,
    isValidEmail,
    isValidMobile,
    isValidUrl,
    isValidfullName
  }