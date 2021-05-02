import React from 'react'
import { Box, Collapse, Modal, TableCell, TableContainer, TableHead, Typography } from "@material-ui/core";
import { IconButton, Paper, Table, TableBody, TableRow } from "@material-ui/core";
import { useState } from "react";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

type data = {
    id: number,
    procedureName: string,
    patientName: string,
    requested: boolean
}

type propsData = {
    key: number,
    row: data
}

const rows = [
    {id: 1, procedureName: 'Hemograma completo', patientName: 'Victor Bruno', requested: true},
    {id: 2, procedureName: 'Antitransglutaminase', patientName: 'Roberto', requested: false},
    {id: 3, procedureName: 'Saars Covid19', patientName: 'Angela', requested: true},
    {id: 4, procedureName: 'Hemograma completo', patientName: 'Victor Bruno', requested: true},
    {id: 5, procedureName: 'Hemograma completo', patientName: 'Victor Bruno', requested: true},
    {id: 6, procedureName: 'Hemograma completo', patientName: 'Victor Bruno', requested: true}
  ]

function Row(props: propsData) {
    const row = props.row;
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleGetExam = () => {
        setOpenModal(false);
        setOpen(true);
        alert('uhu');
    }
  
    return (
      <React.Fragment >
        <TableRow >
          <TableCell>
            <IconButton aria-label="expand row" onClick={() => row.requested === true? setOpen(!open) : handleOpen()}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.patientName}
          </TableCell>
          <TableCell align="center">{row.procedureName}</TableCell>
          <TableCell align="right">{row.requested === true? 'Requested' : 'Not Requested'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <Modal open={openModal} onClose={handleClose} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
            <div>
            <h2>Pixeon Coins Necessárias</h2>   
            <button onClick={handleClose}>Close</button>
            <button onClick={handleGetExam}>Pay</button> 
            </div>           
        </Modal>
      </React.Fragment>
    );
  }

export function ExamsTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell >Procedure Name</TableCell>
              <TableCell align="center">Patient Name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }