import {Component, ElementRef, ViewChild} from '@angular/core';
import {SectionSeparatorComponent} from "../../commonComponents/section-separator/section-separator.component";
import {ContentServiceService} from "../../service/content-service.service";

@Component({
  selector: 'app-donation',
  // standalone: true,
  // imports: [
  //   SectionSeparatorComponent
  // ],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {

  @ViewChild('donateBtn') donateBtn!:ElementRef;

  constructor(private contentService:ContentServiceService) {

  }
  ngOnInit() {


  }
  ngAfterViewInit(){
    PayPal.Donation.Button({
      env:'production',
      hosted_button_id:'6WA83FQNPF4VL',
      image: {
        src:'https://pics.paypal.com/00/s/OGI2MjVlY2MtMDU1Ni00ZjcxLWFkNTItMGJlNjI1NmI2NmI0/file.PNG',
        alt:'Donate with PayPal button',
        title:'PayPal - The safer, easier way to pay online!',
      }
    }).render('#donate-button');
  }
}
