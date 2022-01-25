import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  runningExercise?: Exercise;
  exerciseChangedSub?: Subscription;

  constructor(private training: TrainingService) {}

  ngOnInit(): void {
    this.exerciseChangedSub = this.training.exerciseChanged.subscribe(
      (exercise) => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

  onTrainingExit() {
    this.ongoingTraining = false;
  }
}
