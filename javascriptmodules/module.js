// BANKIST APP

// Data
export const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    movementsDates: [
        '2025-04-24T21:31:17.178Z',
        '2025-04-25T07:42:02.383Z',
        '2025-04-26T09:15:04.904Z',
        '2025-04-27T10:17:24.185Z',
        '2025-04-28T14:11:59.604Z',
        '2025-04-29T17:01:17.194Z',
        '2025-04-30T23:36:17.929Z',
        '2025-05-01T10:51:36.790Z',
    ],
    pin: 1111,
};

export const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    movementsDates: [
        '2025-04-24T21:31:17.178Z',
        '2025-04-25T07:42:02.383Z',
        '2025-04-26T09:15:04.904Z',
        '2025-04-27T10:17:24.185Z',
        '2025-04-28T14:11:59.604Z',
        '2025-04-29T17:01:17.194Z',
        '2025-04-30T23:36:17.929Z',
        '2025-05-01T10:51:36.790Z',
    ],
    pin: 2222,
};

export const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    movementsDates: [
        '2025-04-24T21:31:17.178Z',
        '2025-04-25T07:42:02.383Z',
        '2025-04-26T09:15:04.904Z',
        '2025-04-27T10:17:24.185Z',
        '2025-04-28T14:11:59.604Z',
        '2025-04-29T17:01:17.194Z',
        '2025-04-30T23:36:17.929Z',
        '2025-05-01T10:51:36.790Z',
    ],
    pin: 3333,
};

export const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    movementsDates: [
        '2025-04-24T21:31:17.178Z',
        '2025-04-25T07:42:02.383Z',
        '2025-04-26T09:15:04.904Z',
        '2025-04-27T10:17:24.185Z',
        '2025-04-28T14:11:59.604Z',
        '2025-04-29T17:01:17.194Z',
        '2025-04-30T23:36:17.929Z',
        '2025-05-01T10:51:36.790Z',
    ],
    pin: 4444,
};

export const account5 = {
    owner: 'Grace Beyond',
    movements: [430, 1000, -200, 340, -300, 200, 50, 90, 2000, 1000],
    interestRate: 0.7,
    movementsDates: [
        '2025-04-24T21:31:17.178Z',
        '2025-04-25T07:42:02.383Z',
        '2025-04-26T09:15:04.904Z',
        '2025-04-27T10:17:24.185Z',
        '2025-04-28T14:11:59.604Z',
        '2025-04-29T17:01:17.194Z',
        '2025-04-30T23:36:17.929Z',
        '2025-05-01T10:51:36.790Z',
    ],
    pin: 5555,
};


export let accounts = [account1, account2, account3, account4, account5];


/**
 * Creates a username by taking the first letter of each word in a person's name
 * @function userName
 * @param {string} username - The full name of the user
 * @returns {string} A lowercase string containing the first letter of each word in the name
 * @example
 * userName('Jonas Schmedtmann') // returns 'js'
 * userName('Sarah Smith') // returns 'ss'
 */
const userName = function (username) {
    return username.split(' ').map(name => name[0]).join('').toLowerCase();
};


/**
 * Creates a new array of account objects with an added `userName` property for each.
 * The `userName` is generated from the `owner` property of each account.
 * This function does not mutate the original objects; it returns a cloned and enhanced version.
 *
 * @function addUsernameToObject
 * @returns {Array<Object>} An array of account objects, each with an added `userName` property
 */
const addUsernameToObject = () => {
    return accounts.map(obj => ({
        ...obj,
        userName: userName(obj.owner)
    }));
};
accounts = addUsernameToObject();


/**
 * Adds a `currentBalance` property to the account object based on its movements.
 *
 * @param {Object} account - The account object containing a `movements` array.
 * @param {number[]} account.movements - An array of numerical transaction values (positive or negative).
 * @returns {Object} A new account object with an added `currentBalance` property representing the sum of all movements.
 */
export const addBalanceToAccount = (acc) => {
    return {
        ...acc,
        currentBalance: acc.movements.reduce((acc, mov) => acc + mov, 0)
    };
};



let currentAccount;

/**
 * Authenticates a user based on input credentials and enriches the account with computed summaries.
 *
 * @param {Object} data - The user input data containing authentication credentials.
 * @param {string|number} data.password - The user-entered PIN used for account matching.
 * @returns {Object|null} The authenticated and enriched user account object, or null if authentication fails.
 */
export const correctDetails = function (data) {
    const { username, password } = data;

    currentAccount = accounts.find(acc => acc.userName === username);
    if (!currentAccount || currentAccount.pin !== +password || currentAccount.userName !== username) return;

    currentAccount = addBalanceToAccount(currentAccount);
    currentAccount = addSummaries(currentAccount);

    return currentAccount;

};




/**
 * Calculates the total deposits from an array of movement amounts.
 *
 * @param {number[]} movArr - An array of transaction amounts.
 * @returns {number} The total sum of all positive (deposit) values.
 */
export const calcSummaryIn = function (movArr) {
    return movArr.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
};


/**
 * Calculates the total withdrawals from an array of movement amounts.
 *
 * @param {number[]} movArr - An array of transaction amounts.
 * @returns {number} The total sum of all negative (withdrawal) values.
 */
export const calcSummaryOut = function (movArr) {
    return movArr.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
};



/**
 * Calculates the interest based on the account's current balance and interest rate.
 *
 * @param {Object} acc - The account object.
 * @param {number} acc.currentBalance - The current balance of the account.
 * @param {number} acc.interestRate - The interest rate applicable to the account.
 * @returns {number} The calculated interest amount.
 */
export const calcSummaryInterest = function (acc) {
    return acc.currentBalance * acc.interestRate;
};




/**
 * Adds deposit, withdrawal, and interest summaries to an account object.
 *
 * @param {Object} acc - The account object.
 * @param {number[]} acc.movements - Array of transaction amounts (positive for deposits, negative for withdrawals).
 * @param {number} acc.currentBalance - The current balance of the account.
 * @param {number} acc.interestRate - The interest rate used for calculating interest.
 * @returns {Object} A new account object enriched with `summaryIn`, `summaryOut`, and `summaryInterest` properties.
 */
export const addSummaries = acc => ({
    ...acc,
    summaryIn: calcSummaryIn(acc.movements),
    summaryOut: calcSummaryOut(acc.movements),
    summaryInterest: calcSummaryInterest(acc),
});



/**
 * Handles money transfer from the current account to a receiver's account.
 *
 * Validates the transfer conditions, updates both the sender’s and receiver’s movements,
 * recalculates balances and summaries, and updates the global `accounts` state accordingly.
 *
 * @param {Object} data - The transfer details.
 * @param {string} data.receiver - The username of the account to receive the funds.
 * @param {number|string} data.amount - The amount to be transferred.
 * @throws Will throw an error if the transfer conditions are not met (e.g., invalid receiver, self-transfer, insufficient funds, or non-positive amount).
 * @returns {Object} The updated `currentAccount` object after the transfer.
 */
export const transferData = function (data) {
    const { receiver, amount } = data;
    if (!data) return;

    let receiverAccount = accounts.find(acc => acc.userName === receiver);

    if (
        !receiverAccount ||
        receiverAccount.userName === currentAccount.userName ||
        +amount > currentAccount.currentBalance ||
        +amount <= 0
    ) return;


    // currentAccount
    currentAccount = deductSenderMovement(currentAccount, +amount);
    currentAccount = addBalanceToAccount(currentAccount);
    currentAccount = addSummaries(currentAccount);


    // receiverAccount
    receiverAccount = addReceiverMovement(receiverAccount, +amount);
    receiverAccount = addBalanceToAccount(receiverAccount);
    receiverAccount = addSummaries(receiverAccount);


    accounts = accounts.map(acc => {
        if (acc.userName === currentAccount.userName) return currentAccount;
        if (acc.userName === receiverAccount.userName) return receiverAccount;
        return acc;
    });

    return currentAccount;
};


// Add Negative movement to Sender
export const deductSenderMovement = function (account, amount) {
    const newDate = new Date().toISOString();
    return {
        ...account,
        movements: [...account.movements, -Math.abs(amount)],
        movementsDates: [...account.movementsDates, newDate]
    };
};


/**
 * Adds a positive movement (e.g. deposit or transfer) and the current timestamp to an account.
 *
 * @param {Object} account - The receiver's account object.
 * @param {number} amount - The amount to add as a positive movement.
 * @returns {Object} A new account object with the updated movements and movementsDates arrays.
 */
export const addReceiverMovement = function (account, amount) {
    const newDate = new Date().toISOString();

    return {
        ...account,
        movements: [...account.movements, amount],
        movementsDates: [...account.movementsDates, newDate]
    };
};



/**
 * Processes a loan request for the currently active account.
 *
 * Validates the loan amount and ensures eligibility (at least one deposit ≥ 10% of the requested loan).
 * If approved, updates the current account and the global accounts list.
 *
 * @param {Object} data - The loan request data.
 * @param {number|string} data.loan - The requested loan amount.
 * @throws Will throw an error if the loan is invalid or the eligibility condition is not met.
 * @returns {Object} The updated current account with the loan applied.
 */
export const loanData = function (data) {
    const { loan } = data;

    if (!loan || isNaN(+loan) || +loan <= 0) return;
    const loanAmount = +loan;


    if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {

        // Approve loanAmount
        currentAccount = addReceiverMovement(currentAccount, loanAmount);
        currentAccount = addBalanceToAccount(currentAccount);
        currentAccount = addSummaries(currentAccount);

    } else {
        throw new Error('Loan denied: You must have a deposit of at least 10% of the requested amount.');
    }

    accounts = accounts.map(acc =>
        acc.userName === currentAccount.userName ? currentAccount : acc
    );

    return currentAccount;
};



/**
 * Sorts the current account's movements along with their corresponding dates.
 *
 * @param {boolean} isDescending - Determines sort order; `true` for descending, `false` for ascending.
 * @returns {Object} An object containing `movements` and `movementsDates` arrays in the sorted order.
 */
export const sortData = function (isDescending) {
    const paired = currentAccount.movements.map((mov, i) => ({
        movement: mov,
        date: currentAccount.movementsDates[i],
    }));


    paired.sort((a, b) =>
        isDescending ? b.movement - a.movement : a.movement - b.movement
    );


    const sortedMovements = paired.map(entry => entry.movement);
    const sortedDates = paired.map(entry => entry.date);


    return {
        movements: sortedMovements,
        movementsDates: sortedDates,
    };
};



/**
 * Closes the currently logged-in account if credentials are valid.
 *
 * Validates the user’s password before removing the account from the global accounts list
 * and logging the user out.
 *
 * @param {Object} data - The account closure data.
 * @param {string} data.user - The username of the account to close.
 * @param {number|string} data.password - The user's PIN for verification.
 * @throws Will throw an error if the provided password is incorrect.
 * @returns {void}
 */
export const closeAcc = function (data) {
    const { user, password } = data;

    if (currentAccount.pin !== +password) return;
    accounts = accounts.filter(acc => acc.userName !== user);

};


/**
 * Logs the user out if a session is currently active.
 *
 * @returns {void}
 */
export const startLogOutTime = function () {
    if (!currentAccount) return;
};


