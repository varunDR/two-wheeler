import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventoryList'
})
export class InventoryListPipe implements PipeTransform {

  transform(value: any): any {
    var data = [];
    console.log(value.vechile_details)
    console.log(value.length);
    for (let i = 0; i < (value.length); i++) {
      value[i].vechile_details = JSON.parse(value[i].vechile_details);   
      for (let j = 0; j < (value[i].vechile_details.length); j++) {
        data.push({
          branch_name: value[i].branch_name,
          indent_req_id: value[i].indent_req_id,
          employee_firstname: value[i].employee_firstname,
          generated_shipping_id: value[i].generated_shipping_id,
          shipped_by: value[i].shipped_by,
          vechile_no: value[i].vechile_no,
          br_mgr_ack: value[i].br_mgr_ack,
          br_mgr_comment: value[i].br_mgr_comment,
          chassisno: value[i].vechile_details[j].chassisno,
          color: value[i].vechile_details[j].color,
          engineno: value[i].vechile_details[j].engineno,
          frameno: value[i].vechile_details[j].frameno,
          make: value[i].vechile_details[j].make,
          model: value[i].vechile_details[j].model
        });
      }
    }
    console.log(data);
    return data;
  }
}
