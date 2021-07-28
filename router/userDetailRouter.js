import express from 'express'
import { addPostModel, deletePostModel, findPostModelByUser } from '../model/postModel.js'

// expressのルーターをインスタンス化
const userDetailRouter = express.Router({ mergeParams: true })

// ユーザーの投稿一覧のルーティングを定義(/user/:userId/post)
userDetailRouter
.get(
  '/post',
  async (req, res) => {
    const searchedPostModelWithUser = await findPostModelByUser( req.params.userId )
    res.send(searchedPostModelWithUser)
  }
)

// ユーザーから新規投稿を行うルーティングを定義(/user/:userId/post/create)
userDetailRouter
.post(
  '/post/create',

  async (req, res) => {
    const body = req.body

    await addPostModel({
      owner: req.params.userId,
      title: body.title,
      content: body.content
    })

    res.send('post created !!')
  }
)


userDetailRouter
.get(
  `/post/delete/:postId`,

  async (req, res) => {
    await deletePostModel(req.params.postId)
    res.status(200).send('deleted.')
  }
)

// ユーザーのプロフィールのルーティングを定義(/user/:userId/profile)
userDetailRouter
.get(
  '/profile',
  (req, res) => {
    res.send('user profile page.')
  }
)

export default userDetailRouter
