import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PriceList from "./components/PriceList";

const items = [
  {
    title: "和哥们一起喝酒",
    price: 300,
    date: "2018-08-20",
    monthCategory: "2018-8",
    id: "_jjfice21k",
    cid: "3",
    type: "income",
    timestamp: 1534723200000
  },
  {
    title: "理财收入",
    price: 1000,
    date: "2018-08-11",
    monthCategory: "2018-8",
    id: "_1fg1wme63",
    cid: "11",
    type: "outcome",
    timestamp: 1533945600000
  }
];

function App() {
  return (
    <div className="App">
      <PriceList items={items} />
    </div>
  );
}

export default App;
