import {PrismaClient} from "@prisma/client"

import {listamonedas} from "./seeds/monedasData"
import {idiomas} from "./seeds/idiomasData"
import {listausuarios} from "./seeds/usuariosData"
import { listagenero } from "./seeds/generoData"
import { listaformas } from "./seeds/formasdepagoData"
import { listastatus } from "./seeds/statusData"
import { listacfdi } from "./seeds/cfdiData"
import { listaregimen } from "./seeds/regimenData"
import { listacomprobantes } from "./seeds/tipocomprobanteData"
import { listametodo } from "./seeds/metodopagoData"
import { listaemisores } from "./seeds/emisoresData"
import { listareceptores } from "./seeds/receptoresData"
import { listamovimientos } from "./seeds/movimientosData"


const prisma= new PrismaClient()

async function main(){
    console.log('sembrando vida')
    await prisma.monedas.createMany({
        data:listamonedas,
    })
    
    await prisma.tipodecomprobante.createMany({
        data:listacomprobantes,
    })
    
    await prisma.metododepago.createMany({
        data:listametodo,
    })


    await prisma.regimen.createMany({
        data:listaregimen,
    })

    await prisma.cfdi.createMany({
        data:listacfdi,
    })
    
    await prisma.idioma.createMany({
        data:idiomas
    })
    await prisma.genero.createMany({
        data:listagenero
    })

    await prisma.status.createMany({
        data:listastatus
    })

    await prisma.formasdepago.createMany({
        data:listaformas
    })

    
    await prisma.emisores.createMany({
        data:listaemisores
    })

    
    await prisma.receptores.createMany({
        data:listareceptores
    })

    
    await prisma.movimientos.createMany({
        data:listamovimientos
    })    

    await prisma.user.createMany({
        data:listausuarios
    })    
}
main().catch(e=>{
    console.log(e)
    process.exit(1)
}).finally(()=>{
    prisma.$disconnect
})
