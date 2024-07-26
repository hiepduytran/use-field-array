import { FormControl, TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
interface IFormValues {
    fields: {
        code: string;
        name: string;
    }[];
}

type Name = "fields" | `fields.${number}` | `fields.${number}.name` | `fields.${number}.code`;
interface ITextFieldsProps {
    control: Control<IFormValues>
    label: string
    name: Name
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any
}
const TextFields = ({ control, label, name, errors }: ITextFieldsProps) => {
    return (

        <FormControl fullWidth sx={{ mb: "1rem" }}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        error={!!error || !!errors?.fields?.root?.message}
                        helperText={error?.message || errors?.fields?.root?.message}
                        required
                        label={label}
                        variant="filled"
                    />
                )}
            />
        </FormControl>
    )
}

export default TextFields