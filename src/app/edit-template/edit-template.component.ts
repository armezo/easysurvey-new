import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {ISurvey} from "../Interfaces/ISurvey";
import {SurveyDataService} from "../_services/DataServices/survey.data.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {PeriodicElement}  from './../Interfaces/PeriodicElement';
import {MatTableDataSource} from '@angular/material/table';
import {ExcelService} from '../_services/excel.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {GridListComponent} from '../grid-list/grid-list.component';
import { SurveyService } from "../_services/survey-services/survey.service";
import { surveyModel } from '../_models/surveyModel';

//import {tableDragger} from 'table-dragger'

//List of All Saved Dimensions 
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Education', status: 'Active', survey: 'SBI '},
  {id: 2, name: 'HR', status: 'Active', survey: 'Demo'},
  {id: 3, name: 'Performance Employee',status: 'Active', survey: 'Demo Survey'},
  {id: 4, name: 'Testing', status: 'Active', survey: 'Demo'},
  {id: 5, name: 'Ability', status: 'Active', survey: 'Demo Survey'},
  {id: 6, name: 'Performance', status: 'Inactive', survey: 'Survey'},
  {id: 7, name: 'Utility', status: 'Active', survey: 'Demo Survey'},
  {id: 8, name: 'AP Test',status: 'Active', survey: 'Demo'},
  {id: 9, name: 'Appraisal',status: 'Active', survey: 'Parnod'},
  {id: 10, name: 'Attendance', status: 'Active', survey: 'Sbi'},
];
@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`

      `]
})
export class EditTemplateComponent implements OnInit {
  movies = ['Question 1: Question according to your requirements with option type?',
    ' Question 2: Question according to your requirements with option type?',
    ' Question 3: Question according to your requirements with option type?'
  ];
 
 
    _ref:any;   
    removeObject(){
      this._ref.destroy();
    }   
    save(){
      alert('Saved Successfully!');
    }



 heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  
  displayedColumns: string[] = ['id', 'name', 'status', 'survey'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  checkTabSelection:boolean
  data: any = [{
    fname: 'NA',
    dob: 'NA',
    email: 'NA',
    mobile:'NA'
  },
  {
    fname: 'NA',
    dob: 'NA',
    email: 'NA',
    mobile:'NA'
  }];

  selectedType = '';
  onChange(event) {
    this.selectedType = event.target.value;
  }
  currSurvey:surveyModel;
  constructor(
    private _surveyDataService:SurveyDataService,
    private surveyService:SurveyService,
    private modalService: NgbModal,
    private excelService:ExcelService) {}
  
  //   open(welcome) {
  //     this.modalService.open(welcome);
  // }
  //Welcome Template Model
  open(welcome) {
    this.modalService.open(welcome, {ariaLabelledBy: 'modal-basic-title',  windowClass:'lgModal'});
  }
  //Invitation Template Model
  open1(invitation) {
    this.modalService.open(invitation, {ariaLabelledBy: 'modal-basic-title', windowClass:'smModal'});
  }

  open3(addDimension) {
  this.modalService.open(addDimension, {ariaLabelledBy: 'modal-basic-title', windowClass:'smModal'});
 }
 //Add Question Model
 open4(addquestion) {
  this.modalService.open(addquestion, { ariaLabelledBy: 'modal-basic-title', windowClass:'lgModal',  backdrop: 'static', keyboard: false});
 }
  //Add DimensionList Model
  open5(dimensionList) {
    this.modalService.open(dimensionList, {ariaLabelledBy: 'modal-basic-title', windowClass:'smModal'});
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }
  
  ngOnInit() {
    this.surveyService.GetCurrentSurvey().subscribe(
      data =>{
        this.currSurvey=data;
        console.log("survey name : "+this.currSurvey.surveyName);
       
      }
    );

  }

  public editSurveyDetails:boolean = true;
  public createNewSurvey:boolean = true;
  public main:boolean = true;
  public launchSurvey:boolean = true;
  public golaunchButton:boolean = false;
 public launchSurveyArea:boolean = true;
 public hideAfterReady:boolean =false;
  


//Text Editors
show = false;
//htmlContent = '';
editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: '9rem',
    minHeight: '20rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
};

//Upload Logo on Welcome Page
public imagePath;
imgURL: any;
imgSize:any;
imagName:any;
imgType:any;
imgModifyDate:any;
public message: string;


preview(event) {
  for (var i = 0; i < event.target.files.length; i++) {
    this.imagName = event.target.files[i].name;
    this.imgType = event.target.files[i].type;
    this.imgSize = event.target.files[i].size;
    this.imgSize = Math.round(this.imgSize / 1024) + " KB";
    this.imgModifyDate = event.target.files[i].lastModifiedDate;     
  }
  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event) => {
  this.imgURL = (<FileReader>event.target).result;
  this.currSurvey.WelcomeMsgEntity.welcomeLogo = this.imgURL;
  this.surveyService.CreateSurvey(this.currSurvey);
  localStorage.setItem("WelcomeImageURL",this.imgURL);
  console.log("Image url : "+this.imgURL);     
}
console.log('Name: ' + this.imagName + "\n" +
'Type: ' + this.imgType + "\n" +
'Last-Modified-Date: ' + this.imgModifyDate + "\n" +
'Size: ' + this.imgSize);
}

//uplaod image for options
imageError: string;
isImageSaved: boolean;
cardImageBase64: string;
fileChangeEvent(fileInput: any) {
  this.imageError = null;
  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError =
              'Maximum size allowed is ' + max_size / 1000 + 'Mb';
          return false;
      }
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];
              console.log(img_height, img_width);
              if (img_height > max_height && img_width > max_width) {
                  this.imageError =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
                  // this.previewImagePath = imgBase64Path;
              }
          };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
  }
}

removeImage() {
  this.cardImageBase64 = null;
  this.isImageSaved = false;
}
saveSurvey(){
  this.golaunchButton=true;
  //this.launchSurveyArea=false;
}
golaunchButtonSurvey(){
  this.launchSurveyArea=false;
  this.hideAfterReady=true;
  this.golaunchButton=false;

}
editSurveyName(){  
    (async () => {
      const { value: text } = await Swal.fire({
        allowOutsideClick: false,
     
        title: 'Re-Enter Survey Name',
        input: 'text',
        inputPlaceholder: 'Enter New Survey Name'
      })
      
      if (text) {
        
        //const answers = JSON.stringify(result.value)
       // this.CurrSurvey.SurveryName = text;
       //this._surveyDataService.CreateSurvey(this.CurrSurvey);
        Swal.fire(
          //`Survey Name ${answers}`,
          'You have successfully changed the survey name, now!',
          'success'
        )       
       
      }    console.log(text);
    })() // FOR asnc end point of TYPE SURVEY NAME 
    } // FOR TYPE SURVEY NAME 
 

// editSurveyName(){
//   alert('qoehdiued');
// }
//Saved Survey after fill all details 



//Launch Survey after Saved all details 
// LaunchSurvey(){
//   const swal = Swal.mixin({
//   })
//   Swal.fire({
//     title: 'Are you sure for Launching this Survey?',
//     text: "You would be able to update this after launch!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#28a745',
//     cancelButtonColor: '#dc3545',
//     confirmButtonText: 'Yes, launch it!',
//     cancelButtonText: 'No, cancel!',
//     reverseButtons: true
//   }).then((result) => {
//     if (result.value) {


//       swal.fire(
//         'Survey Launched :)',
//         'You can check this survey details in OnGoing list',
//         'success'
//       )

//     } else if (
//       Read more about handling dismissals below */
//       result.dismiss === Swal.DismissReason.cancel
//     ) {
  
//     }
//   })
// }


//Tabs on Create survey details 
selectedUserTab = 1;
   tabs = [
    {
      name: 'Upload Logo ',
      key: 1,
      active: true
    },
     {
       name: 'Welcome Template ',
       key: 2,
       active: true
     },
      {
      name: ' Email Template',
      key: 3,
      active: false
    },
    {
      name: 'Add Questions',
      key: 4,
      active: false
    },
    {
      name: ' Respondant',
      key: 5,
      active: false
    },
    {
      name: ' End Date',
      key: 6,
      active: false
    }
   ];

  tabChange(selectedTab) {

      this.selectedUserTab = selectedTab.key;
      for (let tab of this.tabs) {
          if (tab.key === selectedTab.key) {
            tab.active = true;
          } else {
            tab.active = false;
          }
         // console.log('showTab');
      }
    } 
//   movies: number[] = [1, 2, 3];
//   copy() {
//     this.movies.push(this.movies.length + 1)
//  }
private selectedLink: string="";        
  
  setradio(e: string): void   
  {  
  
    this.selectedLink = e;  
          
  }  
  
    isSelected(name: string): boolean   
  {  
  
        if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
            return false;  
  }  
  
        return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
    }  

    //for sending Invitation/Reminder mail
    
    
    
   SaveWelecomeLogo(){      
  console.log("Welcome logo : "+ this.currSurvey.WelcomeMsgEntity.welcomeLogo);
  this.surveyService.CreateSurvey(this.currSurvey);
  if(this.currSurvey.WelcomeMsgEntity.welcomeLogo!=""){
      this.tabs[0].active = true;
      
  }
  else
  {
    this.tabs[0].active = false;
  }
 
  Swal.fire({
    icon: 'success',
    title: 'Welcome Logo Saved for this Survey',
    showConfirmButton: true,
    launch:false,
    timer: 2000
  })
}

SaveWelcomTempalte(){      
  console.log("Welcome Messaage : "+ this.currSurvey.WelcomeMsgEntity.welcomeMessage); 

  if(this.currSurvey.WelcomeMsgEntity.welcomeMessage!=""){
      this.tabs[2].active = true;      
  }
  else
  {
    this.tabs[2].active = false;
  }
 
  Swal.fire({
    icon: 'success',
    title: 'Logo Saved for this Survey',
    showConfirmButton: true,
    launch:false,
    timer: 2000
  })
}

}