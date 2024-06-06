import { ChangeDetectorRef, Component, OnInit, model } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estimations } from '../models/estimations';
import { ProductService } from '../_services/product.service';
import { Product } from '../models/prodcuts';
import { OperatorFunction, Observable, debounceTime, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../_services/common/toast-service';
import { CardComponent } from '../bill/card.component';
import { Card } from '../models/cards';
import { CardService } from '../_services/card.service';
import { PrintCardComponent } from '../bill/print-card/print-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content?: string;
  cardsData: Card[] = [];
  terms: string = '';
  itemsPerPage = 2;
  currentPage = 1;
  pageCardsData: Card[] = [];

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private cardService: CardService,
    private toastService: ToastService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (err) => {
        console.log(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = 'Error with status: ' + err.status;
        }
      },
    });
    this.loadCards();
  }

  loadCards() {
    this.cardService.getCards().subscribe(
      (data) => {
        this.cardsData = data;
        this.toastService.show({
          template: 'Cards loaded successfully!',
          className: 'bg-success text-light',
          delay: 5000,
        });
        this.pageChanged(1);
      },
      (err) => {
        this.toastService.show({
          template: 'Error While loading the Cards data!',
          className: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
  }

  addCard() {
    const modalRef = this.modalService.open(CardComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false,
      size: 'xl',
    });
    modalRef.componentInstance.product = null;
    modalRef.componentInstance.action = 'Add';
    modalRef.componentInstance.cardUpdated.subscribe(() => {
      this.loadCards();
    });
  }

  editCard(card: Card): void {
    const modalRef = this.modalService.open(CardComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false,
      size: 'xl',
    });
    modalRef.componentInstance.cardDetails = card;
    modalRef.componentInstance.action = 'Edit';
    modalRef.componentInstance.cardUpdated.subscribe(() => {
      this.loadCards();
    });
  }

  viewCard(card: Card): void {
    const modalRef = this.modalService.open(PrintCardComponent, {
      centered: true,
      size: 'xl',
    });
    modalRef.componentInstance.cardDetails = card;
    modalRef.componentInstance.action = 'Edit';
    modalRef.componentInstance.cardUpdated.subscribe(() => {
      this.loadCards();
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    this.cd.detectChanges();
  }

  pageChanged(event: number): void {
    const startItem = (event - 1) * 5;
    const endItem = event * 5;
    this.pageCardsData = this.cardsData.slice(startItem, endItem); //Retrieve items for page
    this.cd.detectChanges();
  }
}
