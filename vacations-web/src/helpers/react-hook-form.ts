import {
    type ControllerFieldState,
    type FieldPath,
    type FieldValues,
    type ControllerRenderProps as RhfControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';

export interface ControllerRenderProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
> {
    field: RhfControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
}
