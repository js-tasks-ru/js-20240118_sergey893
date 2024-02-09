import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  constructor(headerConfig, {
    data = [],
    sorted = {}
  } = {}) {
   
    super(headerConfig, data);

    this.sort(sorted.id, sorted.order); 
    this.addEventHandlers();
  }

  addEventHandlers() {
    const header = this.element.querySelector('[data-element="header"]');
    header.addEventListener('pointerdown', this.onClickHeaderHandler);
  }

  onClickHeaderHandler = event => {
    const colClicked = event.target.closest('[data-sortable="true"]');
    if (!colClicked) {
      return;
    }

    const order = this.createSortingOrder(colClicked);

    this.sort(colClicked.dataset.id, order);
  }
  
  createSortingOrder(column) {
    const currOrder = column.dataset.order;
    const toggleOrder = {
      desc: 'asc', 
      asc: 'desc'
    } ;

    return currOrder === '' ? 'asc' : toggleOrder[currOrder];
  }

  createHeaderRow({id, title, sortable}) {
    const htmlString = super.createHeaderRow({id, title, sortable});
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');   
    doc.body.firstElementChild.setAttribute('data-order', 'asc');
    return doc.body.innerHTML;
  }

  createSortArrow() {
    return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
    `;
  }
 
  removeArrow() {
    const arrowElem = this.element.querySelector('.sortable-table__sort-arrow');
    if (arrowElem) {
      arrowElem.remove();
    }
  }

  sort(fieldValue, orderValue) {
    super.sort(fieldValue, orderValue);

    const selectedColumn = this.element.querySelector(`.sortable-table__cell[data-id="${fieldValue}"]`);
    selectedColumn.dataset.order = orderValue;
    this.removeArrow();
    selectedColumn.innerHTML += this.createSortArrow();   
  }

  destroy() {
    this.element.querySelector('[data-element="header"]').removeEventListener('pointerdown', this.onClickHeaderHandler);
    super.destroy();
  }
}