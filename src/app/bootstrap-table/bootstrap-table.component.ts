import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-bootstrap-table',
  templateUrl: './bootstrap-table.component.html'
})

export class BootstrapTableComponent {

  @Input() public pageName: string = '';

  @Input() public showExportBtns: boolean = false;
  @Input() public showAddBtn: boolean = false;
  // Table values
  @Input() public rows:Array<any> = [];

  @Input()
  public set config(conf:any) {
    if (!conf.className) {
      conf.className = 'table-striped table-bordered';
    }
    if (conf.className instanceof Array) {
      conf.className = conf.className.join(' ');
    }
    this._config = conf;
  }

  // Outputs (Events)
  @Output() public tableChanged:EventEmitter<any> = new EventEmitter();
  @Output() public cellClicked:EventEmitter<any> = new EventEmitter();

  public showFilterRow:Boolean = false;

  @Input()
  public set columns(values:Array<any>) {
    values.forEach((value:any) => {
      if (value.filtering) {
        this.showFilterRow = true;
      }
      if (value.className && value.className instanceof Array) {
        value.className = value.className.join(' ');
      }
      let column = this._columns.find((col:any) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      }
      if (!column) {
        this._columns.push(value);
      }
    });
  }

  private _columns:Array<any> = [];
  private _config:any = {};

  public constructor(private sanitizer:DomSanitizer) { }

  loadData(pageSize: string){
    console.log(pageSize);
    if (pageSize == 'All') {
      
    }
    
  }

  public sanitize(html:string):SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public get columns():Array<any> {
    return this._columns;
  }

  public get config():any {
    return this._config;
  }

  public get configColumns():any {
    let sortColumns:Array<any> = [];

    this.columns.forEach((column:any) => {
      if (column.sort) {
        sortColumns.push(column);
      }
    });

    return {columns: sortColumns};
  }

  public onChangeTable(column:any):void {
    this._columns.forEach((col:any) => {
      if (col.name !== column.name && col.sort !== false) {
        col.sort = '';
      }
    });
    this.tableChanged.emit({sorting: this.configColumns});
  }

  public getData(row:any, propertyName:string):string {
    return propertyName.split('.').reduce((prev:any, curr:string) => prev[curr], row);
  }

  public cellClick(row:any, column:any):void {
    this.cellClicked.emit({row, column});
  }
}
