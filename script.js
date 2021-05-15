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
  save() {},
};

const movements = [
  { id: 1, description: "Electricity", amount: -40, date: "11/05/2021" },
  { id: 2, description: "Internet", amount: -40, date: "08/05/2021" },
  { id: 3, description: "Health Insurance", amount: -160, date: "05/05/2021" },
  { id: 4, description: "Garage", amount: -550, date: "02/05/2021" },
  { id: 5, description: "Salary", amount: 7500, date: "01/05/2021" },
];

const Movements = {
  all: movements,

  add(movement) {
    Movements.all.push(movement);
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

App.init();
