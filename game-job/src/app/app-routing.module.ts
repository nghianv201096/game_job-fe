import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProfileComponent } from './features/building-blocks/profile/profile.component';
import { DataBindingComponent } from './features/building-blocks/data-binding/data-binding.component';
import { DirectivesComponent } from './features/building-blocks/directives/directives.component';
import { ReactiveFormComponent } from './features/building-blocks/reactive-form/reactive-form.component';
import { ViewEncapsulationComponent } from './features/building-blocks/view-encapsulation/view-encapsulation.component';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { UpdateBookComponent } from './features/books/update-book/update-book.component';
import { CreateBookComponent } from './features/books/create-book/create-book.component';
import { ViewBookComponent } from './features/books/view-book/view-book.component';
import { NgrxBookListComponent } from './features/books-with-ngrx/book-list/book-list.component';
import { NgrxCreateBookComponent } from './features/books-with-ngrx/create-book/create-book.component';
import { NgrxUpdateBookComponent } from './features/books-with-ngrx/update-book/update-book.component';
import { NgrxViewBookComponent } from './features/books-with-ngrx/view-book/view-book.component';
import { ParamComponent } from './features/building-blocks/param/param.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AccessDeniedComponent } from './features/access-denied/access-denied.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { JobDetailComponent } from './features/jobs/job-detail/job-detail.component';
import { JobUpsertComponent } from './features/job-management/job-upsert/job-upsert.component';
import { JobManagementListComponent } from './features/job-management/job-management-list/job-management-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JobListComponent,
  },
  {
    path: 'tin-tuyen-dung/chi-tiet/:id',
    component: JobDetailComponent,
    data: {
      isPreview: false,
    },
  },
  {
    path: 'tin-tuyen-dung/preview/:id',
    component: JobDetailComponent,
    data: {
      isPreview: true,
    },
  },
  {
    path: 'tin-tuyen-dung',
    component: JobManagementListComponent,
  },
  {
    path: 'tin-tuyen-dung/thao-tac/:id',
    component: JobUpsertComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'data-binding',
    component: DataBindingComponent,
  },
  {
    path: 'directives',
    component: DirectivesComponent,
  },
  {
    path: 'view-encapsulation',
    component: ViewEncapsulationComponent,
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
  },

  // Books.
  {
    path: 'books',
    component: BookListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'books/create',
    component: CreateBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'books/update/:id',
    component: UpdateBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'books/view/:id',
    component: ViewBookComponent,
    canActivate: [AuthGuard],
  },

  // Books with ngrx.
  // Books.
  {
    path: 'ngrx-books',
    component: NgrxBookListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ngrx-books/create',
    component: NgrxCreateBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ngrx-books/update/:id',
    component: NgrxUpdateBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ngrx-books/view/:id',
    component: NgrxViewBookComponent,
    canActivate: [AuthGuard],
  },

  // Authenticated
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  // Default
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
