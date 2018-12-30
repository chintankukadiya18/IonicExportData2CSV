import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from 'ionic-angular';
import {SelectFolder} from './select-folder/select-folder';

@NgModule({
  imports: [CommonModule,
    IonicModule.forRoot(SelectFolder)
  ],
  declarations: [SelectFolder],
  exports: [SelectFolder]
})
export class ModalModule {

} 
