import { Component, OnInit } from '@angular/core';
import { produceItemService, ProduceItem } from '../produceItem.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ProduceItem[] = [];
  infoText = '';
  total = 0;

  constructor(private produceItemService: produceItemService,
    private router: Router) { }

  ngOnInit() {
    this.getProduceItemsInCart();
  }

  getProduceItemsInCart() {
    this.cartItems = this.produceItemService.getProduceItemsInCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.cartItems.forEach(i => {
      if (i.price) {
        this.total += i.price;
      }
    })
  }


  onPurchase() {
    this.produceItemService.purchaseProduceItems(this.cartItems).subscribe(
      (res: any) => {
        this.produceItemService.emptyCart();
        this.cartItems = [];

        this.infoText = "Thank you for your purchase!"

        setTimeout(() => {
          this.router.navigate(['/produce'])
        }, 3000);
      },
      err => {
        console.log(err)
      }
    );
  }

  onRemoveProduceItemFromCart(i: number) {
    this.produceItemService.deleteProduceItemFromCart(i)
    this.getProduceItemsInCart();
  }

}



