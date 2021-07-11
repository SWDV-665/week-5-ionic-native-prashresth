import { Component } from '@angular/core';
import {ModalController, ItemSliding, NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from "../../providers/groceries-service/groceries-service";
import { InputDialogServiceProvider } from "../../providers/input-dialog-service/input-dialog-service";
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = 'Groceries List';

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public groceryService: GroceriesServiceProvider,
              public inputDialogService: InputDialogServiceProvider,
              public modalController: ModalController,
              public socialSharing: SocialSharing) {

  }

  loadItems() {
    return this.groceryService.getAllItems();
  }

  async addItem() {
    await this.inputDialogService.showPrompt();
  }

  async editItem(item, index, itemSliding) {
    await this.inputDialogService.showPrompt(item, index, itemSliding);
  }

  async shareItem(item, slidingItem?: ItemSliding) {
    let message = `Grocery Item - Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`;
    let subject = 'Shared via groceries app';
    try {
      await this.socialSharing.share(message, subject);
      slidingItem.close();
    } catch (err) {
      console.error('Error occurred', err);
    }
  }

  async deleteItem(item, index) {
    this.groceryService.deleteItem(index);
    await this.inputDialogService.createDeleteToast(item);
  }
}
