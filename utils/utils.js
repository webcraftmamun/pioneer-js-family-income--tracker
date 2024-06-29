const msg = document.getElementById("msg");
const msgClose = document.querySelector(".msg-close");

// message hide
if (msgClose) {
  msgClose.onclick = () => {
    msg.style.display = "none";
  };
}

/**
 * Utility function to handle form submission, extract data, and store it in localStorage.
 *
 * @param {Event} e - The form submission event.
 * @param {string} key - The localStorage key.
 */
const handleFormSubmit = (e, key) => {
  e.preventDefault();

  // Extract form data
  const formData = new FormData(e.target);
  let data = Object.fromEntries(formData.entries());

  if (!data) {
    alert("All Fields Are Required");
  }

  // Get existing data from localStorage
  const storedData = localStorage.getItem(key);
  let lsData = storedData ? JSON.parse(storedData) : [];

  // Check and combine date components
  if (data.day && data.month && data.year) {
    data = {
      ...data,
      date: {
        day: data.day,
        month: data.month,
        year: data.year,
      },
    };
    delete data.day;
    delete data.month;
    delete data.year;
  }

  // Generate a unique ID for the new entry
  const newId = lsData.length > 0 ? lsData[lsData.length - 1].id + 1 : 1;

  // Add new data
  lsData.push({
    ...data,
    id: newId,
    trash: false,
    createdAt: new Date().toISOString(),
  });

  // Save updated data back to localStorage
  localStorage.setItem(key, JSON.stringify(lsData));
  msg.style.display = "flex";
  msg.querySelector("p").innerHTML = "New data add";
};

/**
 * Read data from localStorage.
 *
 * @param {string} key - The localStorage key.
 * @returns {Array} - The data stored in localStorage.
 */
const readData = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

// Utility function to delete an entry from localStorage.

const handleDelete = (key, id) => {
  const conformData = confirm("Are you sure");

  if (conformData) {
    const storedData = localStorage.getItem(key);
    let lsData = storedData ? JSON.parse(storedData) : [];

    // Filter out the entry to delete by id
    lsData = lsData.filter((item) => item.id != id);

    // Save updated data back to localStorage
    localStorage.setItem(key, JSON.stringify(lsData));
  }
};

// Assuming this function is already defined in your script
const handleUpdate = (key, id, updatedData, singleData = false) => {
  const storedData = localStorage.getItem(key);
  let lsData = storedData ? JSON.parse(storedData) : [];

  if (singleData) {
    // Update and save single data directly
    localStorage.setItem(key, JSON.stringify(lsData));
  } else {
    // Find the specific entry by id and merge the updated data with the existing data
    lsData = lsData.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          ...updatedData,
          date: { ...item.date, ...updatedData.date },
        };
      }
      return item;
    });
    // Save updated data back to localStorage
    localStorage.setItem(key, JSON.stringify(lsData));
  }

  msg.style.display = "flex";
  msg.querySelector("p").innerHTML = "Data Updated";
};

const clearAllLsData = (key) => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};
