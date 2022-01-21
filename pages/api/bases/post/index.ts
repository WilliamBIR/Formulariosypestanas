import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from  '../../../../lib/prisma'
const mail = require('@sendgrid/mail')
//console.log(process.env.SENDGRID_API_SECRET)
mail.setApiKey(process.env.SENDGRID_API_SECRET)


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   const {DatosPrueba,Comprobantenombre,Comprobantenumerodeparcialidad,Comprobantecfdi,Comprobanteformadepago,Comprobanteimporte,session,ConfirmacionPago,ConfirmacionFondos,Comprobanteconcepto}=req.body


    try{
   var aux=0
   for(let pago of Comprobanteimporte){
     aux+=parseFloat(pago)
   }

   const usuarioid=await prisma.user.findUnique({
       where:{
           email:session.user.email
       },
       select:{
           usuario_id:true
       }
   })

   const emisorid= await prisma.emisores.findUnique({
       where:{
           emisor_nombre:DatosPrueba.emisor
       },
       select:{
           emisor_id:true 
       },
   })

   const monedaid= await prisma.monedas.findUnique({
    where:{
        moneda_clave:DatosPrueba.moneda
    },
    select:{
        moneda_id:true 
    },
    })

    const formaid= await prisma.formasdepago.findUnique({
        where:{
            forma_clave:DatosPrueba.formadepago
        },
        select:{
            forma_pago_id:true 
        },
    })

    const statusid= await prisma.status.findUnique({
        where:{
            status_tipo:DatosPrueba.status
        },
        select:{
            status_id:true 
        },
    })
    
    const resultcliente = await prisma.clientes.create({
    data:{
        usuario_id:usuarioid!.usuario_id,
        cliente:DatosPrueba.cliente,
        emisor_id:emisorid!.emisor_id,  
        montorecibido:aux,
        fecha:DatosPrueba.fecha,
        tipodecambio:DatosPrueba.tipodecambio,
        numeroperacion:DatosPrueba.numeroperacion,
        moneda_id:monedaid!.moneda_id,
        forma_pago_id:formaid!.forma_pago_id,
        status_id:statusid!.status_id,
    }
   })
   
    if(ConfirmacionPago){
        const confirmacionpago1=await prisma.anexoclientespagos.create({
            data:{
                operacion_id:resultcliente!.operacion_id,
                fechadeconfirmacion:DatosPrueba.fechadeconfirmacion,
                observacionesalconfirmar:DatosPrueba.observacionesalconfirmar,
            }
        })
    }
    
    if(ConfirmacionFondos){
        const confirmacionfondos1=await prisma.anexoclientesfondos.create({
            data:{
                operacion_id:resultcliente!.operacion_id,
                observaciones:DatosPrueba.observaciones,
                cuentabancaria:DatosPrueba.cuentabancaria,
                fechadeingreso:DatosPrueba.fechadeingreso,
                montoregistrado:DatosPrueba.montoregistrado,
            }
        })
    }



   for(let i=0; i<Comprobantenombre.length;i++){ 
    const formapagoid2=await prisma.formasdepago.findUnique({
        where:{
            forma_clave:Comprobanteformadepago[i]
        },
        select:{
            forma_pago_id:true 
        },
    })

    const usocfdi=await prisma.cfdi.findUnique({
        where:{
            cfdi_clave:Comprobantecfdi[i]
        },
        select:{
            cfdi_id:true
        }
    })
    
    
    const result = await prisma.comprobantes.create({
        data:{
            comprobante_folio:Comprobantenombre[i],
            concepto:Comprobanteconcepto[i],
            emisor_id:emisorid!.emisor_id, 
            //Agregar receptor al formulario receptor?
            receptor_id:1,  
            status_comprobante_pago_id:statusid!.status_id,
            //Agregar al formulario tipo de comprobante?
            tipo_comprobante_id:1,
            moneda_id:monedaid!.moneda_id,
            idioma_id:1,
            pago:parseFloat(Comprobanteimporte[i]),
            //Agregar al formulario Metodo de pago?
            metodo_pago_id:1,
            forma_pago_id:formapagoid2!.forma_pago_id,
            uso_cfdi_id:usocfdi!.cfdi_id,
            //Incluir en el formulario regimen fiscal?
            regimen_fiscal_id:1,
            operacion_id:resultcliente!.operacion_id
        }
        })

        }
        console.log(DatosPrueba.mensajealcorreo)
        console.log(DatosPrueba.destinatario)
        console.log(DatosPrueba.asunto)
        //Enviar correos
        const message=`
            Nombre del cliente: ${DatosPrueba.cliente}\r\n
            Monto Recibido: ${aux}\r\n
            fecha: ${DatosPrueba.fecha}\r\n
            Numero de operación: ${DatosPrueba.numeroperacion}\r\n
            Mensaje adjunto: ${DatosPrueba.mensajealcorreo}
        `

       await mail.send({
            to:DatosPrueba.destinatario,
            from: process.env.FROM_EMAIL,
            subject:DatosPrueba.asunto,
            text:message,
            html:message.replace(/\r\n/g, '<br>')
        })

        res.status(200).json({status: 'Ok'})
    }catch(error){
        res.status(400).json({error})
    }
}