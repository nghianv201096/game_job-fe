import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './features/building-blocks/profile/profile.component';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataBindingComponent } from './features/building-blocks/data-binding/data-binding.component';
import { DirectivesComponent } from './features/building-blocks/directives/directives.component';
import { ViewEncapsulationComponent } from './features/building-blocks/view-encapsulation/view-encapsulation.component';
import { ChildElementComponent } from './features/building-blocks/view-encapsulation/child-element/child-element.component';
import { ReactiveFormComponent } from './features/building-blocks/reactive-form/reactive-form.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { CreateBookComponent } from './features/books/create-book/create-book.component';
import { UpdateBookComponent } from './features/books/update-book/update-book.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { EnumDescriptionPipe } from './pipes/enum-description.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBookComponent } from './features/books/view-book/view-book.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NgrxBookListComponent } from './features/books-with-ngrx/book-list/book-list.component';
import { NgrxCreateBookComponent } from './features/books-with-ngrx/create-book/create-book.component';
import { NgrxUpdateBookComponent } from './features/books-with-ngrx/update-book/update-book.component';
import { NgrxViewBookComponent } from './features/books-with-ngrx/view-book/view-book.component';
import { EffectsModule } from '@ngrx/effects';
import { BookStoreEffects } from './store/book-store.effect';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/book.reducer';
import { ParamComponent } from './features/building-blocks/param/param.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { LoginComponent } from './features/login/login.component';
import { AuthInterceptor } from './interceptor/authen.interceptor';
import { AccessDeniedComponent } from './features/access-denied/access-denied.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { JobListItemComponent } from './features/jobs/job-list-item/job-list-item.component';
import { JobDetailComponent } from './features/jobs/job-detail/job-detail.component';
import { JobUpsertComponent } from './features/jobs/job-upsert/job-upsert.component';
import { EmployeeListComponent } from './features/employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './features/employees/employee-detail/employee-detail.component';
import { EmployerListComponent } from './features/employers/employer-list/employer-list.component';
import { EmployerDetailComponent } from './features/employers/employer-detail/employer-detail.component';
import { PackageSaleListComponent } from './features/package-sale/package-sale-list/package-sale-list.component';
import { PackageSaleUpsertComponent } from './features/package-sale/package-sale-upsert/package-sale-upsert.component';
import { JobAutocompleteComponent } from './features/jobs/job-autocomplete/job-autocomplete.component';
import { FooterComponent } from './features/footer/footer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { JobRelatedListComponent } from './features/jobs/job-related-list/job-related-list.component';
import { ImagePipe } from './pipes/image.pipe';
import { OverlaySpinnerComponent } from './features/overlay-spinner/overlay-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {EditorModule} from 'primeng/editor';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    NotFoundComponent,
    DataBindingComponent,
    DirectivesComponent,
    ViewEncapsulationComponent,
    ChildElementComponent,
    ReactiveFormComponent,
    ReversePipe,
    UppercasePipe,
    EnumDescriptionPipe,
    BookListComponent,
    CreateBookComponent,
    UpdateBookComponent,
    ViewBookComponent,
    NgrxBookListComponent,
    NgrxCreateBookComponent,
    NgrxUpdateBookComponent,
    NgrxViewBookComponent,
    ParamComponent,
    NavbarComponent,
    LoginComponent,
    AccessDeniedComponent,
    JobListComponent,
    JobListItemComponent,
    JobDetailComponent,
    JobUpsertComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployerListComponent,
    EmployerDetailComponent,
    PackageSaleListComponent,
    PackageSaleUpsertComponent,
    JobAutocompleteComponent,
    FooterComponent,
    JobRelatedListComponent,
    ImagePipe,
    OverlaySpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    CheckboxModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    NgSelectModule,
    ProgressSpinnerModule,
    EditorModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('bookStore', bookReducer),
    EffectsModule.forFeature([BookStoreEffects]),
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
