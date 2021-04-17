import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from 'src/app/services/global';
import { UploadService } from "../../services/upload.service";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService,UploadService] //UploadService
})
export class CreateComponent implements OnInit {

    
  public title:string;
  public project:Project;
  public saveProject;
  public status:string;
  public filesToUpload:Array<File>;
  public url:string;


  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService
  ) { 
      this.title="Crear proyecto";
      this.project=new Project('','','','',2020,'','');
      this.url=Global.url;
  }

  ngOnInit(): void {
  }

  // guardar los datos 
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
    //realizamos un cast forzado, todos los archivos que seleccionamos en el input
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }

}
