import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { useQuery } from 'react-query'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const fetchEmisorRequest = async Emisor => {
  const data2 = { Otro: Emisor }
  const response = await fetch('./api/bases/ObtenerEmisor', {
    body: JSON.stringify(data2),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  const { Emisores } = data
  return Emisores
}

const fetchStatusRequest = async Status => {
  const data2 = { Otro: Status }
  const response = await fetch('./api/bases/ObtenerStatus', {
    body: JSON.stringify(data2),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  const { Status1 } = data
  return Status1
}

const fetchFormaRequest = async Status => {
  const data2 = { Otro: Status }
  const response = await fetch('./api/bases/ObtenerForma', {
    body: JSON.stringify(data2),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  const { Forma1 } = data
  return Forma1
}

const fetchMonedasRequest = async Moneda => {
  const data2 = { Otro: Moneda }
  const response = await fetch('./api/bases/ObtenerMonedas', {
    body: JSON.stringify(data2),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  const { Monedas } = data
  return Monedas
}

const fetchClientesRequest = async Cliente => {
  const data2 = { Otro: Cliente }
  const response = await fetch('./api/bases/ObtenerClientes', {
    body: JSON.stringify(data2),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  const { Clientes } = data
  return Clientes
}

export default function Formulario ({
  values,
  handleFormInput,
  handleFormSelect,
  handleCheckIngreso,
  handleCheckPago,
  handleSubirCliente,
  ConfirmacionFondos,
  ConfirmacionPago
}) {
  var ListaMonedas = []
  var Emisores = []
  var ListaForma = []
  var ListaStatus = []
  if (!values) {
    var Datos = {
      cliente: '',
      emisor: '',
      montorecibido: 0,
      montoaplicable: 0,
      moneda: '',
      tipodecambio: 0,
      formadepago: '',
      fecha: '',
      status: '',
      numeroperacion: '',
      observaciones: '',
      cuentabancaria: '',
      fechadeingreso: '',
      montoregistrado: 0,
      fechadeconfirmacion: '',
      observacionesalconfirmar: ''
    }
  } else {
    Datos = {
      cliente: values.cliente,
      emisor: values.emisor,
      montorecibido: values.montorecibido,
      montoaplicable: values.montoaplicable,
      moneda: values.moneda,
      tipodecambio: values.tipodecambio,
      formadepago: values.formadepago,
      fecha: values.fecha,
      status: values.status,
      numeroperacion: values.numeroperacion,
      observaciones: values.observaciones,
      cuentabancaria: values.cuentabancaria,
      fechadeingreso: values.fechadeingreso,
      montoregistrado: values.montoregistrado,
      fechadeconfirmacion: values.fechadeconfirmacion,
      observacionesalconfirmar: values.observacionesalconfirmar
    }
  }
  const { data: Emisores1 } = useQuery(
    ['Emisor', Datos.emisor],
    fetchEmisorRequest
  )
  const { data: ListaStatus1 } = useQuery(
    ['Status', Datos.status],
    fetchStatusRequest
  )
  const { data: ListaForma1 } = useQuery(
    ['Formas', Datos.formadepago],
    fetchFormaRequest
  )
  const { data: ListaMonedas1 } = useQuery(
    ['Monedas', Datos.moneda],
    fetchMonedasRequest
  )
  const { data: ListaClientes } = useQuery(
    ['Clientes', Datos.cliente],
    fetchClientesRequest
  )

  var Clientes = []
  var ListaCuentas = []

  if (ListaClientes) {
    for (let Cliente of ListaClientes) {
      Clientes.push(Cliente.cliente)
    }
  } else {
    Clientes = []
    ListaCuentas = []
  }

  if (ListaMonedas1) {
    for (let Mone of ListaMonedas1) {
      ListaMonedas.push(Mone.moneda_clave)
    }
  } else {
    var ListaMonedas = []
  }

  if (ListaForma1) {
    for (let Form of ListaForma1) {
      ListaForma.push(Form.forma_clave + ' - ' + Form.forma_tipo)
    }
  } else {
    ListaForma = []
  }

  if (ListaStatus1) {
    for (let Stat of ListaStatus1) {
      ListaStatus.push(Stat.status_tipo)
    }
  } else {
    ListaStatus = []
  }

  if (Emisores1) {
    for (let Emi of Emisores1) {
      Emisores.push(Emi.emisor_nombre)
    }
  } else {
    Emisores = []
  }

  const tamanoh = 450

  const aparecerpago = {
    display: ConfirmacionPago ? 'flex' : 'none',
    width: tamanoh,
    p: 1
  }
  const aparecerfondos = {
    display: ConfirmacionFondos ? 'flex' : 'none',
    width: tamanoh,
    p: 1
  }

  return (
    <div>
      <Paper elevation={6} sx={{ bgcolor: '#e1f5fe' }}>
        <Box sx={{ padding: 3 }}>
          <Typography component='h1' variant='h5'>
            Información del pago
          </Typography>
          <Autocomplete
            value={Datos.cliente}
            defaultValue={Datos.cliente}
            onChange={handleFormSelect('cliente')}
            onInputChange={handleFormInput('cliente')}
            disablePortal
            id='ClienteAuto'
            options={Clientes}
            sx={{ width: tamanoh, p: 1 }}
            renderInput={params => <TextField {...params} label='Cliente' />}
          />
          <br />
          <Autocomplete
            value={Datos.emisor}
            defaultValue={Datos.emisor}
            onChange={handleFormSelect('emisor')}
            onInputChange={handleFormInput('emisor')}
            disablePortal
            id='EmisorAuto'
            options={Emisores}
            sx={{ width: tamanoh, p: 1 }}
            renderInput={params => <TextField {...params} label='Emisor' />}
          />
          <br />
          <TextField
            value={Datos.montorecibido}
            onChange={handleFormInput('montorecibido')}
            type='number'
            sx={{ width: tamanoh, p: 1 }}
            label='Monto recibido'
          ></TextField>
          <br />
          <TextField
            value={Datos.montorecibido}
            type='number'
            sx={{ width: tamanoh, p: 1 }}
            label='Monto Aplicable'
            disabled={true}
          ></TextField>
          <br />
          <Autocomplete
            value={Datos.moneda}
            defaultValue={Datos.moneda}
            onChange={handleFormSelect('moneda')}
            onInputChange={handleFormInput('moneda')}
            disablePortal
            id='MonedaAuto'
            options={ListaMonedas}
            sx={{ width: tamanoh, p: 1 }}
            renderInput={params => <TextField {...params} label='Moneda' />}
          />{' '}
          <br />
          <TextField
            sx={{ width: tamanoh, p: 1 }}
            type='number'
            value={Datos.tipodecambio}
            onChange={handleFormInput('tipodecambio')}
            label='Tipo de cambio'
          ></TextField>
          <br />
          <Autocomplete
            value={Datos.formadepago}
            defaultValue={Datos.formadepago}
            onChange={handleFormSelect('formadepago')}
            onInputChange={handleFormInput('formadepago')}
            disablePortal
            id='FormaPAuto'
            options={ListaForma}
            sx={{ width: tamanoh, p: 1 }}
            renderInput={params => <TextField {...params} label='Forma Pago' />}
          />{' '}
          <br />
          <TextField
            disabled={true}
            value={Datos.fecha}
            onChange={handleFormInput('fecha')}
            label='Fecha'
            type='datetime-local'
            sx={{ width: tamanoh, p: 1 }}
            InputLabelProps={{ shrink: true }}
          />
          <br />
          <Autocomplete
            value={Datos.status}
            defaultValue={Datos.status}
            onChange={handleFormSelect('status')}
            onInputChange={handleFormInput('status')}
            disablePortal
            id='StatusAuto'
            options={ListaStatus}
            sx={{ width: tamanoh, p: 1 }}
            renderInput={params => <TextField {...params} label='Status' />}
          />
          <br />
          <TextField
            value={Datos.numeroperacion}
            sx={{ width: tamanoh, p: 1 }}
            label='Numero Operacion'
            disabled={true}
          ></TextField>
          <br />

          <FormControlLabel
            checked={ConfirmacionFondos}
            onChange={handleCheckIngreso('Ingreso')}
            control={<Checkbox />}
            label='Ya ingresaron los fondos a la cuenta ?'
          />
          <TextField
            value={Datos.cuentabancaria}
            onChange={handleFormInput('cuentabancaria')}
            defaultValue={Datos.cuentabancaria}
            id='CuentaBancaria'
            sx={aparecerfondos}
            InputLabelProps={{ shrink: true }}
            label='Cuenta Bancaria'
          />
          <br />
          <TextField
            value={Datos.fechadeingreso}
            onChange={handleFormInput('fechadeingreso')}
            type='date'
            sx={aparecerfondos}
            InputLabelProps={{ shrink: true }}
            label='Fecha de ingreso'
          />
          <br />
          <TextField
            value={Datos.montoregistrado}
            onChange={handleFormInput('montoregistrado')}
            sx={aparecerfondos}
            type='number'
            label='Monto Registrado'
            disabled={true}
          ></TextField>
          <br />
          <TextField
            value={Datos.observaciones}
            onChange={handleFormInput('observaciones')}
            sx={aparecerfondos}
            label='Observaciones'
          ></TextField>
          <br />
          <FormControlLabel
            checked={ConfirmacionPago}
            onChange={handleCheckPago('Pago')}
            control={<Checkbox />}
            label='El cliente confirmo el pago?'
          />
          <TextField
            value={Datos.fechadeconfirmacion}
            onChange={handleFormInput('fechadeconfirmacion')}
            type='datetime-local'
            sx={aparecerpago}
            InputLabelProps={{ shrink: true }}
            label='Fecha de confirmación'
          />
          <br />
          <TextField
            value={Datos.observacionesalconfirmar}
            onChange={handleFormInput('observacionesalconfirmar')}
            sx={aparecerpago}
            label='Observaciones al confirmar'
          ></TextField>{' '}
          <br />
          <br />
          <TextField
            value={Datos.destinatario}
            onChange={handleFormInput('destinatario')}
            sx={{ width: tamanoh, p: 1 }}
            label='Correo del destinatario'
          ></TextField>
          <br />
          <TextField
            value={Datos.asunto}
            onChange={handleFormInput('asunto')}
            sx={{ width: tamanoh, p: 1 }}
            label='Asunto del correo'
          ></TextField>
          <br />
          <TextField
            value={Datos.mensajealcorreo}
            onChange={handleFormInput('mensajealcorreo')}
            sx={{ width: tamanoh, p: 1 }}
            label='Mensaje añadido al correo'
          ></TextField>
          <br />
          <Button
            variant='contained'
            onClick={handleSubirCliente}
            color='success'
          >
            Enviar Informacion
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
