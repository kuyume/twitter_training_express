import mongoose from "mongoose"

const mongooseSchema = mongoose.Schema
// ユーザーモデルのスキーマを定義
const userModelSchema = new mongooseSchema({
  name: {
    type: String,
    required: true,
    maxLength: 255
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 255
    // unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 255
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now()
  },
  post: [{
    type: mongooseSchema.Types.ObjectId,
    ref: 'Post'
  }]
})

userModelSchema.index(
  {email: 1},
  {unique: true}
)

// テーブル名を指定してスキーマをモデル化して接続
const userModel = mongoose.model('User', userModelSchema)

// ユーザーモデルのインスタンスを登録する関数
const addUserModel = async (userModelObj) => {

  // 引数のオブジェクトを基に新しいユーザーモデルを作成
  const newUserModel = new userModel(userModelObj)

  try {
    // バリデーション後に新しいユーザーを登録
    const savedUserModel = await newUserModel.save()

    // 登録に成功したら成功したユーザーのオブジェクトを返す
    return savedUserModel
  }
  catch ( err ) {

    // 重複エラーの場合
    if( err.code === 11000 ) {
      return 'email already exits.'
    }
    return err
  }
}

const getAllUsers = async () => {
  const allUsers = await userModel.find(
    {},
    (err, allUsers) => {
      if ( err ) {
        return 'an Error ocurred in function \'getAllUsers\'.'
      }
    }
  )
  return allUsers
}

export { addUserModel, getAllUsers }
export default userModel
