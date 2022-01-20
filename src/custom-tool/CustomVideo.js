import {
  creatingWrapper,
  creatingVideosWrapper,
  videoToolbarSvg,
  linkToolbarSvg,
  modalStruture,
} from "./util";

export default class CustomVideo {
  static get toolbox() {
    return {
      title: "Add Video",
      icon: videoToolbarSvg,
    };
  }

  constructor({ data }) {
    // this.data = data;
    this.wrapper = undefined;
    this.files = [];
  }

  // render video
  render() {
    this.wrapper = creatingWrapper();
    this.wrapper
      .querySelector("input[type=file]")
      .addEventListener("change", (e) => {
        this.files = [...this.files, ...e.target.files];
        this._createVideo(this.files);
      });

    this.wrapper.addEventListener("dragenter", function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });

    this.wrapper.addEventListener("drop", (e) => {
      e.preventDefault();
      this.files = [...this.files, ...e.dataTransfer.files];
      this._createVideo(this.files);
    });

    return this.wrapper;
  }

  // creating list from urls
  _createVideo(url) {
    const videosWrapper = creatingVideosWrapper();
    const videosList = videosWrapper.querySelector(".videos-list");
    this.wrapper.innerHTML = "";
    url.forEach((el, i) => {
      const EL = document.createElement("div");
      EL.classList.add("videos-item");
      EL.innerHTML = `<div class="videos-item-wrapper">
                       <div class="videos-item-icon">
                         <img src="./play-icon.png" />
                       </div> 
                       <span>${i + 1} : ${el.name}</span>
                       <div class="videos-item-tools">
                         <span class="edit"><i class="far fa-edit"></i></span>
                         <span class="delete"><i class="far fa-trash-alt"></i></span>
                       </div>
                      </div>
                      `;
      videosList.appendChild(EL);
      // delete functionality
      EL.querySelector(".delete").addEventListener("click", () => {
        this.files = this.files.filter((file) => file.name !== el.name);
        this._createVideo(this.files);
      });
      // edit functionality
      EL.querySelector(".edit").addEventListener("click", (e) => {
        const modalWrapper = modalStruture();
        document.body.appendChild(modalWrapper);
        modalWrapper.querySelector("input[name=addVideo]").value = el.name;
        modalWrapper.querySelector("input[name=addLink").value = el.link || "";
        modalWrapper
          .querySelector(".addNewVideo")
          .addEventListener("click", () => {
            console.log(this.files);
            const index = this.files.findIndex((file) => file.name === el.name);
            this.files[index] = {
              ...this.files[index],
              name: modalWrapper.querySelector("input[name=addVideo]").value,
              link: modalWrapper.querySelector("input[name=addLink]").value,
            };
            this._createVideo(this.files);
            modalWrapper.style.display = "none";
          });
      });
    });

    this.wrapper.appendChild(videosWrapper);
    // console.log(url);
  }

  // add block setting
  renderSettings() {
    const settings = [
      {
        name: "Link",
        icon: linkToolbarSvg,
      },
      {
        name: "Choose files",
        icon: videoToolbarSvg,
      },
    ];
    const wrapper = document.createElement("div");

    settings.forEach((tune) => {
      let button;

      if (tune.name === "Choose files") {
        let choosefile = document.createElement("input");
        choosefile.type = "file";
        choosefile.multiple = true;
        choosefile.id = "chooseFile";
        choosefile.name = "chooseFile";
        choosefile.accept = "video/*";
        choosefile.style.display = "none";
        let choosefilelabel = document.createElement("label");
        choosefilelabel.setAttribute("for", "chooseFile");
        choosefilelabel.innerHTML = tune.icon;

        button = document.createElement("div");
        button.classList.add("cdx-settings-button");
        button.appendChild(choosefilelabel);
        button.appendChild(choosefile);

        // handler for choose file
        choosefile.addEventListener("change", (e) => {
          this.files = [...this.files, ...e.target.files];
          this._createVideo(this.files);
        });

        wrapper.appendChild(button);
      } else {
        button = document.createElement("div");

        button.classList.add("cdx-settings-button");
        button.innerHTML = tune.icon;
        wrapper.appendChild(button);

        button.addEventListener("click", (e) => {
          const modalWrapper = modalStruture();
          document.body.appendChild(modalWrapper);
          modalWrapper
            .querySelector(".addNewVideo")
            .addEventListener("click", (e) => {
              const name = modalWrapper.querySelector(
                "input[name=addVideo]"
              ).value;
              const link =
                modalWrapper.querySelector("input[name=addLink").value;

              this.files = [...this.files, { name, link }];
              this._createVideo(this.files);
              modalWrapper.style.display = "none";
            });
        });
      }
    });

    return wrapper;
  }

  save(blockContent) {
    console.log(this.wrapper.querySelector("input[type=file]").files);
    return {
      url: [...this.wrapper.querySelector("input[type=file]").files],
    };
  }

  validate(savedData) {
    console.log(savedData);
    if (!savedData.url) {
      return false;
    }

    return true;
  }
}
