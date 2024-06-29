// Get references to the income and expense container elements
const allExpense = document.getElementById("allExpense");
// Update the page header
updatePageHeader("All Expenses ");
// Function to generate HTML markup for expense data
const generateExpenseMarkup = (
  expenseGroupedData,
  incomeGroupedData,
  currentYear
) => {
  let innerData = "";
  const { currentMonth } = getCurrentMonthAndYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonthOrder = (currentMonth) => {
    const currentMonthIndex = monthNames.indexOf(currentMonth);
    return [
      ...monthNames.slice(currentMonthIndex),
      ...monthNames.slice(0, currentMonthIndex),
    ];
  };

  const sortedYears = Object.keys(expenseGroupedData).sort((a, b) => {
    if (a == currentYear) return -1;
    if (b == currentYear) return 1;
    return b - a; // Descending order for other years
  });

  if (sortedYears.length === 0) {
    return `<div class="no-data-found">No data found</div>`;
  }

  sortedYears.forEach((year) => {
    innerData += `<div class="year-data">`;
    const sortedMonths = getMonthOrder(currentMonth);

    const orderedMonths = [
      ...sortedMonths,
      ...monthNames.filter((month) => !sortedMonths.includes(month)),
    ];

    let yearHasData = false;

    orderedMonths.forEach((month) => {
      if (expenseGroupedData[year] && expenseGroupedData[year][month]) {
        yearHasData = true;
        innerData += `
          <div class="table-container">
            <div class="section-title low flex-between">
              <span>${month}</span>
              <span>${year}</span>
            </div>
            <table class="projects-table table-1st-child">
              <thead>
                <tr>
                  <th>Expense Note</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
        `;
        let totalExpense = 0;
        const sortedItems = expenseGroupedData[year][month].sort(
          (a, b) => a.date.day - b.date.day
        );

        sortedItems.forEach((item) => {
          innerData += `
            <tr>
              <td>
                <div class="name">${item["expense-note"]}</div>
              </td>
              <td>${item.date.day}-${item.date.month}-${item.date.year}</td>
              <td><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${item.expense}</td>
              <td>
                <a class="custom-btn-primary" href="#"><i class="fa-regular fa-pen-to-square" onclick="updateExpenseData('${item.id}')"></i></a>
                <a class="custom-btn-secondary" href="#" onclick="deleteExpenseData('${item.id}')"><i class="fa-regular fa-trash-can"></i></a>
              </td>
            </tr>
          `;
          totalExpense += parseInt(item.expense);
        });

        const totalIncome =
          incomeGroupedData[year] && incomeGroupedData[year][month]
            ? incomeGroupedData[year][month].reduce(
                (sum, item) => sum + parseInt(item.salary),
                0
              )
            : 0;

        const balance = totalIncome - totalExpense;

        innerData += `
            <tr style=" background: #d3d3d3; font-size: 17px;">
              <td>Total Income & Expense</td>
              <td><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span title="Total Income">${totalIncome}</span> - <span title="Total Expense">${totalExpense}</span></td>
              <td> = <i class="fa-solid fa-bangladeshi-taka-sign"></i> <span title="Total Savings">${balance}</span></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      `;
      }
    });

    if (!yearHasData) {
      innerData += `<div class="no-data-found">No Expense data found for ${year}</div>`;
    }

    innerData += `</div>`;
  });

  return innerData;
};

// Function to fetch and display all expense data
const displayAllExpense = () => {
  const expenseData = readData("expense");
  const incomeData = readData("income");

  const expenseGroupedData = groupData(expenseData);
  const incomeGroupedData = groupData(incomeData);

  calculateAndStoreMonthlyTotals(expenseGroupedData, "expense");
  calculateAndStoreMonthlyTotals(incomeGroupedData, "income");

  const { currentYear } = getCurrentMonthAndYear();
  const expenseMarkup = generateExpenseMarkup(
    expenseGroupedData,
    incomeGroupedData,
    currentYear
  );
  allExpense.innerHTML = expenseMarkup;
};

// Display all expense data
displayAllExpense();

// update data set item ls
const updateExpenseData = (id) => {
  const expense = JSON.parse(localStorage.getItem("expense"));

  const singleExpenseData = expense.find((item) => item.id == id);
  if (singleExpenseData) {
    localStorage.setItem(
      "singLsExpensesData",
      JSON.stringify(singleExpenseData)
    );

    // Get the current URL
    let baseURL = window.location.href;

    // Remove everything after the last slash (including the slash)
    baseURL = baseURL.substring(0, baseURL.lastIndexOf("/") + 1);

    // Append the relative path
    let redirectURL = baseURL + "add-expenses.html";

    // Redirect to the new URL
    window.location.href = redirectURL;
  } else {
    alert("No data Found");
  }
};

// delete expense data
const deleteExpenseData = (id) => {
  handleDelete("expense", id);
  displayAllExpense();
};
