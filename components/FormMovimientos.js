import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import { useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useQuery} from "react-query"


const fetchMovimientosRequest = async()=>{
    const response= await fetch('./api/bases/Obtenermovimientos',{
        body:JSON.stringify(''),
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
    })
    const data= await response.json()
    const {movimientos}=data;
    return movimientos
  }


  const fetchEmisoresRequest = async()=>{
    const response= await fetch('./api/bases/Obteneremisores2',{
        body:JSON.stringify(''),
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
    })
    const data= await response.json()
    const {Emisores}=data;
    return Emisores
  }

  
const fetchMonedasRequest = async()=>{
    const response= await fetch('./api/bases/Obtenermonedas2',{
        body:JSON.stringify(''),
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
    })
    const data= await response.json()
    const {monedas}=data;
    return monedas
  }

  
const fetchFormasRequest = async()=>{
    const response= await fetch('./api/bases/Obtenerformas2',{
        body:JSON.stringify(''),
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
    })
    const data= await response.json()
    const {formas}=data;
    return formas
  }

  
const fetchStatusRequest = async()=>{
    const response= await fetch('./api/bases/Obtenerstatus2',{
        body:JSON.stringify(''),
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
    })
    const data= await response.json()
    const {status}=data;
    return status
  }


export default function FormMovimientos({handleGuardarTabla,handlecancelacion}){
    const [open, setOpen] = useState(false);
    const [Idactual,setId]=useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleCancelar=()=>{
        setId([])
        handlecancelacion()
    }
    const {data:ListaMovimientos}=useQuery(["Movimientos"],fetchMovimientosRequest)
    const {data:ListaEmisores1}=useQuery(["Emisores2"],fetchEmisoresRequest)
    const {data:ListaMonedas1}=useQuery(["Monedas2"],fetchMonedasRequest)
    const {data:ListaFormas1}=useQuery(["Formas2"],fetchFormasRequest)
    const {data:ListaStatus1}=useQuery(["Status2"],fetchStatusRequest)

    var ListaMonedas=[]
    if(ListaMonedas1){
        for(let Moneda of ListaMonedas1){
            ListaMonedas.push(Moneda)
          }
    }
  
    
    var ListaStatus=[]
    if(ListaStatus1){
        for(let Stat of ListaStatus1){
            ListaStatus.push(Stat)
          }
    }
    
    var ListaFormas=[]
    if(ListaFormas1){
        for(let Forma of ListaFormas1){
            ListaFormas.push(Forma)
          }
    }

    var ListaEmisores=[]
    if(ListaEmisores1){
        for(let Emisor of ListaEmisores1){
            ListaEmisores.push(Emisor)
          }
    }

    
    const columns=[
        {field:"movimiento_id",headerName:"Id",width:70},
        {field:"fecha",headerName:"Fecha",width:150},
        {field:"concepto",headerName:"Concepto",width:200},
        {field:"referencia",headerName:"Referencia",width:100},
        {field:"monto",headerName:"Monto",width:100},
        {field:"tipo_cambio",headerName:"Tipo de cambio",width:50},
        /*
        {field:"emisor_id",headerName:"Emisor",width:50},
        {field:"moneda_id",headerName:"Moneda",width:50},
        {field:"forma_pago_id",headerName:"Forma de pago",width:50},
        {field:"status_id",headerName:"Status",width:50},
    */
    ]
    //Revisar que este hecho el query
    var lista=[]
    if(ListaMovimientos){
        for(let Movi of ListaMovimientos){
          lista.push(Movi)
        }
      }
      else{
          lista=[]
      }


    //Agregar el index que se presiono  
    var DatosTabla=[]
    if(Idactual&&ListaMonedas&&ListaEmisores&&ListaFormas && ListaStatus){
        var auxstatus=''
        var auxmoneda=''
        var auxforma=''
        var auxemisor=''
        var aux={}
        for(let lis of lista){
            for(let moneda of ListaMonedas){
                if(lis.moneda_id===moneda.moneda_id){
                    auxmoneda=moneda.moneda_clave
                }
            }
            for(let emisor of ListaEmisores){
            
                if(lis.emisor_id===emisor.emisor_id){
                    auxemisor=emisor.emisor_nombre
                }
            }
            for(let forma of ListaFormas){
                if(lis.forma_pago_id===forma.forma_pago_id){
                    auxforma=forma.forma_clave
                }
            }
            for(let status of ListaStatus){
                if(lis.status_id===status.status_id){
                    auxstatus=status.status_tipo
                }
            }
            
            for(let asd of Idactual){
                if(lis.movimiento_id===asd){
                    aux={
                        fecha:lis.fecha,
                        emisor:auxemisor,
                        monto:lis.monto,
                        moneda:auxmoneda,
                        tipodecambio:lis.tipo_cambio,
                        status:auxstatus,
                        formadepago:auxforma,
                        referencia:lis.referencia,
                        concepto:lis.concepto
                    }        
                    
                }
            }
        }
        DatosTabla.push(aux)
    }

    const handleRowCheck=e=>{
        var aux=[]
        for(let i of e){
            aux.push(e)
        }
        setId(e)
        console.log(e)
    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height:500,
        bgcolor: '#e1f5fe',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  

    return(
        <div>
        <Paper elevation={6} sx={{bgcolor: "#e1f5fe",}}>
        <Box  sx={{padding:3}} textAlign='center'>
        <Button variant="contained" color="primary" onClick={handleOpen} >Agregar movimientos</Button>
        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Concepto</TableCell>
                <TableCell align="center">Referencia</TableCell>
                <TableCell align="center">Monto</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {DatosTabla.map((row) => (
                <TableRow
                key={row.movimiento_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="center">{row.fecha}</TableCell>
                <TableCell align="center">{row.concepto}</TableCell>
                <TableCell align="center">{row.referencia}</TableCell>
                <TableCell align="center">{row.monto}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Button variant="contained"  color="error" onClick={handleCancelar} >Cancelar</Button>
        <Button variant="contained"  color="success" onClick={handleGuardarTabla(DatosTabla)} >Guardar Pago</Button>
        </Box>
        


        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Listado Cuenta Bancaria con Datos ya establecidos
            </Typography>
                <DataGrid
                getRowId={(r)=>r.movimiento_id}
                rows={lista}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                disableExtendRowFullWidth
                onSelectionModelChange={handleRowCheck}/>
            </Box>
        </Modal>
        </Paper>
        </div>
    )
}