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

const userName = function (username) {
    return username.split(' ').map(name => name[0]).join('').toLowerCase();
};

const addUsernameToObject = () => {
    return accounts.map(obj => ({
        ...obj,
        userName: userName(obj.owner)
    }));
};
accounts = addUsernameToObject();


export const addBalanceToAccount = (acc) => {
    return {
        ...acc,
        currentBalance: acc.movements.reduce((acc, mov) => acc + mov, 0)
    };
};



let currentAccount;


export const correctDetails = function (data) {
    const { username, password } = data;

    currentAccount = accounts.find(acc => acc.userName === username);
    if (!currentAccount || currentAccount.pin !== +password || currentAccount.userName !== username) return;

    currentAccount = addBalanceToAccount(currentAccount);
    currentAccount = addSummaries(currentAccount);

    return currentAccount;

};


export const calcSummaryIn = function (movArr) {
    return movArr.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
};

export const calcSummaryOut = function (movArr) {
    return movArr.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
};


export const calcSummaryInterest = function (acc) {
    return acc.currentBalance * acc.interestRate;
};


export const addSummaries = acc => ({
    ...acc,
    summaryIn: calcSummaryIn(acc.movements),
    summaryOut: calcSummaryOut(acc.movements),
    summaryInterest: calcSummaryInterest(acc),
});

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


export const addReceiverMovement = function (account, amount) {
    const newDate = new Date().toISOString();

    return {
        ...account,
        movements: [...account.movements, amount],
        movementsDates: [...account.movementsDates, newDate]
    };
};


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


export const closeAcc = function (data) {
    const { user, password } = data;

    if (currentAccount.pin !== +password) return;
    accounts = accounts.filter(acc => acc.userName !== user);

};


export const startLogOutTime = function () {
    if (!currentAccount) return;
};


