import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { sliderRepo } from '@/helpers'

const getDetail = apiHandler(async (req, { params }) => {
  const { id } = params
  const result = await sliderRepo.getById(id)
  return setJson({
    data: result,
  })
})

const update = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await sliderRepo.update(id, body)
    return setJson({
      message: '更新成功',
    })
  },
  {
    isJwt: true,
    identity: 'root',
    schema: joi.object({
      category_id: joi.string().required(),
      info: joi.array().required(),
      optionsType: joi.string().required(),
      specification: joi.array().required(),
    }),
  }
)

const _delete = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await sliderRepo.delete(id)
    return setJson({
      message: '删除成功',
    })
  },
  {
    isJwt: true,
    identity: 'root',
  }
)

export const GET = getDetail
export const PUT = update
export const DELETE = _delete
