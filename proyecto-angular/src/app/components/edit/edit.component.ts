import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Global } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {
  public title:string;
  public project:Project;
  public saveProject;
  public status:string;
  public filesToUpload:Array<File>;
  public url;string;
 
  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.title="Editar proyecto";
    this.url=Global.url;
   }
 
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params.id;
      this.getProject(id);
    });
  }
 
  getProject(id){
    this._projectService.getProject(id).subscribe(
      response=>{
        this.project=response.project;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
 
  onSubmit(form){
    this._projectService.saveProject(this.project).subscribe(
      response=>{
        if(response.project){
          //subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              this.saveProject=result.project;
              this.status='success';
              console.log(result);
              form.reset();
            });
          }else{
            this.saveProject=response.project;
            this.status='success';
            form.reset();
          }
        }else{
          this.status='failed';
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
 
  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }
 
}