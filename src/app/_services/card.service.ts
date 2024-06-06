// Card.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/cards';
import { ApiService } from './common/api-service';
const CardS_API = 'cards';
@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private api: ApiService) {}

  getCards(): Observable<Card[]> {
    return this.api.getData(CardS_API);
  }

  getCount(): Observable<any> {
    return this.api.getData(CardS_API + '/count');
  }

  addCard(Card: Card): Observable<Card> {
    return this.api.postData(CardS_API, Card);
  }

  updateCard(id: string, Card: Card): Observable<Card> {
    return this.api.updateData(CardS_API, id, Card);
  }

  deleteCard(id: number): Observable<void> {
    return this.api.deleteData(CardS_API, id);
  }
}
