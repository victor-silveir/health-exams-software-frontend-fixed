import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, createStyles, Grid, makeStyles, MenuItem, TextField, Theme, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../services/axios/api";
import { ExamSchema } from "../../services/validation/YupSchemas";
import { UpdateExamType, PostExamType } from "../../models/ExamsTypes"



const useStyles = makeStyles((theme: Theme) => createStyles({
    inputSpace: {
        width: 500,
        margin: theme.spacing(1, 2)
    },
    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    typographSpace: {
        margin: theme.spacing(3, 0)
    }
}),
);

type UpdateExamProps = {
    initialValues: PostExamType
}

export default function UpdateExamForm(props: UpdateExamProps) {

    const initialValues: UpdateExamType = {
        id: props.initialValues.id,
        patientName: props.initialValues.patientName,
        patientAge: props.initialValues.patientAge,
        patientGender: props.initialValues.patientGender,
        physicianName: props.initialValues.physicianName,
        physicianCRM: props.initialValues.physicianCRM,
        procedureName: props.initialValues.procedureName

    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(ExamSchema)
    });
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit((values) => console.log(values))}>
            <Button type="submit">ca</Button>
        </form >
    );
};