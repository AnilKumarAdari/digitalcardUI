import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperatorFunction, Observable, debounceTime, map } from 'rxjs';
import { ProductService } from '../_services/product.service';
import { Estimations } from '../models/estimations';
import { Product } from '../models/prodcuts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from '../_services/card.service';
import { ToastService } from '../_services/common/toast-service';
import { Card } from '../models/cards';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  content?: string;
  cardForm!: FormGroup<any>;
  estimations: Estimations[] = [];
  priceTotal = 0;
  products: Product[] = [];
  @Input()
  cardDetails!: Card;
  @Input()
  action: string = '';
  selectedOption: string = '';
  @Output() cardUpdated = new EventEmitter<any>();
  statuses = [
    { label: 'Received', value: 'Received' },
    { label: 'Assigned', value: 'Assigned' },
    { label: 'In-Progress', value: 'In-Progress' },
    { label: 'Estimated', value: 'Estimated' },
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'Delivered',
      value: 'Delivered',
    },
    { label: 'Completed', value: 'Completed' },
    { label: 'Paid', value: 'Paid' },
    { label: 'Return', value: 'Return' },
    { label: 'Credit', value: 'Credit' },
  ];

  search: OperatorFunction<string, readonly { name: any }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.products
              .filter(
                (v: { name: string }) =>
                  v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (x: { name: string }) => x.name;
  count: number = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private modalService: NgbModal,
    private cardService: CardService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.cardForm = this.fb.group({
      customerName: ['', Validators.compose([Validators.required])],
      phoneNumber: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      address: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(2000)]),
      ],
    });
    if (this.action === 'Edit') {
      this.cardForm
        .get('customerName')
        ?.setValue(this.cardDetails.customerName);
      this.cardForm.get('phoneNumber')?.setValue(this.cardDetails.phoneNumber);
      this.cardForm.get('address')?.setValue(this.cardDetails.address);
    }

    this.cardService.getCount().subscribe((count: any) => {
      this.count = count;
    });
  }

  onSelectionChange(value: string) {
    this.selectedOption = value;
  }

  getRandomId = (min = 0, max = 999) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().padStart(3, '0');
  };

  onSubmit() {
    if (this.cardForm.valid) {
      this.onPriceChange();
      const today = new Date();
      if (this.action === 'Add') {
        this.cardDetails = {
          cardId:
            today.toLocaleDateString() +
            '_' +
            today.getTime() +
            this.getRandomId(),
          address: this.cardForm.get('address')?.value,
          customerName: this.cardForm.get('customerName')?.value,
          id: this.cardForm.get('id')?.value,
          phoneNumber: this.cardForm.get('phoneNumber')?.value,
        };
        this.cardService.addCard(this.cardDetails).subscribe(
          (data) => {
            this.toastService.show({
              template: 'Added Job successfully!',
              className: 'bg-success text-light',
              delay: 5000,
            });

            this.modalService.dismissAll();
            this.cardUpdated.emit();
          },
          (err) => {
            this.toastService.show({
              template: 'Error While Creating Card!',
              className: 'bg-danger text-light',
              delay: 5000,
            });
          }
        );
      } else {
        this.cardDetails.address = this.cardForm.get('address')?.value;
        this.cardDetails.customerName =
          this.cardForm.get('customerName')?.value;
        this.cardDetails.phoneNumber = this.cardForm.get('phoneNumber')?.value;

        this.cardService
          .updateCard(this.cardDetails.id, this.cardDetails)
          .subscribe(
            (data) => {
              this.toastService.show({
                template: 'Updated Job successfully!',
                className: 'bg-success text-light',
                delay: 5000,
              });
              this.cardUpdated.emit();
              this.modalService.dismissAll();
            },
            (err) => {
              this.toastService.show({
                template: 'Error While Creating Card!',
                className: 'bg-danger text-light',
                delay: 5000,
              });
            }
          );
      }
    } else {
      this.toastService.show({
        template: 'Please provide all required fields!',
        className: 'bg-danger text-light',
        delay: 5000,
      });
    }
  }

  addProduct() {
    this.estimations.push({
      id: '',
      productId: '',
      product: '',
      price: 0,
      quantity: 0,
      description: '',
    });
    this.onPriceChange();
  }
  deleteProduct(index: number) {
    this.estimations.splice(index, 1);
    this.onPriceChange();
  }
  onPriceChange() {
    this.priceTotal = this.estimations
      .map((x) => x.price * x.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    this.onAmountPaid();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Array<Product>) => {
        this.products = data;
      },
      (err) => {}
    );
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  onAmountPaid() {
    this.cardForm
      .get('balance')
      ?.setValue(this.priceTotal - this.cardForm.get('paidAmount')?.value);
  }
}
