import { Component, Input } from '@angular/core';
import { Card } from '../../models/cards';

@Component({
  selector: 'app-print-card',
  templateUrl: './print-card.component.html',
  styleUrl: './print-card.component.css',
})
export class PrintCardComponent {
  @Input()
  cardDetails!: Card;

  onPrint() {
    window.print();
  }
}
