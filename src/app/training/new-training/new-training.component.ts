import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises$ = this.training.availableExercises$
  constructor(private training: TrainingService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  onStartTraining(form:NgForm){
    this.training.startExercise(form.value.exercise);
  }

}
