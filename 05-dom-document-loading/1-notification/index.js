export default class NotificationMessage {
  // подсказка 1  - см. видео 41:40 про требование "без DOM"
  static lastInstance;
  element;

  constructor(greeteing, { duration = 0, type_ = 'success' }) {
    this.greeteing = greeteing;
    this.duration = duration + "ms";
    this.type_ = type_;
    this.notificationClass = type_ == 'success' ? 'notification success' : 'notification error';
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  show() {
    if (NotificationMessage.lastInstance) {
      NotificationMessage.lastInstance.remove();
    }

    this.element = this.createElement(this.createTemplate());

    // add to DOM
    NotificationMessage.lastInstance = this;
    console.log('lastInstance', NotificationMessage.lastInstance);
  }

  createTemplate() {
    return (`
    <div class="${this.notificationClass}" style="--value:${this.duration}">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type_}</div>
        <div class="notification-body">
          ${this.greeteing}
        </div>
      </div>
    </div>
    `);
  }

  remove() {
    this.lastInstance = undefined;
  }

  destroy() {
    this.remove();
  }

}
