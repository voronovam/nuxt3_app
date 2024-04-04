import { H3Event } from 'h3'
import * as blogModel from '~/server/model/blog'

export const read = async () => {
  try {
    const result = await blogModel.read()

    return {
      data: result
    }
  } catch(e) {
    console.error('Read error:', e)

    throw createError({
      statusCode: 500,
      statusMessage: 'Ops! Some error :('
    })
  }
}

export const create = async (event: H3Event) => {
  try {
    const body = await readBody(event)
    const result = await blogModel.create({
      title: body.title,
      content: body.content,
    })

    return {
      data: result
    }
  } catch(e) {
    console.error('Create error:', e)

    throw createError({
      statusCode: 500,
      statusMessage: 'Ops! Some error :('
    })
  }
}

export const detail = async (event: H3Event) => {
  try {
    const result = await blogModel.detail(event.context.params?.id as string)

    return {
      data: result
    }
  } catch(e) {
    console.error('Detail error:', e)

    throw createError({
      statusCode: 500,
      statusMessage: 'Ops! Some error :('
    })
  }
}

export const update = async (event: H3Event) => {
  try {
    const body = await readBody(event)
    const result = await blogModel.update(event.context.params?.id as string,{
      title: body.title,
      content: body.content,
    })

    return {
      data: result
    }
  } catch(e) {
    console.error('Update error:', e)

    throw createError({
      statusCode: 500,
      statusMessage: 'Ops! Some error :('
    })
  }
}

export const remove = async (event: H3Event) => {
  try {
    const result = await blogModel.remove(event.context.params?.id as string)

    return {
      data: result
    }
  } catch(e) {
    console.error('Remove error:', e)

    throw createError({
      statusCode: 500,
      statusMessage: 'Ops! Some error :('
    })
  }
}
