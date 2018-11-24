import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { PropertyEditor } from '../property-editor';


@Component({
  selector: 'hp-font-property-editor',
  templateUrl: './font-property-editor.component.html',
  styleUrls: ['./font-property-editor.component.css', '../../editor-styles.css']
})
export class FontPropertyEditorComponent extends PropertyEditor
  implements OnInit, AfterViewInit {
  get fontColor(): string {
    return this.getStyleValue('color');
  }
  set fontColor(value: string) {
    this.setStyleValue('color', value);
  }
  get fontStyle(): string {
    return this.getStyleValue('fontStyle');
  }
  set fontStyle(value: string) {
    this.setStyleValue('fontStyle', value);
  }
  get fontWeight(): string {
    return this.getStyleValue('fontWeight');
  }
  set fontWeight(value: string) {
    this.setStyleValue('fontWeight', value);
  }
  get fontFamily(): string {
    return this.getStyleValue('fontFamily');
  }
  set fontFamily(value: string) {
    this.setStyleValue('fontFamily', value);
  }
  get fontSize(): string {
    return this.getStyleValue('fontSize');
  }
  set fontSize(value: string) {
    this.setStyleValue('fontSize', value);
  }

  get text(): string {
    const result = this.getElementPropValue('textContent');
    return result;
  }
  set text(value: string) {
    this.setElementPropValue('textContent', value);
  }

  styles = ['normal', 'italic', 'oblique'];
  weights = ['normal', 'bold', '400', '500', '600', '700', '800', '900'];
  defaultFonts = [
    'Arial',
    'Helvetica',
    'Georgia',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana'
  ];
  get fonts() {
    return this.defaultFonts;
  }

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
