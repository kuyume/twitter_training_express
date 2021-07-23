import express from 'express'
import { addPostModel, findPostModelByUser } from '../model/postModel.js'

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
.get(
  '/post/create',

  async (req, res) => {
    const addResult = await addPostModel({
      owner: req.params.userId,
      title: 'testTitle4',
      content: 'testContent4'
    })
    addResult.catch(( err ) => {
      return err
    })

    res.send(addResult)
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