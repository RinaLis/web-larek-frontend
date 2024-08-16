import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal <T> extends Component<T> {
    protected modal: HTMLElement;
    protected events: IEvents;
    protected _content: HTMLDivElement;

    constructor(container: HTMLElement, events: IEvents) {
      super(container);
      this.events = events;
      this._content = ensureElement<HTMLDivElement>('.modal__content', this.container)
      const closeButtonElement = this.container.querySelector(".modal__close");
      closeButtonElement.addEventListener("click", this.close.bind(this));
      this.container.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      });
      this.handleEscUp = this.handleEscUp.bind(this);
    }
  
    open() {
      this.container.classList.add("modal_active");
      document.addEventListener("keyup", this.handleEscUp);
        }
  
    close() {
      this.container.classList.remove("modal_active");
      this._content.replaceChildren('');
      document.removeEventListener("keyup", this.handleEscUp);
    }
  
    handleEscUp (evt: KeyboardEvent) {
        if (evt.key === "Escape") {
          this.close();
        }
    }

    set content(item: HTMLElement) {
      this._content.replaceChildren(item);
    }
}

  