import { Model, ModelClass, ModelProps } from 'objection';

export const isUnique = async <T extends Model>(
  model: ModelClass<T>,
  field: ModelProps<T>,
  value: any,
): Promise<boolean> => {
  if (value === undefined) return true;
  if (value === null) return true;

  const count = await model
    .query()
    .where({ [field]: value })
    .resultSize();

  return count === 0;
};

export const isExists = async <T extends Model>(
  model: ModelClass<T>,
  field: ModelProps<T>,
  value: any,
): Promise<boolean> => {
  if (value === undefined) return true;
  if (value === null) return true;

  const count = await model
    .query()
    .where({ [field]: value })
    .resultSize();

  return count !== 0;
};
