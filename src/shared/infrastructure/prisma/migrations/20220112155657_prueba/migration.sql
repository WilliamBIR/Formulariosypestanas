-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "usuario_id" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "idioma_id" INTEGER NOT NULL,
    "genero_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "genero_id" SERIAL NOT NULL,
    "genero_nombre" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("genero_id")
);

-- CreateTable
CREATE TABLE "Idioma" (
    "idioma_id" SERIAL NOT NULL,
    "idioma_nombre" TEXT NOT NULL,
    "idioma_clave" TEXT NOT NULL,

    CONSTRAINT "Idioma_pkey" PRIMARY KEY ("idioma_id")
);

-- CreateTable
CREATE TABLE "Monedas" (
    "moneda_id" SERIAL NOT NULL,
    "moneda_clave" TEXT,
    "moneda_nombre" TEXT,
    "moneda_nombre_singular" TEXT,
    "moneda_nombre_plural" TEXT,
    "moneda_denominacion" TEXT,
    "moneda_simbolo" TEXT,
    "moneda_decimales" TEXT NOT NULL,
    "moneda_porcentaje_variacion" TEXT NOT NULL,

    CONSTRAINT "Monedas_pkey" PRIMARY KEY ("moneda_id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "operacion_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "emisor_id" INTEGER NOT NULL,
    "montorecibido" DOUBLE PRECISION NOT NULL,
    "moneda_id" INTEGER NOT NULL,
    "tipodecambio" DOUBLE PRECISION NOT NULL,
    "forma_pago_id" INTEGER NOT NULL,
    "fecha" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,
    "numeroperacion" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("operacion_id")
);

-- CreateTable
CREATE TABLE "Formasdepago" (
    "forma_pago_id" SERIAL NOT NULL,
    "forma_clave" TEXT NOT NULL,
    "forma_tipo" TEXT NOT NULL,

    CONSTRAINT "Formasdepago_pkey" PRIMARY KEY ("forma_pago_id")
);

-- CreateTable
CREATE TABLE "Status" (
    "status_id" SERIAL NOT NULL,
    "status_tipo" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "Cfdi" (
    "cfdi_id" SERIAL NOT NULL,
    "cfdi_clave" TEXT NOT NULL,
    "cfdi_descripcion" TEXT NOT NULL,

    CONSTRAINT "Cfdi_pkey" PRIMARY KEY ("cfdi_id")
);

-- CreateTable
CREATE TABLE "Regimen" (
    "regimen_id" SERIAL NOT NULL,
    "regimen_tipo" TEXT NOT NULL,

    CONSTRAINT "Regimen_pkey" PRIMARY KEY ("regimen_id")
);

-- CreateTable
CREATE TABLE "Metododepago" (
    "metodopago_id" SERIAL NOT NULL,
    "metodopago_clave" TEXT NOT NULL,
    "metodopago_tipo" TEXT NOT NULL,

    CONSTRAINT "Metododepago_pkey" PRIMARY KEY ("metodopago_id")
);

-- CreateTable
CREATE TABLE "Tipodecomprobante" (
    "tipocomprobante_id" SERIAL NOT NULL,
    "tipocomprobante_clave" TEXT NOT NULL,
    "tipocomprobante_descripcion" TEXT NOT NULL,

    CONSTRAINT "Tipodecomprobante_pkey" PRIMARY KEY ("tipocomprobante_id")
);

-- CreateTable
CREATE TABLE "Emisores" (
    "emisor_id" SERIAL NOT NULL,
    "emisor_nombre" TEXT NOT NULL,

    CONSTRAINT "Emisores_pkey" PRIMARY KEY ("emisor_id")
);

-- CreateTable
CREATE TABLE "Receptores" (
    "receptor_id" SERIAL NOT NULL,
    "receptor_nombre" TEXT NOT NULL,

    CONSTRAINT "Receptores_pkey" PRIMARY KEY ("receptor_id")
);

-- CreateTable
CREATE TABLE "Comprobantes" (
    "comprobante_id" SERIAL NOT NULL,
    "comprobante_folio" TEXT NOT NULL,
    "emisor_id" INTEGER NOT NULL,
    "receptor_id" INTEGER NOT NULL,
    "pago" DOUBLE PRECISION NOT NULL,
    "status_comprobante_pago_id" INTEGER NOT NULL,
    "tipo_comprobante_id" INTEGER NOT NULL,
    "moneda_id" INTEGER NOT NULL,
    "idioma_id" INTEGER NOT NULL,
    "metodo_pago_id" INTEGER NOT NULL,
    "forma_pago_id" INTEGER NOT NULL,
    "uso_cfdi_id" INTEGER NOT NULL,
    "regimen_fiscal_id" INTEGER NOT NULL,
    "operacion_id" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,

    CONSTRAINT "Comprobantes_pkey" PRIMARY KEY ("comprobante_id")
);

-- CreateTable
CREATE TABLE "Movimientos" (
    "movimiento_id" SERIAL NOT NULL,
    "fecha" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "referencia" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "tipo_cambio" DOUBLE PRECISION NOT NULL,
    "emisor_id" INTEGER NOT NULL,
    "moneda_id" INTEGER NOT NULL,
    "forma_pago_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,

    CONSTRAINT "Movimientos_pkey" PRIMARY KEY ("movimiento_id")
);

-- CreateTable
CREATE TABLE "Condiciondepago" (
    "condicion_pago_id" SERIAL NOT NULL,
    "condicion_pago_nombre" TEXT NOT NULL,
    "condicion_pago_dias_para_vencer" INTEGER NOT NULL,
    "idioma_id" INTEGER NOT NULL,
    "condicion_pago_status" TEXT NOT NULL,

    CONSTRAINT "Condiciondepago_pkey" PRIMARY KEY ("condicion_pago_id")
);

-- CreateTable
CREATE TABLE "Anexoclientespagos" (
    "anexo_pago_id" SERIAL NOT NULL,
    "fechadeconfirmacion" TEXT,
    "observacionesalconfirmar" TEXT,
    "operacion_id" TEXT NOT NULL,

    CONSTRAINT "Anexoclientespagos_pkey" PRIMARY KEY ("anexo_pago_id")
);

-- CreateTable
CREATE TABLE "Anexoclientesfondos" (
    "anexo_clientes_id" SERIAL NOT NULL,
    "observaciones" TEXT,
    "cuentabancaria" TEXT,
    "fechadeingreso" TEXT,
    "montoregistrado" DOUBLE PRECISION NOT NULL,
    "operacion_id" TEXT NOT NULL,

    CONSTRAINT "Anexoclientesfondos_pkey" PRIMARY KEY ("anexo_clientes_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_genero_nombre_key" ON "Genero"("genero_nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Idioma_idioma_clave_key" ON "Idioma"("idioma_clave");

-- CreateIndex
CREATE UNIQUE INDEX "Monedas_moneda_clave_key" ON "Monedas"("moneda_clave");

-- CreateIndex
CREATE UNIQUE INDEX "Monedas_moneda_nombre_key" ON "Monedas"("moneda_nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Formasdepago_forma_clave_key" ON "Formasdepago"("forma_clave");

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_tipo_key" ON "Status"("status_tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Cfdi_cfdi_clave_key" ON "Cfdi"("cfdi_clave");

-- CreateIndex
CREATE UNIQUE INDEX "Regimen_regimen_tipo_key" ON "Regimen"("regimen_tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Metododepago_metodopago_clave_key" ON "Metododepago"("metodopago_clave");

-- CreateIndex
CREATE UNIQUE INDEX "Tipodecomprobante_tipocomprobante_clave_key" ON "Tipodecomprobante"("tipocomprobante_clave");

-- CreateIndex
CREATE UNIQUE INDEX "Emisores_emisor_nombre_key" ON "Emisores"("emisor_nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Receptores_receptor_nombre_key" ON "Receptores"("receptor_nombre");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "User"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "User"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idioma_id_fkey" FOREIGN KEY ("idioma_id") REFERENCES "Idioma"("idioma_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_genero_id_fkey" FOREIGN KEY ("genero_id") REFERENCES "Genero"("genero_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "User"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_emisor_id_fkey" FOREIGN KEY ("emisor_id") REFERENCES "Emisores"("emisor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_moneda_id_fkey" FOREIGN KEY ("moneda_id") REFERENCES "Monedas"("moneda_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_forma_pago_id_fkey" FOREIGN KEY ("forma_pago_id") REFERENCES "Formasdepago"("forma_pago_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("status_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_emisor_id_fkey" FOREIGN KEY ("emisor_id") REFERENCES "Emisores"("emisor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_receptor_id_fkey" FOREIGN KEY ("receptor_id") REFERENCES "Receptores"("receptor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_status_comprobante_pago_id_fkey" FOREIGN KEY ("status_comprobante_pago_id") REFERENCES "Status"("status_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_tipo_comprobante_id_fkey" FOREIGN KEY ("tipo_comprobante_id") REFERENCES "Tipodecomprobante"("tipocomprobante_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_moneda_id_fkey" FOREIGN KEY ("moneda_id") REFERENCES "Monedas"("moneda_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_idioma_id_fkey" FOREIGN KEY ("idioma_id") REFERENCES "Idioma"("idioma_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_metodo_pago_id_fkey" FOREIGN KEY ("metodo_pago_id") REFERENCES "Metododepago"("metodopago_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_forma_pago_id_fkey" FOREIGN KEY ("forma_pago_id") REFERENCES "Formasdepago"("forma_pago_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_uso_cfdi_id_fkey" FOREIGN KEY ("uso_cfdi_id") REFERENCES "Cfdi"("cfdi_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_regimen_fiscal_id_fkey" FOREIGN KEY ("regimen_fiscal_id") REFERENCES "Regimen"("regimen_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comprobantes" ADD CONSTRAINT "Comprobantes_operacion_id_fkey" FOREIGN KEY ("operacion_id") REFERENCES "Clientes"("operacion_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimientos" ADD CONSTRAINT "Movimientos_emisor_id_fkey" FOREIGN KEY ("emisor_id") REFERENCES "Emisores"("emisor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimientos" ADD CONSTRAINT "Movimientos_moneda_id_fkey" FOREIGN KEY ("moneda_id") REFERENCES "Monedas"("moneda_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimientos" ADD CONSTRAINT "Movimientos_forma_pago_id_fkey" FOREIGN KEY ("forma_pago_id") REFERENCES "Formasdepago"("forma_pago_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimientos" ADD CONSTRAINT "Movimientos_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("status_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condiciondepago" ADD CONSTRAINT "Condiciondepago_idioma_id_fkey" FOREIGN KEY ("idioma_id") REFERENCES "Idioma"("idioma_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexoclientespagos" ADD CONSTRAINT "Anexoclientespagos_operacion_id_fkey" FOREIGN KEY ("operacion_id") REFERENCES "Clientes"("operacion_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexoclientesfondos" ADD CONSTRAINT "Anexoclientesfondos_operacion_id_fkey" FOREIGN KEY ("operacion_id") REFERENCES "Clientes"("operacion_id") ON DELETE CASCADE ON UPDATE CASCADE;
