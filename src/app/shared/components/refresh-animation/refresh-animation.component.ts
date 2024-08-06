import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-refresh-animation',
  templateUrl: './refresh-animation.component.html',
  styleUrls: ['./refresh-animation.component.css']
})
export class RefreshAnimationComponent implements OnInit, OnDestroy {
  showRefresh = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Vous pouvez gérer des logiques ici si nécessaire
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  triggerRefresh(): void {
    this.showRefresh = true;
    timer(2000) // Dureé de l'affichage de l'animation
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.showRefresh = false);
  }
}
