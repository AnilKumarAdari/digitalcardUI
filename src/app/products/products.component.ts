// product-table.component.ts
import { Component, OnInit, model } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../_services/product.service';
import { Product } from '../models/prodcuts';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ToastService } from '../_services/common/toast-service';

@Component({
  selector: 'app-product-table',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  totalItems: number = 0;
  pageSize = 5;
  page = 1;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.toast.show({
          template: 'loaded the products!',
          className: 'bg-success text-light',
          delay: 5000,
        });
        localStorage.setItem('productsList', JSON.stringify(data));
        this.totalItems = data.length;
        this.refreshProducts();
      },
      (err) => {
        this.toast.show({
          template: 'Error in loading the products!',
          className: 'bg-error text-light',
          delay: 5000,
        });
      }
    );
  }

  refreshProducts() {
    this.products = JSON.parse(localStorage.getItem('productsList') || '')
      .map((item: any, i: number) => ({ idNo: i + 1, ...item }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  editProduct(product: Product): void {
    const modalRef = this.modalService.open(ProductModalComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false,
      size: 'lg',
    });
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.action = 'Edit ';
    modalRef.componentInstance.productSaved = this.loadProducts;
  }

  AddProduct() {
    const modalRef = this.modalService.open(ProductModalComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false,
      size: 'lg',
    });
    modalRef.componentInstance.product = null;
    modalRef.componentInstance.action = 'Add';
    modalRef.componentInstance.productSaved = this.loadProducts;
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  sort(property: string): void {
    // Implement sorting logic
  }
}
