// Get references to the income container elements
const allIncome = document.getElementById("allIncome");

// Function to generate HTML markup for income data
const generateIncomeMarkup = (
  incomeGroupedData,
  expenseGroupedData,
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

  const sortedYears = Object.keys(incomeGroupedData).sort((a, b) => {
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
      if (incomeGroupedData[year] && incomeGroupedData[year][month]) {
        yearHasData = true;
        innerData += `
          <div class="table-container">
            <div class="section-title high flex-between">
              <span>${month}</span>
              <span>${year}</span>
            </div>
            <table class="projects-table table-1st-child">
              <thead>
                <tr>
                  <th>Note</th>
                  <th>Source/Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
        `;
        let totalIncome = 0;
        const sortedItems = incomeGroupedData[year][month].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        sortedItems.forEach((item) => {
          innerData += `
            <tr>
              <td>${item["income-note"]}</td>
              <td>${item["income-source"]}</td>
              <td>${item.date.day}-${item.date.month}-${item.date.year}</td>
              <td><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${item.salary}</td>
              <td>
                <a class="custom-btn-primary" href="#"  onclick="updateIncomeData('${item.id}')"><i class="fa-regular fa-pen-to-square"></i></a>
                <a class="custom-btn-secondary" href="#" onclick="deleteIncomeData('${item.id}')"><i class="fa-regular fa-trash-can"></i></a>
              </td>
            </tr>
          `;
          totalIncome += parseInt(item.salary);
        });

        const totalExpense =
          expenseGroupedData[year] && expenseGroupedData[year][month]
            ? expenseGroupedData[year][month].reduce(
                (sum, item) => sum + parseInt(item.expense),
                0
              )
            : 0;

        const balance = totalIncome - totalExpense;

        innerData += `
            <tr style="background: #FCFFE0; font-size: 17px;">
              <td></td>
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
      innerData += `<div class="no-data-found">No data found for ${year}</div>`;
    }

    innerData += `</div>`;
  });

  return innerData;
};

// Function to fetch and display all income data
const displayAllIncome = () => {
  const incomeData = readData("income");
  const expenseData = readData("expense");

  const incomeGroupedData = groupData(incomeData);
  const expenseGroupedData = groupData(expenseData);

  calculateAndStoreMonthlyTotals(incomeGroupedData, "income");
  calculateAndStoreMonthlyTotals(expenseGroupedData, "expense");

  const { currentYear } = getCurrentMonthAndYear();
  const incomeMarkup = generateIncomeMarkup(
    incomeGroupedData,
    expenseGroupedData,
    currentYear
  );
  allIncome.innerHTML = incomeMarkup;
};

// Update the page header
updatePageHeader("All Incomes ");

// Display all income data
displayAllIncome();

// update data set item ls
const updateIncomeData = (id) => {
  const income = JSON.parse(localStorage.getItem("income"));

  const singleIncomeData = income.find((item) => item.id == id);
  if (singleIncomeData) {
    localStorage.setItem("singleIncomeData", JSON.stringify(singleIncomeData));

    // Get the current URL
    let baseURL = window.location.href;

    // Remove everything after the last slash (including the slash)
    baseURL = baseURL.substring(0, baseURL.lastIndexOf("/") + 1);

    // Append the relative path
    let redirectURL = baseURL + "add-income.html";

    // Redirect to the new URL
    window.location.href = redirectURL;
  } else {
    alert("No data Found");
  }
};

// delete income data
const deleteIncomeData = (id) => {
  handleDelete("income", id);

  displayAllIncome();
};
