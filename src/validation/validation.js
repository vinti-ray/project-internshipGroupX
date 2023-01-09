const mongoose = require('mongoose');

//Name Validation

const isValid = function (name) {
  const nameRegex = /^[a-zA-Z ]+$/;
  return nameRegex.test(name);
};

//Email Validation

const isValidEmail = function (email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const isValidMobile = function (mobile){
    const mobailRegex = /^([+]\d{2})?\d{10}$/;
    return mobailRegex.test(mobile);

  };
  const isValidUrl=function(logoLink){
    const urlPattern = /https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;
    return urlPattern.test(logoLink)
  }


  const isValidfullName = function (fullName) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(fullName);
  };


  module.exports = {
    isValid,
    isValidEmail,
    isValidMobile,
    isValidUrl,
    isValidfullName
  }