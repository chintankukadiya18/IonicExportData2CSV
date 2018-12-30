import {Component} from '@angular/core';
import {Folder} from '../../models/folder';
import {NavParams, NavController, ViewController} from 'ionic-angular';

@Component({
  selector: 'select-folder',
  templateUrl: 'select-folder.html'
})

export class SelectFolder {

  folderList: Folder[];
  selectedFolder: Folder;

  constructor(private navParams: NavParams, private navCtrl: NavController, private viewCtrl: ViewController) {
    this.folderList = this.navParams.get('folderList') || [];
  }

  /**
   * Function which call when user select any folder.
   * It will update the {@link SelectFolder} and close the dialog.
   * @param folder
   */
  onSelect(folder: Folder) {
    this.selectedFolder = folder;
    this.dismiss();
  }

  /**
   * Function which is call when dialog will close.
   * It will pass data to parent dialog.
   */
  dismiss() {
    this.viewCtrl.dismiss({selectedFolder: this.selectedFolder})
  }

  /**
   * Close the dialog.
   */
  closeModal() {
    this.navCtrl.pop();
  }
}
