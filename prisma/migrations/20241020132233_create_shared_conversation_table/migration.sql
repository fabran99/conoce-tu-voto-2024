-- CreateTable
CREATE TABLE "SharedConversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversation" JSONB NOT NULL,

    CONSTRAINT "SharedConversation_pkey" PRIMARY KEY ("id")
);
