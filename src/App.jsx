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
    totalPiti: "",
  });
  const [acqusitionCost, setAcqusitionCost] = useState("");
  const [yearlyIncome, setYearlyIncome] = useState("");
  const [cashReturn, setCashReturn] = useState("");
  const [dropDownVal, setDropDownVal] = useState("PITI");

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
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
      totalPiti,
    } = formData;
    const cashToSellerFloat = parseFloat(cashToSeller);
    const backPaymentsFloat = parseFloat(backPayments);
    const marketRentFloat = parseFloat(marketRent);
    const marketingFloat = parseFloat(marketing);
    const closingCostFloat = parseFloat(closingCost);
    const renovationsFloat = parseFloat(renovations);
    const holdingCostFloat = parseFloat(holdingCost);
    const dispoFloat = parseFloat(dispo);
    const totalPitiFloat = parseFloat(totalPiti);
    const accCost =
      cashToSellerFloat +
      backPaymentsFloat +
      marketingFloat +
      closingCostFloat +
      renovationsFloat +
      holdingCostFloat +
      dispoFloat;
    const yearlyIncomeVal = marketRentFloat * 12 - totalPitiFloat * 12;
    setAcqusitionCost(parseFloat(accCost).toFixed(2));
    setYearlyIncome(parseFloat(yearlyIncomeVal).toFixed(2));
    setCashReturn(parseFloat(yearlyIncomeVal / accCost).toFixed(2));
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
            />
            <InputComp
              handler={inputHandler}
              value={formData.backPayments}
              name="backPayments"
              label="Back Payments/Liens"
            />
            <InputComp
              handler={inputHandler}
              value={formData.marketing}
              name="marketing"
              info="va lists/ Skip trace, text blast, referral, realtor, commission, acquisition commissions, sponsored ads,mailings"
              label="Cost of Marketing"
            />
            <InputComp
              handler={inputHandler}
              value={formData.closingCost}
              name="closingCost"
              label="Closing Cost"
            />
            <InputComp
              handler={inputHandler}
              value={formData.renovations}
              name="renovations"
              label="Renovations"
            />
            <InputComp
              handler={inputHandler}
              value={formData.holdingCost}
              name="holdingCost"
              label="Holding Cost"
              info="lawn/snow/maintainance, monthly payment, utilities, insurance"
            />
            <InputComp
              handler={inputHandler}
              value={formData.dispo}
              name="dispo"
              label="Cost of Dispo"
            />
          </div>
          <div className="formCol">
            <InputComp
              handler={inputHandler}
              value={formData.marketRent}
              name="marketRent"
              col
              label="Marketing Rent"
            />
            <InputComp
              handler={inputHandler}
              value={formData.totalPiti}
              name="totalPiti"
              label="Total Monthly Expenses"
              dropItems={[
                "PITI",
                "Taxes",
                "Insurance",
                "HOA",
                "Capital Expenditure",
                "Property Management",
                "Other",
              ]}
              dropDownVal={dropDownVal}
              setDropDownVal={setDropDownVal}
              col
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
  dropItems,
  setDropDownVal,
  dropDownVal,
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
            required
          />
        </div>
        {dropItems?.length > 0 && (
          <select
            value={dropDownVal}
            onChange={(e) => {
              setDropDownVal(e.target.value);
            }}
          >
            {dropItems.map((elem, idx) => {
              return (
                <option key={idx + elem} value={elem}>
                  {elem}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </div>
  );
};
