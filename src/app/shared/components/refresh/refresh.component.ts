import { Component } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent {
  showRefresh = false;
  private destroy$ = new Subject<void>();

  triggerRefresh(): void {
    this.showRefresh = true;
    timer(2000) // Duration of the animation
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.showRefresh = false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
