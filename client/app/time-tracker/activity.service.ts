import { Injectable } from '@angular/core';

import { Activity } from './activity.model';
import { ACTIVITIES } from './mock-activities';

@Injectable()
export class ActivityService {
  public getActivities(): Promise<Activity[]> {
    return Promise.resolve(ACTIVITIES);
  };
}
