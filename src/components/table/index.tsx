import React from 'react'
import { Box, Button, Collapse, createStyles, Divider, Grid, makeStyles, Modal, TableCell, TableContainer, TableHead, Theme, Typography } from "@material-ui/core";
import { IconButton, Paper, Table, TableBody, TableRow } from "@material-ui/core";
import { useState } from "react";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { api } from '../../services/axios/api';
import UpdateExamForm from '../update-exam-form/index'
import { GetExamdataByInstitutionType, GetExamdataType, PostExamType } from '../models/ExamsTypes';

type propsData = {
  key: number,
  row: GetExamdataByInstitutionType,
  institutionId: number
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    div: {
      display: 'flex',
    },
    spacing: {
      margin: theme.spacing(0, 2)
    },
    spacingY: {
      margin: theme.spacing(1, 0)
    },
    paper: {
      position: 'absolute',
      width: 400,
      height: 200,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      padding: theme.spacing(2, 4, 3),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(5, 0)
    },
    button: {
      margin: theme.spacing(0, 2)
    }
  })
);


function Row(props: propsData) {
  const row = props.row;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeleteModal, setDeleteModal] = React.useState(false);
  const [openUpdateForm, setOpenUpdateForm] = React.useState(false);
  const [data, setData] = useState({} as GetExamdataType);

  const values: PostExamType = {
    id: data.id,
    patientName: data.patientName,
    patientAge: data.patientAge,
    patientGender: 0,
    physicianName: data.physicianName,
    physicianCRM: data.physicianCRM,
    procedureName: data.procedureName,
    healthcareInstitutionId: props.institutionId
  }
  if (data.patientGender == 'MALE') {
    values.patientGender = 0;
  } else {
    values.patientGender = 1;
  }


  const handleOpen = () => {
    if (row.requested) {
      api.get(`exams/${row.id}`, {
        params: {
          healthcareInstitutionId: props.institutionId
        }
      }).then((response) => {
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

  const handleOpenDeleteModal = () => {
    console.log(data)
    setDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  }

  const handleOpenUpdateForm = () => {
    console.log(data)
    setOpenUpdateForm(true);
  }

  const handleCloseUpdateForm = () => {
    setOpenUpdateForm(false);
  }


  const handleGetExam = (id: number, institutionId: number) => {
    setOpenModal(false);
    setOpen(true);
    api.get(`exams/${id}`, {
      params: {
        healthcareInstitutionId: institutionId
      }
    }).then((response) => {
      setData(response.data)
    })
  };

  const handleDeleteExam = () => {
    api.delete(`exams/${row.id}`, { data: values, params: { healthcareInstitutionId: values.healthcareInstitutionId } }).then(() => {
      alert('Congratulations, the exam was deleted!');
      window.location.reload(false)
    }).catch(() => {
      alert('Oops, something went wrong! Try again later!')
    });
  }

  return (
    <>
      <TableRow >
        <TableCell>
          <IconButton aria-label="expand row" onClick={() => open === false ? handleOpen() : setOpen(false)}>
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
              <div className={classes.div}>
                <Grid container direction="column">
                  <Typography variant="h5" gutterBottom component="div" >
                    Patient's details:
                </Typography>
                  <Typography variant="h6">Patient's age: <span>{data.patientAge}</span></Typography>
                  <Typography variant="h6">Patient's gender: <span>{data.patientGender == "MALE" ? "Male" : "Female"}</span></Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography variant="h5" gutterBottom component="div">
                    Physician's details:
                </Typography>
                  <Typography variant="h6">Physician's name: <span>{data.physicianName}</span></Typography>
                  <Typography variant="h6">Physician's CRM: <span>{data.physicianCRM}</span></Typography>
                </Grid>
                <Grid container direction="column">
                  <Button onClick={handleOpenUpdateForm} variant="contained" color="primary">Atualizar</Button>
                  <Button onClick={handleOpenDeleteModal} variant="contained" color="secondary">Deletar</Button>
                </Grid>
              </div>
              <Grid container alignContent="center">
                {openUpdateForm ?
                  <>
                    <Divider />
                    <UpdateExamForm initialValues={values} />
                  </> : null}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal open={openModal} className={classes.modal} onClose={handleClose} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.paper}>
          <Typography variant="h6">Do you really want to request this exam?</Typography>
          <Typography variant="subtitle1" >Pixeon Coins Necessárias: 1</Typography>
          <div className={classes.buttonDiv}>
            <button onClick={handleClose} className={classes.button}>Close</button>
            <button onClick={() => handleGetExam(row.id, props.institutionId)} className={classes.button}>Pay</button>
          </div>
        </div>
      </Modal>
      <Modal open={openDeleteModal} className={classes.modal} onClose={handleClose} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.paper}>
          <Typography variant="h6">Do you really want to delete this exam?</Typography>
          <div className={classes.buttonDiv}>
            <Button onClick={handleDeleteExam} className={classes.spacingY}>Delete</Button>
            <Button onClick={handleCloseDeleteModal} className={classes.spacingY}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
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

  const [data, setData] = React.useState<GetExamdataType[]>([]);

  api.get(`exams/institutionid/${props.healthcareInstitutions.id}`).then((response) => {
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
            <Row key={index} row={row} institutionId={props.healthcareInstitutions.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}