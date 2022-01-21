import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const Clientes = await prisma.clientes.findMany({
    take: 5,
    distinct:['cliente'],  
    where:{
      cliente:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        cliente:true,
      },
      orderBy:{cliente:"asc"},
    })

    //console.log(Emisores)
    res.json({Clientes})
  }catch(error){
    //res.status(400).json({error});
  }
}