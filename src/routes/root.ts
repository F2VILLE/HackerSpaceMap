import { Router } from "express"
const path = "/"
const route = Router()

route.get("/", (req, res) => {
    res.render("index")
})

export {route, path};