import mongoose from 'mongoose'
import userModel, { findUserModelById } from './userModel.js'

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
    const savedPostModel = await newPostModel.save()

    // ユーザーモデルのpostに当該postを追加
    const foundUserModelWithId = await findUserModelById( postModelObj.owner )
    foundUserModelWithId.save(
      {}
    )
    console.log(savedPostModel)
    foundUserModelWithId.post.push(savedPostModel._id)


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

const findAllPosts = () => {
  const foundAllPosts = postModel.find(
    {},
    (err, foundAllPosts) => {
      if( err ) {
        return 'an Error ocurred in function \'findAllPosts\'.'
      }
    }
  )

  return foundAllPosts
}

const postModel = mongoose.model('Post', postModelSchema)

export default postModel
export { addPostModel, findPostModelByUser, findPostModelById, findAllPosts }