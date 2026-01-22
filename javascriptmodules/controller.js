import * as model from "./module.js";
import loginView from './views/loginDetailsView.js';
import balanceView from "./views/balanceView.js";
import movementsView from "./views/movementsView.js";
import summaryView from "./views/summaryView.js";
import transferView from "./views/transferView.js";
import loanView from "./views/loanView.js";
import sortView from "./views/sortView.js";
import closeAccView from "./views/closeAccView.js";
import { formatDates, formatNumbers, startLogOutTimer } from "./helpers.js";

let timer;

const userDetailsController = function (data) {
  // User Logs in
  const currentUser = model.correctDetails(data);

  //Hide Details
  loginView.hideDetails();

  // Displays Ui
  loginView.renderUi(currentUser.owner);

  // Displays User Balance
  balanceView.renderBalance(formatNumbers(currentUser.currentBalance));

  // Displays Date
  balanceView.renderBalanceDate(formatDates(Date.now()));

  // Displays Movements
  movementsView.renderMovements(currentUser);

  // Displays Summary
  summaryView.renderSummaryIn(formatNumbers(currentUser.summaryIn));
  summaryView.renderSummaryOut(formatNumbers(currentUser.summaryOut));
  summaryView.renderSummaryInterest(formatNumbers(currentUser.summaryInterest));

  // Timer Counts 
  timer = startLogOutTimer();

};


const transferController = function (data) {

  // User makes a Transaction
  const senderAccount = model.transferData(data);

  // Clears User Input
  transferView._clearInput();

  // Updates Movements
  movementsView.renderMovements({
    movements: senderAccount.movements,
    movementsDates: senderAccount.movementsDates,
  });

  // Updates Balance
  balanceView.renderBalance(formatNumbers(senderAccount.currentBalance));


  // Updates Summary
  summaryView.renderSummaryIn(formatNumbers(senderAccount.summaryIn));
  summaryView.renderSummaryOut(formatNumbers(senderAccount.summaryOut));
  summaryView.renderSummaryInterest(formatNumbers(senderAccount.summaryInterest));


  // Restarts Timer when user makes a tansaction
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
};


const loanController = function (data) {

  // User Request Loan
  const currentAcc = model.loanData(data);

  // Clears Input
  loanView._clearInput();

  // Waits to approve loan
  setTimeout(() => {
    // Update Movements
    movementsView.renderMovements(currentAcc);

    // Update Balance
    balanceView.renderBalance(formatNumbers(currentAcc.currentBalance));

    // Update Summary
    summaryView.renderSummaryIn(formatNumbers(currentAcc.summaryIn));
    summaryView.renderSummaryOut(formatNumbers(currentAcc.summaryOut));
    summaryView.renderSummaryInterest(formatNumbers(currentAcc.summaryInterest));
  }, 5000);

  // Restarts Timer when user requests a loan
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

};

let isSorted = false;

const sortController = function () {

  // Toggle sorting direction
  isSorted = !isSorted;

  const sortedMovements = model.sortData(isSorted); // Pass direction
  movementsView.renderMovements(sortedMovements);

  // Restarts Timer when user sorts movements amounts
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

};


const closeAccController = function (data) {
  model.closeAcc(data);

  // Clear Input
  closeAccView._clearInput();


  // Hide UI
  closeAccView.closeUi();

};


const init = function () {
  loginView.addHandlerLogin(userDetailsController);
  transferView.addHandlerTransfer(transferController);
  loanView.addHandlerLoan(loanController);
  sortView.addHandlerSort(sortController);
  closeAccView.addHandlerCloseAcc(closeAccController);
};

init();