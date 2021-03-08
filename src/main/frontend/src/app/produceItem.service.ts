import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Form } from '@angular/forms';


export class ProduceItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: string;

  constructor(id: number, name: string, price: number, quantity: number, type?: string) {

    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
  }

}



@Injectable({
  providedIn: 'root'
})
export class produceItemService {

  produceItemsList: ProduceItem[] = [];
  cartItems: ProduceItem[] = [];

  apiUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) { }


  addProduceItem(id: number, name: string, price: number, quantity: number, type?: string) {
    const newProduceItem = new ProduceItem(id, name, price, quantity, type);
    this.produceItemsList.push(newProduceItem)
  }

  getProduceItems() {
    return this.produceItemsList;
  }

  // deleteProduceItem(produceItem: ProduceItem) {
  //   this.produceItemsList = this.produceItemsList.filter((produceItemToFilter: ProduceItem) => {
  //     return produceItem.id !== produceItemToFilter.id
  //   })
  // }

  deleteProduceItemByIdFromServer(id: number): Observable<ProduceItem> {
    const url = `${this.apiUrl}/produceItemList/${id}`;
    return this.http.delete<ProduceItem>(url);
  }


  getProduceItemsFromServer(): Observable<ProduceItem[]> {
    const url = this.apiUrl + "/produce";
    return this.http.get<ProduceItem[]>(url)
  }

  updateProduceItemOnServer(id: number, name: string, price: number, quantity: number, type: string) {
    const newProduceItem = new ProduceItem(id, name, price, quantity, type);
    const url = `${this.apiUrl}/ProduceItemList/${id}`;
    return this.http.put<ProduceItem>(url, newProduceItem);
  }

  createNewProduceItemOnServer(id: number, name: string, price: number, quantity: number, type: string) {
    const newProduceItem = new ProduceItem(id, name, price, quantity, type);
    const url = this.apiUrl + '/produce';
    return this.http.post<ProduceItem>(url, newProduceItem)
  }

  deleteProduceItemFromCart(i: number) {
    this.cartItems.splice(i, 1);
  }

  emptyCart() {
    this.cartItems = [];
  }

  getProduceItemsInCart(): ProduceItem[] {
    return this.cartItems
  }

  addProduceItemToCart(cartItem: ProduceItem) {
    this.cartItems.push(cartItem)
  }

  purchaseProduceItems(cartItems: ProduceItem[]): Observable<ProduceItem[]> {
    return of(this.cartItems);
  }


}
