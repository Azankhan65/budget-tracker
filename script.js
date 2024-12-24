let transactions = [];

const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const balanceElement = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');

function updateBalance() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.category === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpense;
    balanceElement.textContent = `$${balance.toFixed(2)}`;
}

function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (!description || isNaN(amount) || amount === 0) {
        alert("Please provide a valid description and amount.");
        return;
    }

    const transaction = {
        description,
        amount,
        category
    };

    transactions.push(transaction);

    displayTransactions();
    updateBalance();

    descriptionInput.value = '';
    amountInput.value = '';
    categoryInput.value = 'income';
}

function displayTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.classList.add(transaction.category);

        li.innerHTML = `
            <span>${transaction.description}: $${transaction.amount.toFixed(2)}</span>
            <button class="remove-btn" onclick="removeTransaction(${index})">Remove</button>
        `;

        transactionList.appendChild(li);
    });
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    displayTransactions();
    updateBalance();
}

function clearTransactions() {
    transactions = [];
    displayTransactions();
    updateBalance();
}

document.getElementById('clear-transactions').addEventListener('click', clearTransactions);
