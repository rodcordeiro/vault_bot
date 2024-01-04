type DateProperties = 'createdAt' | 'updatedAt';

export type Model<Entity, EnableID = false> = EnableID extends true
  ? {
      [k in keyof Omit<Entity, DateProperties>]?: Entity[k];
    }
  : {
      [k in keyof Omit<Entity, 'id' | DateProperties>]?: Entity[k];
    };

export enum DwellerLogTypes {
  DWELLER_BORN = 'dweller_birth',
  DWELLER_CHILDREN = 'new_child_dweller',
}
