export class ResourceQuotaTotalModel {

  // Consts
  clName = 'ResourceQuotaTotalModel'

  // Code
  async create(prisma: any,
               userProfileId: string,
               resource: string,
               fromDay: Date,
               toDay: Date,
               quota: number) {

    // Debug
    const fnName = `${this.clName}.filter()`

    // Create
    try {
      return await prisma.resourceQuotaTotal.create({
        data: {
          userProfileId: userProfileId,
          resource: resource,
          fromDay: fromDay,
          toDay: toDay,
          quota: quota
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw 'Prisma error'
    }
  }

  async filter(prisma: any,
               userProfileId: string,
               resource: string,
               fromDay: Date,
               toDay: Date) {

    // Debug
    const fnName = `${this.clName}.filter()`

    // Query
    try {
      return await prisma.resourceQuotaTotal.findMany({
        where: {
          userProfileId: userProfileId,
          resource: resource,
          fromDay: {
            gte: fromDay
          },
          toDay: {
            lte: toDay
          }
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw `Prisma error`
    }
  }

  async getByUniqueKey(
          prisma: any,
          userProfileId: string,
          resource: string,
          fromDay: Date,
          toDay: Date) {

    // Debug
    const fnName = `${this.clName}.getByUniqueKey()`

    // Query
    try {
      return await prisma.resourceQuotaTotal.findFirst({
        where: {
          userProfileId: userProfileId,
          resource: resource,
          fromDay: fromDay,
          toDay: toDay
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw `Prisma error`
    }
  }

  async sum(prisma: any,
               userProfileId: string,
               resource: string,
               fromDay: Date,
               toDay: Date) {

    // Debug
    const fnName = `${this.clName}.sum()`

    // Query
    var aggregations: any = undefined

    try {
      aggregations = await prisma.resourceQuotaTotal.aggregate({
        _sum: {
          quota: true
        },
        where: {
          userProfileId: userProfileId,
          resource: resource,
          fromDay: {
            gte: fromDay
          },
          toDay: {
            lte: toDay
          }
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw `Prisma error`
    }

    // Return
    return aggregations._sum.quota ?? 0
  }

  async update(prisma: any,
               id: string,
               userProfileId: string | undefined,
               resource: string | undefined,
               fromDay: Date | undefined,
               toDay: Date | undefined,
               quota: number | undefined) {

    // Debug
    const fnName = `${this.clName}.update()`

    // Create
    try {
      return await prisma.resourceQuotaTotal.update({
        data: {
          userProfileId: userProfileId,
          resource: resource,
          fromDay: fromDay,
          toDay: toDay,
          quota: quota
        },
        where: {
          id: id
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw 'Prisma error'
    }
  }

  async upsert(prisma: any,
               id: string | undefined,
               userProfileId: string,
               resource: string,
               fromDay: Date,
               toDay: Date,
               quota: number) {

    // Debug
    const fnName = `${this.clName}.upsert()`

    // Validate
    if (quota == null ||
        Number.isNaN(quota)) {

      throw `${fnName}: quota is ${JSON.stringify(quota)}`
    }

    // Get by userProfileId and day if id is null
    if (id == null) {

      const resourceQuotaTotal = await
              this.getByUniqueKey(
                prisma,
                userProfileId,
                resource,
                fromDay,
                toDay)

      if (resourceQuotaTotal != null) {
        id = resourceQuotaTotal.id
      }
    }

    // Upsert
    if (id == null) {
      return await this.create(
                     prisma,
                     userProfileId,
                     resource,
                     fromDay,
                     toDay,
                     quota)
    } else {
      return await this.update(
                     prisma,
                     id,
                     userProfileId,
                     resource,
                     fromDay,
                     toDay,
                     quota)
    }
  }
}
