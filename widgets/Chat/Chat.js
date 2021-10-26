export class Chat {
  constructor({ position = "bottom-right" }) {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    this.createStyles();
  }

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  initialize() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const chatIcon = document.createElement("img");
    chatIcon.src = "assets/chat.svg";
    chatIcon.classList.add("icon");
    this.chatIcon = chatIcon;

    const closeIcon = document.createElement("img");
    closeIcon.src = "assets/cross.svg";
    closeIcon.classList.add("icon", "hidden");
    this.closeIcon = closeIcon;

    buttonContainer.appendChild(this.chatIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    this.messageContainer = document.createElement("div");
    this.messageContainer.classList.add("hidden", "message-container");

    this.createMessageContainerContent();

    container.appendChild(this.messageContainer);
    container.appendChild(buttonContainer);
  }

  createMessageContainerContent() {
    this.messageContainer.innerHTML = "";
    const title = document.createElement("h2");
    title.innerHTML = '<span>Offline!, Urgent?<br/>Leave message...</span>';
    title.style = "border-radius: 20% 5%;";
    const form = document.createElement("form");
    form.classList.add("content");
    const userId = document.createElement("input");
    userId.required = true;
    userId.id = "userId";
    userId.type = "email";
    userId.placeholder = "Enter your User ID";

    const btn = document.createElement("button");
    btn.textContent = "Submit";
    form.appendChild(userId);
    form.appendChild(btn);
    form.addEventListener("submit", this.submit.bind(this));

    const footer = document.createElement("div");
    footer.classList.add("w_c-footer");

    this.messageContainer.appendChild(title);
    this.messageContainer.appendChild(form);
    this.messageContainer.appendChild(footer);
  }

  createStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
            .icon {
                cursor: pointer;
                width: 60%;
                position: absolute;
                top: 12px;
                left: 12px;
                transition: transform .3s ease;
            }
            .hidden {
                transform: scale(0);
            }
            .button-container {
                background-color: #282463;
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .message-container {
                border-radius: 35% 10% 5% 5%;
                box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
                width: 360px;
                right: -25px;
                bottom: 75px;
                max-height: 420px;
                position: absolute;
                transition: max-height .2s ease;
                font-family: Helvetica, Arial ,sans-serif;
            }
            .message-container.hidden {
                max-height: 0px;
            }
            .message-container h2 {
                margin: 0;  
                border-radius: 20% 5%;
                padding: 20px 20px;
                color: #fff;
                background-color: #6939c8   ;
            }
            .message-container .content {
                margin: 20px 10px ;
                border: 1px solid #dbdbdb;
                padding: 10px;
                display: flex;
                background-color: #fff;
                flex-direction: column;
            }
            .message-container form * {
                margin: 5px 0;
            }
            .message-container form input {
                padding: 10px;
            }
            .message-container form button {
                cursor: pointer;
                background-color: #371663de;
                color: #fff;
                border: 0;
                border-radius: 6px;
                padding: 10px;
            }
            .message-container form button:hover {
                background-color: #371663;
            }
            .w_c-footer{
                text-align: center; 
                position: relative; 
                top: 12%;
                font-weight: bold;
                margin: 10% 0 5% 0;
            }
            .w_c-footer:after{
                content:'Powered by <3 me.';
            }
        `.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.chatIcon.classList.add("hidden");
      this.closeIcon.classList.remove("hidden");
      this.messageContainer.classList.remove("hidden");
    } else {
      this.createMessageContainerContent();
      this.chatIcon.classList.remove("hidden");
      this.closeIcon.classList.add("hidden");
      this.messageContainer.classList.add("hidden");
    }
  }

  submit(event) {
    event.preventDefault();
    const formSubmission = {
      userId: event.srcElement.querySelector("#userId").value,
    };

    this.messageContainer.innerHTML =
      '<h2>Thank You.</h2><p class="content">Your query should be resolved shortly by someone.</p>';

    console.log(formSubmission);
  }
}
