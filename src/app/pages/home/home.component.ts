import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  title = "angular";
  form!: FormGroup;
  forms!: FormControl;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: this.fb.control(null),
        cognome: this.fb.control(null),
        genere: this.fb.control(null),
        textarea: this.fb.control(null),
        authData: this.fb.group({
          password: this.fb.control(null, [
            Validators.required,
            Validators.minLength(4),

            // Validators.pattern(""),
          ]),
          confirmpassword: this.fb.control(null, [
            Validators.required,
            Validators.minLength(4),
          ]),
        }),
      },
      { validators: this.confirmPsw }
    );
  }
  //invia form
  send() {
    console.log(this.form.value);
  }
  //Validazione(messaggio)
  isValid(fieldName: string) {
    // console.log(this.form.get(fieldName)?.valid);
    return this.form.get(fieldName)?.valid;
  }
  isTouched(fieldName: string) {
    return this.form.get(fieldName)?.touched;
  }

  //conferma password non valida
  confirmPsw = (formC: AbstractControl): ValidationErrors | null => {
    // console.log(formC.get("authData.confirmpassword"));

    if (
      formC.get("authData.password")!.value ===
      formC.get("authData.confirmpassword")!.value
    ) {
      return null;
    } else {
      return {
        invalid: true,
        message: " Conferma password non valida",
      };
    }
  };
}
