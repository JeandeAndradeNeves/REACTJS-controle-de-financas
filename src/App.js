import React, {useState,useEffect} from "react";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Globalstyle from "./styles/global";
import Form from "./components/Form";

const App = () => {
  //Pegando o banco
  const data = localStorage.getItem("transactions");
  //Confirmando se tem algo dentro do banco e convertendo pra json se não tiver retorna uma lista vazia.
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data) : []
  );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  //Toda vez que a lista mudar o useeffect recalcula denovo
  useEffect(() => {
    //Pegando a saida
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));
    //Pegando a entrada
    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));
    //Somando as saidas e entradas
    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    //Arredondando os valores de entrada e saida
    const total = Math.abs(income - expense).toFixed(2);
  
      setIncome(`R$ ${income}`);
      setExpense(`R$ ${expense}`);
    //Se o valor for negativo o sinal - fica antes dos numeros
      setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
  
}, [transactionsList]);
    //Passando o novo array pro banco
const handleAdd = (transaction) => {
  const newArrayTransactions = [...transactionsList, transaction];

  setTransactionsList(newArrayTransactions);

  localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
};

  return (
    <>
       <Header/> 
       <Resume income={income} expense={expense} total={total} />
       <Form
        handleAdd={handleAdd}
        transactionsList={transactionsList}
        setTransactionsList={setTransactionsList}
      />     
       <Globalstyle/>
    </>
  );
};

export default App;