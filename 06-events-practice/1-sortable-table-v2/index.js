export default class SortableTable {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data.data || data;  
    this.render();
    this.sort(sorted.id, sorted.order); 
    this.addEventHandlers();
  }

  addEventHandlers() {
    const header = this.element.querySelector('[data-element="header"]');
    header.addEventListener('pointerdown', this.onClickHeaderHandler);
  }

  createTable() {
    return `
    <div class="sortable-table">
      ${this.createHeader()}
      ${this.createBody()}
    </div>
    `;
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

  createHeader() {
    return `
    <div data-element="header" class="sortable-table__header sortable-table__row">
        ${ this.createHeaderCell()}
    </div>
    `;
  }

  createHeaderCell() {
    return this.headersConfig.map(headerCell => `
    <div class="sortable-table__cell" data-id="${headerCell.id}" data-sortable="${headerCell.sortable}" data-order="asc">
      <span>${headerCell.title}</span>
    </div>
    `).join('');
  }

  createSortArrow() {
    return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
    `;
  }

  createBody() {
    return `<div data-element="body" class="sortable-table__body">
              ${this.createBodyRows(this.data)}
          </div>`;
  }

  createBodyRows(data) {
    return data.map(item =>
      `<a href="/${item.id}" class="sortable-table__row">
        ${this.headersConfig.map(header => {
        if (header.template) {
          return header.template(item[header.id]);
        } else {
          return `<div class="sortable-table__cell">${item[header.id]}</div>`;
        }
      }
      ).join('')} 
      </a>  
      `).join('');
  }

  render() {        
    const element = document.createElement('div');
    
    element.innerHTML = this.createTable();

    this.element = element.firstElementChild;

    this.subElements = this.getNodes(this.element);
  }

  getNodes(element) {
    const nodes = element.querySelectorAll('[data-element]');
    
    const res = {};
    for (const node of nodes) {
      const name = node.dataset.element;
      res[name] = node;
    }

    return res;
  }

  removeArrow() {
    const arrowElem = this.element.querySelector('.sortable-table__sort-arrow');
    if (arrowElem) {
      arrowElem.remove();
    }
  }

  sort(fieldValue, orderValue) {
    this.removeArrow();
    const sortedData = this.sortByValue(fieldValue, orderValue);
    const columns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const selectedColumn = this.element.querySelector(`.sortable-table__cell[data-id="${fieldValue}"]`);

    selectedColumn.dataset.order = orderValue;
    selectedColumn.innerHTML += this.createSortArrow();

    this.subElements.body.innerHTML = this.createBodyRows(sortedData);
  }

  sortByValue(fieldValue, orderValue) {
    const arr = [...this.data];
    const col = this.headersConfig.find(c => c.id === fieldValue);
    const {sortType} = col;
    const directions = {
      asc: 1,
      desc: -1
    };
    const dir = directions[orderValue];

    return arr.sort((x, y) => {
      switch (sortType) {
      case 'number' :
        return dir * (x[fieldValue] - y[fieldValue]);
      case 'string' :
        return dir * x[fieldValue].localeCompare(y[fieldValue], ['ru', 'en']);
      default :
        return dir * (x[fieldValue] - y[fieldValue]);  
      }
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.element.querySelector('[data-element="header"]').removeEventListener('pointerdown', this.onClickHeaderHandler);
    this.remove();
  }
}