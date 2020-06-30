const nameInput  = document.getElementById('inputName')

const digitsInput  =  document.getElementById('inputDigit')

const addButton = document.getElementById('addBtn')

const historyDiv = document.getElementById('historydiv')

const income =  document.getElementById('income-fig')

const expense = document.getElementById('expense-fig')

const clearBtn = document.getElementById('clearBtn')

const balance = document.getElementById('balance-fig')

const Income = localStorage.getItem('income')

const Balance =  localStorage.getItem('balance')

const Expense = localStorage.getItem('expense')

const Transactions   = localStorage.getItem('transactions')

const fetchedTransactions  = JSON.parse(Transactions)

const arrayTransactions = fetchedTransactions !== null ? fetchedTransactions : []

let transactions = arrayTransactions

console.log(transactions)

historyDiv.innerHTML = transactions.map(transaction=>{
    let transactionType  = transaction.amount.split('')
    return `<div class="onehistory">
    <p class="history-text">${transaction.name}</p>
    <p class="history-price">$ ${transaction.amount}</p>
    <div class=${transactionType[0] === '-' ? 'historycolor-expense':'historycolor-income'}></div>
    </div><br><br>`
})

Income !== null ? income.innerHTML  = Income : income.innerHTML = `$ ${0.00}`

Expense !== null ? expense.innerHTML = Expense : expense.innerHTML = `$${0.00}`

Balance !== null ? balance.innerHTML = Balance : balance.innerHTML = `$${0.00}`


clearBtn.addEventListener('click', ()=>{
    localStorage.clear()
    document.location.reload()
})


addButton.addEventListener('click',  ()=>{
    let splittedValue = digitsInput.value.split('')
    if(nameInput.value.trim() !=='' && digitsInput.value.trim() !== ''){  
            let transaction = {"name":nameInput.value, "amount":digitsInput.value}   
            console.log(transaction)
            transactions.push(transaction)

            const localTransactions   =  JSON.stringify(transactions)

            localStorage.setItem('transactions', localTransactions)
            
            if(splittedValue[0] === '-'){
                let splittedExpense = expense.innerText.split('')
                let currentValue = splittedExpense.slice(1,splittedExpense.length)
                const firstexpense = Number(currentValue.join(''))
                console.log(firstexpense)
                const inputExpense = splittedValue.slice(1,splittedValue.length).join('')
                const nextExpense = Number(firstexpense) + Number(inputExpense)
                console.log(nextExpense)
                expense.innerHTML = `$${nextExpense}`
                localStorage.setItem('expense', `$${nextExpense}`)
                let splittedBalance = balance.innerHTML.split('')
                let currentBalance = splittedBalance.splice(1,splittedBalance.length).join('')
                let newBalance  = Number(currentBalance) - Number(inputExpense)
                balance.innerText= `$${newBalance}`
                localStorage.setItem('balance',`$${newBalance}` )
            } else{
                let splittedIncome = income.innerText.split('')
                let currentValue  = splittedIncome.slice(1,splittedIncome.length)
                const firstIncome = Number(currentValue.join(''))
                console.log(firstIncome)
                const inputIncome =  splittedValue.slice(0,splittedValue.length).join('')
                const nextIncome = Number(firstIncome) + Number(inputIncome)
                console.log(nextIncome)
                income.innerText = `$${nextIncome}`
                localStorage.setItem('income', `$${nextIncome}`)
                let splittedBalance = balance.innerHTML.split('')
                let currentBalance = splittedBalance.splice(1,splittedBalance.length).join('')
                let newBalance  = Number(currentBalance) + Number(inputIncome)
                balance.innerText= `$${newBalance}`
                localStorage.setItem('balance',`$${newBalance}` )
            }
            historyDiv.innerHTML = transactions.map(transaction=>{
                let transactionType  = transaction.amount.split('')
            return `<div class="onehistory">
            <p class="history-text">${transaction.name}</p>
            <p class="history-price">$ ${transaction.amount}</p>
            <div class=${transactionType[0] === '-' ? 'historycolor-expense':'historycolor-income'}></div>
            </div><br><br>`
            })

          nameInput.value = ''

          digitsInput.value = ''
    }
    else{
        alert('Please Input Your transaction or add an Amount')
    }

})