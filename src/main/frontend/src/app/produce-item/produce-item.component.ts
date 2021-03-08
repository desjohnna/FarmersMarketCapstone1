import { Component, OnInit, Input } from '@angular/core';
import { produceItemService, ProduceItem } from '../produceItem.service'
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produce-item',
  templateUrl: './produce-item.component.html',
  styleUrls: ['./produce-item.component.css']
})
export class ProduceItemComponent implements OnInit {

  // DO I NEED THIS HERE, DO I NEED TO DECLARE A DATATYPE??
  produceItemsList: ProduceItem[];
  produceItemSub: Subscription;
  @Input() produceItem: ProduceItem;
  @Input() i: number

  constructor(private produceItemService: produceItemService) { }

  ngOnInit() {
    this.getProduceItems();
  }

  //subscribe
  getProduceItems() {
    this.produceItemSub = this.produceItemService.getProduceItemsFromServer().subscribe(
      (res: ProduceItem[]) => {
        console.log('res ' + res)
        this.produceItemsList = res;
      },
      err => {
        console.log(err);
      }
    )
  }


  onAddProduceItemToCart(produceItem: ProduceItem) {
    this.produceItemService.addProduceItemToCart(produceItem);


    //CHANGEING THE BUTTON TEXT AND COLOR AND SETTING TIME OUT FOR IT TO GO BACK
    document.getElementById('addToCartBtn').innerText = 'Added!'
    document.getElementById('addToCartBtn').style.backgroundColor = 'red'
    setTimeout(() => {
      document.getElementById('addToCartBtn').innerText = 'Add to Cart'
      document.getElementById('addToCartBtn').style.backgroundColor = ''
      

    }, 2000);
  }

 
  
}


