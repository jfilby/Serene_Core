import { CustomError } from '@/serene-core-server/types/errors'

export class ChatMessageCreatedModel {

  // Consts
  clName = 'ChatMessageCreatedModel'

  // Code
  async countMessages(
          prisma: any,
          userProfileId: string,
          instanceId: string | null | undefined,
          techId: string | undefined,
          startDate: Date,
          sentByAi: boolean) {

    // Debug
    const fnName = `${this.clName}.countMessages()`

    // Query
    const count = await prisma.chatMessageCreated.count({
      where: {
        userProfileId: userProfileId,
        instanceId: instanceId,
        techId: techId,
        sentByAi: sentByAi,
        created: {
          gte: startDate,
        },
      },
    })

    // Return
    return count
  }

  async create(prisma: any,
               userProfileId: string,
               instanceId: string | null,
               techId: string,
               sentByAi: boolean,
               inputTokens: number,
               outputTokens: number,
               costInCents: number) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Validate
    if (userProfileId == null) {
      throw new CustomError(`${fnName}: userProfileId == null`)
    }

    if (instanceId === undefined) {
      throw new CustomError(`${fnName}: instanceId === undefined`)
    }

    if (techId == null) {
      throw new CustomError(`${fnName}: techId == null`)
    }

    if (sentByAi == null) {
      throw new CustomError(`${fnName}: sentByAi == null`)
    }

    if (inputTokens == null) {
      throw new CustomError(`${fnName}: inputTokens == null`)
    }

    if (outputTokens == null) {
      throw new CustomError(`${fnName}: outputTokens == null`)
    }

    if (costInCents == null) {
      throw new CustomError(`${fnName}: costInCents == null`)
    }

    // Create record
    try {
      return await prisma.chatMessageCreated.create({
        data: {
          userProfileId: userProfileId,
          instanceId: instanceId,
          techId: techId,
          sentByAi: sentByAi,
          inputTokens: inputTokens,
          outputTokens: outputTokens,
          costInCents: costInCents
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw 'Prisma error'
    }
  }
}
