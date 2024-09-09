import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user.model';
import { Project } from '../../models/project.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

interface Task {
  Title: string;
  Description: string;
  Status: string;
  Priority: string;
  StartDate: string;
  DueDate: string;
  assignedTo: User;
  createdBy: User;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  managers: User[] = [];
  teamMembers: User[] = [];
  currentUserId: string = ''; // Initialize with an empty string or any default value
  isManagerRole: boolean = false;
  isEditMode: boolean = false;
  projectId: string | null = null;
  project: Project | undefined;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.projectForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Status: ['Not Started', Validators.required],
      teamMembers: this.fb.array([]),
      tasks: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.checkUserRole();
    if (this.isManagerRole) {
      this.loadManagers();
      this.loadTeamMembers();
      this.currentUserId = localStorage.getItem('currentUserId') || '';
      console.log('Current User ID:', this.currentUserId);

      this.projectId = this.route.snapshot.paramMap.get('id');
      if (this.projectId) {
        this.isEditMode = true;
        this.loadProjectData();
      }
    }
  }

  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isManagerRole = userRole === 'Manager';
  }

  loadManagers(): void {
    this.projectService.getManagers().subscribe(
      (managers: User[]) => {
        this.managers = managers;
        console.log('Managers loaded:', this.managers);
      },
      (error) => {
        console.error('Error loading managers:', error);
      },
    );
  }

  loadTeamMembers(): void {
    this.projectService.getTeamMembers().subscribe(
      (members: User[]) => {
        // console.log(members)
        this.teamMembers = members;
        console.log('Team members loaded:', this.teamMembers);
      },
      (error) => {
        console.error('Error loading team members:', error);
      },
    );
  }

  loadProjectData(): void {
    if (this.projectId) {
      this.projectService.getProject(this.projectId).subscribe(
        (project: Project) => {
          // this.projectForm.get('teamMembers')
          this.projectForm.patchValue({
            Name: project.Name,
            Description: project.Description,
            StartDate: project.StartDate,
            EndDate: project.EndDate,
            Status: project.Status,
          });

          const teamMembers = project.teamMembers.map((member) => member.id);

          this.projectForm.setControl(
            'teamMembers',
            this.fb.array(teamMembers || []),
          );

          
          this.setTasks(project.tasks);
          
          // this.projectForm.setControl(
          //     'tasks',
          //     this.fb.array(project.tasks),
          //   );
            
        },
        (error) => {
          console.error('Error loading project:', error);
        },
      );
    }
  }
  setTasks(tasks: Task[]): void {
    const taskArray = this.projectForm.get('tasks') as FormArray;
    if (taskArray) {
      taskArray.clear(); // Clear existing controls if needed
      tasks.forEach((task) => {
        console.log(task)
        taskArray.push(
          this.fb.group({
            Title: [task.Title, Validators.required],
            Description: [task.Description, Validators.required],
            Status: [task.Status, Validators.required],
            Priority: [task.Priority, Validators.required],
            StartDate: [task.StartDate, Validators.required],
            DueDate: [task.DueDate, Validators.required],
            assignedTo: [task.assignedTo, Validators.required], // Assuming assignedTo is a User object
            createdBy: [task.createdBy, Validators.required], // Assuming createdBy is a User object
          }),
        );
      });
    }
  }

  setTeamMembers(memberIds: string[]): void {
    const teamArray = this.projectForm.get('teamMembers') as FormArray;
    memberIds.forEach((id) => {
      teamArray.push(this.fb.control(id));
    });
  }

  get tasks(): FormArray {
    return this.projectForm.get('tasks') as FormArray;
  }

  addTask(): void {
    this.tasks.push(
      this.fb.group({
        Title: ['', Validators.required],
        Description: ['', Validators.required],
        Status: ['To Do', Validators.required],
        Priority: ['Medium', Validators.required],
        StartDate: ['', Validators.required],
        DueDate: ['', Validators.required],
        assignedTo: ['', Validators.required],
      }),
    );
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

  onSubmit(): void {
    console.log('Form is valid:', this.projectForm.valid);
    console.log('Form value:', this.projectForm.value);
    console.log('Form errors:', this.projectForm.errors);
        if (this.projectForm.invalid) {
          console.error('Form is invalid');
          return;
        }

        const formValue = this.projectForm.value;
    console.log( this.teamMembers);
        // Construct the project object
        const project = {
          Name: formValue.Name,
          Description: formValue.Description,
          StartDate: formValue.StartDate,
          EndDate: formValue.EndDate,
          Status: formValue.Status,
          manager: formValue.manager, // Ensure manager is correctly set
          teamMembers: formValue.teamMembers, // use IDs directly
          // teamMembers: formValue.teamMembers.filter((id: string | null) => id !== null), // Filter out null values
          tasks: formValue.tasks.map((task: any) => ({
            Title: task.Title,
            Description: task.Description,
            Status: task.Status,
            Priority: task.Priority,
            StartDate: task.StartDate,
            DueDate: task.DueDate,
            createdBy: this.currentUserId, // Ensure this value is set
            assignedTo: task.assignedTo // Ensure assignedTo is correctly set
          }))
        };

        // Log project data to debug
        console.log('Project data to be submitted:', project);

        if (this.isEditMode && this.projectId) {
          this.projectService.updateProject(this.projectId, project).subscribe(
            response => {
              console.log('Project updated successfully:', response);
            },
            error => {
              console.error('Error updating project:', error);
            }
          );
        } else {
          this.projectService.createProject(project).subscribe(
            response => {
              console.log('Project created successfully:', response);
            },
            error => {
              console.error('Error creating project:', error);
            }
          );
        }
  }
}
