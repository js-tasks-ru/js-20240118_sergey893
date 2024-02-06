export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headers = headerConfig;
    
    // Создаем список объектов данных, которые содержат только указанные в заголовке ключи.
    this.fields = this.headers.map(column => column.id);
    this.data = data;

    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  sort (fieldValue, orderValue) {
    const sortType = this.headers.findIndex(x => x.id === fieldValue)?.sortType;

    if (sortType == 'string') {
      this.data = sortStrings(this.data, fieldValue, orderValue);  
    } else {
      this.data = sortNumbers(this.data, fieldValue, orderValue);
    }

    this.data = sortStrings(this.data, fieldValue, orderValue);
    this.element = this.createElement(this.createTemplate());
  }

  createTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          ${this.createHeader()}      

          ${this.createBody()}      

          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

          <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">Reset all filters</button>
            </div>
          </div>
      
        </div>
      </div>
    `;
  }

  createHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
      ${Array.from(this.headers, (column) => this.createHeaderColumn(column)).join('')}
      </div>
    `;
  }

  createHeaderColumn(columnData) {
    const sortSpan = `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow">
      </span></span>
    `;

    return `
      <div class="sortable-table__cell" data-id="${columnData.id}" data-sortable="${columnData.sortable ? 'true' : 'false'}" data-order="asc">
        <span>${columnData.title}</span>
        ${columnData.sortable ? sortSpan : ''}
      </div>
    `;
  }

  createBody() {
    return `
      <div data-element="body" class="sortable-table__body">
      ${Array.from(this.data, (row) => this.createRow(row)).join('')}
      </div>
    `;
  }

  createRow(row) {

    function showFields(row, fields) {
      let htmlFields = '';
      fields.forEach(function(field) {
        htmlFields += `<div class="sortable-table__cell">${row[field]}</div>`;
      });
      return htmlFields;
    }

    return `
      <div class="sortable-table__row">
      ${showFields(row, this.fields)}
      </div>
    `;
  }


  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}


function sortStrings(arr, field, param = 'asc') {
  let collator = new Intl.Collator('ru', { caseFirst: 'upper' });
  return arr.slice().sort(
    (a, b) => param == 'asc' ? collator.compare(a[field], b[field]) : collator.compare(b[field], a[field]),
  );
}


function sortNumbers(arr, field, param = 'asc') {
  return arr.slice().sort(
    (a, b) => param == 'asc' ? a[field] - b[field] : b[field] - a[field],
  );
}