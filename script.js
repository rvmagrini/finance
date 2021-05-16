"use strict";

// TAGS

const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const modalWindow = document.querySelector(".modal-overlay");

const Modal = {
  open() {
    modalWindow.classList.add("active");
    document.querySelector(".form .alert").innerHTML = "";
  },
  close() {
    modalWindow.classList.remove("active");
  },
  save() {},
};

const Movements = {
  all: [
    { description: "Electricity", amount: -40, date: "11/05/2021" },
    { description: "Internet", amount: -40, date: "08/05/2021" },
    { description: "Health Insurance", amount: -160, date: "05/05/2021" },
    { description: "Garage", amount: -550, date: "02/05/2021" },
    { description: "Salary", amount: 7500, date: "01/05/2021" },
  ],

  add(movement) {
    Movements.all.push(movement);
    App.reload();
  },

  remove(index) {
    Movements.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    let income = 0;
    Movements.all.forEach((movement) => {
      if (movement.amount > 0) {
        income += movement.amount;
      }
    });
    return income;
  },
  spending() {
    let spending = 0;
    Movements.all.forEach((movement) => {
      if (movement.amount < 0) {
        spending += movement.amount;
      }
    });
    return spending;
  },
  balance() {
    return Movements.incomes() + Movements.spending();
  },
};

const DOM = {
  movementsContainer: document.querySelector(".data-table tbody"),

  addMovement(movement, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLMovements(movement);

    DOM.movementsContainer.appendChild(tr);
  },

  innerHTMLMovements(movement) {
    const isIncome = movement.amount > 0;

    const amount = Utils.formatCurrency(movement.amount);

    const html = `
        <td class="icon">
            <img src=${isIncome ? "img/plus.svg" : "img/minus.svg"} alt="" />
        </td>
        <td class=${isIncome ? "income" : "spending"}>${amount}</td>
        <td class="description">${movement.description}</td>
        <td class="date">${movement.date}</td>
        <td class="delete">
            <img src="img/delete.svg" alt="Delete Movement" />
        </td>
        `;
    return html;
  },

  updateSummary() {
    document.querySelector(".incomeDisplay").innerHTML = Utils.formatCurrency(
      Movements.incomes()
    );
    document.querySelector(".spendingDisplay").innerHTML = Utils.formatCurrency(
      Movements.spending()
    );
    document.querySelector(".balanceDisplay").innerHTML = Utils.formatCurrency(
      Movements.balance()
    );
  },

  clearMovements() {
    DOM.movementsContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value);
    return value;
  },

  formatDate(value) {
    const splittedDate = value.split("-");
    return splittedDate[2] + "." + splittedDate[1] + "." + splittedDate[0];
  },

  formatCurrency(value) {
    value = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return value;
  },
};

const App = {
  init() {
    Movements.all.forEach((movement) => {
      DOM.addMovement(movement);
    });

    DOM.updateSummary();
  },
  reload() {
    DOM.clearMovements();
    App.init();
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = this.getValues();
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Please fill out all required fields.");
    }
  },
  formatValues() {
    let { description, amount, date } = this.getValues();

    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  saveMovement(movement) {
    Movements.add(movement);
  },

  clearForm() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const movement = Form.formatValues();
      Form.saveMovement(movement);
      Form.clearForm();
      Modal.close();
    } catch (error) {
      const errorMsg = `<p>${error.message}</p>`;
      document.querySelector(".form .alert").innerHTML = errorMsg;
    }
  },
};

App.init();
