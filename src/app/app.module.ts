import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {
  NgbAccordionModule,
  NgbDatepickerModule,
  NgbModule,
  NgbPagination,
  NgbPaginationModule,
  NgbTooltipModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products.component';
import { ProductModalComponent } from './products/product-modal/product-modal.component';
import { CommonModule } from '@angular/common';
import { NgbdDatepickerConfig } from './common/date-picker.config';
import { ToastsContainer } from './_services/common/toast-container';
import { NgxPrintModule } from 'ngx-print';
import { SearchCardPipe } from './pipes/searchCard.pipe';
import { CardComponent } from './bill/card.component';
import { PrintCardComponent } from './bill/print-card/print-card.component';
import { CardNumberPipe } from './card-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    SideNavComponent,
    TopNavComponent,
    FooterComponent,
    ForgotPasswordComponent,
    ProductsComponent,
    ProductModalComponent,
    CardComponent,
    PrintCardComponent,
    SearchCardPipe,
    CardNumberPipe,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbDatepickerModule,
    NgbAccordionModule,
    NgbTypeaheadModule,
    ToastsContainer,
    NgxPrintModule,
    NgbPaginationModule,
    NgbTooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
