import {AbstractControl, ValidationErrors} from '@angular/forms';


export class CustomValidators{    
    static emailvalidate(control: AbstractControl) : ValidationErrors| null{
        let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegEx.test(control.value as string))
            return {emailvalidate:true};
        return null;
    }

    static phoneValidate(control:AbstractControl): ValidationErrors | null{
        let phoneRegeX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(!phoneRegeX.test(control.value as string))
            return {phoneValidate:true};
        return null;
    }
}