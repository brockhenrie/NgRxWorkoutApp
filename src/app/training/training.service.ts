import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null | undefined>();

  exercisesChanged = new Subject<Exercise[]>();

  availableExercises$ = this.db
    .collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Exercise;
          const id = a.payload.doc.id;
          return { ...data, id };
        });
      }),
      tap((exercises) => {
        this.availableExercises = exercises;
      }),
      shareReplay(1),
      catchError(err=>{
        console.log(err)
        throw err
      })
    );

  completedExercises$ = this.db.collection('finishedExercises')
  .snapshotChanges()
  .pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { ...data, id };
      });
    }),
    shareReplay(1),
    catchError(err=>{
      console.log(err)
      throw err
    })
  );

  private runningExercise!: Exercise;
  availableExercises!: Exercise[];

  constructor(private db: AngularFirestore) {}

  getRunningExercise() {
    return this.runningExercise;
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    ) as Exercise;
    this.exerciseChanged.next(this.runningExercise);
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled',
    });

    this.exerciseChanged.next(null);
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
    .catch(error => console.log(error))
    .then(result =>console.log(result))

  }

  deleteExercise(id:string){
    this.db.collection('finishedExercises')
    .doc(id)
    .delete()
    .catch(err=>console.log(err))
    .then(result=>console.log(result));
  }
}
