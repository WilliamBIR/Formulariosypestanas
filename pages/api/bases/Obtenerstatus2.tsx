import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const status = await prisma.status.findMany({
      orderBy:{status_id:"asc"},
    })

    //console.log(movimientos)
    res.json({status})
  }catch(error){
    //res.status(400).json({error});
  }
}
