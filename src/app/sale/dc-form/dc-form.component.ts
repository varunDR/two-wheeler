import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dc-form',
  templateUrl: './dc-form.component.html',
  styleUrls: ['./dc-form.component.css']
})
export class DcFormComponent implements OnInit {
  dcFormInfo: any = [];
  vehicleModel: ''
  engineNo: '';
  frameNo: '';
  vehicleColor: '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.dcFormInfo = JSON.parse(sessionStorage.getItem('dcFormData'));
    this.vehicleModel = this.dcFormInfo.vechile_mode;
    this.engineNo = this.dcFormInfo.eng_no;
    this.frameNo = this.dcFormInfo.frame_no;
    this.vehicleColor = this.dcFormInfo.vechicle_color;
  }
  backsaleDetails() {
    sessionStorage.removeItem('dcFormData');
    // this.router.navigate(['sale-details'])
  }

  printComponent(deliveryform) {
    let printContents = document.getElementById(deliveryform).innerHTML;
    const popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
    <html>
        <head>
            <title>DC FORM</title>           
        </head>
        <body onload="window.print(); window.close()">
            ${printContents}
        </body>
    </html>
    `  );
    popupWin.document.close();
  }
}
