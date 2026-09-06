-- CreateTable
CREATE TABLE "user" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "upload" (
    "id" SERIAL NOT NULL,
    "imagem" TEXT NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "Id" SERIAL NOT NULL,
    "conteudo" JSONB NOT NULL,
    "usersId" INTEGER NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
