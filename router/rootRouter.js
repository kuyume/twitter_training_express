import express from 'express'
import userRouter from './userRouter.js'
import postRouter from './postRouter.js'
import { getAllUsers } from '../model/userModel.js' 

const rootRouter = express.Router()

// "/user/"パス以下でuserRouter（外部ファイル）の使用を宣言
rootRouter.use('/user', userRouter)

// "/post/"パス以下でpostRouter（外部ファイル）の使用を宣言
rootRouter.use('/post', postRouter)

// ユーザーアーカイブページのルーティングを定義(/user)
rootRouter.get(
  '/user',

  // ユーザーモデルから条件なしで前ユーザーを取得
  async (req, res) => {
    const allUsers = await getAllUsers()
    console.log(allUsers)
    res.send(allUsers)
  }
)

// 投稿アーカイブページのルーティングを定義(/post)
rootRouter.get(
  '/post',
  (req, res) => {
    res.send('post archive page.')
  }
)

export default rootRouter