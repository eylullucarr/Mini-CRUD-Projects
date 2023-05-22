const {Router} =require('express')
const router= Router()
const controller= require('./controller')


router.get("/",controller.getUsers)
router.get("/:id",controller.getUsersById)
router.post("/",controller.addUser)
router.delete("/:id",controller.deleteUser)
router.put("/:id",controller.updateUser)

module.exports=router