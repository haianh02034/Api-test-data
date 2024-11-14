import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';

export function plainClass<T, V>(cls: ClassConstructor<T>, plain: V[], options?: ClassTransformOptions): T[];
export function plainClass<T, V>(cls: ClassConstructor<T>, plain: V, options?: ClassTransformOptions): T;
export function plainClass<T, V>(cls: ClassConstructor<T>, plain: V | V[], options?: ClassTransformOptions): T | T[] {
  return plainToClass(cls, plain as any, { excludeExtraneousValues: true, ...options });
}
