import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empType'
})
export class EmpTypePipe implements PipeTransform {

  transform(empData: any, loginData: any): any {
    var data = [];
    console.log("***************")
    console.log(loginData.emp_type_id)
    console.log(empData)
    let i;
    if (loginData.emp_type_id == 3) {
      for (i = 0; i < empData.length; i++) {
        if (empData[i].id == 3 || empData[i].id == 4 || empData[i].id == 5) {
          data.push(empData[i]);
        }
        if (empData.length == i + 1) {
          return data;
        }
      }
    } else if (loginData.emp_type_id == 2) {
      for (i = 0; i < empData.length; i++) {
        if (empData[i].id == 3 || empData[i].id == 4 || empData[i].id == 5 || empData[i].id == 2) {
          data.push(empData[i]);
        }
        if (empData.length == i + 1) {
          return data;
        }
      }
    } else if (loginData.emp_type_id == 1) {
      console.log(empData)
      return empData;
    }
  }
}
