import mongoose from 'mongoose'

const mongooseSchema = mongoose.Schema 

const postModelSchema = new mongooseSchema({
  owner: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    maxLength: 255
  },
  content: {
    type: String,
    maxLength: 2048
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
  }
})


// ユーザーから新規投稿を行う関数
const addPostModel = async ( postModelObj ) => {
  const newPostModel = new postModel( postModelObj )

  try {

    // バリデーション後に新しい投稿を登録
    const savedPostModel = newPostModel.save()

    // 登録に成功したら成功したユーザーのオブジェクトを返す
    return savedPostModel
  }
  catch ( err ) {
    return err
  }
}

const findPostModelByUser = ( userId ) => {
  const searchedPostModelWithUser = postModel.find(
    { owner: userId },
    (err, searchedPosts) => {
      if ( err ) {
        return 'an Error ocurred in function \'findPostModelByUser\'.'
      }
    }
  )
  return searchedPostModelWithUser
}

const findPostModelById = ( postId ) => {
  const foundPostModelWithId = postModel.findById(
    postId,
    (err, foundPostModel) => {
      if ( err ) {
        return 'an Error ocurred in function \'findPostModelById\'.'
      }
    }
  )

  return foundPostModelWithId
}

const postModel = mongoose.model('Post', postModelSchema)

export default postModel
export { addPostModel, findPostModelByUser, findPostModelById }