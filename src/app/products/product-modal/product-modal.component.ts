// product-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  NgbInputDatepickerConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/prodcuts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../_services/product.service';
import { ToastService } from '../../_services/common/toast-service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
  providers: [NgbInputDatepickerConfig],
})
export class ProductModalComponent {
  @Input()
  product!: Product;
  @Input() action: string = '';
  @Output() productSaved = new EventEmitter<Product>();
  modalTitle: string = '';
  maxDate = new Date();
  bsConfig = { showWeekNumbers: false, dateInputFormat: 'DD-MMM-YYYY' };

  productForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productsApi: ProductService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.modalTitle = this.action === 'Add' ? 'Add Product' : 'Edit Product';

    this.productForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ]),
      ],
      quantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ]),
      ],
      // emailId: [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      //   ]),
      // ],
      // mobile: [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.maxLength(10),
      //     Validators.pattern('^[0-9]+$'),
      //   ]),
      // ],
      // dob: ['', Validators.compose([Validators.required])],
    });

    if (this.action !== 'Add') {
      this.productForm.setValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        quantity: this.product.quantity,
      });
    }
  }

  get f() {
    return this.productForm.controls;
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  saveProduct(): void {
    if (this.action === 'Add') {
      this.productsApi.addProduct(this.productForm.value).subscribe(
        (data) => {
          this.closeModal();
          this.productSaved.emit(this.productForm.value);
          this.toast.show({
            template: 'Added product successfully!',
            className: 'bg-success text-light',
            delay: 5000,
          });
        },
        (err) => {
          this.toast.show({
            template: 'Error while adding the product! ' + err.message,
            className: 'bg-error text-light',
            delay: 5000,
          });
        }
      );
    } else {
      this.product.description = this.productForm.get('description')?.value;
      this.product.name = this.productForm.get('name')?.value;
      this.product.price = this.productForm.get('price')?.value;
      this.product.quantity = this.productForm.get('quantity')?.value;
      this.productSaved.emit(this.productForm.value);
      this.productsApi
        .updateProduct(this.product.id, this.productForm.value)
        .subscribe(
          (data) => {
            this.closeModal();
            this.toast.show({
              template: 'Updated product successfully!',
              className: 'bg-success text-light',
              delay: 5000,
            });
          },
          (err) => {
            this.toast.show({
              template: 'Error while adding the product! ' + err.message,
              className: 'bg-error text-light',
              delay: 5000,
            });
          }
        );
    }
  }
}
