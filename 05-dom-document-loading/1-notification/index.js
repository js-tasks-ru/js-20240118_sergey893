// export default class NotificationMessage {
class NotificationMessage {
  // подсказка 1  - см. видео 41:40 про требование "без DOM"
  static lastInstance;

  constructor(prop) {
    this.prop = prop;
  }

  show() {
    if (NotificationMessage.lastInstance) {
      NotificationMessage.lastInstance.remove();
    }
    
    // add to DOM
    NotificationMessage.lastInstance = this;
    console.log('lastInstance', NotificationMessage.lastInstance);    
  }

  remove () {
    this.lastInstance = undefined;
  }

  destroy () {
    this.remove();
  }

}

const obj1 = new NotificationMessage(1);
const obj2 = new NotificationMessage(2);
const obj3 = new NotificationMessage(3);
console.log('---');
obj1.show();
obj2.show();
obj3.show();
