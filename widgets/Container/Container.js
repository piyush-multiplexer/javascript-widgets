export class Container {
  constructor() {
    this.open = false;
    this.position = { bottom: "30px", right: "30px" };
    console.log(this.position);
    this.initialize();
    this.createStyles();
  }

  initialize() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("w_c-buttonContainer");

    const openContainer = document.createElement("div");
    openContainer.innerHTML =
      "<h1 style='top: -18px;position: absolute;right: -2px;'>OC</h1>";
    openContainer.classList.add("w_c-icon");
    this.openContainer = openContainer;

    const closeIcon = document.createElement("img");
    closeIcon.src = "assets/cross.svg";
    closeIcon.classList.add("w_c-icon", "w_c-hidden");
    this.closeIcon = closeIcon;

    buttonContainer.appendChild(this.openContainer);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleContainer.bind(this));

    this.messageContainer = document.createElement("div");
    this.messageContainer.classList.add("w_c-hidden", "w_c-dataContainer");

    this.createMessageContainerContent();

    container.appendChild(this.messageContainer);
    container.appendChild(buttonContainer);
  }

  createMessageContainerContent() {
    this.messageContainer.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = `Add your Content Here...`;

    const dataContent = document.createElement("section");
    dataContent.innerHTML =
      "<div style='text-align:center'><h2>Add </br>Your</br> Content</br> Here.</h2><div>";

    this.messageContainer.appendChild(title);
    this.messageContainer.appendChild(dataContent);
  }

  createStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
            .w_c-icon {
                cursor: pointer;
                width: 70%;
                position: absolute;
                top: 9px;
                left: 9px;
                transition: transform .3s ease;
            }
            .w_c-hidden {
                transform: scale(0);
            }
            .w_c-buttonContainer {
                background-color: #bc3ce6;
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .w_c-dataContainer {
                box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
                width: 400px;
                right: -25px;
                bottom: 75px;
                max-height: 400px;
                position: absolute;
                transition: max-height .2s ease;
                font-family: Helvetica, Arial ,sans-serif;
            }
            .w_c-dataContainer.w_c-hidden {
                max-height: 0px;
            }
            .w_c-dataContainer h3 {
                margin: 0;
                padding: 20px 20px;
                color: #fff;
                background-color: #bc3ce6;
            }
        `.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleContainer() {
    this.open = !this.open;
    if (this.open) {
      this.openContainer.classList.add("w_c-hidden");
      this.closeIcon.classList.remove("w_c-hidden");
      this.messageContainer.classList.remove("w_c-hidden");
    } else {
      this.createMessageContainerContent();
      this.openContainer.classList.remove("w_c-hidden");
      this.closeIcon.classList.add("w_c-hidden");
      this.messageContainer.classList.add("w_c-hidden");
    }
  }
}
