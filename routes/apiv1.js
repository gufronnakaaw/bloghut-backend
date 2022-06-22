import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// posts
// GET
router.get('/posts', async (req, res) => {
    const start = Date.now()

    // check query
    const offset = !req.query.offset ? 0 : req.query.offset

    try {

        const posts = await prisma.$queryRaw`SELECT p.title, p.slug, p.img, p.content, p.created_at, p.updated_at, a.username FROM post AS p JOIN author AS a ON (p.id_author = a.id) LIMIT 6 OFFSET ${offset}`

        res.status(200).json({
            took: Date.now() - start,
            success: true,
            data: posts,
            errors: null
        })

    } catch (error) {

        res.status(500).json({
            took: Date.now() - start,
            success: false,
            data: null,
            errors: error.message
        })

    }
})

router.get('/posts/:username/:slug', async (req, res) => {
    const { username, slug } = req.params
    const start = Date.now()

    try {

        const post = await prisma.$queryRaw`SELECT p.title, p.slug, p.img, p.content, p.created_at, p.updated_at, a.username FROM post AS p JOIN author AS a ON (p.id_author = a.id) WHERE p.slug = ${slug} AND a.username = ${username}`

        const latests = await prisma.$queryRaw`SELECT p.title, p.slug, p.img, p.content, p.created_at, p.updated_at, a.username FROM post AS p JOIN author AS a ON (p.id_author = a.id) WHERE a.username = ${username} ORDER BY p.created_at DESC LIMIT 5`

        const data = {
            post,
            latests
        }

        res.status(200).json({
            took: Date.now() - start,
            success: true,
            data,
            errors: null
        })


    } catch (error) {

        res.status(500).json({
            took: Date.now() - start,
            success: false,
            data: null,
            errors: error.message
        })
    }
})

// authors
// GET
router.get('/authors', async (req, res) => {
    const start = Date.now()

    const offset = !req.query.offset ? 0 : req.query.offset

    try {

        const authors = await prisma.$queryRaw`SELECT email, username, fullname, gender, job, description, img, created_at, updated_at FROM author LIMIT 6 OFFSET ${offset}`

        const count = await prisma.$queryRaw`SELECT COUNT(id) AS total_author FROM author`

        const data = {
            authors,
            total_author: count[0].total_author
        }

        res.status(200).json({
            took: Date.now() - start,
            success: true,
            data: data,
            errors: null
        })

    } catch (error) {

        res.status(500).json({
            took: Date.now() - start,
            success: false,
            data: null,
            errors: error.message
        })
    }
})

router.get('/authors/:username', async (req, res) => {
    const start = Date.now()

    const { username } = req.params

    const offset = !req.query.offset ? 0 : req.query.offset

    try {

        const author = await prisma.$queryRaw`SELECT a.username, a.fullname, a.job, a.description, a.img, (SELECT COUNT(post.id) FROM post JOIN author ON (post.id_author = author.id) WHERE author.username = ${username}) AS total_post FROM author AS a WHERE a.username = ${username}`

        const posts = await prisma.$queryRaw`SELECT p.title, p.slug, p.img, p.content, p.created_at, p.updated_at, a.username FROM post AS p JOIN author AS a ON (p.id_author = a.id) WHERE a.username = ${username} LIMIT 6 OFFSET ${offset}`

        const data = {
            author,
            posts
        }

        res.status(200).json({
            took: Date.now() - start,
            success: true,
            data: data,
            errors: null
        })

    } catch (error) {

        res.status(500).json({
            took: Date.now() - start,
            success: false,
            data: null,
            errors: error.message
        })

    }
})

export default router