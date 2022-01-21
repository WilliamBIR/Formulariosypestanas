import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const movimientos = await prisma.movimientos.findMany({
      orderBy:{movimiento_id:"asc"},
    })

    //console.log(movimientos)
    res.json({movimientos})
  }catch(error){
    //res.status(400).json({error});
  }
}
