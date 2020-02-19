import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Article } from '../model/article';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent implements OnInit {

  @Input() public article: any;
  csvFormGroup: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initFormGroup();

  }

  ngOnInit(): void {
    this.article ? this.fillForm(this.article) : this.article = new Article();

  }

  // initialize form
  initFormGroup(): void {
    this.csvFormGroup = this.formBuilder.group({
      number: [''],
      name: [''],
      manufacturer: [''],
      description: [''],
      materialInformation: [''],
      gender: [''],
      productType: [''],
      sleeve: [''],
      leg: [''],
      collar: [''],
      manufacturing: [''],
      bagStyle: [''],
      grammage: [''],
      material: [''],
      originCountry: [''],
      imageName: ['']
    });
  }

  // fill form with data
  fillForm(article: Article): void {
    this.csvFormGroup.controls['number'].setValue(article.Hauptartikelnr ? article.Hauptartikelnr : '');
    this.csvFormGroup.controls['name'].setValue(article.Artikelname ? article.Artikelname : '');
    this.csvFormGroup.controls['manufacturer'].setValue(article.Hersteller ? article.Hersteller : '');
    this.csvFormGroup.controls['description'].setValue(article.Beschreibung ? article.Beschreibung : '');
    this.csvFormGroup.controls['materialInformation'].setValue(article.Materialangaben ? article.Materialangaben : '');
    this.csvFormGroup.controls['gender'].setValue(article.Geschlecht ? article.Geschlecht : '');
    this.csvFormGroup.controls['productType'].setValue(article.Produktart ? article.Produktart : '');
    this.csvFormGroup.controls['sleeve'].setValue(article.Ärmel ? article.Ärmel : '');
    this.csvFormGroup.controls['leg'].setValue(article.Bein ? article.Bein : '');
    this.csvFormGroup.controls['collar'].setValue(article.Kragen ? article.Kragen : '');
    this.csvFormGroup.controls['manufacturing'].setValue(article.Herstellung ? article.Herstellung : '');
    this.csvFormGroup.controls['bagStyle'].setValue(article.Taschenart ? article.Taschenart : '');
    this.csvFormGroup.controls['grammage'].setValue(article.Grammatur ? article.Grammatur : '');
    this.csvFormGroup.controls['material'].setValue(article.Material ? article.Material : '');
    this.csvFormGroup.controls['originCountry'].setValue(article.Ursprungsland ? article.Ursprungsland : '');
    this.csvFormGroup.controls['imageName'].setValue(article.Bildname ? article.Bildname : '');
  }

  // save and submit changes
  save(): void {
    this.article.Hauptartikelnr = this.csvFormGroup.controls['number'].value;
    this.article.Artikelname = this.csvFormGroup.controls['name'].value;
    this.article.Hersteller = this.csvFormGroup.controls['manufacturer'].value;
    this.article.Beschreibung = this.csvFormGroup.controls['description'].value;
    this.article.Materialangaben = this.csvFormGroup.controls['materialInformation'].value;
    this.article.Geschlecht = this.csvFormGroup.controls['gender'].value;
    this.article.Produktart = this.csvFormGroup.controls['productType'].value;
    this.article.Ärmel = this.csvFormGroup.controls['sleeve'].value;
    this.article.Bein = this.csvFormGroup.controls['leg'].value;
    this.article.Kragen = this.csvFormGroup.controls['collar'].value;
    this.article.Herstellung = this.csvFormGroup.controls['manufacturing'].value;
    this.article.Taschenart = this.csvFormGroup.controls['bagStyle'].value;
    this.article.Grammatur = this.csvFormGroup.controls['grammage'].value;
    this.article.Material = this.csvFormGroup.controls['material'].value;
    this.article.Ursprungsland = this.csvFormGroup.controls['originCountry'].value;
    this.article.Bildname = this.csvFormGroup.controls['imageName'].value;

    if (this.csvFormGroup.pristine) {
      this.toastr.error("Please fill at least one input before saving!")
    }
    else {
      this.activeModal.close(this.article);
    }

  }

}
