import { Component } from '@angular/core';
import { transferArrayItem,moveItemInArray } from '@angular/cdk/drag-drop';

interface Task {
  id: number;
  title: string;
}

interface TaskColumns {
  [key: string]: Task[]; // Signature d'index pour permettre l'accès par des chaînes de caractères
}

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  
  progress = [];
  
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  
  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  columns = ['To Do', 'In Progress', 'Completed'];
  tasks: TaskColumns = {
    'To Do': [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
    ],
    'In Progress': [{ id: 3, title: 'Task 3' }],
    Completed: [{ id: 4, title: 'Task 4' }],
  };

  // drop(event: CdkDragDrop<Task[]>): void {
  //   const previousContainer = event.previousContainer;
  //   const currentContainer = event.container;

  //   if (previousContainer === currentContainer) {
  //     return;
  //   }

  //   // Remove the item from the previous container
  //   const item = event.item.data;
  //   previousContainer.data.splice(event.previousIndex, 1);
  //   // Add the item to the current container
  //   currentContainer.data.splice(event.currentIndex, 0, item);
  // }
}
