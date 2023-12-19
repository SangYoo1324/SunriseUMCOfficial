import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import {DonationComponent} from "./donation.component";
import {SectionSeparatorComponent} from "../../commonComponents/section-separator/section-separator.component";


@NgModule({
  declarations: [
    DonationComponent
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    SectionSeparatorComponent,
  ]
})
export class DonationModule { }
