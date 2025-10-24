const addBtn = document.getElementById("addNoticeBtn");
const inputBox = document.getElementById("noticeInputBox");
const postBtn = document.getElementById("postNoticeBtn");
const noticeText = document.getElementById("noticeText");
const noticeContainer = document.getElementById("noticeContainer");

// Show text area when Add is clicked
addBtn.addEventListener("click", () => {
  inputBox.classList.toggle("hidden");
  noticeText.focus();
});

// Post new notice
postBtn.addEventListener("click", () => {
  const text = noticeText.value.trim();
  if (text === "") return alert("Please enter a notice!");

  // Create notice div
  const notice = document.createElement("div");
  notice.className = "notice";
  notice.innerHTML = `
    <span>${text}</span>
    <button class="remove-btn">Remove</button>
  `;

  // Add remove functionality
  notice.querySelector(".remove-btn").addEventListener("click", () => {
    notice.remove();
  });

  // Add to container
  noticeContainer.prepend(notice);

  // Clear input and hide box
  noticeText.value = "";
  inputBox.classList.add("hidden");
});
