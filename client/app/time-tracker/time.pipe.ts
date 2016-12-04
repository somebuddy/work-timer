import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  public transform(value: number): string {
    let val = Math.floor(value / 100);
    const ms = this.intToStr(val % 10, 1);
    val = Math.floor(value / 1000);
    const ss = this.intToStr(val % 60);
    val = Math.floor(val / 60);
    const mm = this.intToStr(val % 60);
    val = Math.floor(val / 60);
    return `${val}:${mm}:${ss}.${ms}`;
  }

  private intToStr(val: number, num: number = 2) {
    let str = val.toString();
    while (str.length < num) {
      str = '0' + str;
    }
    return str;
  }
};
