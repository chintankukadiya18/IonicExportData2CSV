import {Injectable} from '@angular/core';

@Injectable()
export class FakeData {

  data: [object];
  constructor() {
    this.data = [{
      Tower: "A",
      Flat: "101",
      Month: "November",
      Year: "2017"
    }, {
      Tower: "A",
      Flat: "201",
      Month: "November",
      Year: "2017"
    }, {
      Tower: "B",
      Flat: "301",
      Month: "November",
      Year: "2017"
    }, {
      Tower: "C",
      Flat: "101",
      Month: "November",
      Year: "2017"
    }, {
      Tower: "D",
      Flat: "401",
      Month: "November",
      Year: "2017"
    }];
  }

  getFakeData(): Array<object> {
    return this.data;
  }
}
