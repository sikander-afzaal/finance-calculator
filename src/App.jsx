import "./App.css";
import { useState } from "react";
import currencyFormat from "./utils/currencyFormat";
import CurrencyInput from "react-currency-input-field";

const App = () => {
  const [formData, setFormData] = useState({
    cashToSeller: "",
    backPayments: "",
    closingCost: "",
    renovations: "",
    dispo: "",
    marketRent: "",
    optionDeposit: "",
  });
  const [monthlyExpense, setMonthlyExpense] = useState({
    monthly: 0,
    PITI: 0,
    Taxes: 0,
    Insurance: 0,
    HOA: 0,
    "Property Management": 0,
    "Capital Expenditure": 0,
    Other: 0,
    finalResult: 0,
  });
  const [marketingExpense, setMarketingExpense] = useState({
    marketing: 0,
    "Va lists/ Skip trace": 0,
    "Text blast": 0,
    Referral: 0,
    "Realtor Commission": 0,
    "Acquisitionist Commission": 0,
    "Sponsored Ads": 0,
    Mailings: 0,
    Other: 0,
    finalResult: 0,
  });
  const [holdingExpense, setHoldingExpense] = useState({
    holding: 0,
    Maintenance: 0,
    Utilities: 0,
    Insurance: 0,
    Other: 0,
    finalResult: 0,
    "Monthly Payments": 0,
  });
  const [acqusitionCost, setAcqusitionCost] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [cashReturn, setCashReturn] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [dropDownMarket, setDropDownMarket] = useState(false);
  const [dropDownHolding, setDropDownHolding] = useState(false);

  const inputHandler = (value, name) => {
    if (isNaN(value))
      return setFormData((prev) => {
        return { ...prev, [name]: 0 };
      });
    setFormData((prev) => {
      return { ...prev, [name]: parseFloat(value) };
    });
  };
  const inputHandlerExpense = (value, name) => {
    setMonthlyExpense((prev) => {
      if (isNaN(value)) value = 0;
      if (name === "monthly")
        return {
          ...prev,
          finalResult: parseFloat(value),
          monthly: parseFloat(value),
        };
      let result = parseFloat(value);
      for (const property in prev) {
        if (property === name) {
          result = result;
        } else if (property === "finalResult") {
          result = result;
        } else {
          result += parseFloat(prev[property]);
        }
      }
      return {
        ...prev,
        [name]: parseFloat(value),
        finalResult: parseFloat(result),
      };
    });
  };
  const inputHandlerMarketing = (value, name) => {
    setMarketingExpense((prev) => {
      if (isNaN(value)) value = 0;
      if (name === "marketing")
        return {
          ...prev,
          finalResult: parseFloat(value),
          marketing: parseFloat(value),
        };
      let result = parseFloat(value);
      for (const property in prev) {
        if (property === name) {
          result = result;
        } else if (property === "finalResult") {
          result = result;
        } else {
          result += parseFloat(prev[property]);
        }
      }
      return {
        ...prev,
        [name]: parseFloat(value),
        finalResult: parseFloat(result),
      };
    });
  };
  const inputHandlerHolding = (value, name) => {
    setHoldingExpense((prev) => {
      if (isNaN(value)) value = 0;
      if (name === "holding")
        return {
          ...prev,
          finalResult: parseFloat(value),
          holding: parseFloat(value),
        };
      let result = parseFloat(value);
      for (const property in prev) {
        if (property === name) {
          result = result;
        } else if (property === "finalResult") {
          result = result;
        } else {
          result += parseFloat(prev[property]);
        }
      }
      return {
        ...prev,
        [name]: parseFloat(value),
        finalResult: parseFloat(result),
      };
    });
  };

  const calculateValues = (e) => {
    e.preventDefault();
    const {
      cashToSeller,
      backPayments,
      marketRent,
      closingCost,
      renovations,
      dispo,
      optionDeposit,
    } = formData;
    const totalMonthly = monthlyExpense.finalResult;
    const totalMarketing = marketingExpense.finalResult;
    const totalHolding = holdingExpense.finalResult;
    const accCost =
      cashToSeller +
      backPayments +
      totalMarketing +
      closingCost +
      renovations +
      totalHolding +
      dispo;
    const yearlyIncomeVal = marketRent * 12 - totalMonthly * 12;
    setAcqusitionCost(parseFloat(accCost).toFixed(2));
    setYearlyIncome(parseFloat(yearlyIncomeVal).toFixed(2));
    setCashReturn(() => {
      const answer = parseFloat(
        (yearlyIncomeVal / (accCost - optionDeposit)) * 100
      ).toFixed(2);
      if (answer < 0) {
        return "Infinite";
      } else return answer;
    });
  };

  const resetValues = () => {
    setFormData({
      cashToSeller: "",
      backPayments: "",
      closingCost: "",
      renovations: "",
      dispo: "",
      marketRent: "",
      optionDeposit: "",
    });
    setMonthlyExpense({
      monthly: 0,
      PITI: 0,
      Taxes: 0,
      Insurance: 0,
      HOA: 0,
      "Property Management": 0,
      "Capital Expenditure": 0,
      Other: 0,
      finalResult: 0,
    });
    setMarketingExpense({
      marketing: 0,
      "Va lists/ Skip trace": 0,
      "Text blast": 0,
      Referral: 0,
      "Realtor Commission": 0,
      "Acquisitionist Commission": 0,
      "Sponsored Ads": 0,
      Mailings: 0,
      Other: 0,
      finalResult: 0,
    });
    setHoldingExpense({
      holding: 0,
      Maintenance: 0,
      Utilities: 0,
      Insurance: 0,
      Other: 0,
      "Monthly Payments": 0,
      finalResult: 0,
    });
    setAcqusitionCost(0);
    setCashReturn(0);
    setYearlyIncome(0);
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
            <div
              className="accordian-div"
              style={{
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <div className="accord-flex">
                <button
                  type="button"
                  style={{ textAlign: "left", justifyContent: "flex-start" }}
                  onClick={() => setDropDownMarket((prev) => !prev)}
                >
                  <h3>Cost of Marketing</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{
                      transform: dropDownMarket
                        ? "rotate(180deg)"
                        : "rotate(0)",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <div className="accord-top-input">
                  <p>$</p>
                  <CurrencyInput
                    value={marketingExpense.finalResult}
                    defaultValue={0}
                    decimalsLimit={2}
                    name={"marketing"}
                    onValueChange={(value, name) =>
                      inputHandlerMarketing(value, name)
                    }
                  />
                </div>
              </div>
              <div
                style={{ width: "100%" }}
                className={`acord-bottom ${dropDownMarket ? "open-acord" : ""}`}
              >
                {[
                  "Va lists/ Skip trace",
                  "Text blast",
                  "Referral",
                  "Realtor Commission",
                  "Acquisitionist Commission",
                  "Sponsored Ads",
                  "Mailings",
                  "Other",
                ].map((elem) => {
                  return (
                    <InputComp
                      key={elem}
                      handler={inputHandlerMarketing}
                      value={marketingExpense[elem]}
                      name={elem}
                      label={elem}
                    />
                  );
                })}
              </div>
            </div>

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
            <div
              className="accordian-div"
              style={{
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <div className="accord-flex">
                <button
                  type="button"
                  style={{ textAlign: "left", justifyContent: "flex-start" }}
                  onClick={() => setDropDownHolding((prev) => !prev)}
                >
                  <h3>Holding Cost</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{
                      transform: dropDownHolding
                        ? "rotate(180deg)"
                        : "rotate(0)",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                <div className="accord-top-input">
                  <p>$</p>
                  <CurrencyInput
                    value={holdingExpense.finalResult}
                    defaultValue={0}
                    decimalsLimit={2}
                    name="holding"
                    onValueChange={(value, name) => {
                      inputHandlerHolding(value, name);
                    }}
                  />
                </div>
              </div>

              <div
                style={{ width: "100%" }}
                className={`acord-bottom ${
                  dropDownHolding ? "open-acord" : ""
                }`}
              >
                {[
                  "Monthly Payments",
                  "Maintenance",
                  "Utilities",
                  "Insurance",
                  "Other",
                ].map((elem) => {
                  return (
                    <InputComp
                      key={elem}
                      handler={inputHandlerHolding}
                      value={holdingExpense[elem]}
                      name={elem}
                      label={elem}
                    />
                  );
                })}
              </div>
            </div>
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
              requiredInput
              label="Market Rent"
            />
            <div className="accordian-div">
              <div className="accord-flex">
                <button
                  type="button"
                  onClick={() => setDropDown((prev) => !prev)}
                >
                  <h3>Total Monthly Expenses</h3>
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
                <div className="accord-top-input">
                  <p>$</p>
                  <CurrencyInput
                    value={monthlyExpense.finalResult}
                    defaultValue={0}
                    decimalsLimit={2}
                    name={"monthly"}
                    onValueChange={(value, name) => {
                      inputHandlerExpense(value, name);
                    }}
                  />
                </div>
              </div>

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
              info="Supercharge your ROI with the Rent To Own model. With the rent to own model, you receive a non refundable option deposit typically 5-10 percent of the purchase price. Insert that amount into the following box to see what your cash on cash return would be using the rent to own strategy."
              label="Supercharge Your Roi"
              gold
            />

            <div className="btn-div">
              <button type="submit" className="calculate">
                Calculate
              </button>
              <button
                style={{ background: "green" }}
                type="submit"
                onClick={resetValues}
                className="calculate"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        <div className="result-div">
          <div className="result-col">
            <h3>
              Total Cost of <br /> Acqusition
            </h3>
            <p>{currencyFormat(acqusitionCost)}</p>
          </div>
          <div className="result-col">
            <h3>
              Yearly
              <br /> Income
            </h3>
            <p>{currencyFormat(yearlyIncome)}</p>
          </div>
          <div className="result-col">
            <h3>
              Cash on Cash <br /> Return
            </h3>
            <p>
              {cashReturn === "Infinite"
                ? cashReturn
                : isNaN(cashReturn)
                ? "%"
                : cashReturn + "%"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

const InputComp = ({ label, name, value, handler, info, gold }) => {
  return (
    <div className={`colRow `}>
      <div className="top-label">
        {" "}
        <label htmlFor={label}>
          {label}
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
        {/* {sub && <h6>{sub}</h6>} */}
      </div>
      <div className="col-div">
        <div className="flex-div">
          <p>$</p>
          <CurrencyInput
            style={{ backgroundColor: gold ? "#F1E5AC" : "white" }}
            id={label}
            name={name}
            value={value}
            defaultValue={0}
            decimalsLimit={2}
            onValueChange={(value, name) => handler(value, name)}
          />
        </div>
      </div>
    </div>
  );
};
