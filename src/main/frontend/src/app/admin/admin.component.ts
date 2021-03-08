import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Form } from '@angular/forms'
import { produceItemService, ProduceItem } from '../produceItem.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  addProduceForm = this.fb.group({

    name: [''],
    price: [],
    quantity: [],
    type: ['']
  });

  @Input() produceItem: ProduceItem;
  @Input() i: number

  produceItemsList: ProduceItem[] = [];
  produceItemsSub: Subscription;
  submitSub: Subscription;
  editSub: Subscription;
  deleteSub: Subscription;
  editingProduceItemId: number;

  constructor(private fb: FormBuilder, private ProduceItemService: produceItemService, private http: HttpClient) { }

  ngOnInit() {
   
    this.getProduceItemsFromServer();
  }

  ngOnDestroy() {
    if (this.produceItemsSub) {
      this.produceItemsSub.unsubscribe();
    }

    if (this.submitSub) {
      this.submitSub.unsubscribe();
    }

    if (this.editSub) {
      this.editSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }

  }

  onSubmitForm() {
    const id = this.addProduceForm.value.id;
    const name = this.addProduceForm.value.name;
    const price = this.addProduceForm.value.price;
    const quantity = this.addProduceForm.value.quantity;
    const type = this.addProduceForm.value.type;


    if (this.editingProduceItemId == undefined) {
      this.submitSub = this.ProduceItemService.createNewProduceItemOnServer(id, name, price, quantity, type).subscribe(
        (res: ProduceItem) => {
          console.log("res " + res);
          this.ProduceItemService.getProduceItemsFromServer();
          this.addProduceForm.reset();
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.editSub = this.ProduceItemService.updateProduceItemOnServer(this.editingProduceItemId, name, price, quantity, type).subscribe(
        (res: ProduceItem) => {
          this.editingProduceItemId = undefined;
          this.addProduceForm.reset();

          this.ProduceItemService.getProduceItemsFromServer();
        },
        err => {
          console.log(err);
        }
      )
    }
  }



  onDeleteProduceItem(produceItem: ProduceItem) {


    this.deleteSub = this.ProduceItemService.deleteProduceItemByIdFromServer(produceItem.id).subscribe(
      (res: any) => {
        this.ProduceItemService.getProduceItemsFromServer();
      },
      err => {
        console.log(err);
      }
    )
  }

  getProduceItemsFromServer() {
    this.produceItemsSub = this.ProduceItemService.getProduceItemsFromServer().subscribe(
      (res: ProduceItem[]) => {
        console.log("res " + res);
        this.produceItemsList = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  onStartEditProduceItem(produceItem: ProduceItem) {
    this.editingProduceItemId = produceItem.id;
    this.addProduceForm.patchValue(produceItem);
  }

  onCancelEditProduceItem() {
    this.editingProduceItemId = undefined;
    this.addProduceForm.reset();
  }




}


