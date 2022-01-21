import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../lib/prisma";


export default async function handle(req:any,res:any) {
  const {Otro}=req.body
  try{
  const Forma1 = await prisma.formasdepago.findMany(
    {
    take: 5,
    where:{
      forma_clave:{
        contains:Otro.queryKey[1],
        },
      },
      select:{
        forma_clave:true,
        forma_tipo:true,
      },
      orderBy:{forma_clave:"asc"},
    }
    )

    //console.log(Forma1)
    res.json({Forma1})
  }catch(error){
    
    //res.status(400).json({error});
  }
}
