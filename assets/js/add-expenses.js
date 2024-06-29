// Update the page header
updatePageHeader("Expense ");
// get elements
const expenseForm = document.getElementById("expenseForm");
const formTitle = document.querySelector(".formTitle");

// Retrieve the income data from localStorage
const getSingleExpense = JSON.parse(localStorage.getItem("singLsExpensesData"));

const singleExpenseDataShow = () => {
  if (getSingleExpense) {
    formTitle.innerHTML = `<i class="fas fa-lock"></i> Update Expense Data`;

    // Set input field values
    expenseForm.querySelector('input[name="expense-note"]').value =
      getSingleExpense["expense-note"];
    expenseForm.querySelector('input[name="expense"]').value =
      getSingleExpense.expense;

    // Wait for the DOM to be fully loaded and then set the select values
    document.addEventListener("DOMContentLoaded", function () {
      expenseForm.querySelector("#day").value = getSingleExpense.date.day;
      expenseForm.querySelector("#month").value = getSingleExpense.date.month;
      expenseForm.querySelector("#year").value = getSingleExpense.date.year;
    });

    expenseForm.querySelector('textarea[name="description"]').value =
      getSingleExpense.description;
  } else {
    formTitle.innerHTML = `<i class="fas fa-lock"></i> Add new Expense`;
  }
};

singleExpenseDataShow();

// submit income add data
expenseForm.onsubmit = (e) => {
  e.preventDefault();

  if (getSingleExpense) {
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
    handleUpdate("getSingleExpense", getSingleExpense.id, data, true);

    handleUpdate("expense", getSingleExpense.id, data);
  } else {
    handleFormSubmit(e, "expense");
    e.target.reset();
  }
};
