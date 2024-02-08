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
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="asc">  // метод переопределен из-за аттрибута data-order="asc"
        <span>${title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
    `;
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