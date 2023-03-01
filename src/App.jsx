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
  });
  const [holdingExpense, setHoldingExpense] = useState({
    holding: 0,
    Maintenance: 0,
    Utilities: 0,
    Insurance: 0,
    Other: 0,
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
    if (isNaN(value))
      return setMonthlyExpense((prev) => {
        return { ...prev, [name]: 0 };
      });
    setMonthlyExpense((prev) => {
      return { ...prev, [name]: parseFloat(value) };
    });
  };
  const inputHandlerMarketing = (value, name) => {
    if (isNaN(value))
      return setMarketingExpense((prev) => {
        return { ...prev, [name]: 0 };
      });
    setMarketingExpense((prev) => {
      return { ...prev, [name]: parseFloat(value) };
    });
  };
  const inputHandlerHolding = (value, name) => {
    if (isNaN(value))
      return setHoldingExpense((prev) => {
        return { ...prev, [name]: 0 };
      });
    setHoldingExpense((prev) => {
      return { ...prev, [name]: parseFloat(value) };
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
    const totalMonthly =
      monthlyExpense.monthly +
      monthlyExpense["Capital Expenditure"] +
      monthlyExpense.HOA +
      monthlyExpense.Insurance +
      monthlyExpense.Other +
      monthlyExpense.PITI +
      monthlyExpense["Property Management"] +
      monthlyExpense.Taxes;
    const totalMarketing =
      marketingExpense.marketing +
      marketingExpense["Va lists/ Skip trace"] +
      marketingExpense["Text blast"] +
      marketingExpense.Referral +
      marketingExpense["Realtor Commission"] +
      marketingExpense["Acquisitionist Commission"] +
      marketingExpense["Sponsored Ads"] +
      marketingExpense.Mailings +
      marketingExpense.Other;
    const totalHolding =
      holdingExpense.holding +
      holdingExpense["Monthly Payments"] +
      holdingExpense.Other +
      holdingExpense.Insurance +
      holdingExpense.Maintenance +
      holdingExpense.Utilities;
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
    setCashReturn(
      parseFloat((yearlyIncomeVal / (accCost - optionDeposit)) * 100).toFixed(2)
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
                  <h3>
                    Cost of Marketing ={" "}
                    {currencyFormat(
                      marketingExpense["Va lists/ Skip trace"] +
                        marketingExpense.marketing +
                        marketingExpense["Text blast"] +
                        marketingExpense.Referral +
                        marketingExpense["Realtor Commission"] +
                        marketingExpense["Acquisitionist Commission"] +
                        marketingExpense["Sponsored Ads"] +
                        marketingExpense.Mailings +
                        marketingExpense.Other
                    )}{" "}
                  </h3>
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
                    value={marketingExpense.marketing}
                    defaultValue={0}
                    decimalsLimit={2}
                    onValueChange={(value) =>
                      setMarketingExpense((prev) => {
                        if (isNaN(value)) {
                          value = 0;
                        }
                        return { ...prev, marketing: parseFloat(value) };
                      })
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
                  <h3>
                    Holding Cost ={" "}
                    {currencyFormat(
                      holdingExpense["Monthly Payments"] +
                        holdingExpense.Other +
                        holdingExpense.holding +
                        holdingExpense.Insurance +
                        holdingExpense.Maintenance +
                        holdingExpense.Utilities
                    )}{" "}
                  </h3>
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
                    value={holdingExpense.holding}
                    defaultValue={0}
                    decimalsLimit={2}
                    onValueChange={(value) =>
                      setHoldingExpense((prev) => {
                        if (isNaN(value)) {
                          value = 0;
                        }
                        return { ...prev, holding: parseFloat(value) };
                      })
                    }
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
              col
              requiredInput
              label="Market Rent"
            />
            <div className="accordian-div">
              <div className="accord-flex">
                <button
                  type="button"
                  onClick={() => setDropDown((prev) => !prev)}
                >
                  <h3>
                    Total Monthly Expenses ={" "}
                    {currencyFormat(
                      monthlyExpense["Capital Expenditure"] +
                        monthlyExpense.HOA +
                        monthlyExpense.Insurance +
                        monthlyExpense.Other +
                        monthlyExpense.monthly +
                        monthlyExpense.PITI +
                        monthlyExpense["Property Management"] +
                        monthlyExpense.Taxes
                    )}{" "}
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
                <div className="accord-top-input">
                  <p>$</p>
                  <CurrencyInput
                    value={monthlyExpense.monthly}
                    defaultValue={0}
                    decimalsLimit={2}
                    onValueChange={(value) =>
                      setMonthlyExpense((prev) => {
                        if (isNaN(value)) {
                          value = 0;
                        }
                        return { ...prev, monthly: parseFloat(value) };
                      })
                    }
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
              col
              info="Supercharge your ROI with the Rent To Own model. With the rent to own model, you receive a non refundable option deposit typically 5-10 percent of the purchase price. Insert that amount into the following box to see what your cash on cash return would be using the rent to own strategy."
              label="Supercharge Your Roi"
              gold
            />

            <button type="submit" className="calculate">
              Calculate
            </button>
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
            <p>{cashReturn}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

const InputComp = ({ label, name, value, handler, col, info, gold }) => {
  return (
    <div className={`colRow ${col ? "inputCol" : ""}`}>
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
