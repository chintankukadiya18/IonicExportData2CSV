import {Injectable} from '@angular/core';
import {DownloadFormat} from '../models/download-format';
import {File} from '@ionic-native/file';
import {Platform, AlertController, ModalController} from 'ionic-angular';
import {SelectFolder} from '../modals/select-folder/select-folder';
import {Folder} from '../models/folder';

/**
 * ExportData Service, It will use to export data as an CSV with given delimiter.
 */
@Injectable()
export class ExportData {

  constructor(private file: File,
              private platform: Platform,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) {
  }

  /**
   * Function which is use to export data 2 csv file.
   * @param {any[]} data Data which we want to download
   * @param {DownloadFormat} columnDelimiter Delimiter of data file.
   * @param {string} filename Name of file.
   * @returns {boolean} True if downloaded successful, False otherwise.
   */
  public export2CSV(data: any[], columnDelimiter: DownloadFormat, filename: string): boolean {
    if (!data || data.length === 0) {
      return false;
    }
    const result = this.convertDataToCSV(data, columnDelimiter);
    this.downloadCSV(result, filename);
  }

  /**
   * Function which is use to convert row data to csv string.
   * @param {any[]} data Row data which we want to export
   * @param {DownloadFormat} columnDelimiter Delimiter for CSV file.
   * @returns {string} return csv data string.
   */
  private convertDataToCSV(data: any[], columnDelimiter: DownloadFormat = DownloadFormat.COMMA): string {

    const lineDelimiter = '\n';
    let fields: string[] = [];
    for (const key in data[0]) {
      if ('object' === typeof data[0][key]) {
        const subFields: string[] = Object.keys(data[0][key]).map((k) => key + '.' + k);
        fields = fields.concat(subFields);
      } else {
        fields.push(key);
      }
    }
    let result = '';
    result += fields.map((field) => field.toUpperCase()).join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
      let ctr = 0;
      fields.forEach(function (key) {
        if (ctr > 0) {
          result += columnDelimiter;
        }
        if (item[key]) {
          result += item[key];
        } else {
          const subKeys: string[] = key.split('.');
          result += item[subKeys[0]][subKeys[1]];
        }
        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }

  /**
   * Function which is use to download CSV file of given data.
   * @param {string} csvdata CSV data string which is going to download.
   * @param {string} filename Name of file with extension.
   */
  private downloadCSV(csvdata: string, filename: string = 'export.csv'): void {

    if (!csvdata.match(/^data:text\/csv/i)) {
      csvdata = 'data:text/csv;charset=utf-8,' + csvdata;
    }

    if (this.platform.is('core')) {
      const data: string = encodeURI(csvdata);
      const link: HTMLElement = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
      return;
    }

    let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.externalRootDirectory;
    }

    this.file.listDir(path, '').then((folderList: Folder[]) => {
      const modal = this.modalCtrl.create(SelectFolder, {folderList: folderList});
      modal.onDidDismiss((data: any) => {
        if (data) {
          this.file.writeFile(data.selectedFolder.nativeURL, filename, csvdata, {
            replace: true
          }).then(() => {
            let alertMsg = this.alertCtrl.create(({
              title: 'File Downloaded Successfully',
              subTitle: 'Your file is downloaded at ' + data.selectedFolder.nativeURL + filename,
              buttons: ['Ok']
            }));
            alertMsg.present();
          }).catch((error) => {
            alert("File Download Error");
          });
        }
      });
      modal.present();
    });
  }
}
