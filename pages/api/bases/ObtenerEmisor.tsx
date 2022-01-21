import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const Emisores = await prisma.emisores.findMany({
    take: 5,
    distinct:['emisor_nombre'],  
    where:{
      emisor_nombre:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        emisor_nombre:true,
      },
      orderBy:{emisor_nombre:"asc"},
    })

   // console.log(Emisores)
    res.json({Emisores})
  }catch(error){
    //res.status(400).json({error});
  }
}
