import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule,BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
  ],
  providers: [BsDatepickerConfig],
})
export class SharedModule {}
