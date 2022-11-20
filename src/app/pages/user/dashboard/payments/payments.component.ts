import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import * as cardValidator from "card-validator";

import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Patterns } from 'src/app/utilities/patterns';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styles: []
})
export class PaymentsComponent implements OnInit {
  isLoading = false; user:User;
  submitted = false; cards = []; 
  creditCardModalDisplay = 'none'; cardForm: FormGroup; 

  public maxLength: number;
  public maxCvvLength: number;
  public validationRes;
  public imask = {mask:'0000'};

  constructor(private formBuilder: FormBuilder, private authService : AuthService, 
    private userService:UserService, private cartService : CartService,
    private toastrService:ToastrService
  ) { 
    if(!this.authService.checkIsStillLogged()){
      this.authService.logout();
      window.location.reload();
    }
    this.getUserCardsData();
   }

  ngOnInit(): void {
    this.initializeForm();
  }

  getUserCardsData(){
    this.isLoading = true; 
    this.cartService.getCards().subscribe(
      res => {
        this.cards = res.data;
        // console.log(this.cards);
        this.isLoading = false; 
    },
      errorMessage => { this.isLoading = false;  }
    )
  }
  
  get f() { return this.cardForm.controls; }  

  onSubmit(){
    this.submitted = true;
    if (!this.cardForm.valid) {
      return;
    }

    if(confirm("Are you sure to save new credit card?")) {
      this.isLoading = true; 
      this.cartService.addCard(this.cardForm.value).subscribe(
        res => {
          //console.log(resData);
          this.cards = res.data;
          this.submitted = false;   
          this.creditCardModalDisplay = 'none';
          this.initializeForm();   
          this.cardForm.reset();
          this.isLoading = false; 
          this.toastrService.success("Credit card saved successfully");
        },
        errorMessage => {
          this.isLoading = false; 
          this.toastrService.error(errorMessage);
        }        
      );
    }
  }

  onShowCreditCardModal(){    
    this.cardForm.setValue({
      fullName: '', cardNo: '',
      expiryDate: '', cvvNo: '',
      address: '', city: '',
      state: '', pinCode: '', 
      country: 'us', cardType: ''
    }); 
    this.creditCardModalDisplay = 'block';
  }

  onDeleteClick(id:string){
    if(confirm("Are you sure to delete card?")) {
      this.isLoading = true; 
      this.cartService.deleteCard(id).subscribe(
        resData => {
          this.isLoading = false; 
          this.toastrService.success("Credit card deleted successfully");
          this.getUserCardsData();
        },
        errorMessage => {
          this.isLoading = false; 
          this.toastrService.error(errorMessage);
        }     
      );
    }
  }

  validate() {
    this.validationRes = cardValidator.number(this.f.cardNo.value);
    if (this.validationRes.card) {
      this.maxLength = this.validationRes.card?.lengths?.pop() + this.validationRes.card?.gaps.length;
      this.maxCvvLength = this.validationRes.card?.code.size;
      let maskArray = new Array(this.maxLength).fill('0');
      this.validationRes.card?.gaps.reverse().forEach(gap=> {maskArray.splice(gap, 0, ' ');})
      this.imask = {mask:maskArray.join('')}
      this.f.cardType.setValue(this.validationRes.card.type);
   } else {
      this.maxLength = 255;
    }
  }

  getIssuerIcon(cardType:string) {
    return `https://cdn.flnf.hu/assets/${cardType}.svg`
  }

  getLastFourDigit(cardNo){
    if( cardNo.length > 3 ) {
      return cardNo.substr(cardNo.length - 4);
    }
    return cardNo;
  }

  private initializeForm() {
    this.cardForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      cardNo: ['', [Validators.required]],
      expiryDate: ['', [Validators.required, Validators.pattern(Patterns.expiryDate)]],
      cvvNo: ['', [Validators.required, Validators.minLength(3)]],
      address: [],
      city: [],
      state: [],
      pinCode: [],
      country: ['us', [Validators.required]],
      cardType: []
    });
  }
  
}
