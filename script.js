"use strict";

// TAGS

const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const modalWindow = document.querySelector(".modal-overlay");

const Modal = {
  open() {
    modalWindow.classList.add("active");
  },
  close() {
    modalWindow.classList.remove("active");
  },
};
