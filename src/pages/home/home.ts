import {Component} from '@angular/core';
import {FakeData} from "../../services/fake-data";
import {ExportData} from "../../services/export-data";
import {DownloadFormat} from "../../models/download-format";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Array<object>;
  downloadFormat: any = DownloadFormat;
  selectedFormat: DownloadFormat ;
  constructor(public fakeData: FakeData, public exportData: ExportData) {
    this.data = this.fakeData.getFakeData();
    this.selectedFormat = DownloadFormat.COMMA;
  }

  OnExport(): void{
    this.exportData.export2CSV(this.data, this.selectedFormat, 'export.csv');
  }
}
