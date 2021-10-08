import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MOUNT_TYPE } from '../../../shared/models/expense-proceeds.model';
import { ItemService } from '../../services/item.service';
import SweetAlert from 'sweetalert2';
import { AppState } from '../../../aap.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isLoading, stopLoading } from '../../../shared/redux/ui.actions';

@Component({
  selector: 'app-expense-proceeds',
  templateUrl: './items.component.html',
  styles: []
})
export class ItemsComponent implements OnInit, OnDestroy {
  expenseProceedsForm: FormGroup;
  loading: boolean = false;
  private destroy$ = new Subject<any>();

  constructor(private fb: FormBuilder, private expenseProceedSvc: ItemService, private storeSvc: Store<AppState>) {
    this.expenseProceedsForm = fb.group({
      description: new FormControl('', Validators.required),
      mount: new FormControl('', [Validators.required, Validators.minLength(0)]),
      type: new FormControl('proceed', [Validators.required])
    });
  }

  get mountType(): MOUNT_TYPE {
    return this.expenseProceedsForm.get('type')?.value;
  }

  onSave() {
    if (this.expenseProceedsForm?.valid) {
      this.storeSvc.dispatch(isLoading());
      this.expenseProceedSvc
        .createExpenseProceed(this.expenseProceedsForm.value)
        .then((docRef) => {
          SweetAlert.fire('Registro creado', docRef.id, 'success').then();
          this.expenseProceedsForm.reset();
          this.storeSvc.dispatch(stopLoading());
        })
        .catch((error) => SweetAlert.fire('Registro creado', error.message, 'error').then());
    }
  }

  toggleType() {
    if (this.mountType === 'expense') {
      this.expenseProceedsForm.patchValue({ type: 'proceed' });
    } else {
      this.expenseProceedsForm.patchValue({ type: 'expense' });
    }
  }

  ngOnInit(): void {
    this.storeSvc
      .select('ui')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ isLoading }) => (this.loading = isLoading));
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
