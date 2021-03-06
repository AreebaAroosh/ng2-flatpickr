import { Component, ViewChild, AfterViewInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FlatpickrOptions } from './flatpickr-options.interface';
require( 'flatpickr' );

@Component({
	selector: 'ng2-flatpickr', 
	template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input class="ng2-flatpickr-input" [placeholder]="placeholder" type="text" data-input>
		</div>`,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef( () => Ng2FlatpickrComponent ),
			multi: true
		}
	]
})
export class Ng2FlatpickrComponent implements AfterViewInit, ControlValueAccessor {

	private flatpickr: object;

	private defaultFlatpickrOptions: FlatpickrOptions = {
		wrap: true,
		clickOpens: true,
		onChange: ( selectedDates: any ) => { this.writeValue( selectedDates ); }
	};

	@ViewChild('flatpickr')
	flatpickrElement: any;

	@Input()
	config: FlatpickrOptions;

	@Input()
	placeholder: string = "";

	///////////////////////////////////

	writeValue( value:any ) {
		this.propagateChange = value;
	}

	registerOnChange( fn: any ) {
		this.propagateChange = fn;
	}

	registerOnTouched() {}

	propagateChange = ( _: any ) => {};

	///////////////////////////////////

	ngAfterViewInit() {
		if( this.config ) {
			Object.assign( this.defaultFlatpickrOptions, this.config );
		}
		this.flatpickr = this.flatpickrElement.nativeElement.flatpickr( this.defaultFlatpickrOptions );
	}	

}