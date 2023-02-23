import "./App.css";
import { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    cashToSeller: "",
    backPayments: "",
    marketing: "",
    closingCost: "",
    renovations: "",
    holdingCost: "",
    dispo: "",
    marketRent: "",
    optionDeposit: "",
  });
  const [monthlyExpense, setMonthlyExpense] = useState({
    PITI: 0,
    Taxes: 0,
    Insurance: 0,
    HOA: 0,
    "Property Management": 0,
    "Capital Expenditure": 0,
    Other: 0,
  });
  const [acqusitionCost, setAcqusitionCost] = useState("");
  const [yearlyIncome, setYearlyIncome] = useState("");
  const [cashReturn, setCashReturn] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: parseFloat(value) };
    });
  };
  const inputHandlerExpense = (e) => {
    const { name, value } = e.target;
    setMonthlyExpense((prev) => {
      return { ...prev, [name]: parseFloat(value) };
    });
  };

  const calculateValues = (e) => {
    e.preventDefault();
    const {
      cashToSeller,
      backPayments,
      marketRent,
      marketing,
      closingCost,
      renovations,
      holdingCost,
      dispo,
      optionDeposit,
    } = formData;
    const totalMonthly =
      monthlyExpense["Capital Expenditure"] +
      monthlyExpense.HOA +
      monthlyExpense.Insurance +
      monthlyExpense.Other +
      monthlyExpense.PITI +
      monthlyExpense["Property Management"] +
      monthlyExpense.Taxes;
    const accCost =
      cashToSeller +
      backPayments +
      marketing +
      closingCost +
      renovations +
      holdingCost +
      dispo;
    const yearlyIncomeVal = marketRent * 12 - totalMonthly * 12;
    setAcqusitionCost(parseFloat(accCost).toFixed(2));
    setYearlyIncome(parseFloat(yearlyIncomeVal).toFixed(2));
    setCashReturn(
      parseFloat((yearlyIncomeVal + optionDeposit) / accCost).toFixed(2)
    );
  };

  return (
    <div className="container">
      <div className="app">
        <h1>Creative Finance Playbook Deal Analyzer</h1>
        <form onSubmit={calculateValues} className="calculator">
          <div className="formCol">
            <InputComp
              handler={inputHandler}
              value={formData.cashToSeller}
              name="cashToSeller"
              label="Cash To Seller"
              requiredInput
            />
            <InputComp
              handler={inputHandler}
              value={formData.backPayments}
              name="backPayments"
              label="Back Payments/Liens"
              requiredInput
            />
            <InputComp
              handler={inputHandler}
              value={formData.marketing}
              name="marketing"
              info="va lists/ Skip trace, text blast, referral, realtor, commission, acquisition commissions, sponsored ads,mailings"
              label="Cost of Marketing"
              requiredInput
            />
            <InputComp
              handler={inputHandler}
              value={formData.closingCost}
              name="closingCost"
              label="Closing Cost"
              requiredInput
            />
            <InputComp
              handler={inputHandler}
              value={formData.renovations}
              name="renovations"
              requiredInput
              label="Renovations"
            />
            <InputComp
              handler={inputHandler}
              value={formData.holdingCost}
              name="holdingCost"
              label="Holding Cost"
              requiredInput
              info="lawn/snow/maintainance, monthly payment, utilities, insurance"
            />
            <InputComp
              handler={inputHandler}
              value={formData.dispo}
              name="dispo"
              label="Cost of Dispo"
              requiredInput
            />
          </div>
          <div className="formCol">
            <InputComp
              handler={inputHandler}
              value={formData.marketRent}
              name="marketRent"
              col
              requiredInput
              label="Marketing Rent"
            />
            <div className="accordian-div">
              <button
                type="button"
                onClick={() => setDropDown((prev) => !prev)}
              >
                <h3>
                  Total Monthly Expenses = $
                  {monthlyExpense["Capital Expenditure"] +
                    monthlyExpense.HOA +
                    monthlyExpense.Insurance +
                    monthlyExpense.Other +
                    monthlyExpense.PITI +
                    monthlyExpense["Property Management"] +
                    monthlyExpense.Taxes}{" "}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{
                    transform: dropDown ? "rotate(180deg)" : "rotate(0)",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div className={`acord-bottom ${dropDown ? "open-acord" : ""}`}>
                {[
                  "PITI",
                  "Taxes",
                  "Insurance",
                  "HOA",
                  "Capital Expenditure",
                  "Property Management",
                  "Other",
                ].map((elem) => {
                  return (
                    <InputComp
                      key={elem}
                      handler={inputHandlerExpense}
                      value={monthlyExpense[elem]}
                      name={elem}
                      label={elem}
                    />
                  );
                })}
              </div>
            </div>
            <InputComp
              handler={inputHandler}
              value={formData.optionDeposit}
              name="optionDeposit"
              col
              info="With the rent to own model, you receive a non refundable option deposit typically 5-10 percent of the purchase price. Insert that amount into the following box to see what your cash on cash return would be using the rent to own strategy."
              label="Non Refundable Option Deposit"
            />
            <button type="submit" className="calculate">
              Calculate
            </button>
          </div>
        </form>
        <div className="result-div">
          <div className="result-grid">
            <h3>
              Total Cost of <br /> Acqusition
            </h3>
            <h3>
              Yearly
              <br /> Income
            </h3>
            <h3>
              Cash on Cash <br /> Return
            </h3>
          </div>
          <div className="result-grid results">
            <p>${acqusitionCost}</p>
            <p>${yearlyIncome}</p>
            <p>${cashReturn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

const InputComp = ({
  label,
  name,
  value,
  handler,
  col,
  info,
  requiredInput,
}) => {
  return (
    <div className={`colRow ${col ? "inputCol" : ""}`}>
      <label htmlFor={label}>
        {label}{" "}
        {info && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="info-ico"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="info-text">{info}</p>
          </>
        )}
      </label>
      <div className="col-div">
        <div className="flex-div">
          <p>$</p>
          <input
            type="number"
            id={label}
            name={name}
            value={value}
            onChange={handler}
            required={requiredInput}
          />
        </div>
      </div>
    </div>
  );
};
