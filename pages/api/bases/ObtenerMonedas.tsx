import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma"


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const Monedas = await prisma.monedas.findMany({
    take: 5,
    distinct:['moneda_clave'],  
    where:{
      moneda_clave:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        moneda_clave:true,
      },
      orderBy:{moneda_id:"asc"},
    })

    //console.log(Emisores)
    res.json({Monedas})
  }catch(error){
    //res.status(400).json({error});
  }
}
