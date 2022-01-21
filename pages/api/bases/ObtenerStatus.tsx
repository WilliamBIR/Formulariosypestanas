import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const Status1 = await prisma.status.findMany({
    take: 5,
    distinct:['status_tipo'],  
    where:{
      status_tipo:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        status_tipo:true,
      },
      orderBy:{status_tipo:"asc"},
    })

    //console.log(Status1)
    res.json({Status1})
  }catch(error){
    //res.status(400).json({error});
  }
}
