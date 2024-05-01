const app = {
  selector: {
    dropArea: document.getElementById("dropSection"),
    actionContainer: document.getElementById("actionContainer"),
    uploadedImages: document.getElementById("uploadedImage"),
    widthValue: document.getElementById("widthValue"),
    heightValue: document.getElementById("heightValue"),
  },
  actions: {
    highlightAdd: () => {
      app.selector.dropArea.classList.add("highlight");
    },
    highlightRemove: () => {
      app.selector.dropArea.classList.remove("highlight");
    },
    handleFiles: (files) => {
      files = [...files];
      files.forEach(app.actions.previewFile);
    },
    handleDrop: (e) => {
      let dt = e.dataTransfer;
      let files = dt.files;

      app.actions.handleFiles(files);
    },
    previewFile: (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let elems = `<div class="image-content"><div class="image-wrapper"><img alt="${file.name}" src="${reader.result}"><span onclick="app.actions.imageDelete(this)">X</span></div></div>`;
        app.selector.uploadedImages.insertAdjacentHTML("beforeend", elems);
        app.selector.actionContainer.classList.remove("d-none");
      };
    },
    imageDelete: (scope) => {
      scope.parentNode.parentNode.remove();
      app.selector.uploadedImages.innerHTML == "" &&
        app.selector.actionContainer.classList.add("d-none");
    },
    clearAll: () => {
      app.selector.uploadedImages.innerHTML = "";
      app.selector.actionContainer.classList.add("d-none");
    },
    preventDefaults: (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
  },
  init: () => {
    app.selector.dropArea.addEventListener(
      "drop",
      app.actions.handleDrop,
      false
    );

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      app.selector.dropArea.addEventListener(
        eventName,
        app.actions.preventDefaults,
        false
      );
      document.body.addEventListener(
        eventName,
        app.actions.preventDefaults,
        false
      );
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      app.selector.dropArea.addEventListener(
        eventName,
        app.actions.highlightAdd,
        false
      );
    });
    ["dragleave", "drop"].forEach((eventName) => {
      app.selector.dropArea.addEventListener(
        eventName,
        app.actions.highlightRemove,
        false
      );
    });
  },
};

app.init();

// function gcd(a, b) {
//     return (b == 0) ? a : gcd(b, a % b);
// }
// function ratio(x, y) {
//     c = gcd(x, y); return `${x / c}:${y / c}`
// }
