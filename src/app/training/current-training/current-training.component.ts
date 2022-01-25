import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();

  progress= 0;
  timer!:any;
  runningExercise!: Exercise;


  constructor(private dialog:MatDialog,
    private training: TrainingService) { }



  ngOnInit(): void {

    this.startOrResumeTimer();


  }

  startOrResumeTimer(){
    const step = this.training.getRunningExercise().duration/100 * 1000;
    this.timer = setInterval(()=>{
      this.progress = this.progress + 1;
      if(this.progress >= 100){
        this.training.completeExercise();
        clearInterval(this.timer);
      }
    },step);

  }

  onStopTraining(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,{data:{
      progress: this.progress,
    }});

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.training.cancelExercise(this.progress);
      }else{
        this.startOrResumeTimer();}
    })
  }

}
