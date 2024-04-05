import {
    ControllerFieldState,
    FieldPath,
    FieldValues,
    ControllerRenderProps as RhfControllerRenderProps,
    UseFormStateReturn,
} from 'react-hook-form';

export interface ControllerRenderProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    field: RhfControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
}
