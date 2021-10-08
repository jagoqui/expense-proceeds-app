export type MOUNT_TYPE = 'expense' | 'proceed';

export class Item {
  constructor(public description: string, public mount: number, public type: MOUNT_TYPE, public uid?: string) {}
}
