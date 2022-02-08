const deleteFormHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-id");
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".delete-btn-red")
  .addEventListener("click", deleteFormHandler);
