document.addEventListener("DOMContentLoaded", function () {
  const daySelect = document.getElementById("day");
  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - i);

  function populateSelect(select, options, defaultValue) {
    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      if (option === defaultValue) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });
  }

  const today = new Date();
  const defaultDay = today.getDate();
  const defaultMonth = months[today.getMonth()];
  const defaultYear = today.getFullYear();

  populateSelect(daySelect, days, defaultDay);
  populateSelect(monthSelect, months, defaultMonth);
  populateSelect(yearSelect, years, defaultYear);
});
