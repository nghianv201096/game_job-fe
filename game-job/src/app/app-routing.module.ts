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
import { LoginComponent } from './features/accounts/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AccessDeniedComponent } from './features/access-denied/access-denied.component';
import { JobListComponent } from './features/job-homes/job-list/job-list.component';
import { JobDetailComponent } from './features/job-homes/job-detail/job-detail.component';
import { JobUpsertComponent } from './features/job-managements/job-upsert/job-upsert.component';
import { JobManagementListComponent } from './features/job-managements/job-management-list/job-management-list.component';
import { RegisterComponent } from './features/accounts/register/register.component';
import { EmployerListComponent } from './features/accounts/employers/employer-list/employer-list.component';
import { CandidateListComponent } from './features/accounts/candidates/candidate-list/employer-list.component';
import { JobApplyListComponent } from './features/job-apply-list/job-apply-list.component';
import { JobApplyUpsertComponent } from './features/job-apply-list/job-apply-upsert/job-apply-upsert.component';

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
    path: 'ung-tuyen',
    component: JobApplyListComponent,
  },
  {
    path: 'ung-tuyen/thao-tac/:jobId/:id',
    component: JobApplyUpsertComponent,
  },
  {
    path: 'ung-tuyen/chi-tiet/:jobId/:id',
    component: JobApplyUpsertComponent,
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
    path: 'dang-nhap',
    component: LoginComponent,
  },
  {
    path: 'dang-ky',
    component: RegisterComponent,
  },
  {
    path: 'nha-tuyen-dung',
    component: EmployerListComponent,
  },
  {
    path: 'ung-vien',
    component: CandidateListComponent,
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
