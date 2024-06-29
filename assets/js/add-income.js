// Update the page header
updatePageHeader("Income");

// get elements
const incomeForm = document.getElementById("incomeForm");
const formTitle = document.querySelector(".formTitle");

// Retrieve the income data from localStorage
const getSingleIncome = JSON.parse(localStorage.getItem("singleIncomeData"));

const singleIncomeDataShow = () => {
  if (getSingleIncome) {
    formTitle.innerHTML = `<i class="fas fa-lock"></i> Update Data`;

    // Set input field values
    incomeForm.querySelector('input[name="income-note"]').value =
      getSingleIncome["income-note"];
    incomeForm.querySelector('input[name="salary"]').value =
      getSingleIncome.salary;

    // Wait for the DOM to be fully loaded and then set the select values
    document.addEventListener("DOMContentLoaded", function () {
      incomeForm.querySelector("#day").value = getSingleIncome.date.day;
      incomeForm.querySelector("#month").value = getSingleIncome.date.month;
      incomeForm.querySelector("#year").value = getSingleIncome.date.year;
    });

    incomeForm.querySelector('select[name="income-source"]').value =
      getSingleIncome["income-source"];
    incomeForm.querySelector('select[name="payment-method"]').value =
      getSingleIncome["payment-method"];

    incomeForm.querySelector('textarea[name="description"]').value =
      getSingleIncome.description;
  } else {
    formTitle.innerHTML = `<i class="fas fa-lock"></i> Add new income`;
  }
};

singleIncomeDataShow();

// submit income add data
incomeForm.onsubmit = (e) => {
  e.preventDefault();

  if (getSingleIncome) {
    // Extract form data
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    // Combine date components into a single date object
    if (data.day && data.month && data.year) {
      data.date = {
        day: data.day,
        month: data.month,
        year: data.year,
      };
      delete data.day;
      delete data.month;
      delete data.year;
    }

    // Call handleUpdate with the form data
    handleUpdate("getSingleIncome", getSingleIncome.id, data, true);

    handleUpdate("income", getSingleIncome.id, data);
  } else {
    handleFormSubmit(e, "income");
    e.target.reset();
  }
};
