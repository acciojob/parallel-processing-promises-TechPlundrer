const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.src = url;

    img.onload = function () {
      resolve(img);
    };

    img.onerror = function () {
      reject("Failed to load image: " + url);
    };
  });
}

function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  const promises = images.map(function (image) {
    return downloadImage(image.url);
  });

  Promise.all(promises)
    .then(function (loadedImages) {
      loading.style.display = "none";

      loadedImages.forEach(function (img) {
        output.appendChild(img);
      });
    })
    .catch(function (error) {
      loading.style.display = "none";
      errorDiv.textContent = error;
    });
}

btn.addEventListener("click", downloadImages);