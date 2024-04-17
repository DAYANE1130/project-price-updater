import vine from '@vinejs/vine'

export const updateProductValidator = vine.compile(
  vine.object({
    product_code: vine.number({ strict: true }).positive().nullable(),
    new_price: vine.number({ strict: true }).positive().decimal([0, 2]).nullable(),
  })
)
