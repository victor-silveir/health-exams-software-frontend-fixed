import { Button, Card, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography, Theme } from "@material-ui/core";
import { render } from "@testing-library/react";
import React, { Dispatch, SetStateAction } from "react";

const institutions = [
    {name: 'Hemocentro', cnpj: '123456'},
    {name: 'Sabin', cnpj: '123456'},
    {name: 'Laboratórios Exame', cnpj: '123456'},
    {name: 'Laboratório Maria do Carmo', cnpj: '123456'},
    {name: 'Lab 1', cnpj: '123456'},
  ]

  const useStyles = makeStyles((theme: Theme) => createStyles({
    formControl: {
        margin: theme.spacing(2, 0),
        minWidth: 120,
      }, 
      institutionSelect: {
        width: 200,
        margin: theme.spacing(2, 0)
      },
      institutionButton: {
        backgroundColor: 'red',
        margin: theme.spacing(2, 0)
      },

  })
  );

type CardProps = {
    setInstitution: Dispatch<SetStateAction<string>>
}

export default function InstitutionCard(props: CardProps) {
    const [isInstitutionEmpty, setInstitutionEmpty] = React.useState('');
    const classes = useStyles();

    return(
        <Card>
        <Typography>
          Select a Healthcare Institution:
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel >Institution</InputLabel>
        <Select className={classes.institutionSelect} defaultValue={isInstitutionEmpty} label="Institution" onChange={(event: React.ChangeEvent<{value: unknown}>) => {
          const selectValue = event.target.value
          setInstitutionEmpty(selectValue as string);
          props.setInstitution(selectValue as string)
        }}>
          <MenuItem value={''}><em>...</em></MenuItem>
          {institutions.map((institution, index) => {
            return (
              <MenuItem key={index} value={institution.name}>{institution.name}</MenuItem>
              )
            })}
        </Select>
      </FormControl>
            <Typography variant="h6">
                Or Create a new institution!
            </Typography>
            <Button variant="contained" className={classes.institutionButton}>
                <Typography variant="button">
                    New Institution
                </Typography>
            </Button>
      </Card>
    )
}