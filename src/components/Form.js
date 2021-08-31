import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ApiService from '../services/ApiService';
import "bootstrap/dist/css/bootstrap.min.css";

const baseUrl = 'https://jsonplaceholder.typicode.com/users'
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // border: '2px solid #000',
        // backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        // padding: theme.spacing(2, 4, 3),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

const URL = '/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm';
const float = '^[1-9]\d?(?:\.\d{0,2})?$';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    web: Yup.string()
        // .matches(URL, 'Website should be a valid URL')
        .url()
        .required('Web is required'),
    // price: Yup.matches(float).required('Price is required'),
    price: Yup.number().positive().required('Price is required'),
    // .min(6, 'Password must be at least 6 characters')
    // .max(40, 'Password must not exceed 40 characters'),
    quantity: Yup.number().positive().integer().required('Quantity is required')
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});

export default function Form({ handleClose, selectItem }) {
    const classes = useStyles();
    const { handleSubmit, control, errors, setValue } = useForm();
    // const { register, control, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(validationSchema)
    // });

    useEffect(() => {

        if (selectItem) {
            setValue('title', selectItem.title)
            setValue('email', selectItem.email)
            setValue('web', selectItem.web)
            setValue('price', selectItem.price)
            setValue('quantity', selectItem.quantity)
        } else {
            setValue('title', '');
            setValue('email', '');
            setValue('web', '');
            setValue('price', '');
            setValue('quantity', '');
        }
    }, [])

    const onSubmit = data => {
        // console.log(data);
        selectItem ? updateTutorial(data) : createTutorial(data);
    };

    const createTutorial = (data) => {
        ApiService.create(data)
            .then(res => {
                handleClose();
                // getAllTutorials();
            })
            .catch(e => {
                console.log(e)
            })

    }

    const updateTutorial = (data) => {
        ApiService.update(selectItem.id, data)
            .then(res => {
                console.log(res.data)
                handleClose();
            })
            .catch(e => {
                console.log(e)
            })

    }

    return (
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Nombre"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="string"
                    />
                )}
                rules={{ required: 'Nombre required' }}
            />
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Email"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="email"
                    />
                )}
                rules={{ required: 'Email required' }}
            />
            <Controller
                name="web"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Web"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
                rules={{ required: 'Web required' }}
            />

            <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Precio"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="number"
                    />
                )}
                rules={{ required: 'Price required' }}
            />
            <Controller
                name="quantity"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Cantidad"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
                rules={{ required: 'Quantity required' }}
            />

            <div>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    {selectItem ? 'Update' : 'Register'}
                </Button>
            </div>
        </form>
    );
};
