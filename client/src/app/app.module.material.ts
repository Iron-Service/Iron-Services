import 'hammerjs';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSliderModule,

} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule

  ],
  exports: [
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule

  ],
  declarations: []
})
export class AppMaterialModule {}
