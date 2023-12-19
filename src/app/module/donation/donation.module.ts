import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import {DonationComponent} from "./donation.component";
import {SectionSeparatorComponent} from "../../commonComponents/section-separator/section-separator.component";
import {NgxPaypalComponent, NgxPayPalModule} from "ngx-paypal";


@NgModule({
  declarations: [
    DonationComponent
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    SectionSeparatorComponent,
    NgxPayPalModule,
  ]
})
export class DonationModule { }
