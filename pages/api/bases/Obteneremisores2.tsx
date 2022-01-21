import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const Emisores = await prisma.emisores.findMany({
      orderBy:{emisor_nombre:"asc"},
    })

    //console.log(movimientos)
    res.json({Emisores})
  }catch(error){
    //res.status(400).json({error});
  }
}
