// menu tabs for result area
const resultAreaTabs = document.querySelectorAll("#result-area-container li");

resultAreaTabs.forEach(tab => {
  console.log(tab);
  tab.addEventListener("click", event => {
    // clear active class from tabs
    resultAreaTabs.forEach(tab => {
      tab.className = "";
    })
    // add active class to tab
    tab.className = "active";
  });
});