// Get reference to the page header element
const pageHeader = document.querySelector(".page-header");

// Function to get the current month and year
const getCurrentMonthAndYear = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  return { currentMonth, currentYear };
};

// Update the page header with the current month name and year
const updatePageHeader = (pageTitle = "Page Title") => {
  const { currentMonth, currentYear } = getCurrentMonthAndYear();
  pageHeader.innerHTML = `
    <h5>${pageTitle}</h5>
    <h5>${currentMonth} ${currentYear}</h5>
  `;
};

// Function to group data by year and month
const groupData = (data) => {
  const groupedData = {};
  data.forEach((item) => {
    const year = item.date.year;
    const month = item.date.month;
    if (!groupedData[year]) {
      groupedData[year] = {};
    }
    if (!groupedData[year][month]) {
      groupedData[year][month] = [];
    }
    groupedData[year][month].push(item);
  });
  return groupedData;
};

// Function to calculate totals for each month and store in local storage
const calculateAndStoreMonthlyTotals = (groupedData, key) => {
  const monthlyTotals = {};
  for (const year in groupedData) {
    for (const month in groupedData[year]) {
      const total = groupedData[year][month].reduce(
        (sum, item) => sum + parseInt(item[key]),
        0
      );
      if (!monthlyTotals[year]) {
        monthlyTotals[year] = {};
      }
      monthlyTotals[year][month] = total;
    }
  }
  localStorage.setItem(`${key}MonthlyTotals`, JSON.stringify(monthlyTotals));
};
