// adding multiple attr same time
const multiAttr = (el, attrs) => {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

// creating main UI wrapper with neccessary element
const creatingWrapper = () => {
  const wrapper = document.createElement("div");
  const fileInput = document.createElement("input");
  const fileInputLabel = document.createElement("label");
  const customVideoBox = document.createElement("div");
  const initialState = document.createElement("div");
  const initialStateContainer = document.createElement("div");
  const videoIcon = document.createElement("div");
  const videoBox = document.createElement("div");
  const videoSvg = document.createElement("img");
  const videoBoxP = document.createElement("p");
  const videoBoxSpan = document.createElement("span");

  // adding necessary attribute
  wrapper.classList.add("wrapper");
  multiAttr(fileInput, {
    type: "file",
    name: "videos",
    multiple: "",
    id: "videos",
    accept: "video/*",
  });
  multiAttr(fileInputLabel, { for: "videos" });
  customVideoBox.classList.add("custom-video-box");
  initialState.classList.add("initial-state");
  initialStateContainer.classList.add("initial-state-container");
  videoIcon.classList.add("video-icon");
  videoBox.classList.add("video-box");
  videoSvg.setAttribute("src", "./videoIcon.svg");
  videoSvg.setAttribute("alt", "Video icon");
  videoBoxP.innerText = "Drag and drop or ";
  videoBoxSpan.innerText = "attach video";

  // appending childs
  wrapper.appendChild(fileInputLabel);
  wrapper.appendChild(fileInput);
  fileInputLabel.appendChild(customVideoBox);
  customVideoBox.appendChild(initialState);
  initialState.appendChild(initialStateContainer);
  initialStateContainer.appendChild(videoIcon);
  initialStateContainer.appendChild(videoBox);
  videoIcon.appendChild(videoSvg);
  videoBox.appendChild(videoBoxP);
  videoBoxP.appendChild(videoBoxSpan);

  // adding drop event in wrapper
  wrapper.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  });

  return wrapper;
};
// custom video box UI end

// show videos list container
const creatingVideosWrapper = () => {
  const videosWrapper = document.createElement("div");
  videosWrapper.classList.add("videos-wrapper");

  const videosWrapperHeading = document.createElement("div");
  videosWrapperHeading.classList.add("videos-wrapper-heading");
  videosWrapperHeading.innerHTML = `
    <h2><img src="./videoIcon.svg" />Videos</h2>
  `;

  const videosList = document.createElement("div");
  videosList.classList.add("videos-list");

  videosWrapper.appendChild(videosWrapperHeading);
  videosWrapper.appendChild(videosList);
  return videosWrapper;
};
// show videos list end

// modal structure for edit or add new video
const modalStruture = () => {
  // modal wrapper
  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal-wrapper");

  // modal container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  modalWrapper.appendChild(modalContainer);

  // title/name
  const inputNameContainer = document.createElement("div");
  inputNameContainer.classList.add("input-container");
  modalContainer.appendChild(inputNameContainer);

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "addVideo");
  nameLabel.innerText = "Title";
  const nameInput = document.createElement("input");
  nameInput.id = "addVideo";
  nameInput.type = "text";
  nameInput.name = "addVideo";
  inputNameContainer.appendChild(nameLabel);
  inputNameContainer.appendChild(nameInput);

  // link
  const inputLinkContainer = document.createElement("div");
  inputLinkContainer.classList.add("input-container");
  modalContainer.appendChild(inputLinkContainer);

  const linkLabel = document.createElement("label");
  linkLabel.setAttribute("for", "addVideoLink");
  linkLabel.innerText = "Link";
  const linkInput = document.createElement("input");
  linkInput.id = "addLink";
  linkInput.type = "text";
  linkInput.name = "addLink";
  inputLinkContainer.appendChild(linkLabel);
  inputLinkContainer.appendChild(linkInput);

  // button
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  modalContainer.appendChild(buttonContainer);

  // cancle button
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  buttonContainer.appendChild(cancelBtn);
  cancelBtn.addEventListener("click", (e) => {
    nameInput.value = "";
    linkInput.value = "";
    modalWrapper.style.display = "none";
  });

  // add button
  const addBtn = document.createElement("button");
  addBtn.innerText = "Add";
  addBtn.classList.add("addNewVideo");
  buttonContainer.appendChild(addBtn);

  return modalWrapper;
};

// create modal for video opener
const videoModal = (url) => {
  // wrapper
  const videoModalWrapper = document.createElement("div");
  videoModalWrapper.classList.add("video-modal-wrapper");

  // wrapper container
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-modal-container");
  videoModalWrapper.appendChild(videoContainer);

  // video
  const video = document.createElement("video");
  multiAttr(video, { controls: "", autoplay: "", src: url });
  videoContainer.appendChild(video);
  const source = document.createElement("source");
  multiAttr(source, { src: url, type: "video/*" });
  video.appendChild(source);

  // close button
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = `<i class="fas fa-times"></i>`;
  videoContainer.appendChild(closeBtn);

  return videoModalWrapper;
};

// video svg
const videoToolbarSvg = `<svg width="20" height="19" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 490.004 490.004" style="enable-background:new 0 0 490.004 490.004;" xml:space="preserve">
<g>
	<path d="M469.203,143.602h-213.1v-43.9h158.8c11.5,0,20.9-9.4,20.9-20.9s-9.4-20.9-20.9-20.9h-178.7c-11.5,0-20.9,9.4-20.9,20.9
		v64.8h-67.9c-11.5,0-20.9,9.4-20.9,20.9v41.4l-99.3-34.2c-17.9-5.4-27.4,11-27.2,19.9v192.3c0,12.7,12.4,24.9,26.1,19.9l100.3-34.2
		v41.6c0,11.5,9.4,20.9,20.9,20.9h321.8c11.5,0,20.9-9.4,20.9-20.9v-246.7C490.103,153.002,480.703,143.602,469.203,143.602z
		 M39.803,356.702v-135.8l86.7,30.3v75.2L39.803,356.702z M449.403,391.202h-281v-205.9h281V391.202z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`;

const linkToolbarSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 141.732 141.732" height="17px" id="Livello_1" version="1.1" viewBox="0 0 141.732 141.732" width="20px" xml:space="preserve"><g id="Livello_107"><path d="M57.217,63.271L20.853,99.637c-4.612,4.608-7.15,10.738-7.15,17.259c0,6.524,2.541,12.653,7.151,17.261   c4.609,4.608,10.74,7.148,17.259,7.15h0.002c6.52,0,12.648-2.54,17.257-7.15L91.738,97.79c7.484-7.484,9.261-18.854,4.573-28.188   l-7.984,7.985c0.992,4.667-0.443,9.568-3.831,12.957l-37.28,37.277l-0.026-0.023c-2.652,2.316-6.001,3.579-9.527,3.579   c-3.768,0-7.295-1.453-9.937-4.092c-2.681-2.68-4.13-6.259-4.093-10.078c0.036-3.476,1.301-6.773,3.584-9.39l-0.021-0.02   l0.511-0.515c0.067-0.071,0.137-0.144,0.206-0.211c0.021-0.021,0.043-0.044,0.064-0.062l0.123-0.125l36.364-36.366   c2.676-2.673,6.23-4.144,10.008-4.144c0.977,0,1.947,0.101,2.899,0.298l7.993-7.995c-3.36-1.676-7.097-2.554-10.889-2.554   C67.957,56.124,61.827,58.663,57.217,63.271 M127.809,24.337c0-6.52-2.541-12.65-7.15-17.258c-4.61-4.613-10.74-7.151-17.261-7.151   c-6.519,0-12.648,2.539-17.257,7.151L49.774,43.442c-7.479,7.478-9.26,18.84-4.585,28.17l7.646-7.646   c-0.877-4.368,0.358-8.964,3.315-12.356l-0.021-0.022l0.502-0.507c0.064-0.067,0.134-0.138,0.201-0.206   c0.021-0.02,0.04-0.04,0.062-0.06l0.126-0.127l36.363-36.364c2.675-2.675,6.231-4.147,10.014-4.147   c3.784,0,7.339,1.472,10.014,4.147c5.522,5.521,5.522,14.51,0,20.027L76.138,71.629l-0.026-0.026   c-2.656,2.317-5.999,3.581-9.526,3.581c-0.951,0-1.891-0.094-2.814-0.278l-7.645,7.645c3.369,1.681,7.107,2.563,10.907,2.563   c6.523,0,12.652-2.539,17.261-7.148l36.365-36.365C125.27,36.988,127.809,30.859,127.809,24.337"/></g><g id="Livello_1_1_"/></svg>`;

export {
  videoToolbarSvg,
  linkToolbarSvg,
  creatingVideosWrapper,
  creatingWrapper,
  modalStruture,
  videoModal,
};
