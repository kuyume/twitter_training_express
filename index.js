import express from 'express'
import mongoose from 'mongoose'
import rootRouter from './router/rootRouter.js'

// expressサーバーをインスタンス化する
const express_srv = express()

// データベースに接続(token, option, function)
mongoose.connect(

  // DB connection token
  'mongodb+srv://deved:rhino11@cluster0.ywkyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

  // connect options 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true, // ??? unknown
    useCreateIndex: true // apply useCreateIndex to create index in userModelSchema
  },
  () => {
    console.log('DB connected.')
  }
)

// "/"パス以下でrootRouter（外部ファイル）の使用を宣言
express_srv.use('', rootRouter)


// ポートのリッスン（2500）
express_srv.listen(
  2500,
  () => {

  }
)

// ルートのルーティングを定義
express_srv.get(
  '',
  (req, res) => {
    res.send('first page.')
  }
)
