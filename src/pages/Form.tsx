import TextFields from "../components/TextFields"
import { Box, Button } from '@mui/material';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const checkCodeDuplicate = (values: { code: string }[]) => {
    const codes = new Set<string>();
    let hasDuplicate = false;

    values.forEach(({ code }) => {
        if (codes.has(code)) {
            hasDuplicate = true;
        } else {
            codes.add(code);
        }
    });

    return hasDuplicate;
};

const schema = yup.object().shape({
    fields: yup.
        array().
        of(
            yup.object().shape({
                code: yup.string().required("Code is required"),
                name: yup.string().required("Name is required"),
            })
        )
        .default([])
        .test("Unique", "Values need to be unique", values => {
            return !checkCodeDuplicate(values as { code: string }[]);
        })

});

interface IFormValues {
    fields: {
        code: string;
        name: string;
    }[];
}

const Form = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<IFormValues>({
        defaultValues: { fields: [{ code: "", name: "" }] },
        resolver: yupResolver(schema)
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "fields",
    });

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        console.log(data);
    };

    return (
        <Box>
            <Box
                noValidate
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: "100%", mt: "2rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                {fields.map((field, index) => (
                    <Box key={field.id} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <TextFields control={control} name={`fields.${index}.code`} label="Code" errors={errors} />
                        <TextFields control={control} name={`fields.${index}.name`} label="Name" errors={false} />
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => append({ code: "", name: "" })}
                        >
                            +
                        </Button>
                        {index === 0 ? null : (
                            <Button
                                type="button"
                                variant="contained"
                                onClick={() => remove(index)}
                            >
                                -
                            </Button>
                        )}
                    </Box>
                ))}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "20%", margin: "auto" }}
                >
                    Submit
                </Button>
            </Box>
        </Box >
    )
}

export default Form;
