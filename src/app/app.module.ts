import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BootstrapTableComponent } from './bootstrap-table/bootstrap-table.component';
import { NgTableFilteringDirective } from './ng-table-filtering.directive';
import { NgTablePagingDirective } from './ng-table-paging.directive';
import { NgTableSortingDirective } from './ng-table-sorting.directive';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AppComponent,
    BootstrapTableComponent,
    NgTableFilteringDirective,
    NgTablePagingDirective,
    NgTableSortingDirective
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
