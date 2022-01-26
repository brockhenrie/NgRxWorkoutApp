import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  completedExercises = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state','delete'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  completedExercises$ = this.training.completedExercises$

  constructor(private training:TrainingService,
   ) { }

  ngAfterViewInit(): void {
    this.completedExercises.paginator = this.paginator;
    this.completedExercises.sort = this.sort;
  }

  ngOnInit(): void {

  }

  doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.completedExercises.filter = filterValue.trim().toLowerCase();

    if (this.completedExercises.paginator) {
      this.completedExercises.paginator.firstPage();
    }

  }

  onDeleteExercise(id:string){
    this.training.deleteExercise(id);
  }



}
