import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const Cfdi = await prisma.cfdi.findMany({
      select:{
        cfdi_clave:true,
        cfdi_descripcion:true,

      },
      orderBy:{cfdi_clave:"asc"},
    })

    //console.log(Cfdi)
    res.json({Cfdi})
  }catch(error){
    //res.status(400).json({error});
  }
}