import { useForm as useReactHookForm, UseFormProps, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, ZodTypeDef } from 'zod';

/**
 * Hook customizado que integra React Hook Form com Zod
 */
export function useForm<TFormData extends FieldValues>(
  schema: ZodType<TFormData, ZodTypeDef, TFormData>,
  options?: Omit<UseFormProps<TFormData>, 'resolver'>
) {
  return useReactHookForm<TFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    ...options,
  });
}
