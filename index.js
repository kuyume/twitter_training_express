import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import rootRouter from './router/rootRouter.js';

// expressサーバーをインスタンス化する
const expressSrv = express();

// Expressでセッションを使う準備
const sess = {
  secret: 'secret key',
  cookie: {
    maxAge: 6000, // ms
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
};

expressSrv.use( session( sess ) );

// ExpressでCORSを許可
expressSrv.use( cors() );

// Express内蔵のbody-parserを使用する
expressSrv.use( express.json() );

// データベースに接続(token, option, function)
mongoose.connect(

  // DB connection token
  'mongodb+srv://deved:rhino11@cluster0.ywkyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

  // connect options
  {
    useNewUrlParser: true,
    useUnifiedTopology: true, // ??? unknown
    useCreateIndex: true, // apply useCreateIndex to create index in userModelSchema
  },
  ( err ) => {
    if ( err ) {
      return err;
    }
    console.log( 'DB connected.' );
    return null;
  },
);

// ポートのリッスン（2500）
expressSrv.listen(
  2500,
  () => {
    console.log( 'server activated.' );
  },
);

// ユーザー解決処理
expressSrv.use( async ( req, res, next ) => {
  if ( req.session.userId || req.path === '/user/login' || req.path === '/user/create' ) {
    return next();
  }
  return res.json( { redirectPath: '/' } );
} );

// ルートのルーティングを定義
expressSrv.get(
  '',
  ( req, res ) => {
    res.send( 'first page.' );
  },
);

// "/"パス以下でrootRouter（外部ファイル）の使用を宣言
expressSrv.use( '', rootRouter );
