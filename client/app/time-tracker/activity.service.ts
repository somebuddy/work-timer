import { Injectable } from '@angular/core';

import { Activity } from './activity.model';
import { ACTIVITIES } from './mock-activities';

@Injectable()
export class ActivityService {
  getActivities(): Activity[] {
    return ACTIVITIES;
  };
}
