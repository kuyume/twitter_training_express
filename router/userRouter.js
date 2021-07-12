import express from 'express'
import userDetailRouter from './userDetailRouter.js'
import userModel, { addUserModel } from '../model/userModel.js'

// expressのルーターをインスタンス化
const userRouter = express.Router()

// "/user/:userId/"パス以下でuserDetailRouterの使用を宣言
userRouter.use('/:userId', userDetailRouter)

// ユーザー登録のルーティングを定義(/user/register)
userRouter
.get(
  '/register',
  async (req, res) => {

    // オブジェクトをを引数に渡してモデルインスタンスを作成
    const addResult = await addUserModel({
      name: 'a',
      email: '1234567890',
      password: 'password'
    })
    res.send(addResult)
  }
)

// ユーザー詳細ページのルーティングを定義(/user/:userId)
userRouter
.get(
  '/:userId',
  async (req, res) => {

    // URLパラメーターのuserIdを引数に渡してモデルインスタンスをDB内で検索
    await userModel.findById(
      req.params.userId,
      (err, paramsUser) => {

        // 該当するモデルインスタンスが見つからなかった場合エラーを出力
        if ( err ) {
          return res.send('the user has that userId isn\'t exists')
        }

        // 成功した場合、該当するモデルインスタンス（オブジェクト）を返す
        else {
          return res.send(paramsUser)
        }
      }
    )
  }
)

export default userRouter