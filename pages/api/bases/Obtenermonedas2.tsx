import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const monedas = await prisma.monedas.findMany({
      orderBy:{moneda_id:"asc"},
    })

    //console.log(movimientos)
    res.json({monedas})
  }catch(error){
    //res.status(400).json({error});
  }
}
