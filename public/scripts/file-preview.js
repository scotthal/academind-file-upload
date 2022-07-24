const fileChooserElement = document.querySelector("#image");
const imagePreviewElement = document.querySelector("#image-preview");

fileChooserElement.addEventListener("change", function () {
  const files = fileChooserElement.files;
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const chosenFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(chosenFile);
  imagePreviewElement.style.display = "block";
});
