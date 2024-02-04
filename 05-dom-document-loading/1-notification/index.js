export default class NotificationMessage {
  static lastInstance;
  element;

  constructor(greeteing, { duration, type } = {}) {
    this.greeteing = greeteing;
    this.duration = duration || 1000;
    this.type = type || 'error';

    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  show(container = document.body) {
    if (NotificationMessage.lastInstance) {
      NotificationMessage.lastInstance.destroy();
    }

    this.element = this.createElement(this.createTemplate());

    NotificationMessage.lastInstance = this;

    container.appendChild(this.element);

    this.timeoutId = setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  createTemplate() {
    return (`
    <div class="notification ${this.type}" style="--value:20s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.greeteing}
        </div>
      </div>
    </div>
    `);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

}
