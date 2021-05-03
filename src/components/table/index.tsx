import React from 'react'
import { Box, Collapse, Modal, TableCell, TableContainer, TableHead, Typography } from "@material-ui/core";
import { IconButton, Paper, Table, TableBody, TableRow } from "@material-ui/core";
import { useState } from "react";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { api, GetAll, GetAllExams } from '../../services/axios/api';

type data = {
  id: number,
  procedureName: string,
  patientName: string,
  requested: boolean,
}

type Examdata = {
  id: number,
  procedureName: string,
  patientName: string,
  patientAge: number,
  patientGender: string,
  physicianName: string,
  physicianCRM: string,
  requested: boolean
}

type propsData = {
  key: number,
  row: data,
  institutionId: number
}

function Row(props: propsData) {
  const row = props.row;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({} as Examdata);
  

  const handleOpen = () => {
    if(row.requested) {
      api.get(`exams/${row.id}`, {params: {
        healthcareInstitutionId: props.institutionId
      }}).then((response) => {
        setData(response.data);
      })
      setOpen(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleGetExam = (id: number, institutionId: number) => {
    setOpenModal(false);
    setOpen(true);
    api.get(`exams/${id}`, {params: {
      healthcareInstitutionId: institutionId
    }}).then((response) => {
      setData(response.data)
    })
  }

  return (
    <React.Fragment >
      <TableRow >
        <TableCell>
          <IconButton aria-label="expand row" onClick={() => open === false? handleOpen() : setOpen(false)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.patientName}
        </TableCell>
        <TableCell align="center">{row.procedureName}</TableCell>
        <TableCell align="right">{row.requested === true ? 'Requested' : 'Not Requested'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Patient's details: 
                </Typography>
                <Typography variant="h5">Patient's age: <span>{data.patientAge}</span></Typography>
                <Typography variant="h5">Patient's gender: <span>{data.patientGender == "MALE"? "Male" : "Female"}</span></Typography>
                <Typography variant="h6" gutterBottom component="div">
                Physician's details: 
                </Typography>
                <Typography variant="h5">Physician's name: <span>{data.physicianName}</span></Typography>
                <Typography variant="h5">Physician's CRM: <span>{data.physicianCRM}</span></Typography>

                

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal open={openModal} onClose={handleClose} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div>
          <h2>Pixeon Coins Necessárias</h2>
          <button onClick={handleClose}>Close</button>
          <button onClick={() => handleGetExam(row.id, props.institutionId)}>Pay</button>
        </div>
      </Modal>
    </React.Fragment>
  );
}

type HealthcareInstitution = {
  id: number,
  name: string,
  cnpj: string,
  pixeonCoins: number
}

type TableProps = {
  healthcareInstitutions: HealthcareInstitution
}

export function ExamsTable(props: TableProps) {

  const[data, setData] = React.useState<Examdata[]>([]);

  api.get('exams', {params: {
    healthcareinstitution: props.healthcareInstitutions
  }}).then((response) => {
    setData(response.data);
  })

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
          {data.map((row, index) => (
            <Row key={index} row={row} institutionId={props.healthcareInstitutions.id}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}