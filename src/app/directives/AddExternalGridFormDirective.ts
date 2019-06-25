import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[add-external-grid-form]',

})
export class AddExternalGridFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}