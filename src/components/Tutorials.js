import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Dialog, Modal, Button, TextField } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons';
import ModalDialog from './ModalDialog';
import ApiService from '../services/ApiService';

const useStyles = makeStyles((theme) => ({
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));

export default function Tutorials() {
    // const [respuestaAPI, setRespuestaAPI] = useState({ respuesta: 'KO' });
    // const [accesoAPI, setAccesoAPI] = useState({ tipo: 'GET', url: baseUrl });
    const styles = useStyles();
    const [data, setData] = useState([]);
    const [selectItem, setSelectItem] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getAllTutorials();
    }, [data]);

    const getAllTutorials = () => {
        ApiService.getAll()
            .then(response => {
                setData(response.data);
                // console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleSelect = (selectId) => {
        ApiService.get(selectId).then(res => {
            setSelectItem(res.data);
            handleOpen();
        }).catch(e => {
            console.log(e);
        })
       
    }

    const handleDelete = (taskIdToRemove) => {
        ApiService.remove(taskIdToRemove)
            .then(res => {
                getAllTutorials()
            })
            .catch(e => {
                console.log(e);
            });
    }

    // function to handle modal open
    const handleOpen = () => {
        // console.log(selectItem)
        setOpen(true);
    };

    // function to handle modal close
    const handleClose = () => {
        setOpen(false);
    };

    const renderTable = () => {
        return data.map(tutorial => {
            return (
                <TableRow key={tutorial.id}>
                    <TableCell>{tutorial.title}</TableCell>
                    <TableCell>{tutorial.email}</TableCell>
                    <TableCell>{tutorial.web}</TableCell>
                    <TableCell>{tutorial.price}</TableCell>
                    <TableCell>{tutorial.quantity}</TableCell>
                    <TableCell>
                        <Edit className={styles.iconos} onClick={() => handleSelect(tutorial.id)} />
                        &nbsp;&nbsp;&nbsp;
                        <Delete className={styles.iconos} onClick={() => handleDelete(tutorial.id)} />
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <div className="App">
            <br />
            <Button onClick={() => handleOpen(setSelectItem(null))}>Insertar</Button>
            <br /><br />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Web</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {renderTable()}
                    </TableBody>
                </Table>
            </TableContainer>

            <ModalDialog open={open} handleClose={handleClose} selectItem={selectItem} />

        </div>
    );
}
