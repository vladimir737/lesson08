'use strict';
let meaning = function checkNumMeaning(variable, info) {
    do {
      variable = +prompt('Пожалуйста введите ' + info);
    } while (!variable || variable <=0);
    return variable;
  };
  let meaningStr = function checkStrMeaning(variable, info) {
    do {
      variable = prompt('Пожалуйста введите ' + info);
    } while (!variable || variable.includes(+variable));
    return variable;
  };

//присвоение значений переменным
 let money, 
    start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (isNaN(money) || money === '' || money === null)
 } ; 
   start();
 
 let appData = {
     income:{},
     addIncome:[],
     expenses:{},
     addExpenses:[],
     deposit: false,
     percentDeposit:0,
     moneyDeposit:0,
     mission: 500000,
     budget: money,
     budgetDay:0,
     budgetMonth:0,
     expensesMonth:0,
     period:3,
     budget: money,
     asking:function(){

            if(confirm('Есть ли у вас дополнительный источник заработка?')){
                let item, itemInfo = 'Какой у Вас дополнительный заработок?';
            let itemIncome = meaningStr(item, itemInfo);
            let cash, cashInfo = 'Какой доход это Вам приносит в месяц?';
            let cashIncome = meaning(cash, cashInfo);
                appData.income[itemIncome] = cashIncome;
            }
            let addExpenses = prompt('Перечислите возможные расходы через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
                        
         for (let i = 0; i < 2; i++) {
            let itemExpenses = prompt('Введите обязательную статью расходов?');
            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?');
            }  
        while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);  
        appData.expenses[itemExpenses] = cashExpenses;
        }
     },
     getExpensesMonth:function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
            }
    },
    
     getBudget:function() {
        appData.budgetMonth = money-appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth:function() {
        return appData.mission / appData.budgetMonth;
        
    },
    getStatusIncome:function(){
        if (appData.budgetDay > 1200){
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
        return ('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
            return('К сожалению ваш уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
     },
     getInfoDeposit: function(){
         if(appData.deposit){
            let depositRate, depositRateInfo = 'Какой годовой процент?';
            let depositAmount, depositAmountInfo = 'Какая сумма заложена?';
            appData.percentDeposit = meaning(depositRate, depositRateInfo);
            appData.moneyDeposit = meaning(depositAmount, depositAmountInfo);
         }
     },
     calcSavedMoney:function(){
         return appData.budgetMonth * appData.period;
     }

};
 appData.asking();
 appData.getExpensesMonth();
 appData.getBudget();

 console.log('Расходы за месяц: ' + appData.expensesMonth);

 if(appData.getTargetMonth() > 0) {
     console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + " месяца");
 }else {
     console.log('Цель не будет достигнута');
 }
 
 console.log(appData.getStatusIncome());

 for (let key in appData) {
     console.log("Наша программа включает в себя данные:" + key + " :" + appData[key]);
 }
 function arrToString(){
    let arr = appData.addExpenses;
    let str = '';
    let newStr = str.split('').join(', ');
    for(let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      newStr += arr[i] + ', ';
    }
    console.log(newStr);
  }
  arrToString();

 