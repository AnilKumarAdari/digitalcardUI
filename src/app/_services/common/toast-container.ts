import { Component, TemplateRef, ViewChild, inject } from '@angular/core';

import { ToastService } from './toast-service';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  template: `
    @for (toast of toastService.toasts; track toast) {
    <ng-template #toastTemplate>
      {{ toast.template }}
    </ng-template>
    <ngb-toast
      [class]="toast.className"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngTemplateOutlet]="toastTemplate"></ng-template>
      <button class="btn flex-column" (click)="toastService.remove(toast)">
        X
      </button>
    </ngb-toast>
    }
  `,
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastsContainer {
  toastService = inject(ToastService);
  @ViewChild('customTemplate')
  toastTemplate!: TemplateRef<any>;
}
