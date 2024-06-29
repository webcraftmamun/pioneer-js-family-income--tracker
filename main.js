// Function to update the page header with the current month name and year
updatePageHeader("Dashboard");

// Get reference to the status, income items, and expense items container elements
const updateStatus = document.querySelector(".update-status");
const incomeItems = document.querySelector(".incomeItems");
const expenseItems = document.querySelector(".expenseItems");

// Function to calculate total income or expenses for the current month
const calculateMonthlyTotal = (data, currentMonth, currentYear, key) => {
  return data
    .filter(
      (item) =>
        item.date.month === currentMonth && item.date.year == currentYear
    )
    .reduce((total, item) => total + parseFloat(item[key]), 0);
};

// Function to filter and get the first five entries for the current month
const getFirstFiveEntries = (data, currentMonth, currentYear) => {
  return data
    .filter(
      (item) =>
        item.date.month === currentMonth && item.date.year == currentYear
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by creation date
    .slice(0, 5); // Get the first five entries
};

// Get data from localStorage
const incomeData = readData("income");
const expenseData = readData("expense");

// Get current month and year
const { currentMonth, currentYear } = getCurrentMonthAndYear();

// Calculate totals for the current month
const currentIncome = calculateMonthlyTotal(
  incomeData,
  currentMonth,
  currentYear,
  "salary"
);
const currentExpense = calculateMonthlyTotal(
  expenseData,
  currentMonth,
  currentYear,
  "expense"
);
const currentSavings = currentIncome - currentExpense;

// Update the status container with the calculated values
updateStatus.innerHTML = `
  <div class="update-status-item">
    <div class="item-top">
      <div class="top-content">
        <h4><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${currentExpense}</h4>
        <span>Total Expenses</span>
      </div>
      <div class="top-icon">
        <i class="fa-solid fa-arrow-down-short-wide"></i>
      </div>
    </div>
    <div class="item-bottom gradient-bg-3">
      <span>${currentMonth}</span>
      <span><i class="fa-solid fa-arrow-up-right-dots"></i></span>
    </div>
  </div>
  <div class="update-status-item">
    <div class="item-top">
      <div class="top-content">
        <h4><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${currentIncome}</h4>
        <span>Total Income</span>
      </div>
      <div class="top-icon">
        <i class="fa-solid fa-arrow-up-wide-short"></i>
      </div>
    </div>
    <div class="item-bottom gradient-bg-2">
      <span>${currentMonth}</span>
      <span><i class="fa-solid fa-arrow-up-right-dots"></i></span>
    </div>
  </div>
  <div class="update-status-item">
    <div class="item-top">
      <div class="top-content">
        <h4><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${currentSavings}</h4>
        <span>Total Savings</span>
      </div>
      <div class="top-icon">
        <i class="fa-solid fa-volcano"></i>
      </div>
    </div>
    <div class="item-bottom gradient-bg-1">
      <span>${currentMonth}</span>
      <span><i class="fa-solid fa-arrow-up-right-dots"></i></span>
    </div>
  </div>
`;

// Get the first five income entries for the current month
const firstFiveIncomes = getFirstFiveEntries(
  incomeData,
  currentMonth,
  currentYear
);

// Generate the HTML markup for the first five income entries
let incomeItemsHTML = `
  <div class="table-container">
    <div class="section-title">This Month Latest Income</div>
    <table class="projects-table dashboard-table">
      <thead>
        <tr>
          <th rowspan="2">Income Source</th>
          <th>Insert Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
`;

firstFiveIncomes.forEach((item) => {
  incomeItemsHTML += `
    <tr>
      <td>
        <div class="info">
          <div class="name">${item["income-note"]}</div>
        </div>
      </td>
      <td>${item.date.day} ${item.date.month}, ${item.date.year}</td>
      <td><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${item.salary}</td>
    </tr>
  `;
});

incomeItemsHTML += `
      </tbody>
    </table>
  </div>
`;

incomeItems.innerHTML = incomeItemsHTML;

// Get the first five expense entries for the current month
const firstFiveExpenses = getFirstFiveEntries(
  expenseData,
  currentMonth,
  currentYear
);

// Generate the HTML markup for the first five expense entries
let expenseItemsHTML = `
  <div class="table-container">
    <div class="section-title">This Month Latest Expenses</div>
    <table class="projects-table dashboard-table">
      <thead>
        <tr>
          <th rowspan="2">Source</th>
          <th>Insert Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
`;

firstFiveExpenses.forEach((item) => {
  expenseItemsHTML += `
    <tr>
      <td>
        <div class="info">
          <div class="name">${item["expense-note"]}</div>
        </div>
      </td>
      <td>${item.date.day} ${item.date.month}, ${item.date.year}</td>
      <td><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${item.expense}</td>
    </tr>
  `;
});

expenseItemsHTML += `
      </tbody>
    </table>
  </div>
`;

expenseItems.innerHTML = expenseItemsHTML;
